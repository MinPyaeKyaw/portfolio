import { useCallback, useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { KANJI_LABELS } from "./labels";

const MODEL_PATH = "/model/model.json";
const INPUT_SIZE: [number, number] = [96, 96];
const AUTO_INVERT_WHITE_BACKGROUND = true;
const LABEL_COUNT = Object.keys(KANJI_LABELS).length;

function getLabelByIndex(index: number): string {
  return KANJI_LABELS[index] ?? `Class ${index}`;
}

export interface KanjiPredictionResult {
  label: string;
  index: number;
  confidence: number;
}

export interface KanjiModelInfo {
  path: string;
  inputSize: [number, number];
  labelsCount: number;
  ready: boolean;
}

export interface UseKanjiRecognizerResult {
  model: KanjiModelInfo;
  isModelLoading: boolean;
  isPredicting: boolean;
  modelError: string | null;
  prediction: KanjiPredictionResult | null;
  predictFromCanvas: (
    canvas: HTMLCanvasElement,
  ) => Promise<KanjiPredictionResult | null>;
  clearPrediction: () => void;
}

export function useKanjiRecognizer(): UseKanjiRecognizerResult {
  const modelRef = useRef<tf.LayersModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<KanjiPredictionResult | null>(
    null,
  );

  useEffect(() => {
    let mounted = true;

    const loadModel = async () => {
      setIsModelLoading(true);
      setModelError(null);
      try {
        const model = await tf.loadLayersModel(MODEL_PATH);
        if (!mounted) {
          model.dispose();
          return;
        }
        modelRef.current = model;
      } catch (error) {
        if (!mounted) return;
        const message =
          error instanceof Error
            ? error.message
            : "Failed to load TensorFlow model";
        setModelError(message);
      } finally {
        if (mounted) {
          setIsModelLoading(false);
        }
      }
    };

    void loadModel();

    return () => {
      mounted = false;
      if (modelRef.current) {
        modelRef.current.dispose();
        modelRef.current = null;
      }
    };
  }, []);

  const predictFromCanvas = useCallback(
    async (
      canvas: HTMLCanvasElement,
    ): Promise<KanjiPredictionResult | null> => {
      const model = modelRef.current;
      if (!model) {
        setModelError("Model is not ready yet.");
        return null;
      }

      setIsPredicting(true);
      setModelError(null);

      let inputTensor: tf.Tensor4D | null = null;
      let outputTensor: tf.Tensor | null = null;
      let argMaxTensor: tf.Tensor | null = null;

      try {
        const source = document.createElement("canvas");
        source.width = canvas.width;
        source.height = canvas.height;
        const sourceCtx = source.getContext("2d");
        if (!sourceCtx) {
          throw new Error("Unable to read canvas context.");
        }

        // Normalize drawing to high-contrast image for better recognition.
        sourceCtx.fillStyle = "#ffffff";
        sourceCtx.fillRect(0, 0, source.width, source.height);
        sourceCtx.drawImage(canvas, 0, 0);

        inputTensor = tf.tidy(() => {
          // 1) Capture RGB (3 channels)
          const rgb = tf.browser.fromPixels(source, 3).toFloat();
          // 2) Resize to [96, 96] with bilinear interpolation
          const resized = tf.image.resizeBilinear(rgb, INPUT_SIZE);
          // 3) Normalize to [0, 1]
          const normalized = resized.div(255);

          // 5) Conditionally invert when the frame looks like dark ink on white bg.
          const prepared = (() => {
            if (!AUTO_INVERT_WHITE_BACKGROUND) return normalized;
            const meanPixel = normalized.mean().dataSync()[0] ?? 0;
            // White-dominant background usually has higher mean value.
            if (meanPixel > 0.5) {
              return tf.sub(1, normalized);
            }
            return normalized;
          })();

          // 4) Add batch dimension: [1, 96, 96, 3]
          return prepared.expandDims(0) as tf.Tensor4D;
        });

        outputTensor = model.predict(inputTensor) as tf.Tensor;
        const probabilities = await outputTensor.data();
        argMaxTensor = outputTensor.argMax(-1);
        const predictedIndex = (await argMaxTensor.data())[0] ?? 0;
        const confidence = probabilities[predictedIndex] ?? 0;
        const label = getLabelByIndex(predictedIndex);

        const result: KanjiPredictionResult = {
          label,
          index: predictedIndex,
          confidence,
        };

        setPrediction(result);
        return result;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Prediction failed unexpectedly.";
        setModelError(message);
        return null;
      } finally {
        inputTensor?.dispose();
        outputTensor?.dispose();
        argMaxTensor?.dispose();
        setIsPredicting(false);
      }
    },
    [],
  );

  const clearPrediction = useCallback(() => {
    setPrediction(null);
  }, []);

  return {
    model: {
      path: MODEL_PATH,
      inputSize: INPUT_SIZE,
      labelsCount: LABEL_COUNT,
      ready: !!modelRef.current,
    },
    isModelLoading,
    isPredicting,
    modelError,
    prediction,
    predictFromCanvas,
    clearPrediction,
  };
}
