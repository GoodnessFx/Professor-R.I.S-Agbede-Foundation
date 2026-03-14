/**
 * React Router configuration
 */

import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { GrantmakingPage } from './pages/GrantmakingPage';
import { ImpactPage } from './pages/ImpactPage';
import { NewsPage } from './pages/NewsPage';
import { NewsArticlePage } from './pages/NewsArticlePage';
import { GalleryPage } from './pages/GalleryPage';
import { DonatePage } from './pages/DonatePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { GrantsApplyPage } from './pages/GrantsApplyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'about', Component: AboutPage },
      { path: 'programs', Component: ProgramsPage },
      { path: 'grantmaking', Component: GrantmakingPage },
      { path: 'grantmaking/apply', Component: GrantsApplyPage },
      { path: 'impact', Component: ImpactPage },
      { path: 'news', Component: NewsPage },
      { path: 'news/:slug', Component: NewsArticlePage },
      { path: 'gallery', Component: GalleryPage },
      { path: 'donate', Component: DonatePage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
