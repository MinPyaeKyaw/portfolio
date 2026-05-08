import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMyProfile, useUpsertProfile } from "@/api/user-info/query";
import type {
  JapaneseLevel,
  UpsertProfilePayload,
} from "@/api/user-info/types";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import { BRAND_NAME } from "@/components/brand-lockup";
import { JapaneseLevelPicker } from "./components/japanese-level-picker";
import { InterestsPicker } from "./components/interests-picker";
import { ProfileImagePicker } from "./components/profile-image-picker";

const STEPS = [
  { key: "photo" },
  { key: "dob" },
  { key: "level" },
  { key: "interests" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

const INVALID_DOB = "INVALID";

function getApiErrorMessage(err: unknown, fallback: string): string {
  return (
    (err as { response?: { data?: { message?: string } } }).response?.data
      ?.message ?? fallback
  );
}

export default function ProfileSetupView() {
  const navigate = useNavigate();
  const { data: profile } = useMyProfile();
  const upsertMutation = useUpsertProfile();

  // Capture once: was a profile already set up when we landed?
  const isEditModeRef = useRef<boolean | null>(null);
  useEffect(() => {
    if (isEditModeRef.current === null && profile) {
      isEditModeRef.current = Boolean(profile.userInfo);
    }
  }, [profile]);
  const isEdit = isEditModeRef.current === true;

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const [dobDay, setDobDay] = useState<string>("");
  const [dobMonth, setDobMonth] = useState<string>("");
  const [dobYear, setDobYear] = useState<string>("");
  const [japaneseLevel, setJapaneseLevel] = useState<JapaneseLevel>("newbie");
  const [interests, setInterests] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dobError, setDobError] = useState<string | undefined>();

  // Hydrate state from existing profile (once it loads).
  const hydratedRef = useRef(false);
  useEffect(() => {
    const info = profile?.userInfo;
    if (!info || hydratedRef.current) return;
    hydratedRef.current = true;
    if (info.dateOfBirth) {
      const d = new Date(info.dateOfBirth);
      if (Number.isFinite(d.getTime())) {
        setDobDay(String(d.getDate()).padStart(2, "0"));
        setDobMonth(String(d.getMonth() + 1).padStart(2, "0"));
        setDobYear(String(d.getFullYear()));
      }
    }
    setJapaneseLevel(info.japaneseLevel);
    setInterests(info.interests ?? []);
  }, [profile?.userInfo]);

  /** "" if blank, "INVALID" if filled but malformed, else "YYYY-MM-DD". */
  const dateOfBirth = useMemo(() => {
    if (!dobDay && !dobMonth && !dobYear) return "";
    if (!dobDay || !dobMonth || dobYear.length !== 4) return INVALID_DOB;
    const d = parseInt(dobDay, 10);
    const m = parseInt(dobMonth, 10);
    const y = parseInt(dobYear, 10);
    if (!d || !m || !y) return INVALID_DOB;
    const dt = new Date(y, m - 1, d);
    if (
      dt.getFullYear() !== y ||
      dt.getMonth() !== m - 1 ||
      dt.getDate() !== d
    ) {
      return INVALID_DOB;
    }
    return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  }, [dobDay, dobMonth, dobYear]);

  function validateDob(): boolean {
    if (dateOfBirth === INVALID_DOB) {
      setDobError("Enter a valid day, month, and year.");
      return false;
    }
    if (dateOfBirth) {
      const d = new Date(dateOfBirth);
      if (d > new Date()) {
        setDobError("Date of birth can't be in the future.");
        return false;
      }
      if (d < new Date("1900-01-01")) {
        setDobError("Date of birth must be after 1900.");
        return false;
      }
    }
    setDobError(undefined);
    return true;
  }

  function buildStepPayload(key: StepKey): UpsertProfilePayload | null {
    switch (key) {
      case "photo":
        return imageFile ? { imageFile } : null;
      case "dob":
        return dateOfBirth && dateOfBirth !== INVALID_DOB
          ? { dateOfBirth }
          : null;
      case "level":
        return { japaneseLevel };
      case "interests":
        return { interests };
    }
  }

  function advance() {
    setDirection("forward");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  async function saveAndAdvance() {
    const key = STEPS[step].key;

    if (key === "dob" && !validateDob()) return;

    const payload = buildStepPayload(key);
    const isLast = step === STEPS.length - 1;

    if (!payload) {
      // Nothing to save for this step (e.g. user skipped photo) — just advance.
      if (isLast) {
        navigate("/profile", { replace: true });
      } else {
        advance();
      }
      return;
    }

    const toastId = toast.loading("Saving…");
    upsertMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Saved.", { id: toastId });
        if (isLast) {
          navigate("/profile", { replace: true });
        } else {
          // Clear local image file after successful upload so we don't re-upload
          // on a later step's save.
          if (key === "photo") setImageFile(null);
          advance();
        }
      },
      onError: (err) => {
        toast.error(getApiErrorMessage(err, "Could not save."), {
          id: toastId,
        });
      },
    });
  }

  function goBack() {
    setDobError(undefined);
    setDirection("backward");
    setStep((s) => Math.max(s - 1, 0));
  }

  const current = STEPS[step];
  const isLastStep = step === STEPS.length - 1;
  const saving = upsertMutation.isPending;

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col px-4 pt-6 pb-12">
      <div className="mb-6 flex flex-col items-center gap-2 text-center">
        <img
          src={logo}
          alt=""
          width={56}
          height={56}
          className="size-14 object-contain md:size-16"
          decoding="async"
        />
        <span className="brand-text text-2xl font-semibold leading-tight text-primary md:text-3xl">
          {BRAND_NAME}
        </span>
      </div>

      <header className="mb-8 space-y-2 text-center">
        <h1 className="font-heading text-2xl font-medium leading-snug tracking-tight md:text-3xl">
          {isEdit ? "Edit your profile" : "Set up your profile"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isEdit
            ? "Update what you'd like — each step saves as you go."
            : "Tell us a little about yourself. We save each step as you go."}
        </p>
      </header>

      <div
        key={`${step}-${direction}`}
        className={cn(
          "duration-300 animate-in fade-in",
          direction === "forward"
            ? "slide-in-from-right-8"
            : "slide-in-from-left-8",
        )}
      >
        {current.key === "photo" ? (
          <Step
            title="Add a profile photo"
            description="Optional. Choose an image that represents you."
          >
            <ProfileImagePicker
              initialUrl={profile?.userInfo?.profileImage}
              onChange={setImageFile}
              disabled={saving}
            />
          </Step>
        ) : null}

        {current.key === "dob" ? (
          <Step
            title="When were you born?"
            description="Optional. Helps us suggest age-appropriate content."
          >
            <div className="space-y-1.5">
              <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
                <DobField
                  id="setup-dob-day"
                  label="Day"
                  autoComplete="bday-day"
                  maxLength={2}
                  placeholder="DD"
                  value={dobDay}
                  onChange={setDobDay}
                  invalid={!!dobError}
                  disabled={saving}
                />
                <DobField
                  id="setup-dob-month"
                  label="Month"
                  autoComplete="bday-month"
                  maxLength={2}
                  placeholder="MM"
                  value={dobMonth}
                  onChange={setDobMonth}
                  invalid={!!dobError}
                  disabled={saving}
                />
                <DobField
                  id="setup-dob-year"
                  label="Year"
                  autoComplete="bday-year"
                  maxLength={4}
                  placeholder="YYYY"
                  value={dobYear}
                  onChange={setDobYear}
                  invalid={!!dobError}
                  disabled={saving}
                />
              </div>
              {dobError ? (
                <p
                  id="setup-dob-error"
                  className="text-destructive text-xs"
                  role="alert"
                >
                  {dobError}
                </p>
              ) : null}
            </div>
          </Step>
        ) : null}

        {current.key === "level" ? (
          <Step
            title="Your Japanese level"
            description="Pick the closest match. You can change this any time."
          >
            <JapaneseLevelPicker
              value={japaneseLevel}
              onChange={setJapaneseLevel}
              disabled={saving}
            />
          </Step>
        ) : null}

        {current.key === "interests" ? (
          <Step
            title="Topics you'd like to learn through"
            description="Choose any that apply, or add your own."
          >
            <InterestsPicker
              value={interests}
              onChange={setInterests}
              disabled={saving}
            />
          </Step>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={goBack}
          disabled={step === 0 || saving}
        >
          <ArrowLeft aria-hidden />
          Back
        </Button>

        <Button
          type="button"
          size="lg"
          onClick={saveAndAdvance}
          disabled={saving}
          aria-busy={saving}
          className="px-6"
        >
          {saving ? (
            <Loader2 className="animate-spin" aria-hidden />
          ) : isLastStep ? (
            <Check aria-hidden />
          ) : null}
          {saving ? "Saving…" : isLastStep ? "Finish" : "Continue"}
          {!saving && !isLastStep ? <ArrowRight aria-hidden /> : null}
        </Button>
      </div>
    </div>
  );
}

function Step({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="space-y-1">
        <h2 className="font-heading text-xl font-medium leading-snug tracking-tight md:text-2xl">
          {title}
        </h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </section>
  );
}

function DobField({
  id,
  label,
  autoComplete,
  maxLength,
  placeholder,
  value,
  onChange,
  invalid,
  disabled,
}: {
  id: string;
  label: string;
  autoComplete: string;
  maxLength: number;
  placeholder: string;
  value: string;
  onChange: (next: string) => void;
  invalid: boolean;
  disabled: boolean;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </label>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
        aria-invalid={invalid}
        aria-describedby={invalid ? "setup-dob-error" : undefined}
        disabled={disabled}
        className="text-center"
      />
    </div>
  );
}
