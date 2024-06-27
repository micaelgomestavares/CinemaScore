import { ThemeProvider } from "./components/theme/theme-provider"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

import Home from "./pages/Home"

import Filme from "./pages/filmes/Filme"
import FilmesPopulares from "./pages/filmes/Populares"
import FilmesMelhoresAvaliados from "./pages/filmes/Melhores-Avaliados"
import FilmesEstreias from "./pages/filmes/Estreias"

import Serie from "./pages/series/Serie"
import SeriesPopulares from "./pages/series/Populares"
import SeriesMelhoresAvaliadas from "./pages/series/Melhores-Avaliados"
import SeriesEstreias from "./pages/series/Estreias"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
