import { Link } from 'react-router-dom'
import { CalendarDays, Wallet, Heart, FileText, UserRound, Repeat, ClipboardList, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { WorkerCard } from '../components/ui'

export default function Panel() {
  const { usuario, turnos, pagos, favs, presus, pedidos, workers } = useApp()
  const proximos = turnos.filter((t) => t.estado !== 'hecho').length
  const gastado = pagos.reduce((s, p) => s + (Number(p.monto) || 0), 0)
  const STATS = [
    { n: proximos, l: 'Turnos activos', Icon: CalendarDays, to: '/agenda' },
    { n: '$' + gastado.toLocaleString('es-AR'), l: 'Pagado en total', Icon: Wallet, to: '/pagos' },
    { n: favs.length, l: 'Favoritos', Icon: Heart, to: '/buscar' },
    { n: presus.length, l: 'Presupuestos', Icon: FileText, to: '/presupuestos' },
  ]
  const ACCESOS = [
    { to: '/agenda', t: 'Agenda', d: 'Reservá y confirmá turnos', Icon: CalendarDays },
    { to: '/presupuestos', t: 'Presupuestos', d: 'Armalos y mandalos por WhatsApp', Icon: FileText },
    { to: '/mi-perfil', t: 'Mi perfil', d: `${pedidos.length} pedidos en el barrio`, Icon: UserRound },
    { to: '/trueque', t: 'Trueque', d: 'Cambiá tu oficio por otro', Icon: Repeat },
  ]
  const favoritos = workers.filter((w) => favs.includes(w.id))
  return (
    <div className="space-y-8 pt-5 md:pt-8">
      <header className="rounded-3xl bg-forest p-6 text-white md:p-8">
        <h1 className="text-[30px] font-bold leading-tight md:text-[40px]">Hola{usuario.nombre ? `, ${usuario.nombre.split(' ')[0]}` : ', vecino'}</h1>
        <p className="mt-1 text-white/85 md:text-lg">Todo tu movimiento en un solo lugar.</p>
      </header>
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4" aria-label="Resumen">
        {STATS.map(({ n, l, Icon, to }) => (
          <Link key={l} to={to} className="card p-4 transition hover:-translate-y-0.5 hover:shadow-md">
            <Icon className="h-6 w-6 text-terra" aria-hidden="true" />
            <p className="mt-2 text-[26px] font-bold leading-none text-forest">{n}</p>
            <p className="mt-1 text-sm text-muted">{l}</p>
          </Link>
        ))}
      </section>
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {ACCESOS.map(({ to, t, d, Icon }) => (
          <Link key={to} to={to} className="card group flex items-center gap-3 p-4 transition hover:bg-mint">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint text-forest group-hover:bg-white"><Icon className="h-6 w-6" aria-hidden="true" /></span>
            <span className="min-w-0 flex-1"><span className="block font-bold">{t}</span><span className="block text-sm text-muted">{d}</span></span>
            <ArrowRight className="h-5 w-5 text-muted" aria-hidden="true" />
          </Link>
        ))}
      </section>
      <section className="space-y-3">
        <h2 className="h2 flex items-center gap-2"><ClipboardList className="h-6 w-6 text-terra" aria-hidden="true" />Mis favoritos</h2>
        {favoritos.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{favoritos.map((w) => <WorkerCard key={w.id} w={w} />)}</div>
        ) : (
          <p className="card p-6 text-center text-muted">Tocá el corazón en un vecino para guardarlo acá.</p>
        )}
      </section>
    </div>
  )
}
