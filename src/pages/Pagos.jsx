import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleCheck, Receipt, ShieldCheck, Repeat } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { PAGOS } from '../data/seed'
import { PAGO_ICONS, tituloDe } from '../components/ui'

const ars = (n) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
const fecha = (iso) =>
  new Date(iso).toLocaleString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

function Comprobante({ pago, onNuevo }) {
  return (
    <section className="card space-y-4 p-5" aria-live="polite">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mint text-call">
          <CircleCheck className="h-7 w-7" aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-xl font-bold leading-tight">Pago registrado</h2>
          <p className="text-sm text-muted">Operación N.º {pago.operacion}</p>
        </div>
      </div>
      <p className="text-3xl font-bold text-forest">{ars(pago.monto)}</p>
      <dl className="divide-y divide-line text-base">
        <div className="flex justify-between gap-4 py-2"><dt className="text-muted">Para</dt><dd className="text-right font-medium">{pago.nombre}</dd></div>
        <div className="flex justify-between gap-4 py-2"><dt className="text-muted">Servicio</dt><dd className="text-right font-medium">{pago.servicio}</dd></div>
        <div className="flex justify-between gap-4 py-2"><dt className="text-muted">Medio</dt><dd className="text-right font-medium">{pago.metodo}</dd></div>
        <div className="flex justify-between gap-4 py-2"><dt className="text-muted">Fecha</dt><dd className="text-right font-medium">{fecha(pago.fecha)}</dd></div>
        {pago.concepto && (
          <div className="flex justify-between gap-4 py-2"><dt className="text-muted">Detalle</dt><dd className="text-right font-medium">{pago.concepto}</dd></div>
        )}
      </dl>
      <div className="grid gap-3 sm:grid-cols-2">
        <button className="btn-forest" onClick={onNuevo}>Hacer otro pago</button>
        <Link to={`/vecino/${pago.workerId}`} className="btn-outline-forest">Dejar mi opinión</Link>
      </div>
    </section>
  )
}

export default function Pagos() {
  const { workers, pagos, addPago } = useApp()
  const lista = useMemo(() => [...workers].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es')), [workers])
  const [f, setF] = useState({ workerId: '', monto: '', concepto: '', metodo: '' })
  const [errors, setErrors] = useState({})
  const [ultimo, setUltimo] = useState(null)

  const w = workers.find((x) => x.id === f.workerId)
  const metodos = w ? w.pagos : PAGOS
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))
  const elegirVecino = (e) => setF((s) => ({ ...s, workerId: e.target.value, metodo: '' }))

  const total = pagos.reduce((s, p) => s + p.monto, 0)

  const pagar = (ev) => {
    ev.preventDefault()
    const err = {}
    const monto = Number(String(f.monto).replace(/\./g, '').replace(',', '.'))
    if (!w) err.workerId = 'Elegí a quién le pagás.'
    if (!monto || monto <= 0) err.monto = 'Escribí el monto a pagar.'
    if (!f.metodo) err.metodo = 'Elegí cómo vas a pagar.'
    setErrors(err)
    if (Object.keys(err).length) return
    const pago = addPago({
      workerId: w.id, nombre: w.nombre, servicio: tituloDe(w), monto, metodo: f.metodo, concepto: f.concepto.trim(),
    })
    setUltimo(pago)
    setF({ workerId: '', monto: '', concepto: '', metodo: '' })
  }

  const Err = ({ k }) => (errors[k] ? <p role="alert" className="mt-1 text-sm font-medium text-terra">{errors[k]}</p> : null)

  return (
    <div className="space-y-6 pt-6 md:pt-10">
      <header className="space-y-1">
        <h1 className="h1">Pagos de servicios</h1>
        <p className="max-w-2xl text-base text-muted">Pagale al vecino que te hizo el trabajo y guardá el comprobante.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start">
        <div className="space-y-6">
          {ultimo ? (
            <Comprobante pago={ultimo} onNuevo={() => setUltimo(null)} />
          ) : (
            <form onSubmit={pagar} noValidate className="card space-y-4 p-5">
              <div>
                <label htmlFor="p-vecino" className="label">¿A quién le pagás?</label>
                <select id="p-vecino" className="field" value={f.workerId} onChange={elegirVecino}>
                  <option value="">Elegí un vecino</option>
                  {lista.map((x) => (
                    <option key={x.id} value={x.id}>{x.nombre} · {tituloDe(x)} ({x.barrio})</option>
                  ))}
                </select>
                <Err k="workerId" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="p-monto" className="label">Monto</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-semibold text-muted">$</span>
                    <input id="p-monto" inputMode="numeric" className="field pl-8" placeholder="Ej: 25000" value={f.monto} onChange={set('monto')} />
                  </div>
                  <Err k="monto" />
                </div>
                <div>
                  <label htmlFor="p-concepto" className="label">Detalle (opcional)</label>
                  <input id="p-concepto" className="field" placeholder="Ej: Arreglo de la pérdida" value={f.concepto} onChange={set('concepto')} />
                </div>
              </div>

              <fieldset>
                <legend className="label">Medio de pago</legend>
                <div className="flex flex-wrap gap-2">
                  {metodos.map((m) => {
                    const Icon = PAGO_ICONS[m]
                    return (
                      <button key={m} type="button" className="chip" aria-pressed={f.metodo === m} onClick={() => setF((s) => ({ ...s, metodo: m }))}>
                        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />} {m}
                      </button>
                    )
                  })}
                </div>
                {w && <p className="mt-2 text-sm text-muted">{w.nombre.split(' ')[0]} acepta: {w.pagos.join(', ').toLowerCase()}.</p>}
                <Err k="metodo" />
              </fieldset>

              <button type="submit" className="btn-forest w-full text-lg">Pagar {f.monto && Number(f.monto) > 0 ? ars(Number(String(f.monto).replace(/\./g, '').replace(',', '.'))) : ''}</button>
              <p className="flex items-start gap-2 text-sm text-muted">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" aria-hidden="true" />
                Es un prototipo: no se mueve dinero real. El comprobante queda guardado en este navegador.
              </p>
            </form>
          )}

          <Link to="/trueque" className="card flex items-center gap-3 p-4 transition hover:border-terra">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-terra-soft text-terra" aria-hidden="true">
              <Repeat className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-base font-semibold">¿Preferís pagar con tu trabajo?</span>
              <span className="block text-sm text-muted">Mirá los vecinos que aceptan trueque.</span>
            </span>
          </Link>
        </div>

        <section className="space-y-3" aria-labelledby="hist">
          <div className="flex items-baseline justify-between gap-3">
            <h2 id="hist" className="h2">Mis pagos</h2>
            {pagos.length > 0 && <p className="text-sm text-muted">Total: <span className="font-semibold text-ink">{ars(total)}</span></p>}
          </div>
          {pagos.length === 0 ? (
            <div className="card space-y-2 p-6 text-center">
              <Receipt className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
              <p className="text-base font-semibold">Todavía no hiciste pagos</p>
              <p className="text-sm text-muted">Cuando pagues un trabajo, el comprobante aparece acá.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {pagos.map((p) => {
                const Icon = PAGO_ICONS[p.metodo] || Receipt
                return (
                  <li key={p.id} className="card flex items-center gap-3 p-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint text-forest" aria-hidden="true">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-semibold leading-tight">{p.nombre}</p>
                      <p className="truncate text-sm text-muted">{p.servicio} · {fecha(p.fecha)}</p>
                    </div>
                    <p className="shrink-0 text-base font-bold text-forest">{ars(p.monto)}</p>
                  </li>
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
