import { ChevronRight, Loader2, Search, Undo2, X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import handDrawingAnimation from "@/assets/lottie/hand-drawing.lottie?url";
import { useKanjiRecognizer } from "@/hooks/use-kanji-recognizer";
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
    <div className="mx-auto max-w-3xl px-4 pt-3 text-left md:pt-10">
      <div>
        {lexicon === null ? (
          <p className="mt-2 text-muted-foreground text-sm">
            Loading dictionary…
          </p>
        ) : !hasSearched ? (
          <div className="flex h-[calc(100vh-380px)] flex-col items-center justify-center text-center *:px-6">
            <div
              className="mx-auto mb-2 w-full max-w-[240px] shrink-0"
              aria-hidden
            >
              <DotLottieReact src={handDrawingAnimation} autoplay loop />
            </div>
            <p className="mt-2 mx-auto max-w-sm text-muted-foreground text-sm leading-relaxed">
              Draw a kanji and click search button.
            </p>
          </div>
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
            <div className="mt-2 flex h-[calc(100vh-380px)] items-center justify-center rounded-xl border border-border/70 bg-muted/25 px-4 py-3">
              <p className="text-muted-foreground text-sm">
                No matches found for{" "}
                <span className="font-mono">{prediction.label}</span>.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-muted-foreground text-xs uppercase tracking-wider">
                Results
              </p>
              <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                {matchedWords.length} words
              </span>
            </div>
            <ul className="h-[calc(100vh-410px)] pb-3 space-y-3 overflow-y-auto pr-1">
              {matchedWords.map((word) => (
                <li key={word.id}>
                  <Link
                    to={`/dictionary/${word.id}`}
                    className="flex w-full items-center justify-between rounded-xl border border-border/60 bg-white px-4 py-3.5 text-left transition-colors hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none dark:bg-muted/30 dark:hover:bg-muted/45"
                  >
                    <span className="font-heading text-lg font-medium tracking-tight text-foreground">
                      {word.kanji}
                    </span>
                    <ChevronRight
                      className="size-4 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] z-40 flex justify-center px-4">
        <div className="relative w-full overflow-hidden rounded-xl border border-dashed border-primary bg-white">
          <canvas
            ref={canvasRef}
            className="h-[230px] w-full touch-none bg-white"
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
          </div>
          <div className="absolute right-2 bottom-2">
            <Button
              type="button"
              size="sm"
              onClick={() => {
                void recognizeDrawing();
              }}
              disabled={!hasDrawing || isModelLoading || isPredicting}
              className="gap-1.5 px-3"
              aria-label="Search"
              title="Search"
            >
              {isPredicting ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <Search className="size-4" aria-hidden />
              )}
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>

      {modelError ? (
        <p className="mt-3 text-destructive text-sm">{modelError}</p>
      ) : null}
    </div>
  );
}
