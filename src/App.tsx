import { ThemeProvider } from "./providers/theme-provider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";

import Home from "./pages/Home";

import Filme from "./pages/movies/Filme";
import FilmesPopulares from "./pages/movies/Populares";
import FilmesMelhoresAvaliados from "./pages/movies/Melhores-Avaliados";
import FilmesEstreias from "./pages/movies/Estreias";

import Serie from "./pages/series/Serie";
import SeriesPopulares from "./pages/series/Populares";
import SeriesMelhoresAvaliadas from "./pages/series/Melhores-Avaliados";
import SeriesEstreias from "./pages/series/Estreias";
import Pessoas from "./pages/cast/Cast";
import LoginPage from "./pages/auth/LoginPage";
import Diary from "./pages/diary/Diary";
import ProtectedRoute from "./pages/ProtectedRoute";
import UsersProfile from "./pages/users/Users";
import { Toaster } from "./components/ui/toaster";
import WatchList from "./pages/watchlist/WatchList";
import { Footer } from "./components/footer/footer";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/diario" element={<Diary />} />
            <Route path="/watchlist" element={<WatchList />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="filmes">
            <Route path="populares" element={<FilmesPopulares />} />
            <Route path="estreias" element={<FilmesEstreias />} />
            <Route path="melhores-avaliados" element={<FilmesMelhoresAvaliados />} />
            <Route path=":id" element={<Filme />} />
          </Route>
          <Route path="series">
            <Route path="populares" element={<SeriesPopulares />} />
            <Route path="estreias" element={<SeriesEstreias />} />
            <Route path="melhores-avaliados" element={<SeriesMelhoresAvaliadas />} />
            <Route path=":id" element={<Serie />} />
          </Route>
          <Route path="pessoas">
            <Route path=":id" element={<Pessoas />} />
          </Route>
          <Route path="user">
            <Route path=":username" element={<UsersProfile />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
