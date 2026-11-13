import { useEffect } from 'react'
import { HashRouter, Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import Inicio from './pages/Inicio'
import Buscar from './pages/Buscar'
import Vecino from './pages/Vecino'
import Trueque from './pages/Trueque'
import Pagos from './pages/Pagos'
import MiPerfil from './pages/MiPerfil'

const TITULOS = {
  '/': 'Oficios Barriales',
  '/buscar': 'Buscar oficios',
  '/trueque': 'Trueque de servicios',
  '/pagos': 'Pagos de servicios',
  '/mi-perfil': 'Mi perfil',
}

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const t = TITULOS[pathname]
    document.title = t && pathname !== '/' ? `${t} · Oficios Barriales` : 'Oficios Barriales'
  }, [pathname])
  return null
}

function NoEncontrada() {
  return (
    <div className="space-y-4 pt-16 text-center">
      <h1 className="h1">No encontramos esa página</h1>
      <p className="text-muted">Puede que el enlace esté mal escrito.</p>
      <Link to="/" className="btn-forest">Volver al inicio</Link>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/vecino/:id" element={<Vecino />} />
            <Route path="/trueque" element={<Trueque />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/mi-perfil" element={<MiPerfil />} />
            {/* enlaces de versiones anteriores */}
            <Route path="/sumate" element={<Navigate to="/mi-perfil" replace />} />
            <Route path="/perfil/:id" element={<Navigate to="/buscar" replace />} />
            <Route path="*" element={<NoEncontrada />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  )
}
