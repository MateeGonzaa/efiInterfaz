import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Search, Repeat, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { BARRIOS, OFICIOS } from '../data/seed'
import { OficioIcon, WorkerCard } from '../components/ui'

const PASOS = [
  { t: 'Elegí un oficio', d: 'Gas, electricidad, plomería y más.' },
  { t: 'Mirá las opiniones', d: 'Calificaciones reales de tus vecinos.' },
  { t: 'Contactá directo', d: 'Llamá o escribí por WhatsApp.' },
]

export default function Inicio() {
  const { barrio, setBarrio, workers } = useApp()
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const mejores = workers
    .filter((w) => !barrio || w.barrio === barrio)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3)

  const buscar = (e) => {
    e.preventDefault()
    const t = q.trim()
    navigate(t ? `/buscar?q=${encodeURIComponent(t)}` : '/buscar')
  }

  return (
    <div className="space-y-8 pt-5 md:space-y-12 md:pt-8">
      <section className="rounded-3xl bg-forest p-6 text-white md:p-10">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-[32px] font-bold leading-tight md:text-[44px]">Hola, vecino</h1>
          <p className="text-base text-white/85 md:text-xl">¿Qué necesitás arreglar hoy? Encontrá a alguien de tu barrio.</p>
        </div>

        <form onSubmit={buscar} className="mt-6 grid gap-3 md:grid-cols-[1fr_260px_auto]" role="search">
          <label className="relative block">
            <span className="sr-only">Buscar un oficio o un vecino</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ej: gasista, pérdida de agua…"
              className="field border-transparent pl-12 text-ink"
            />
          </label>
          <label className="relative block">
            <span className="sr-only">Elegí tu barrio</span>
            <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-forest" aria-hidden="true" />
            <select
              value={barrio}
              onChange={(e) => setBarrio(e.target.value)}
              className="field cursor-pointer border-transparent pl-12 font-semibold text-forest"
            >
              <option value="">Todos los barrios</option>
              {BARRIOS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn bg-terra text-white hover:bg-terra-dark md:px-8">Buscar</button>
        </form>

        <dl className="mt-6 grid max-w-md grid-cols-3 gap-4 text-white/85">
          <div><dt className="sr-only">Vecinos</dt><dd className="text-2xl font-bold text-white">{workers.length}</dd><dd className="text-sm">vecinos con oficio</dd></div>
          <div><dt className="sr-only">Oficios</dt><dd className="text-2xl font-bold text-white">{OFICIOS.length}</dd><dd className="text-sm">oficios</dd></div>
          <div><dt className="sr-only">Barrios</dt><dd className="text-2xl font-bold text-white">{BARRIOS.length}</dd><dd className="text-sm">barrios</dd></div>
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="h2">Elegí un oficio</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {OFICIOS.map((o) => (
            <Link
              key={o.id}
              to={`/buscar?oficio=${o.id}`}
              className="card flex flex-col gap-3 p-4 transition hover:border-forest hover:bg-mint/40 active:scale-[.98] md:p-5"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-forest">
                <OficioIcon id={o.id} className="h-5 w-5" />
              </span>
              <span className="text-base font-semibold">{o.plural}</span>
            </Link>
          ))}
        </div>
      </section>

      {mejores.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-end justify-between gap-3">
            <h2 className="h2">Mejor valorados {barrio ? `en ${barrio}` : 'por los vecinos'}</h2>
            <Link to="/buscar" className="inline-flex min-h-[44px] items-center gap-1 text-base font-medium text-forest hover:underline">
              Ver todos <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mejores.map((w) => (
              <WorkerCard key={w.id} w={w} />
            ))}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="h2">Cómo funciona</h2>
        <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
          {PASOS.map((p, i) => (
            <li key={p.t} className="card flex items-start gap-4 p-4 md:p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-base font-bold text-white" aria-hidden="true">{i + 1}</span>
              <div>
                <p className="text-base font-semibold">{p.t}</p>
                <p className="text-sm text-muted">{p.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl bg-terra p-5 text-white md:flex md:items-center md:justify-between md:gap-8 md:p-8">
        <div className="flex items-start gap-4">
          <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/15 sm:flex" aria-hidden="true">
            <Repeat className="h-6 w-6" />
          </span>
          <div>
            <h2 className="text-xl font-bold md:text-2xl">Trueque de servicios</h2>
            <p className="mt-1 text-sm text-white/90 md:text-base">Cambiá tu trabajo por el de otro vecino.</p>
          </div>
        </div>
        <button onClick={() => navigate('/trueque')} className="btn-white mt-4 w-full md:mt-0 md:w-56">
          Ver trueques
        </button>
      </section>
    </div>
  )
}
