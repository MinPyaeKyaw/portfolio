# CLAUDE.md - Myanhon Frontend

## Role

You are working on **Myanhon**, a Japanese-Myanmar language learning PWA built with React 19, TypeScript 6, Vite 8, and Tailwind CSS 4. The app provides dictionary search, kanji recognition (TensorFlow.js), grammar lessons, and reading exercises. All data is currently embedded as static JSON files (no backend API integration yet).

## Commands

```bash
npm run dev       # Start Vite dev server with HMR
npm run build     # Type-check (tsc -b) then bundle with Vite
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Routing | React Router DOM v7 (`createBrowserRouter`) |
| Styling | Tailwind CSS 4 + CSS custom properties (oklch) |
| Components | shadcn/ui (Base UI + CVA variants) |
| Icons | Lucide React |
| State | React Context (`AuthContext`, `ThemeContext`) + hooks |
| ML | TensorFlow.js (kanji handwriting recognition) |
| Fonts | Geist Variable (Latin), Noto Sans Myanmar (Myanmar script) |

## Architecture

```
src/
├── features/          # Feature modules (auth, dictionary, learn, kanji)
├── components/
│   ├── ui/            # shadcn/ui components (Button, Input, Card, etc.)
│   └── layouts/       # RootLayout, AuthLayout
├── hooks/             # Custom hooks (useAuth, useTheme, useKanjiRecognizer)
├── lib/utils.ts       # cn() utility (clsx + tailwind-merge)
├── types/             # TypeScript interfaces per domain
├── utils/             # Static data files (words.ts, kanji.ts, grammer.ts, reading.ts)
├── assets/            # SVGs, Lottie files
├── router.tsx         # All route definitions
├── main.tsx           # App entry point
└── index.css          # Tailwind config, theme variables, custom CSS
```

### Feature Module Structure

Each feature in `src/features/<name>/` contains:
```
<feature>/
├── index.tsx           # List/main page
├── detail.tsx          # Detail page (if applicable)
├── components/         # Feature-specific components
└── utils/              # Feature-specific helpers
```

### Routing Map

```
/                        → LearnPage (hub)
/grammar                 → GrammarListPage
/grammar/:id             → GrammarDetailPage
/reading                 → ReadingListPage
/reading/:id             → ReadingDetailPage
/learn/kanji             → KanjiLearningPage
/learn/kanji/:id         → KanjiLearningDetailPage
/dictionary              → DictionaryPage
/dictionary/:id          → DictionaryWordDetailPage
/kanji                   → KanjiPage (handwriting recognition)
/login                   → LoginView
/sign-up                 → SignUpView
/forgot-password         → ForgotPasswordView
```

Routes are defined in `src/router.tsx`. Navigation uses `RootLayout` (with bottom nav) for main pages and `AuthLayout` for auth pages.

## Key Patterns

### Data Loading
All data is embedded as static TypeScript files in `src/utils/`. Large files are loaded lazily:
```typescript
useEffect(() => {
  let cancelled = false;
  import("@/utils/words").then((m) => {
    if (!cancelled) setLexicon(m.words as DictionaryWord[]);
  }).catch(() => { if (!cancelled) setLexicon([]); });
  return () => { cancelled = true; };
}, []);
```

### Search & Filtering
```typescript
const [query, setQuery] = useState("");
const deferredQuery = useDeferredValue(query);
const filtered = useMemo(() => {
  // filter by level, then by search query
}, [level, deferredQuery]);
```

### Component Variants (CVA)
UI components use `class-variance-authority` for variant styling:
```typescript
const buttonVariants = cva("base-classes...", {
  variants: { variant: { default: "...", outline: "..." }, size: { default: "...", sm: "..." } },
  defaultVariants: { variant: "default", size: "default" },
});
```

### Form Handling
Manual state with inline validation (no form library):
```typescript
const [errors, setErrors] = useState<FieldErrors>({});
function validate(): boolean {
  const next: FieldErrors = {};
  if (!name.trim()) next.name = "Name is required.";
  setErrors(next);
  return Object.keys(next).length === 0;
}
```

### Theme
- CSS custom properties with oklch color space in `src/index.css`
- `ThemeProvider` persists to localStorage key `"myanhon-theme"`
- Dark mode via `.dark` class on `<html>`

### Path Alias
`@/` maps to `src/` (configured in vite.config.ts and tsconfig)

## How to Add a New Feature

1. **Define types** in `src/types/<feature>.ts`
2. **Add data** in `src/utils/<feature>.ts` (or set up API call when backend is ready)
3. **Create feature directory** `src/features/<feature>/`
   - `index.tsx` — list page with search + level filter
   - `detail.tsx` — detail page using `useParams<{ id: string }>()`
   - `components/` — feature-specific components (list, empty state, etc.)
   - `utils/` — filter/search/display helpers
4. **Add routes** in `src/router.tsx` inside the appropriate layout
5. **Add navigation** — update `src/components/layouts/root-layout.tsx` (nav links, bottom tabs, active tab logic)

### Feature Page Template
```typescript
export default function FeatureListPage() {
  const [level, setLevel] = useState<string>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => { /* filter logic */ }, [level, query]);

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col px-4 pt-4">
      <SearchBar value={query} onChange={setQuery} />
      {/* Level filter buttons */}
      {/* Filtered list */}
    </div>
  );
}
```

## How to Modify an Existing Feature

1. **Read the feature** — understand the full module (`index.tsx`, `detail.tsx`, components, utils)
2. **Follow existing patterns** — use the same state management, filtering, and layout approaches already in the feature
3. **Update types** if the data shape changes (`src/types/`)
4. **Update routes** only if adding/removing pages (`src/router.tsx`)
5. **Test visually** — run `npm run dev` and check both light/dark modes, mobile/desktop viewports

## Do

- Use `cn()` from `@/lib/utils` to merge Tailwind classes
- Use `useMemo` for derived/filtered data, `useDeferredValue` for search debouncing
- Use shadcn/ui components from `@/components/ui/` for consistent styling
- Use `<SearchBar>` for search inputs across features
- Apply `className="myanmar-text"` to Myanmar language text
- Keep feature modules self-contained (components and utils inside the feature folder)
- Use dynamic `import()` for large data files to avoid blocking initial load
- Use `useParams` for route params, `useNavigate` for programmatic navigation
- Maintain mobile-first responsive design (`md:` breakpoint for desktop)
- Support both light and dark themes using CSS variables (not hardcoded colors)
- Use `aria-invalid`, `role="status"`, and accessible labels on form elements
- Handle loading, empty, and error states in every data-driven page

## Don't

- Don't install a state management library (Redux, Zustand) — use React Context + hooks
- Don't install a form library — use manual state + validation pattern
- Don't hardcode colors — use theme CSS variables (`text-foreground`, `bg-background`, `text-primary`, etc.)
- Don't put shared/reusable components inside a feature folder — put them in `src/components/`
- Don't import large data files synchronously — always use dynamic `import()`
- Don't add new fonts without ensuring they're imported in `index.css` and available for the target script
- Don't break the existing layout structure (max-w-2xl centered container, flex column with min-h-0)
- Don't skip TypeScript types — every data shape must have an interface in `src/types/`
- Don't create pages without adding corresponding routes in `router.tsx`
- Don't use `useEffect` for derived state — use `useMemo` instead
- Don't add backend API calls without a clear abstraction layer (prepare for future API client)
