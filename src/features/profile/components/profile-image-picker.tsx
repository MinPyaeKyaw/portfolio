import { useEffect, useRef, useState } from "react";
import { Camera, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  /** Existing remote profile image URL (relative paths resolved against API). */
  initialUrl?: string;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

const API_BASE = import.meta.env.VITE_API_URL ?? "";

function resolveUrl(url?: string): string | undefined {
  if (!url) return undefined;
  if (/^https?:\/\//i.test(url)) return url;
  return `${API_BASE}${url}`;
}

export function ProfileImagePicker({ initialUrl, onChange, disabled }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    resolveUrl(initialUrl),
  );
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setPreviewUrl(resolveUrl(initialUrl));
  }, [initialUrl]);

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  function handleFile(file: File | null) {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setObjectUrl(url);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(resolveUrl(initialUrl));
    }
    onChange(file);
  }

  return (
    <div className="flex items-center gap-4">
      <div
        className="grid size-20 place-items-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10"
        aria-hidden={!previewUrl}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile"
            className="size-full object-cover"
          />
        ) : (
          <User className="size-7 text-muted-foreground" aria-hidden />
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          disabled={disabled}
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
        >
          <Camera aria-hidden />
          {previewUrl ? "Change photo" : "Upload photo"}
        </Button>
        {previewUrl ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={disabled}
            onClick={() => handleFile(null)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 aria-hidden />
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}
