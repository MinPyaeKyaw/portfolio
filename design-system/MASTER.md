# Myanhon Design System — MASTER

> **Purpose.** This file is the single source of truth for the Myanhon design system. Any UI/UX work — including everything generated through the `ui-ux-pro-max` skill — **MUST** be constrained by this document. Generic palettes, fonts, components, or layout patterns from the skill are explicitly **overridden** by what appears below.
>
> **Rule of thumb.** If the skill suggests something not in this file, translate it into the closest equivalent here. Never introduce new tokens, colors, fonts, or component variants without updating this file first.

---

## 1. Brand

| Attribute | Value |
|---|---|
| Product | Myanhon — Japanese / Myanmar language-learning PWA |
| Personality | Friendly, focused, modern, mobile-first, bilingual (Latin + Myanmar script) |
| Brand color | `#e92e69` (vivid pink-magenta) — used for primary CTAs, active nav, focus rings, accents |
| Visual signature | Pill-shaped buttons & inputs, soft `ring-1` cards, glassy blurred bottom nav with sliding indicator, subtle pink glow on active states |

The brand color **must** stay `#e92e69` in both light and dark modes. Do not derive a different primary from the skill's palette library.

---

## 2. Color Tokens (authoritative)

All UI colors are CSS custom properties defined in `src/index.css`. **Never hardcode hex/rgb/oklch values in components** — always reference tokens via Tailwind classes (`bg-primary`, `text-foreground`, `border-border`, etc.) or via `var(--token)` in CSS.

### 2.1 Light theme (`:root`)

| Token | Value | Usage |
|---|---|---|
| `--background` | `oklch(0.98 0.008 325)` | App background (subtle pink tint) |
| `--foreground` | `oklch(0.145 0 0)` | Primary text |
| `--card` | `oklch(1 0 0)` | Card / input fill |
| `--card-foreground` | `oklch(0.145 0 0)` | Text on cards |
| `--popover` | `oklch(1 0 0)` | Popover / dialog fill |
| `--popover-foreground` | `oklch(0.145 0 0)` | Text on popovers |
| `--primary` | `#e92e69` | CTAs, active nav, focus accents |
| `--primary-foreground` | `#ffffff` | Text on primary |
| `--secondary` | `oklch(0.97 0 0)` | Secondary surfaces |
| `--secondary-foreground` | `oklch(0.205 0 0)` | Text on secondary |
| `--muted` | `oklch(0.97 0 0)` | Muted surfaces (hover, footer fills) |
| `--muted-foreground` | `oklch(0.556 0 0)` | Muted / secondary text, icons |
| `--accent` | `oklch(0.97 0 0)` | Accent surfaces |
| `--accent-foreground` | `oklch(0.205 0 0)` | Text on accent |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Error, delete |
| `--border` | `oklch(0.922 0 0)` | Default borders |
| `--input` | `oklch(0.922 0 0)` | Input borders |
| `--ring` | `color-mix(in srgb, #e92e69 40%, transparent)` | Focus ring |
| `--sidebar` | `oklch(0.985 0 0)` | Sidebar fill |
| `--sidebar-primary` | `#e92e69` | Sidebar active |
| `--sidebar-border` | `oklch(0.922 0 0)` | Sidebar dividers |

### 2.2 Dark theme (`.dark`)

| Token | Value |
|---|---|
| `--background` | `oklch(0.145 0 0)` |
| `--foreground` | `oklch(0.985 0 0)` |
| `--card` | `oklch(0.205 0 0)` |
| `--card-foreground` | `oklch(0.985 0 0)` |
| `--popover` | `oklch(0.205 0 0)` |
| `--popover-foreground` | `oklch(0.985 0 0)` |
| `--primary` | `#e92e69` *(unchanged)* |
| `--primary-foreground` | `#ffffff` |
| `--secondary` | `oklch(0.269 0 0)` |
| `--muted` | `oklch(0.269 0 0)` |
| `--muted-foreground` | `oklch(0.708 0 0)` |
| `--accent` | `oklch(0.269 0 0)` |
| `--destructive` | `oklch(0.704 0.191 22.216)` |
| `--border` | `oklch(1 0 0 / 10%)` |
| `--input` | `oklch(1 0 0 / 15%)` |
| `--ring` | `color-mix(in srgb, #e92e69 50%, transparent)` |
| `--sidebar` | `oklch(0.205 0 0)` |
| `--sidebar-border` | `oklch(1 0 0 / 10%)` |

### 2.3 Charts

`--chart-1` … `--chart-5`: a monochrome gray scale (no chromatic chart palette). If the skill proposes a multi-color chart palette, override it with these neutrals plus `--primary` for emphasis.

### 2.4 Color rules

- **Override:** ignore any palette named/suggested by the skill (e.g. "Indigo Dawn", "Forest", "Brutalist Mono"). Use only the tokens above.
- **Never** hardcode colors. Always Tailwind tokens (`text-primary`, `bg-card`, `border-border`, `ring-ring/50`, etc.) or `var(--token)`.
- **Dark mode** is class-based (`.dark` on `<html>`). Every color decision must work in both themes via the tokens.
- **Opacity modifiers** are encouraged: `bg-primary/10`, `text-foreground/60`, `border-foreground/10`, `bg-destructive/20`. They keep the palette cohesive without introducing new tokens.

---

## 3. Typography

### 3.1 Fonts

| Family | Source | Use |
|---|---|---|
| **Geist Variable** | `@fontsource-variable/geist` | All Latin text — UI, body, headings. Mapped to `--font-sans` and `--font-heading`. |
| **Noto Sans Myanmar** | `@fontsource/noto-sans-myanmar` | All Myanmar (မြန်မာ) text. Apply via `.myanmar-text` utility class. |
| Japanese kana / kanji | System default via Geist fallback | No dedicated CJK font; system fonts render Japanese glyphs. |

**Override:** the skill's 57 font pairings are **not** to be used. Only Geist Variable + Noto Sans Myanmar are permitted. Do not add Inter, Manrope, Plus Jakarta, JetBrains Mono, etc.

### 3.2 Type scale

The system uses Tailwind's default scale, with these conventions:

| Element | Class |
|---|---|
| Page title / h1 | `text-xl md:text-2xl font-medium` (heading font) |
| Section title / h2 | `text-base md:text-lg font-medium` |
| Card title | `font-heading text-base leading-snug font-medium` (auto-applied via `<CardTitle>`) |
| Body | `text-sm` (default in `<Card>`) |
| Small / caption | `text-xs text-muted-foreground` |
| Mobile bottom-nav label | `text-[10px] font-medium` |

Headings use `font-heading` (currently aliased to Geist Variable, same as `font-sans`). If a heading-specific font is ever introduced, change `--font-heading` only.

### 3.3 Myanmar text rule

Any string containing Myanmar script **must** be wrapped with `className="myanmar-text"` so the Noto Sans Myanmar fallback kicks in. This applies to translations, definitions, and labels.

```tsx
<p className="myanmar-text text-sm text-muted-foreground">{word.myanmarMeaning}</p>
```

---

## 4. Radius

Radii derive from `--radius: 0.625rem` (10px). Tailwind aliases:

| Class | Value |
|---|---|
| `rounded-sm` | `calc(var(--radius) * 0.6)` ≈ 6px |
| `rounded-md` | `calc(var(--radius) * 0.8)` ≈ 8px |
| `rounded-lg` | `var(--radius)` = 10px |
| `rounded-xl` | `calc(var(--radius) * 1.4)` ≈ 14px |
| `rounded-2xl` | `calc(var(--radius) * 1.8)` ≈ 18px |
| `rounded-3xl` | `calc(var(--radius) * 2.2)` ≈ 22px |
| `rounded-4xl` | `calc(var(--radius) * 2.6)` ≈ 26px |
| `rounded-full` | full pill — used on **all** buttons and inputs |

**Override:** buttons and inputs are **always pill-shaped** (`rounded-full`). The skill must never propose a square or `rounded-md` button as a default. Cards use `rounded-xl`.

---

## 5. Spacing & Layout Primitives

### 5.1 Container

The canonical content container across pages:

```tsx
<div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4">
  {/* page content */}
</div>
```

- Centered, mobile-first, `max-w-2xl` (≈672px) cap on larger screens.
- `flex-col` + `min-h-0` so inner scroll regions work.
- Horizontal padding `px-4` (mobile/tablet); pages may bump to `md:px-6` if they have a wide header.

**Do not** use `max-w-7xl`, full-bleed dashboards, or multi-column grid layouts unless explicitly requested. Myanhon is a focused single-column reading app.

### 5.2 Page shell (`RootLayout`)

```
┌──────────────────────────────────────────┐
│  Header (sticky, h-[3.75rem], blurred)   │
│  [Brand]            [Nav · Theme · Auth] │  ← desktop nav inline
├──────────────────────────────────────────┤
│                                          │
│  <main>  flex min-h-0 flex-1 flex-col   │
│                                          │
│   Outlet (page content, max-w-2xl)       │
│                                          │
├──────────────────────────────────────────┤
│  Bottom fade (mask)                      │
│  Bottom nav pill (mobile only, fixed)    │  ← 3-tab pill with sliding indicator
└──────────────────────────────────────────┘
```

Header height: `3.75rem`. Bottom nav reserves `pb-[calc(3.9rem+env(safe-area-inset-bottom,0px))]` on mobile.

### 5.3 Auth pages (`AuthLayout`)

Same header/footer, but no bottom nav, and `main` is scrollable. Auth forms sit centered in the same `max-w-2xl` container (typically narrower — `max-w-sm`).

### 5.4 Spacing scale

Tailwind defaults. Common rhythms in this codebase:

- Card internal padding: `p-4` (or `p-3` for `size="sm"`)
- Section gap: `gap-4` (cards), `gap-2` (inline controls)
- Page top padding: `pt-4`
- Between header and content: `gap-4`

### 5.5 Mobile-first

All components are designed mobile-first. Use `md:` (768px) for desktop overrides. Larger breakpoints (`lg:`, `xl:`) are rarely needed in this app.

---

## 6. Components (canonical inventory)

These are the **only** UI primitives. The skill may suggest others (Accordion, Tabs, Tooltip, Toast); if needed, build them following these conventions, do not import from a different library, and update this file.

### 6.1 Button (`@/components/ui/button`)

Pill-shaped, Base UI primitive + CVA. Built-in icon slots via `data-icon="inline-start|inline-end"`.

**Variants:** `default` (primary fill), `outline`, `secondary`, `ghost`, `destructive` (subtle bg), `link`.
**Sizes:** `xs` (h-6), `sm` (h-7), `default` (h-8), `lg` (h-9), `icon` (size-8), `icon-xs`, `icon-sm`, `icon-lg`.

```tsx
<Button variant="default">Save</Button>
<Button variant="outline" size="sm">Cancel</Button>
<Button variant="ghost" size="icon-sm"><XIcon /></Button>
```

Always pill (`rounded-full`). Active state nudges down 1px. Focus ring uses `--ring`.

### 6.2 Card (`@/components/ui/card`)

`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`.

- `rounded-xl`, `bg-card`, `ring-1 ring-foreground/10` (subtle ring instead of full border).
- `text-sm` body text by default.
- Sizes: `default` (gap-4, py-4) or `sm` (gap-3, py-3).
- Footer pattern: `border-t bg-muted/50` (auto-applied).

### 6.3 Input (`@/components/ui/input`)

- `h-11 md:h-10`, `rounded-full`, `bg-card`, `border-border/80`.
- Focus: border becomes `--primary` (no ring glow — explicitly `ring-0`).
- Invalid: red border.
- Pair with `<SearchBar>` for search use cases — never reinvent the search input.

### 6.4 SearchBar (`@/components/search-bar`)

Standard search input with leading `Search` icon. Use this for **every** search input across the app.

```tsx
<SearchBar value={query} onChange={setQuery} placeholder="..." />
```

### 6.5 Dialog (`@/components/ui/dialog`)

Base UI dialog. `rounded-xl`, `bg-popover`, `ring-1 ring-foreground/10`, `max-w-sm` on `sm+`. Centered with `-translate-x-1/2 -translate-y-1/2`. Built-in close button (top-right ghost icon).

### 6.6 Sheet (`@/components/ui/sheet`)

Side / bottom sheet for mobile-friendly disclosure (filters, large pickers).

### 6.7 ScrollArea (`@/components/ui/scroll-area`)

Use for long lists where overflow scrolling is needed inside a fixed-height container.

### 6.8 Bottom nav (custom in `RootLayout`)

Fixed pill at `bottom-3`, `rounded-full`, `bg-background/85 backdrop-blur-xl`, sliding `--primary` indicator with subtle pink glow `shadow-[0_6px_16px_rgba(233,46,105,0.35)]`. Three tabs: Learn, Dictionary, Kanji. Mobile-only (`md:hidden`).

### 6.9 Theme toggle (`@/components/theme-toggle`)

Pre-built. Use it as-is; do not reimplement.

### 6.10 Brand lockup (`@/components/brand-lockup`)

Pre-built logo + wordmark. Use `<BrandLinkToHome />` in headers.

---

## 7. Iconography

- **Library:** `lucide-react` only.
- Common sizes: `size-3`, `size-3.5`, `size-4`, `size-[1.125rem]`, `size-[18px]`.
- Default stroke; active state may use `stroke-[2.5] scale-105` for emphasis (see bottom nav).
- Always set `aria-hidden` on decorative icons; pair interactive icons with an `aria-label`.

**Override:** do **not** install Heroicons, Phosphor, Tabler, Feather, or custom SVG sets. If a needed icon is missing from Lucide, request approval before adding.

---

## 8. Motion

- **Library:** `tw-animate-css` (already imported) for CSS-driven enter/exit.
- **Durations:** `duration-100` (modals), `duration-200` (tab focus, hover), `duration-300` (sliding indicator, layout transitions).
- **Easing:** prefer `ease-out` for entrance, `ease-in` for exit, `cubic-bezier(0.34, 1.2, 0.64, 1)` for the splash logo bounce.
- **Scale:** active press uses `active:translate-y-px` on buttons, `active:scale-[0.98]` on tabs.
- **Don't** use Framer Motion / motion.dev / GSAP. CSS-only motion keeps the bundle lean.

---

## 9. States

Every interactive element must handle these states with the corresponding tokens:

| State | Pattern |
|---|---|
| Default | tokenized fill + text |
| Hover | `hover:bg-muted` (ghost/outline) or `hover:bg-primary/80` (filled) |
| Focus-visible | `focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50` |
| Active | `active:translate-y-px` (button) / `active:scale-[0.98]` (tab) |
| Disabled | `disabled:pointer-events-none disabled:opacity-50` |
| Aria-invalid | `aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20` |
| Loading | `<Spinner>` or `role="status"` text — never block the entire page |
| Empty | dedicated empty-state component with muted text + small CTA |
| Error | inline message in `text-destructive` with `aria-invalid` on the field |

---

## 10. Accessibility

- All inputs have `<label>` or `aria-label`.
- Decorative icons: `aria-hidden`. Interactive icons: `aria-label`.
- Focus rings are mandatory — never `outline-none` without `focus-visible:ring`.
- Tap targets: minimum `h-8` on desktop, `min-h-11` on mobile-critical controls (bottom nav).
- Color contrast: never rely on color alone — pair with text or icon.
- Form errors: `aria-invalid="true"` on the field + linked `aria-describedby` to the message.
- Status updates: use `role="status"` (or `aria-live="polite"`) for toasts and async-result text.
- Respect `prefers-reduced-motion` for any non-essential motion (the splash screen and tab indicator can be exempt; new motion should opt out).

---

## 11. Imagery & Illustrations

- Lottie via `@lottiefiles/dotlottie-react` is approved for hero / empty-state delight.
- SVG illustrations live in `src/assets/`. Inline them as React components when colors must follow the theme (`fill="currentColor"`).
- No raster hero images for primary content (PWA size budget).

---

## 12. Forms

- Manual state with inline validation. **No** form library (no react-hook-form, no Formik, no Zod resolvers).
- Layout: vertical stack of `<label>` → `<Input>` → error message.
- Inline errors below each field, in `text-destructive text-xs`.
- Submit buttons: `variant="default"`, full width on mobile (`w-full`) inside auth flows.
- `aria-invalid` and `aria-describedby` for every error.

---

## 13. Lists & Search Pages (canonical pattern)

```tsx
<div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4">
  <SearchBar value={query} onChange={setQuery} />
  <div className="mt-3 flex flex-wrap gap-2">
    {/* Level filter buttons (Button variant="outline" size="sm") */}
  </div>
  <ScrollArea className="mt-3 flex-1">
    {/* Filtered list of Cards */}
  </ScrollArea>
</div>
```

- Search via `useDeferredValue` (no debounce libraries).
- Filtering / derived data via `useMemo`.
- Pair list pages with `<ListBottomFade>` so the bottom nav doesn't visually clip content.

---

## 14. Theming

- `ThemeProvider` (`src/components/theme-provider.tsx`) sets `.dark` on `<html>` and persists to `localStorage["myanhon-theme"]`.
- Toggle via `<ThemeToggle>`. Do not roll a separate one.
- All UI must work in both themes — verify by toggling during dev.

---

## 15. PWA / Splash

- The splash screen and its keyframes (`splash-overlay-in`, `splash-logo-in`, `splash-logo-glow`, `splash-text-rise`) live in `src/index.css` and are managed by `<PwaSplashScreen>`. Don't duplicate splash motion elsewhere.
- Safe-area insets (`env(safe-area-inset-bottom,0px)`) are respected throughout — preserve them when adding new fixed/bottom UI.

---

## 16. ui-ux-pro-max Skill — Override Contract

When the `ui-ux-pro-max` skill is invoked, treat its recommendations as **suggestions to be filtered through this document**. Apply these rules:

| Skill output | Action |
|---|---|
| Style preset (glassmorphism, brutalism, neumorphism, claymorphism…) | **Reject as defaults.** Myanhon's style is "soft modern + pill-shaped + subtle ring + pink primary glow." Borrow only specific techniques (e.g. `backdrop-blur` on the bottom nav) where they already exist in the codebase. |
| Color palette (any of the 161) | **Reject.** Use the tokens in §2 only. |
| Font pairing (any of the 57) | **Reject.** Geist Variable + Noto Sans Myanmar only. |
| Component (custom button/card variants) | Map to the variants in §6. If no equivalent exists, ask before adding. |
| Layout (multi-column dashboards, sidebars on mobile) | **Reject.** Single-column, `max-w-2xl`, mobile-first. Sidebars are not part of this app today. |
| Icon set | Lucide only (§7). |
| Animation library | CSS / `tw-animate-css` only (§8). |
| Chart palette | Use `--chart-1` … `--chart-5` + `--primary` for emphasis (§2.3). |
| State management for new UI | Zustand (already in deps) or React Context. **No** Redux/Recoil/Jotai. |
| Form library | None (§12). |

**Workflow:** before producing UI code from the skill, (1) read this MASTER file, (2) translate the skill's tokens/components to ours, (3) write code using `cn()`, the existing UI primitives, and the tokens above. Never paste raw skill output.

---

## 17. What NOT to do

- Hardcode colors (`#fff`, `rgb(...)`, raw oklch in components).
- Add a new font without updating §3 and `index.css`.
- Create a square button / square input — Myanhon is pill-shaped.
- Use `max-w-7xl`, multi-column dashboard grids, or sidebar shells.
- Install Redux, react-hook-form, Framer Motion, Heroicons, Inter font, or any "design system in a box" lib.
- Replace shadcn/Base UI primitives in `src/components/ui/` with a different library.
- Skip dark-mode verification.
- Skip Myanmar font (`.myanmar-text`) on Myanmar strings.
- Add inline styles for color/spacing/radius — always Tailwind tokens.

---

## 18. Quick Reference Cheatsheet

```tsx
// Container
<div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4">…</div>

// Primary CTA
<Button>Continue</Button>

// Secondary action
<Button variant="outline" size="sm">Cancel</Button>

// Card
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>Body</CardContent>
</Card>

// Search field
<SearchBar value={q} onChange={setQ} />

// Myanmar text
<span className="myanmar-text">မြန်မာ</span>

// Class merging
import { cn } from "@/lib/utils";
className={cn("base", isActive && "text-primary")}
```

---

## 19. Updating this file

This file is **authoritative**. If a real product need requires a new token, font, component, or style:

1. Discuss the change.
2. Update `src/index.css` and the relevant component(s).
3. Update this MASTER.md in the same PR.
4. Note the change in the commit message: `design-system: <what changed and why>`.

Out-of-band UI variations are technical debt. Keep the system tight.
