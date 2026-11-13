import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { BARRIOS, OFICIOS } from '../data/seed'

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-[52px] w-full items-center gap-3 text-left text-base"
    >
      <span className={`relative h-8 w-14 shrink-0 rounded-full transition ${checked ? 'bg-terra' : 'bg-line'}`}>
        <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
      </span>
      {label}
    </button>
  )
}

export default function Sumate() {
  const { addWorker, barrio: barrioGuardado } = useApp()
  const navigate = useNavigate()
  const [f, setF] = useState({
    nombre: '', oficio: '', barrio: barrioGuardado || '', telefono: '',
    trueque: true, busca: '', matriculado: false, descripcion: '',
  })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const validar = () => {
    const e = {}
    if (f.nombre.trim().length < 3) e.nombre = 'Escribí tu nombre y apellido.'
    if (!f.oficio) e.oficio = 'Elegí tu oficio.'
    if (!f.barrio) e.barrio = 'Elegí tu barrio.'
    const tel = f.telefono.replace(/\D/g, '').replace(/^0+/, '')
    if (tel.length !== 10) e.telefono = 'Escribí tu número con código de área, por ejemplo 358 123 4567.'
    if (f.trueque && !f.busca) e.busca = 'Elegí qué oficio te gustaría recibir a cambio.'
    return { e, tel }
  }

  const publicar = (ev) => {
    ev.preventDefault()
    const { e, tel } = validar()
    setErrors(e)
    if (Object.keys(e).length) return
    const id = addWorker({
      nombre: f.nombre.trim(),
      oficio: f.oficio,
      barrio: f.barrio,
      telefono: tel,
      matriculado: f.matriculado,
      trueque: f.trueque ? { busca: f.busca } : null,
      descripcion: f.descripcion.trim() || 'Vecino del barrio a disposición para trabajos de su oficio.',
      disponibilidad: 'Consultar por teléfono o WhatsApp',
      experiencia: null,
      pagos: ['Efectivo'],
    })
    navigate(`/perfil/${id}`)
  }

  const Err = ({ k }) => (errors[k] ? <p role="alert" className="mt-1 text-sm font-medium text-terra">{errors[k]}</p> : null)

  return (
    <div className="mx-auto max-w-xl space-y-5 pt-6 md:pt-10">
      <header className="space-y-1">
        <h1 className="h1">Ofrecé tu oficio</h1>
        <p className="text-base text-muted">Completá estos datos y los vecinos te van a encontrar.</p>
      </header>

      <form onSubmit={publicar} noValidate className="space-y-4">
        <div>
          <label htmlFor="s-nombre" className="label">Nombre y apellido</label>
          <input id="s-nombre" className="field" placeholder="Ej: Carlos Rodríguez" value={f.nombre} onChange={set('nombre')} autoComplete="name" />
          <Err k="nombre" />
        </div>
        <div>
          <label htmlFor="s-oficio" className="label">Oficio</label>
          <select id="s-oficio" className="field" value={f.oficio} onChange={set('oficio')}>
            <option value="">Ej: Gasista</option>
            {OFICIOS.map((o) => <option key={o.id} value={o.id}>{o.singular}</option>)}
          </select>
          <Err k="oficio" />
        </div>
        <div>
          <label htmlFor="s-barrio" className="label">Barrio</label>
          <select id="s-barrio" className="field" value={f.barrio} onChange={set('barrio')}>
            <option value="">Ej: Banda Norte</option>
            {BARRIOS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <Err k="barrio" />
        </div>
        <div>
          <label htmlFor="s-tel" className="label">WhatsApp</label>
          <input id="s-tel" type="tel" inputMode="tel" className="field" placeholder="Ej: 358 123 4567" value={f.telefono} onChange={set('telefono')} autoComplete="tel" />
          <Err k="telefono" />
        </div>
        <div>
          <label htmlFor="s-desc" className="label">Contanos sobre tu trabajo (opcional)</label>
          <textarea id="s-desc" rows={3} className="field py-3" placeholder="Ej: Instalaciones y reparaciones de gas" value={f.descripcion} onChange={set('descripcion')} />
        </div>

        <Switch checked={f.trueque} onChange={(v) => setF((s) => ({ ...s, trueque: v }))} label="Acepto trueques de servicios" />
        {f.trueque && (
          <div>
            <label htmlFor="s-busca" className="label">¿Qué oficio te gustaría recibir a cambio?</label>
            <select id="s-busca" className="field" value={f.busca} onChange={set('busca')}>
              <option value="">Elegí un oficio</option>
              {OFICIOS.map((o) => <option key={o.id} value={o.id}>{o.servicio}</option>)}
            </select>
            <Err k="busca" />
          </div>
        )}

        <label className="flex min-h-[52px] cursor-pointer items-center gap-3 text-base">
          <input type="checkbox" className="h-6 w-6 accent-forest" checked={f.matriculado} onChange={(e) => setF((s) => ({ ...s, matriculado: e.target.checked }))} />
          Tengo la matrícula al día
        </label>

        <button type="submit" className="btn-forest w-full text-lg">Publicar mi perfil</button>
        <p className="text-center text-sm text-muted">Este es un prototipo: tu perfil se guarda en este navegador.</p>
      </form>
    </div>
  )
}
