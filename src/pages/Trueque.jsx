import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Repeat } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { OFICIOS } from '../data/seed'
import { oficioInfo, primerNombre, waLink } from '../components/ui'

export default function Trueque() {
  const { workers } = useApp()
  const [busca, setBusca] = useState('')

  const lista = workers.filter((w) => w.trueque && (!busca || w.trueque.busca === busca))

  return (
    <div className="space-y-5 pt-6 md:pt-10">
      <header className="space-y-1">
        <h1 className="h1">Trueque de servicios</h1>
        <p className="text-base text-muted">Cambiá tu trabajo por el de otro vecino, sin plata de por medio.</p>
      </header>

      <div className="md:max-w-xs">
        <label htmlFor="f-busca" className="label">Quiero ver quienes buscan</label>
        <select id="f-busca" className="field" value={busca} onChange={(e) => setBusca(e.target.value)}>
          <option value="">Cualquier oficio</option>
          {OFICIOS.map((o) => (
            <option key={o.id} value={o.id}>{o.servicio}</option>
          ))}
        </select>
      </div>

      {lista.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {lista.map((w) => {
            const msg = `Hola ${primerNombre(w)}, te escribo desde Oficios Barriales. Vi que aceptás trueque y me gustaría proponerte un intercambio de trabajos. ¿Podemos hablar?`
            return (
              <article key={w.id} className="card space-y-3 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs text-muted">Ofrece</p>
                    <p className="text-xl font-bold leading-tight text-forest">{oficioInfo(w.oficio).servicio}</p>
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra-soft text-terra" aria-hidden="true">
                    <Repeat className="h-5 w-5" />
                  </span>
                  <div className="text-right">
                    <p className="text-xs text-muted">Busca</p>
                    <p className="text-xl font-bold leading-tight text-terra">{oficioInfo(w.trueque.busca).servicio}</p>
                  </div>
                </div>
                <p className="text-sm text-muted">
                  <Link to={`/vecino/${w.id}`} className="underline-offset-2 hover:underline">{w.nombre}</Link> · {w.barrio}
                </p>
                <a href={waLink(w, msg)} target="_blank" rel="noreferrer" className="btn-forest w-full">
                  Proponer trueque
                </a>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="card p-6 text-center">
          <p className="text-base font-semibold">Todavía no hay trueques con ese oficio.</p>
          <p className="mt-1 text-sm text-muted">Probá con otro, o ofrecé el tuyo desde tu perfil.</p>
        </div>
      )}
    </div>
  )
}
