import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './features/layout/RootLayout'
import DictionaryPage from './features/dictionary/DictionaryPage'
import HomePage from './features/home/HomePage'
import KanjiPage from './features/kanji/KanjiPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'dictionary', element: <DictionaryPage /> },
      { path: 'kanji', element: <KanjiPage /> },
    ],
  },
])
