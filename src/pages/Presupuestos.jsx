import { useState } from 'react'
import { Plus, Trash2, Printer, MessageCircle, FileText } from 'lucide-react'
import { useApp } from '../context/AppContext'

const money = (n) => '$' + Math.round(n).toLocaleString('es-AR')
const VACIO = { desc: '', cant: 1, precio: '' }

export default function Presupuestos() {
  const { presus, addPresu, removePresu, usuario } = useApp()
  const [cliente, setCliente] = useState('')
  const [items, setItems] = useState([{ ...VACIO }])
  const total = items.reduce((s, i) => s + (Number(i.cant) || 0) * (Number(i.precio) || 0), 0)
  const upd = (n, k, v) => setItems(items.map((it, i) => (i === n ? { ...it, [k]: v } : it)))
  const guardar = () => {
    if (!cliente.trim() || !total) return
    addPresu({ cliente: cliente.trim(), items, total, autor: usuario.nombre })
    setCliente('')
    setItems([{ ...VACIO }])
  }
  const texto = (p) => `Presupuesto para ${p.cliente}\n` + p.items.map((i) => `• ${i.desc} x${i.cant}: ${money(i.cant * i.precio)}`).join('\n') + `\nTOTAL: ${money(p.total)}`
  return (
    <div className="space-y-6 pt-5 md:pt-8">
      <header className="print:hidden">
        <h1 className="h1">Presupuestos</h1>
        <p className="mt-1 text-muted">Armá un presupuesto claro y mandalo por WhatsApp o imprimilo.</p>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card h-fit space-y-4 p-5 print:hidden">
          <label className="block"><span className="label">Cliente</span><input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nombre del vecino" className="field" /></label>
          {items.map((it, n) => (
            <div key={n} className="grid grid-cols-[1fr_1fr_44px] items-end sm:grid-cols-[1fr_64px_96px_44px] gap-2">
              <input aria-label="Detalle" value={it.desc} onChange={(e) => upd(n, 'desc', e.target.value)} placeholder="Detalle" className="field col-span-3 px-3 sm:col-span-1" />
              <input aria-label="Cantidad" type="number" min="1" value={it.cant} onChange={(e) => upd(n, 'cant', e.target.value)} className="field px-2" />
              <input aria-label="Precio" type="number" min="0" value={it.precio} onChange={(e) => upd(n, 'precio', e.target.value)} placeholder="$" className="field px-2" />
              <button aria-label="Quitar renglón" onClick={() => setItems(items.filter((_, i) => i !== n))} disabled={items.length === 1} className="flex h-[52px] items-center justify-center text-terra disabled:opacity-30"><Trash2 className="h-5 w-5" /></button>
            </div>
          ))}
          <button onClick={() => setItems([...items, { ...VACIO }])} className="chip"><Plus className="h-4 w-4" aria-hidden="true" />Agregar renglón</button>
          <p className="flex items-center justify-between border-t border-line pt-4 text-xl font-bold">Total <span className="text-forest">{money(total)}</span></p>
          <button onClick={guardar} className="btn-forest w-full">Guardar presupuesto</button>
        </section>
        <section className="space-y-3">
          <h2 className="h2 flex items-center gap-2 print:hidden"><FileText className="h-6 w-6 text-terra" aria-hidden="true" />Guardados</h2>
          {!presus.length && <div className="card p-8 text-center text-muted print:hidden">Acá van a aparecer tus presupuestos.</div>}
          {presus.map((p) => (
            <article key={p.id} className="card space-y-2 p-4">
              <div className="flex items-baseline justify-between"><h3 className="font-bold">{p.cliente}</h3><span className="text-sm text-muted">{p.fecha.split('-').reverse().join('/')}</span></div>
              <ul className="text-sm text-muted">{p.items.map((i, n) => <li key={n} className="flex justify-between"><span>{i.desc || 'Trabajo'} ×{i.cant}</span><span>{money(i.cant * i.precio)}</span></li>)}</ul>
              <p className="flex justify-between text-lg font-bold">Total <span className="text-forest">{money(p.total)}</span></p>
              <div className="flex flex-wrap gap-2 print:hidden">
                <a href={`https://wa.me/?text=${encodeURIComponent(texto(p))}`} target="_blank" rel="noreferrer" className="chip"><MessageCircle className="h-4 w-4" aria-hidden="true" />WhatsApp</a>
                <button onClick={() => window.print()} className="chip"><Printer className="h-4 w-4" aria-hidden="true" />Imprimir</button>
                <button onClick={() => removePresu(p.id)} className="chip text-terra"><Trash2 className="h-4 w-4" aria-hidden="true" />Borrar</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  )
}
