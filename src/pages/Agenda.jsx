import { useState } from 'react'
import { CalendarDays, Clock, Download, Trash2, Check, CheckCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { Avatar, tituloDe } from '../components/ui'

const HORAS = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00']
const ESTADO = { pendiente: 'bg-terra-soft text-terra', confirmado: 'bg-mint text-forest', hecho: 'bg-line text-muted' }
const hoy = () => new Date().toISOString().slice(0, 10)

function ics(t, w) {
  const d = t.fecha.replace(/-/g, '') + 'T' + t.hora.replace(':', '') + '00'
  const txt = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `DTSTART:${d}`, `SUMMARY:${tituloDe(w)} - ${w.nombre}`, `DESCRIPTION:${t.nota || ''}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([txt], { type: 'text/calendar' }))
  a.download = 'turno.ics'
  a.click()
}

export default function Agenda() {
  const { workers, turnos, addTurno, setTurnoEstado, removeTurno } = useApp()
  const [f, setF] = useState({ workerId: '', fecha: hoy(), hora: '09:00', nota: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const lista = [...turnos].sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
  const enviar = (e) => {
    e.preventDefault()
    if (!f.workerId) return
    addTurno(f)
    setF({ ...f, nota: '' })
  }
  return (
    <div className="space-y-6 pt-5 md:pt-8">
      <header>
        <h1 className="h1">Agenda de turnos</h1>
        <p className="mt-1 text-muted">Reservá un día y horario con tu vecino y llevalo a tu calendario.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <form onSubmit={enviar} className="card h-fit space-y-4 p-5">
          <h2 className="h2 flex items-center gap-2"><CalendarDays className="h-6 w-6 text-terra" aria-hidden="true" /> Nuevo turno</h2>
          <label className="block"><span className="label">Vecino</span>
            <select required value={f.workerId} onChange={set('workerId')} className="field">
              <option value="">Elegí a quién contratar</option>
              {workers.map((w) => <option key={w.id} value={w.id}>{w.nombre} · {tituloDe(w)}</option>)}
            </select></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="label">Día</span><input type="date" min={hoy()} required value={f.fecha} onChange={set('fecha')} className="field" /></label>
            <label className="block"><span className="label">Hora</span>
              <select value={f.hora} onChange={set('hora')} className="field">{HORAS.map((h) => <option key={h}>{h}</option>)}</select></label>
          </div>
          <label className="block"><span className="label">¿Qué necesitás?</span><textarea rows={3} value={f.nota} onChange={set('nota')} placeholder="Ej: pérdida en la cocina" className="field py-3" /></label>
          <button className="btn-forest w-full">Reservar turno</button>
        </form>
        <section className="space-y-3" aria-live="polite">
          {!lista.length && <div className="card p-8 text-center text-muted">Todavía no tenés turnos. Reservá el primero desde el formulario.</div>}
          {lista.map((t) => {
            const w = workers.find((x) => x.id === t.workerId)
            if (!w) return null
            return (
              <article key={t.id} className="card space-y-3 p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={w.nombre} />
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-bold">{w.nombre}</h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted"><Clock className="h-4 w-4" aria-hidden="true" />{t.fecha.split('-').reverse().join('/')} · {t.hora} h</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${ESTADO[t.estado]}`}>{t.estado}</span>
                </div>
                {t.nota && <p className="text-sm text-muted">{t.nota}</p>}
                <div className="flex flex-wrap gap-2">
                  {t.estado === 'pendiente' && <button onClick={() => setTurnoEstado(t.id, 'confirmado')} className="chip"><Check className="h-4 w-4" aria-hidden="true" />Confirmar</button>}
                  {t.estado !== 'hecho' && <button onClick={() => setTurnoEstado(t.id, 'hecho')} className="chip"><CheckCheck className="h-4 w-4" aria-hidden="true" />Marcar hecho</button>}
                  <button onClick={() => ics(t, w)} className="chip"><Download className="h-4 w-4" aria-hidden="true" />Calendario</button>
                  <button onClick={() => removeTurno(t.id)} className="chip text-terra"><Trash2 className="h-4 w-4" aria-hidden="true" />Cancelar</button>
                </div>
              </article>
            )
          })}
        </section>
      </div>
    </div>
  )
}
