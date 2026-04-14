import { Loader2, ScanText, Undo2, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { Button } from "@/components/ui/button";
import { useKanjiRecognizer } from "@/hooks/use-kanji-recognizer";
import {
  getPrimaryHeadword,
  getReadingLine,
  snippetText,
} from "@/features/dictionary/utils/display-word";
import type { DictionaryWord } from "@/types/dictionary-word";

type Point = { x: number; y: number };

function drawStroke(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  strokeColor: string,
) {
  if (!points.length) return;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 7;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i += 1) {
    ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.stroke();
}

function getCanvasPoint(
  event: PointerEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
): Point {
  const rect = canvas.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
}

export default function KanjiPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dprRef = useRef(1);
  const activeStrokeRef = useRef<Point[]>([]);
  const [strokes, setStrokes] = useState<Point[][]>([]);
  const [activeStroke, setActiveStroke] = useState<Point[]>([]);
  const [lexicon, setLexicon] = useState<DictionaryWord[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const {
    isModelLoading,
    isPredicting,
    modelError,
    prediction,
    predictFromCanvas,
    clearPrediction,
  } = useKanjiRecognizer();
  const hasDrawing = strokes.length > 0 || activeStroke.length > 0;

  const matchedWords = useMemo(() => {
    const predictedKanji = prediction?.label.trim();
    if (!lexicon || !predictedKanji) return [];
    return lexicon
      .filter((word) => {
        const kanji = word.kanji.trim();
        return kanji.length > 0 && kanji.includes(predictedKanji);
      })
      .slice(0, 20);
  }, [lexicon, prediction]);

  const setupCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 1);
    dprRef.current = dpr;

    const width = Math.max(1, Math.floor(canvas.clientWidth));
    const height = Math.max(1, Math.floor(canvas.clientHeight));
    const nextWidth = Math.floor(width * dpr);
    const nextHeight = Math.floor(height * dpr);

    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
    }
  }, []);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = dprRef.current || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const rootStyle = getComputedStyle(document.documentElement);
    const border = rootStyle.getPropertyValue("--border").trim() || "#d7d7d7";
    const strokeColor =
      rootStyle.getPropertyValue("--primary").trim() || "#e92e69";

    // Guideline grid to help handwriting alignment.
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const stroke of strokes) {
      drawStroke(ctx, stroke, strokeColor);
    }
    drawStroke(ctx, activeStroke, strokeColor);
  }, [activeStroke, strokes]);

  useEffect(() => {
    const handleResize = () => {
      setupCanvasSize();
      redraw();
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [redraw, setupCanvasSize]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  useEffect(() => {
    let cancelled = false;
    import("@/utils/words")
      .then((module) => {
        if (!cancelled) {
          setLexicon(module.words as DictionaryWord[]);
        }
      })
      .catch(() => {
        if (!cancelled) setLexicon([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handlePointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.setPointerCapture(event.pointerId);
    const point = getCanvasPoint(event, canvas);
    activeStrokeRef.current = [point];
    setActiveStroke([point]);
  };

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!activeStrokeRef.current.length) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const point = getCanvasPoint(event, canvas);
    activeStrokeRef.current = [...activeStrokeRef.current, point];
    setActiveStroke(activeStrokeRef.current);
  };

  const endStroke = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!activeStrokeRef.current.length) return;
    const canvas = canvasRef.current;
    if (canvas?.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    // Snapshot the stroke before clearing the mutable ref.
    const completedStroke = [...activeStrokeRef.current];
    setStrokes((prev) => [...prev, completedStroke]);
    activeStrokeRef.current = [];
    setActiveStroke([]);
  };

  const undoStroke = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const clearCanvas = () => {
    setStrokes([]);
    activeStrokeRef.current = [];
    setActiveStroke([]);
    setHasSearched(false);
    clearPrediction();
  };

  const recognizeDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setHasSearched(true);
    await predictFromCanvas(canvas);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 text-left md:py-10">
      <div className="mt-6 rounded-2xl border border-border bg-card p-4">
        {lexicon === null ? (
          <p className="mt-2 text-muted-foreground text-sm">
            Loading dictionary…
          </p>
        ) : !hasSearched ? (
          <p className="mt-2 text-muted-foreground text-sm">
            Draw a kanji and click the search button.
          </p>
        ) : isPredicting ? (
          <div
            className="mt-3 flex items-center gap-2 rounded-lg border border-border/70 bg-muted/30 px-3 py-2 text-sm text-muted-foreground"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="size-4 animate-spin" aria-hidden />
            Running OCR and searching matched words...
          </div>
        ) : !prediction ? (
          <p className="mt-2 text-muted-foreground text-sm">
            Recognize a kanji to search matches in{" "}
            <code>src/utils/words.ts</code>.
          </p>
        ) : matchedWords.length === 0 ? (
          <>
            <h2 className="font-medium text-base">Matched words</h2>
            <p className="mt-2 text-muted-foreground text-sm">
            No matches found for{" "}
            <span className="font-mono">{prediction.label}</span>.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-medium text-base">Matched words</h2>
            <p className="mt-2 text-muted-foreground text-xs">
              {matchedWords.length} match(es) for{" "}
              <span className="font-mono">{prediction.label}</span>
            </p>
            <ul className="mt-3 space-y-2">
              {matchedWords.map((word) => (
                <li
                  key={word.id}
                  className="rounded-lg border border-border/80 bg-background px-3 py-2"
                >
                  <p className="font-medium text-foreground">
                    {getPrimaryHeadword(word)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {getReadingLine(word)}
                  </p>
                  <p className="myanmar-text text-muted-foreground text-sm">
                    {snippetText(word.mm, 96)}
                  </p>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="h-[420px]" aria-hidden />

      <div className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40 flex justify-center px-4">
        <div className="relative w-full max-w-[300px] overflow-hidden rounded-xl border border-border bg-background shadow-lg">
          <canvas
            ref={canvasRef}
            className="aspect-square w-full touch-none bg-background"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endStroke}
            onPointerCancel={endStroke}
            aria-label="Kanji drawing canvas"
          />

          <div className="absolute top-2 right-2 flex gap-2">
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={undoStroke}
              disabled={!strokes.length}
              aria-label="Undo"
              title="Undo"
            >
              <Undo2 aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={clearCanvas}
              disabled={!hasDrawing}
              aria-label="Clear"
              title="Clear"
            >
              <X aria-hidden />
            </Button>
            <Button
              type="button"
              size="icon"
              onClick={() => {
                void recognizeDrawing();
              }}
              disabled={!hasDrawing || isModelLoading || isPredicting}
              aria-label="Search"
              title="Search"
            >
              {isPredicting ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <ScanText aria-hidden />
              )}
            </Button>
          </div>
        </div>
      </div>

      {prediction ? (
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <p className="text-sm">
            OCR:{" "}
            <span className="font-heading text-primary text-2xl">
              {prediction.label}
            </span>
          </p>
          <p className="text-muted-foreground text-xs">
            Class {prediction.index} · {(prediction.confidence * 100).toFixed(2)}%
          </p>
        </div>
      ) : null}

      {!prediction && isPredicting ? (
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div
            className="flex items-center gap-2 text-muted-foreground text-sm"
            role="status"
            aria-live="polite"
          >
            <Loader2 className="size-4 animate-spin" aria-hidden />
            OCR is running...
          </div>
        </div>
      ) : null}

      {modelError ? (
        <p className="mt-3 text-destructive text-sm">{modelError}</p>
      ) : null}
    </div>
  );
}
