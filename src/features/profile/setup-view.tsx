import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMyProfile, useUpsertProfile } from "@/api/user-info/query";
import type { JapaneseLevel } from "@/api/user-info/types";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.svg";
import { BRAND_NAME } from "@/components/brand-lockup";
import { JapaneseLevelPicker } from "./components/japanese-level-picker";
import { InterestsPicker } from "./components/interests-picker";
import { ProfileImagePicker } from "./components/profile-image-picker";

const STEPS = [
  {
    key: "photo",
    label: "Photo",
    title: "Add a profile photo",
    description: "Optional. Choose an image that represents you.",
  },
  {
    key: "dob",
    label: "Birthday",
    title: "When were you born?",
    description: "Optional. Helps us suggest age-appropriate content.",
  },
  {
    key: "level",
    label: "Level",
    title: "Your Japanese level",
    description: "Pick the closest match. You can change this any time.",
  },
  {
    key: "interests",
    label: "Interests",
    title: "Topics you'd like to learn through",
    description: "Choose any that apply, or add your own.",
  },
] as const;

type FieldErrors = {
  dateOfBirth?: string;
  form?: string;
};

const INVALID_DOB = "INVALID";

export default function ProfileSetupView() {
  const navigate = useNavigate();
  const { data: profile } = useMyProfile();
  const upsertMutation = useUpsertProfile();

  const isEdit = useMemo(
    () => Boolean(profile?.userInfo),
    [profile?.userInfo],
  );

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const [dobDay, setDobDay] = useState<string>("");
  const [dobMonth, setDobMonth] = useState<string>("");
  const [dobYear, setDobYear] = useState<string>("");
  const [japaneseLevel, setJapaneseLevel] = useState<JapaneseLevel>("newbie");
  const [interests, setInterests] = useState<string[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  // Hydrate from existing profile when editing
  useEffect(() => {
    const info = profile?.userInfo;
    if (!info) return;
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

  function validateDateOfBirth(): boolean {
    const next: FieldErrors = {};
    if (dateOfBirth === INVALID_DOB) {
      next.dateOfBirth = "Enter a valid day, month, and year.";
    } else if (dateOfBirth) {
      const d = new Date(dateOfBirth);
      if (d > new Date()) {
        next.dateOfBirth = "Date of birth can't be in the future.";
      } else if (d < new Date("1900-01-01")) {
        next.dateOfBirth = "Date of birth must be after 1900.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (STEPS[step].key === "dob" && !validateDateOfBirth()) return;
    setDirection("forward");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function goBack() {
    setErrors({});
    setDirection("backward");
    setStep((s) => Math.max(s - 1, 0));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validateDateOfBirth()) return;

    const toastId = toast.loading(
      isEdit ? "Saving your changes…" : "Setting up your profile…",
    );

    upsertMutation.mutate(
      {
        dateOfBirth:
          dateOfBirth && dateOfBirth !== INVALID_DOB ? dateOfBirth : undefined,
        japaneseLevel,
        interests,
        imageFile: imageFile ?? undefined,
      },
      {
        onSuccess: () => {
          toast.success(
            isEdit ? "Profile updated." : "Profile saved.",
            { id: toastId },
          );
          navigate("/profile", { replace: true });
        },
        onError: (err) => {
          const message =
            (err as { response?: { data?: { message?: string } } })
              .response?.data?.message ?? "Could not save your profile.";
          toast.error(message, { id: toastId });
          setErrors({ form: message });
        },
      },
    );
  }

  const isLastStep = step === STEPS.length - 1;
  const current = STEPS[step];

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-xl flex-1 flex-col px-4 pt-6">
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

      <header className="mb-5 space-y-1 text-center">
        <h1 className="font-heading text-xl font-medium leading-snug tracking-tight md:text-2xl">
          {isEdit ? "Edit your profile" : "Set up your profile"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {isEdit
            ? "Tweak any answer — your changes save when you finish."
            : "Tell us a little about yourself so we can personalize your learning."}
        </p>
      </header>

      <form onSubmit={onSubmit} noValidate>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{current.title}</CardTitle>
            <CardDescription>{current.description}</CardDescription>
          </CardHeader>
          <CardContent>
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
                <ProfileImagePicker
                  initialUrl={profile?.userInfo?.profileImage}
                  onChange={setImageFile}
                  disabled={upsertMutation.isPending}
                />
              ) : null}

              {current.key === "dob" ? (
                <div className="space-y-1.5">
                  <span className="text-sm font-medium">Date of birth</span>
                  <div className="grid grid-cols-[1fr_1fr_1.4fr] gap-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="setup-dob-day"
                        className="text-xs text-muted-foreground"
                      >
                        Day
                      </label>
                      <Input
                        id="setup-dob-day"
                        type="text"
                        inputMode="numeric"
                        autoComplete="bday-day"
                        maxLength={2}
                        placeholder="DD"
                        value={dobDay}
                        onChange={(e) =>
                          setDobDay(e.target.value.replace(/\D/g, ""))
                        }
                        aria-invalid={!!errors.dateOfBirth}
                        aria-describedby={
                          errors.dateOfBirth ? "setup-dob-error" : undefined
                        }
                        disabled={upsertMutation.isPending}
                        className="text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="setup-dob-month"
                        className="text-xs text-muted-foreground"
                      >
                        Month
                      </label>
                      <Input
                        id="setup-dob-month"
                        type="text"
                        inputMode="numeric"
                        autoComplete="bday-month"
                        maxLength={2}
                        placeholder="MM"
                        value={dobMonth}
                        onChange={(e) =>
                          setDobMonth(e.target.value.replace(/\D/g, ""))
                        }
                        aria-invalid={!!errors.dateOfBirth}
                        aria-describedby={
                          errors.dateOfBirth ? "setup-dob-error" : undefined
                        }
                        disabled={upsertMutation.isPending}
                        className="text-center"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="setup-dob-year"
                        className="text-xs text-muted-foreground"
                      >
                        Year
                      </label>
                      <Input
                        id="setup-dob-year"
                        type="text"
                        inputMode="numeric"
                        autoComplete="bday-year"
                        maxLength={4}
                        placeholder="YYYY"
                        value={dobYear}
                        onChange={(e) =>
                          setDobYear(e.target.value.replace(/\D/g, ""))
                        }
                        aria-invalid={!!errors.dateOfBirth}
                        aria-describedby={
                          errors.dateOfBirth ? "setup-dob-error" : undefined
                        }
                        disabled={upsertMutation.isPending}
                        className="text-center"
                      />
                    </div>
                  </div>
                  {errors.dateOfBirth ? (
                    <p
                      id="setup-dob-error"
                      className="text-destructive text-xs"
                    >
                      {errors.dateOfBirth}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {current.key === "level" ? (
                <JapaneseLevelPicker
                  value={japaneseLevel}
                  onChange={setJapaneseLevel}
                  disabled={upsertMutation.isPending}
                />
              ) : null}

              {current.key === "interests" ? (
                <InterestsPicker
                  value={interests}
                  onChange={setInterests}
                  disabled={upsertMutation.isPending}
                />
              ) : null}
            </div>
          </CardContent>
        </Card>

        {errors.form ? (
          <p role="status" className="mt-3 text-destructive text-xs">
            {errors.form}
          </p>
        ) : null}

        <div className="mt-5 flex items-center justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={goBack}
            disabled={step === 0 || upsertMutation.isPending}
          >
            <ArrowLeft aria-hidden />
            Back
          </Button>

          {isLastStep ? (
            <Button
              type="submit"
              size="lg"
              disabled={upsertMutation.isPending}
              aria-busy={upsertMutation.isPending}
              className="px-6"
            >
              {upsertMutation.isPending ? (
                <Loader2 className="animate-spin" aria-hidden />
              ) : (
                <Check aria-hidden />
              )}
              {upsertMutation.isPending
                ? "Saving…"
                : isEdit
                  ? "Save changes"
                  : "Finish"}
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              onClick={goNext}
              disabled={upsertMutation.isPending}
              className="px-6"
            >
              Next
              <ArrowRight aria-hidden />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
