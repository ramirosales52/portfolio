import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavProvider } from './components/nav-context'
import './index.css'
import HomePage from './pages/home'
import ProjectPage from './pages/project'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proyectos/:id" element={<ProjectPage />} />
        </Routes>
      </NavProvider>
    </BrowserRouter>
  </StrictMode>,
)
