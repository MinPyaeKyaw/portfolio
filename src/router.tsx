import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "./components/layouts/account-layout";
import RootLayout from "./components/layouts/root-layout";
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
import HiraganaLearningPage from "./features/learn/hiragana";
import KatakanaLearningPage from "./features/learn/katakana";
import LandingPage from "./features/landing";
import ForgotPasswordView from "./features/auth/forgot-password-view";
import LoginView from "./features/auth/login-view";
import OAuthCallbackView from "./features/auth/oauth-callback-view";
import ResetPasswordView from "./features/auth/reset-password-view";
import SignUpView from "./features/auth/sign-up-view";
import ProfileSetupView from "./features/profile/setup-view";
import ProfileView from "./features/profile/profile-view";
import SettingsView from "./features/settings/settings-view";

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
      { path: "learn/hiragana", element: <HiraganaLearningPage /> },
      { path: "learn/katakana", element: <KatakanaLearningPage /> },
      { path: "dictionary", element: <DictionaryPage /> },
      { path: "dictionary/:id", element: <DictionaryWordDetailPage /> },
      { path: "kanji", element: <KanjiPage /> },
      { path: "welcome", element: <LandingPage /> },
      { path: "login", element: <LoginView /> },
      { path: "sign-up", element: <SignUpView /> },
      { path: "forgot-password", element: <ForgotPasswordView /> },
      { path: "reset-password", element: <ResetPasswordView /> },
      { path: "oauth/callback", element: <OAuthCallbackView /> },
    ],
  },
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      { path: "profile", element: <ProfileView /> },
      { path: "settings", element: <SettingsView /> },
      { path: "set-up", element: <ProfileSetupView /> },
    ],
  },
]);
