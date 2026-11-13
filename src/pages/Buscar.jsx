import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { BARRIOS, OFICIOS } from '../data/seed'
import { WorkerCard, oficioInfo, tituloDe } from '../components/ui'

const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'matricula', label: 'Con matrícula' },
  { id: 'trueque', label: 'Trueque' },
]

const norm = (t) => String(t).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

export default function Buscar() {
  const { workers, barrio, setBarrio } = useApp()
  const [sp, setSp] = useSearchParams()
  const oficio = sp.get('oficio') || ''
  const f = sp.get('f') || 'todos'
  const q = sp.get('q') || ''

  const setParam = (key, value) => {
    const next = new URLSearchParams(sp)
    if (value && value !== 'todos') next.set(key, value)
    else next.delete(key)
    setSp(next, { replace: true })
  }

  const lista = workers
    .filter((w) => !oficio || w.oficio === oficio)
    .filter((w) => !barrio || w.barrio === barrio)
    .filter((w) => {
      if (!q.trim()) return true
      const texto = norm(`${w.nombre} ${tituloDe(w)} ${oficioInfo(w.oficio).servicio} ${w.descripcion} ${w.barrio}`)
      return norm(q).split(/\s+/).filter(Boolean).every((p) => texto.includes(p))
    })
    .filter((w) => (f === 'matricula' ? w.matriculado : f === 'trueque' ? !!w.trueque : true))
    .sort((a, b) => b.rating - a.rating || b.votos - a.votos)

  const titulo = `${oficio ? oficioInfo(oficio).plural : 'Vecinos'} ${barrio ? 'en tu barrio' : 'de la ciudad'}`

  return (
    <div className="space-y-5 pt-6 md:pt-10">
      <header className="space-y-1">
        <h1 className="h1">{titulo}</h1>
        <p className="text-sm text-muted" aria-live="polite">
          {barrio || 'Todos los barrios'} · {lista.length} {lista.length === 1 ? 'vecino disponible' : 'vecinos disponibles'}
        </p>
      </header>

      <div className="relative md:max-w-xl">
        <label htmlFor="f-q" className="label">Buscar</label>
        <Search className="pointer-events-none absolute bottom-[17px] left-4 h-5 w-5 text-muted" aria-hidden="true" />
        <input
          id="f-q"
          type="search"
          className="field pl-12"
          placeholder="Ej: pérdida, tablero, cortinas…"
          value={q}
          onChange={(e) => setParam('q', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3 md:max-w-xl">
        <div>
          <label htmlFor="f-oficio" className="label">Oficio</label>
          <select id="f-oficio" className="field" value={oficio} onChange={(e) => setParam('oficio', e.target.value)}>
            <option value="">Todos</option>
            {OFICIOS.map((o) => (
              <option key={o.id} value={o.id}>{o.plural}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="f-barrio" className="label">Barrio</label>
          <select id="f-barrio" className="field" value={barrio} onChange={(e) => setBarrio(e.target.value)}>
            <option value="">Todos</option>
            {BARRIOS.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por">
        {FILTROS.map((x) => (
          <button key={x.id} className="chip" aria-pressed={f === x.id} onClick={() => setParam('f', x.id)}>
            {x.label}
          </button>
        ))}
      </div>

      {lista.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lista.map((w) => (
            <WorkerCard key={w.id} w={w} />
          ))}
        </div>
      ) : (
        <div className="card space-y-3 p-6 text-center">
          <p className="text-base font-semibold">No encontramos vecinos con esos filtros.</p>
          <p className="text-sm text-muted">Probá con otro barrio u otro oficio.</p>
          <button
            className="btn-outline-forest"
            onClick={() => {
              setBarrio('')
              setSp({}, { replace: true })
            }}
          >
            Ver todos
          </button>
        </div>
      )}
    </div>
  )
}
