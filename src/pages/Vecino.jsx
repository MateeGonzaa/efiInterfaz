import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Star, ChevronLeft, Clock, Briefcase } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Avatar, Badge, ContactButtons, PAGO_ICONS, Rating, Stars, formatPhone, oficioInfo, tituloDe } from '../components/ui'

function FormOpinion({ onSubmit, onCancel }) {
  const [nombre, setNombre] = useState('')
  const [barrio, setBarrio] = useState('')
  const [estrellas, setEstrellas] = useState(0)
  const [texto, setTexto] = useState('')
  const [error, setError] = useState('')

  const enviar = (e) => {
    e.preventDefault()
    if (!nombre.trim()) return setError('Escribí tu nombre.')
    if (!estrellas) return setError('Elegí cuántas estrellas le das.')
    if (texto.trim().length < 5) return setError('Contanos brevemente cómo fue el trabajo.')
    onSubmit({ autor: nombre.trim(), barrio: barrio.trim(), estrellas, texto: texto.trim() })
  }

  return (
    <form onSubmit={enviar} className="card space-y-4 p-4" noValidate>
      <div>
        <label htmlFor="op-nombre" className="label">Tu nombre</label>
        <input id="op-nombre" className="field" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Marta" />
      </div>
      <div>
        <label htmlFor="op-barrio" className="label">Tu barrio (opcional)</label>
        <input id="op-barrio" className="field" value={barrio} onChange={(e) => setBarrio(e.target.value)} placeholder="Ej: Alberdi" />
      </div>
      <fieldset>
        <legend className="label">¿Cuántas estrellas le das?</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              type="button"
              key={n}
              onClick={() => setEstrellas(n)}
              aria-label={`${n} ${n === 1 ? 'estrella' : 'estrellas'}`}
              aria-pressed={estrellas === n}
              className="flex h-12 w-12 items-center justify-center rounded-xl"
            >
              <Star className={`h-8 w-8 ${n <= estrellas ? 'fill-star text-star' : 'text-line'}`} aria-hidden="true" />
            </button>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="op-texto" className="label">Tu opinión</label>
        <textarea
          id="op-texto"
          rows={3}
          className="field py-3"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Contale a otros vecinos cómo fue el trabajo"
        />
      </div>
      {error && <p role="alert" className="text-sm font-medium text-terra">{error}</p>}
      <div className="grid grid-cols-2 gap-3">
        <button type="button" onClick={onCancel} className="btn-outline-forest">Cancelar</button>
        <button type="submit" className="btn-forest">Publicar</button>
      </div>
    </form>
  )
}

export default function Vecino() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { workers, addReview } = useApp()
  const [abierto, setAbierto] = useState(false)
  const w = workers.find((x) => x.id === id)

  const volver = () => (window.history.length > 1 ? navigate(-1) : navigate('/buscar'))

  if (!w) {
    return (
      <div className="space-y-4 pt-16 text-center">
        <h1 className="h1">No encontramos este perfil</h1>
        <Link to="/buscar" className="btn-forest">Ir al directorio</Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 pt-5 md:pt-8">
      <button onClick={volver} className="inline-flex min-h-[44px] items-center gap-1 rounded-lg text-base font-medium text-ink">
        <ChevronLeft className="h-5 w-5" aria-hidden="true" /> Volver
      </button>

      <div className="space-y-6 md:grid md:grid-cols-[340px_minmax(0,1fr)] md:items-start md:gap-8 md:space-y-0">
        {/* Columna izquierda: quién es y cómo contactarlo (queda a la vista al scrollear) */}
        <aside className="space-y-4 md:sticky md:top-24">
          <header className="card space-y-4 p-5">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <Avatar name={w.nombre} size={72} />
              <div>
                <h1 className="text-2xl font-bold leading-tight">{w.nombre}</h1>
                <p className="text-base text-muted">{tituloDe(w)} · {w.barrio}</p>
                <div className="mt-1"><Rating w={w} /></div>
              </div>
            </div>
            {(w.matriculado || w.trueque) && (
              <div className="flex flex-wrap gap-2">
                {w.matriculado && <Badge type="matricula" />}
                {w.trueque && <Badge type="trueque" />}
              </div>
            )}
            <ContactButtons w={w} large />
            <p className="text-center text-sm text-muted">Teléfono: {formatPhone(w.telefono)}</p>
          </header>
          <Link to={`/pagos`} className="btn-outline-forest w-full">Pagar un trabajo</Link>
        </aside>

        <div className="space-y-6">
          <section className="card space-y-4 p-5">
            <div>
              <h2 className="text-base font-semibold">Sobre mi trabajo</h2>
              <p className="mt-1 text-base text-muted">{w.descripcion}</p>
            </div>
            <div className="grid gap-3 text-base sm:grid-cols-2">
              <p className="flex items-center gap-2"><Clock className="h-5 w-5 shrink-0 text-forest" aria-hidden="true" /> {w.disponibilidad}</p>
              {w.experiencia ? (
                <p className="flex items-center gap-2"><Briefcase className="h-5 w-5 shrink-0 text-forest" aria-hidden="true" /> {w.experiencia} años de experiencia</p>
              ) : null}
            </div>
            <div>
              <h3 className="label">Formas de pago</h3>
              <div className="flex flex-wrap gap-2">
                {w.pagos.map((p) => {
                  const Icon = PAGO_ICONS[p]
                  return (
                    <span key={p} className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-sm font-medium">
                      {Icon && <Icon className="h-4 w-4 text-forest" aria-hidden="true" />} {p}
                    </span>
                  )
                })}
              </div>
            </div>
            {w.trueque && (
              <p className="rounded-xl bg-terra-soft p-3 text-sm text-terra">
                <strong>Acepta trueque:</strong> cambia su trabajo por {oficioInfo(w.trueque.busca).servicio.toLowerCase()}.
              </p>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="h2">Opiniones de vecinos</h2>
            {w.reviews.length === 0 && <p className="text-base text-muted">Todavía nadie dejó su opinión. ¡Podés ser el primero!</p>}
            <div className="grid gap-3 lg:grid-cols-2">
              {w.reviews.map((r, i) => (
                <blockquote key={i} className="card space-y-2 p-4">
                  <Stars value={r.estrellas} />
                  <p className="text-base">“{r.texto}”</p>
                  <footer className="text-sm text-muted">{r.autor}{r.barrio ? ` · Barrio ${r.barrio}` : ''}</footer>
                </blockquote>
              ))}
            </div>

            {abierto ? (
              <FormOpinion
                onCancel={() => setAbierto(false)}
                onSubmit={(r) => {
                  addReview(w.id, r)
                  setAbierto(false)
                }}
              />
            ) : (
              <button className="btn-outline-forest w-full" onClick={() => setAbierto(true)}>Dejar mi opinión</button>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
