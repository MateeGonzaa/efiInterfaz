import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Briefcase, Hammer, MapPin, MessageCircle, Trash2, CircleCheck, Clock } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { BARRIOS, OFICIOS, URGENCIAS } from '../data/seed'
import { Avatar, OficioIcon, Rating, oficioInfo, tituloDe, waLink } from '../components/ui'

const urgenciaInfo = (id) => URGENCIAS.find((u) => u.id === id) || URGENCIAS[2]
const fechaCorta = (iso) => new Date(iso + 'T12:00:00').toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })

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

function PedidoCard({ p, children }) {
  const u = urgenciaInfo(p.urgencia)
  const msg = `Hola, te escribo desde Oficios Barriales por tu pedido "${p.titulo}". Soy del oficio y me gustaría ayudarte. ¿Seguís necesitándolo?`
  return (
    <article className="card space-y-3 p-4">
      <div className="flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mint text-forest">
          <OficioIcon id={p.oficio} />
        </span>
        <div className="min-w-0">
          <h3 className="text-[18px] font-bold leading-tight">{p.titulo}</h3>
          <p className="text-sm text-muted">{oficioInfo(p.oficio).singular} · {p.barrio} · {fechaCorta(p.fecha)}</p>
        </div>
      </div>
      <p className="text-base text-muted">{p.descripcion}</p>
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${p.urgencia === 'hoy' ? 'bg-terra-soft text-terra' : 'bg-cream text-ink'}`}>
          <Clock className="h-4 w-4" aria-hidden="true" /> {u.label}
        </span>
      </div>
      {children || (
        <a href={waLink({ telefono: p.telefono }, msg)} target="_blank" rel="noreferrer" className="btn-outline w-full">
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> Contactar a {p.contacto}
        </a>
      )}
    </article>
  )
}

/* ---------------- EMPLEADO ---------------- */
function Empleado() {
  const { workers, addWorker, removeWorker, usuario, setUsuario, barrio: barrioGuardado, pedidos } = useApp()
  const publicado = workers.find((w) => w.id === usuario.workerId)
  const [f, setF] = useState({
    nombre: usuario.nombre, oficio: '', barrio: usuario.barrio || barrioGuardado || '', telefono: usuario.telefono,
    trueque: true, busca: '', matriculado: false, descripcion: '',
  })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const publicar = (ev) => {
    ev.preventDefault()
    const e = {}
    if (f.nombre.trim().length < 3) e.nombre = 'Escribí tu nombre y apellido.'
    if (!f.oficio) e.oficio = 'Elegí tu oficio.'
    if (!f.barrio) e.barrio = 'Elegí tu barrio.'
    const tel = f.telefono.replace(/\D/g, '').replace(/^0+/, '')
    if (tel.length !== 10) e.telefono = 'Escribí tu número con código de área, por ejemplo 358 123 4567.'
    if (f.trueque && !f.busca) e.busca = 'Elegí qué oficio te gustaría recibir a cambio.'
    setErrors(e)
    if (Object.keys(e).length) return
    const id = addWorker({
      nombre: f.nombre.trim(), oficio: f.oficio, barrio: f.barrio, telefono: tel, matriculado: f.matriculado,
      trueque: f.trueque ? { busca: f.busca } : null,
      descripcion: f.descripcion.trim() || 'Vecino del barrio a disposición para trabajos de su oficio.',
      disponibilidad: 'Consultar por teléfono o WhatsApp', experiencia: null, pagos: ['Efectivo'],
    })
    setUsuario({ workerId: id, nombre: f.nombre.trim(), telefono: tel, barrio: f.barrio })
  }

  const despublicar = () => {
    removeWorker(publicado.id)
    setUsuario({ workerId: null })
  }

  const Err = ({ k }) => (errors[k] ? <p role="alert" className="mt-1 text-sm font-medium text-terra">{errors[k]}</p> : null)

  // Pedidos de su oficio (si ya publicó) y de su barrio
  const zona = publicado?.barrio || usuario.barrio || barrioGuardado
  const oportunidades = pedidos
    .filter((p) => !publicado || p.oficio === publicado.oficio)
    .filter((p) => !zona || p.barrio === zona)

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <section className="space-y-4">
        {publicado ? (
          <div className="card space-y-4 p-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-mint px-3 py-1.5 text-sm font-medium text-forest">
              <CircleCheck className="h-4 w-4" aria-hidden="true" /> Tu perfil está publicado
            </p>
            <div className="flex items-center gap-4">
              <Avatar name={publicado.nombre} size={64} />
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold leading-tight">{publicado.nombre}</h2>
                <p className="text-base text-muted">{tituloDe(publicado)} · {publicado.barrio}</p>
                <div className="mt-1"><Rating w={publicado} /></div>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link to={`/vecino/${publicado.id}`} className="btn-forest">Ver cómo me ven</Link>
              <button onClick={despublicar} className="btn-outline-forest">
                <Trash2 className="h-4 w-4" aria-hidden="true" /> Quitar mi perfil
              </button>
            </div>
          </div>
        ) : (
          <>
            <header className="space-y-1">
              <h2 className="h2">Ofrecé tu oficio</h2>
              <p className="text-base text-muted">Completá estos datos y los vecinos te van a encontrar.</p>
            </header>
            <form onSubmit={publicar} noValidate className="card space-y-4 p-5">
              <div>
                <label htmlFor="e-nombre" className="label">Nombre y apellido</label>
                <input id="e-nombre" className="field" placeholder="Ej: Carlos Rodríguez" value={f.nombre} onChange={set('nombre')} autoComplete="name" />
                <Err k="nombre" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="e-oficio" className="label">Oficio</label>
                  <select id="e-oficio" className="field" value={f.oficio} onChange={set('oficio')}>
                    <option value="">Ej: Gasista</option>
                    {OFICIOS.map((o) => <option key={o.id} value={o.id}>{o.singular}</option>)}
                  </select>
                  <Err k="oficio" />
                </div>
                <div>
                  <label htmlFor="e-barrio" className="label">Barrio</label>
                  <select id="e-barrio" className="field" value={f.barrio} onChange={set('barrio')}>
                    <option value="">Ej: Bimaco</option>
                    {BARRIOS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <Err k="barrio" />
                </div>
              </div>
              <div>
                <label htmlFor="e-tel" className="label">WhatsApp</label>
                <input id="e-tel" type="tel" inputMode="tel" className="field" placeholder="Ej: 358 123 4567" value={f.telefono} onChange={set('telefono')} autoComplete="tel" />
                <Err k="telefono" />
              </div>
              <div>
                <label htmlFor="e-desc" className="label">Contanos sobre tu trabajo (opcional)</label>
                <textarea id="e-desc" rows={3} className="field py-3" placeholder="Ej: Instalaciones y reparaciones de gas" value={f.descripcion} onChange={set('descripcion')} />
              </div>
              <Switch checked={f.trueque} onChange={(v) => setF((s) => ({ ...s, trueque: v }))} label="Acepto trueques de servicios" />
              {f.trueque && (
                <div>
                  <label htmlFor="e-busca" className="label">¿Qué oficio te gustaría recibir a cambio?</label>
                  <select id="e-busca" className="field" value={f.busca} onChange={set('busca')}>
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
              <p className="text-center text-sm text-muted">Es un prototipo: tu perfil se guarda en este navegador.</p>
            </form>
          </>
        )}
      </section>

      <section className="space-y-3" aria-labelledby="oport">
        <div>
          <h2 id="oport" className="h2">Trabajos que buscan {publicado ? oficioInfo(publicado.oficio).plural.toLowerCase() : 'vecinos'}</h2>
          <p className="flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" /> {zona || 'Todos los barrios'} · {oportunidades.length} {oportunidades.length === 1 ? 'pedido' : 'pedidos'}
          </p>
        </div>
        {oportunidades.length ? (
          oportunidades.map((p) => <PedidoCard key={p.id} p={p} />)
        ) : (
          <div className="card p-6 text-center">
            <p className="text-base font-semibold">No hay pedidos para tu oficio en este barrio.</p>
            <p className="mt-1 text-sm text-muted">Volvé pronto: los empleadores publican nuevos pedidos todos los días.</p>
          </div>
        )}
      </section>
    </div>
  )
}

/* ---------------- EMPLEADOR ---------------- */
function Empleador() {
  const { usuario, setUsuario, addPedido, removePedido, pedidos, barrio: barrioGuardado } = useApp()
  const propios = pedidos.filter((p) => p.propio)
  const [f, setF] = useState({
    contacto: usuario.nombre, telefono: usuario.telefono, barrio: usuario.barrio || barrioGuardado || '',
    oficio: '', titulo: '', descripcion: '', urgencia: 'semana',
  })
  const [errors, setErrors] = useState({})
  const set = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }))

  const publicar = (ev) => {
    ev.preventDefault()
    const e = {}
    if (f.contacto.trim().length < 3) e.contacto = 'Escribí tu nombre o el de tu negocio.'
    const tel = f.telefono.replace(/\D/g, '').replace(/^0+/, '')
    if (tel.length !== 10) e.telefono = 'Escribí tu número con código de área, por ejemplo 358 123 4567.'
    if (!f.oficio) e.oficio = 'Elegí qué oficio necesitás.'
    if (!f.barrio) e.barrio = 'Elegí el barrio del trabajo.'
    if (f.titulo.trim().length < 5) e.titulo = 'Contanos en pocas palabras qué necesitás.'
    setErrors(e)
    if (Object.keys(e).length) return
    addPedido({
      oficio: f.oficio, barrio: f.barrio, urgencia: f.urgencia, titulo: f.titulo.trim(),
      descripcion: f.descripcion.trim() || 'Escribime por WhatsApp para coordinar los detalles.',
      contacto: f.contacto.trim(), telefono: tel,
    })
    setUsuario({ nombre: f.contacto.trim(), telefono: tel, barrio: f.barrio })
    setF((s) => ({ ...s, oficio: '', titulo: '', descripcion: '', urgencia: 'semana' }))
  }

  const Err = ({ k }) => (errors[k] ? <p role="alert" className="mt-1 text-sm font-medium text-terra">{errors[k]}</p> : null)

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
      <section className="space-y-4">
        <header className="space-y-1">
          <h2 className="h2">Publicá un pedido de trabajo</h2>
          <p className="text-base text-muted">Los vecinos de ese oficio te van a escribir por WhatsApp.</p>
        </header>
        <form onSubmit={publicar} noValidate className="card space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="j-contacto" className="label">Tu nombre o negocio</label>
              <input id="j-contacto" className="field" placeholder="Ej: Panadería La Espiga" value={f.contacto} onChange={set('contacto')} autoComplete="name" />
              <Err k="contacto" />
            </div>
            <div>
              <label htmlFor="j-tel" className="label">WhatsApp</label>
              <input id="j-tel" type="tel" inputMode="tel" className="field" placeholder="Ej: 358 123 4567" value={f.telefono} onChange={set('telefono')} autoComplete="tel" />
              <Err k="telefono" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="j-oficio" className="label">¿Qué oficio necesitás?</label>
              <select id="j-oficio" className="field" value={f.oficio} onChange={set('oficio')}>
                <option value="">Ej: Plomero</option>
                {OFICIOS.map((o) => <option key={o.id} value={o.id}>{o.singular}</option>)}
              </select>
              <Err k="oficio" />
            </div>
            <div>
              <label htmlFor="j-barrio" className="label">Barrio del trabajo</label>
              <select id="j-barrio" className="field" value={f.barrio} onChange={set('barrio')}>
                <option value="">Ej: Macrocentro</option>
                {BARRIOS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
              <Err k="barrio" />
            </div>
          </div>
          <div>
            <label htmlFor="j-titulo" className="label">¿Qué necesitás?</label>
            <input id="j-titulo" className="field" placeholder="Ej: Cambiar la canilla de la cocina" value={f.titulo} onChange={set('titulo')} />
            <Err k="titulo" />
          </div>
          <div>
            <label htmlFor="j-desc" className="label">Más detalles (opcional)</label>
            <textarea id="j-desc" rows={3} className="field py-3" placeholder="Ej: Casa de dos plantas, puedo recibir por la tarde" value={f.descripcion} onChange={set('descripcion')} />
          </div>
          <div>
            <label htmlFor="j-urg" className="label">¿Para cuándo?</label>
            <select id="j-urg" className="field" value={f.urgencia} onChange={set('urgencia')}>
              {URGENCIAS.map((u) => <option key={u.id} value={u.id}>{u.label}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-forest w-full text-lg">Publicar pedido</button>
          <p className="text-center text-sm text-muted">Es un prototipo: tus pedidos se guardan en este navegador.</p>
        </form>
      </section>

      <section className="space-y-3" aria-labelledby="mis-pedidos">
        <h2 id="mis-pedidos" className="h2">Mis pedidos</h2>
        {propios.length === 0 ? (
          <div className="card space-y-3 p-6 text-center">
            <Briefcase className="mx-auto h-8 w-8 text-muted" aria-hidden="true" />
            <p className="text-base font-semibold">Todavía no publicaste pedidos</p>
            <p className="text-sm text-muted">¿Preferís buscar vos? Mirá el directorio de vecinos.</p>
            <Link to="/buscar" className="btn-outline-forest">Buscar oficios</Link>
          </div>
        ) : (
          propios.map((p) => (
            <PedidoCard key={p.id} p={p}>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to={`/buscar?oficio=${p.oficio}`} className="btn-forest">Ver {oficioInfo(p.oficio).plural.toLowerCase()}</Link>
                <button onClick={() => removePedido(p.id)} className="btn-outline-forest">
                  <Trash2 className="h-4 w-4" aria-hidden="true" /> Borrar pedido
                </button>
              </div>
            </PedidoCard>
          ))
        )}
      </section>
    </div>
  )
}

/* ---------------- PÁGINA ---------------- */
export default function MiPerfil() {
  const { usuario, setUsuario } = useApp()
  const rol = usuario.rol

  return (
    <div className="space-y-6 pt-6 md:pt-10">
      <header className="space-y-1">
        <h1 className="h1">Mi perfil</h1>
        <p className="max-w-2xl text-base text-muted">
          {rol === 'empleado'
            ? 'Ofrecé tu oficio y encontrá trabajos en tu barrio.'
            : 'Publicá lo que necesitás y contactá a vecinos de confianza.'}
        </p>
      </header>

      <div className="seg md:max-w-md" role="group" aria-label="Tipo de perfil">
        <button type="button" className="seg-btn" aria-pressed={rol === 'empleado'} onClick={() => setUsuario({ rol: 'empleado' })}>
          <Hammer className="h-5 w-5" aria-hidden="true" /> Soy empleado
        </button>
        <button type="button" className="seg-btn" aria-pressed={rol === 'empleador'} onClick={() => setUsuario({ rol: 'empleador' })}>
          <Briefcase className="h-5 w-5" aria-hidden="true" /> Soy empleador
        </button>
      </div>

      {rol === 'empleado' ? <Empleado key="empleado" /> : <Empleador key="empleador" />}
    </div>
  )
}
