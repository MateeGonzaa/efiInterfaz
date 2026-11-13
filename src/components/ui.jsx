import { Link } from 'react-router-dom'
import {
  Flame, Zap, Droplets, Scissors, Hammer, PaintRoller, Leaf, HardHat, Wrench,
  Star, CircleCheck, Repeat, Phone, MessageCircle, Banknote, Landmark, Smartphone,
} from 'lucide-react'
import { OFICIOS } from '../data/seed'

/* ---------- utilidades ---------- */
const ICONS = { Flame, Zap, Droplets, Scissors, Hammer, PaintRoller, Leaf, HardHat }
export const PAGO_ICONS = { Efectivo: Banknote, Transferencia: Landmark, 'Mercado Pago': Smartphone }

export const oficioInfo = (id) =>
  OFICIOS.find((o) => o.id === id) || { id, plural: id, singular: id, servicio: id, icon: 'Wrench' }
export const tituloDe = (w) => w.titulo || oficioInfo(w.oficio).singular
export const fmtRating = (n) => n.toFixed(1).replace('.', ',')
export const formatPhone = (t) => `${t.slice(0, 3)} ${t.slice(3, 6)} ${t.slice(6)}`
export const callHref = (w) => `tel:+54${w.telefono}`
export const waLink = (w, msg) => `https://wa.me/549${w.telefono}?text=${encodeURIComponent(msg)}`
export const primerNombre = (w) => w.nombre.split(' ')[0]

export function OficioIcon({ id, className = 'h-5 w-5' }) {
  const Icon = ICONS[oficioInfo(id).icon] || Wrench
  return <Icon className={className} aria-hidden="true" />
}

/* ---------- logo ---------- */
// Pin de barrio con una tuerca adentro: "oficio" + "en tu barrio"
export function LogoMark({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="13" fill="#1F4D3A" />
      <path
        d="M24 42S11.5 31.4 11.5 21.5a12.5 12.5 0 0 1 25 0C36.5 31.4 24 42 24 42Z"
        fill="#F7F2E9"
      />
      <path d="M24 14.2l6.3 3.65v7.3L24 28.8l-6.3-3.65v-7.3z" fill="#C2552D" />
      <circle cx="24" cy="21.5" r="2.7" fill="#F7F2E9" />
      <path d="M8 43.5h32" stroke="#C2552D" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ size = 32, text = true }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5 rounded-lg" aria-label="Oficios Barriales, ir al inicio">
      <LogoMark size={size} />
      {text && (
        <span className="leading-none text-forest">
          <span className="block text-[17px] font-bold tracking-tight">Oficios</span>
          <span className="block text-[13px] font-medium text-muted">Barriales</span>
        </span>
      )}
    </Link>
  )
}

/* ---------- piezas ---------- */
export function Avatar({ name, size = 48 }) {
  const initials = name.split(' ').slice(0, 2).map((p) => p[0]).join('').toUpperCase()
  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.34 }}
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-mint font-semibold text-forest"
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export function Rating({ w }) {
  if (!w.votos) return <p className="text-sm text-muted">Todavía sin opiniones</p>
  return (
    <p className="flex items-center gap-1.5 text-sm text-muted">
      <Star className="h-4 w-4 fill-star text-star" aria-hidden="true" />
      <span className="font-semibold text-ink">{fmtRating(w.rating)}</span>
      <span>· {w.votos} {w.votos === 1 ? 'opinión' : 'opiniones'} de vecinos</span>
    </p>
  )
}

export function Stars({ value, size = 'h-5 w-5' }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={`${size} ${n <= value ? 'fill-star text-star' : 'text-line'}`} aria-hidden="true" />
      ))}
    </span>
  )
}

export function Badge({ type }) {
  const isMat = type === 'matricula'
  const Icon = isMat ? CircleCheck : Repeat
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ${
        isMat ? 'bg-mint text-forest' : 'bg-terra-soft text-terra'
      }`}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {isMat ? 'Matrícula al día' : 'Acepta trueque'}
    </span>
  )
}

export function ContactButtons({ w, large = false }) {
  const msg = `Hola ${primerNombre(w)}, te escribo desde Oficios Barriales. ¿Tenés disponibilidad para un trabajo?`
  if (large) {
    return (
      <div className="space-y-3">
        <a href={callHref(w)} className="btn-call w-full text-lg">
          <Phone className="h-5 w-5" aria-hidden="true" /> Llamar por teléfono
        </a>
        <a href={waLink(w, msg)} target="_blank" rel="noreferrer" className="btn-outline w-full text-lg">
          <MessageCircle className="h-5 w-5" aria-hidden="true" /> Escribir por WhatsApp
        </a>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-3">
      <a href={callHref(w)} className="btn-call" aria-label={`Llamar a ${w.nombre}`}>
        <Phone className="h-5 w-5" aria-hidden="true" /> Llamar
      </a>
      <a href={waLink(w, msg)} target="_blank" rel="noreferrer" className="btn-outline" aria-label={`Escribir a ${w.nombre} por WhatsApp`}>
        <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp
      </a>
    </div>
  )
}

export function WorkerCard({ w }) {
  return (
    <article className="card space-y-3 p-4">
      <Link to={`/vecino/${w.id}`} className="flex items-center gap-3 rounded-xl">
        <Avatar name={w.nombre} />
        <div className="min-w-0">
          <h3 className="truncate text-[18px] font-bold leading-tight">{w.nombre}</h3>
          <p className="text-sm text-muted">{tituloDe(w)} · {w.barrio}</p>
        </div>
      </Link>
      <Rating w={w} />
      {(w.matriculado || w.trueque) && (
        <div className="flex flex-wrap gap-2">
          {w.matriculado && <Badge type="matricula" />}
          {w.trueque && <Badge type="trueque" />}
        </div>
      )}
      <ContactButtons w={w} />
    </article>
  )
}
