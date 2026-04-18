import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./features/layout/root-layout";
import DictionaryPage from "./features/dictionary";
import DictionaryWordDetailPage from "./features/dictionary/detail";
import KanjiPage from "./features/kanji";
import LearnPage from "./features/learn";
import KanjiLearningPage from "./features/learn/kanji";
import KanjiLearningDetailPage from "./features/learn/kanji/detail";
import GrammarListPage from "./features/learn/grammar";
import GrammarDetailPage from "./features/learn/grammar/detail";
import ReadingListPage from "./features/learn/reading";
import ReadingDetailPage from "./features/learn/reading/detail";
import ForgotPasswordView from "./features/auth/forgot-password-view";
import LoginView from "./features/auth/login-view";
import SignUpView from "./features/auth/sign-up-view";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <LearnPage /> },
      { path: "grammar", element: <GrammarListPage /> },
      { path: "grammar/:id", element: <GrammarDetailPage /> },
      { path: "reading", element: <ReadingListPage /> },
      { path: "reading/:id", element: <ReadingDetailPage /> },
      { path: "learn/kanji", element: <KanjiLearningPage /> },
      { path: "learn/kanji/:id", element: <KanjiLearningDetailPage /> },
      { path: "dictionary", element: <DictionaryPage /> },
      { path: "dictionary/:id", element: <DictionaryWordDetailPage /> },
      { path: "kanji", element: <KanjiPage /> },
      { path: "login", element: <LoginView /> },
      { path: "sign-up", element: <SignUpView /> },
      { path: "forgot-password", element: <ForgotPasswordView /> },
    ],
  },
]);
