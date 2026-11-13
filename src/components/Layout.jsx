import { Link, useLocation } from 'react-router-dom'
import { Home, Search, Wallet, UserRound } from 'lucide-react'
import { Logo } from './ui'

const TABS = [
  { to: '/', label: 'Inicio', Icon: Home, match: (p) => p === '/' },
  { to: '/buscar', label: 'Buscar', Icon: Search, match: (p) => p.startsWith('/buscar') || p.startsWith('/vecino') },
  { to: '/pagos', label: 'Pagos', Icon: Wallet, match: (p) => p.startsWith('/pagos') },
  { to: '/mi-perfil', label: 'Perfil', Icon: UserRound, match: (p) => p.startsWith('/mi-perfil') },
]

export default function Layout({ children }) {
  const { pathname } = useLocation()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Barra superior en celulares: logo siempre a mano */}
      <header className="sticky top-0 z-30 border-b border-line bg-cream/95 pt-[env(safe-area-inset-top)] backdrop-blur md:hidden">
        <div className="flex h-14 items-center px-5">
          <Logo size={32} />
        </div>
      </header>

      {/* Barra superior en pantallas grandes */}
      <header className="sticky top-0 z-30 hidden border-b border-line bg-cream/90 backdrop-blur md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-3">
          <Logo size={40} />
          <nav className="flex gap-2" aria-label="Principal">
            {TABS.map(({ to, label, Icon, match }) => {
              const active = match(pathname)
              return (
                <Link
                  key={to}
                  to={to}
                  aria-current={active ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-base font-medium transition ${
                    active ? 'bg-mint text-forest' : 'text-muted hover:bg-white hover:text-ink'
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" /> {label}
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] md:px-8 md:pb-16">
        {children}
      </main>

      <footer className="hidden border-t border-line bg-white/60 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-6 text-sm text-muted">
          <Logo size={28} />
          <p>Prototipo con datos ficticios · Río Cuarto, Córdoba</p>
        </div>
      </footer>

      {/* Barra inferior: celulares */}
      <nav
        aria-label="Principal"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-4 gap-1 p-2">
          {TABS.map(({ to, label, Icon, match }) => {
            const active = match(pathname)
            return (
              <Link
                key={to}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-2 text-xs font-medium transition ${
                  active ? 'bg-mint text-forest' : 'text-muted'
                }`}
              >
                <Icon className="h-6 w-6" aria-hidden="true" strokeWidth={active ? 2.4 : 2} />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
