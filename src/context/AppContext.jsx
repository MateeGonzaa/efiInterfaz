import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { BARRIOS, BARRIOS_ANTERIORES, SEED_PEDIDOS, SEED_WORKERS } from '../data/seed'

const Ctx = createContext(null)

const read = (key, fallback) => {
  try {
    const v = JSON.parse(localStorage.getItem(key))
    return v ?? fallback
  } catch {
    return fallback
  }
}
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* sin almacenamiento disponible */
  }
}

// Si el navegador guardó un barrio de una versión anterior, lo pasamos al nuevo
const migrarBarrio = (b) => {
  const nuevo = BARRIOS_ANTERIORES[b] || b
  return nuevo === '' || BARRIOS.includes(nuevo) ? nuevo : 'Banda Norte'
}

const USUARIO_INICIAL = { rol: 'empleado', nombre: '', telefono: '', barrio: '', workerId: null }

export function AppProvider({ children }) {
  const [custom, setCustom] = useState(() => read('ob_custom', []).map((w) => ({ ...w, barrio: migrarBarrio(w.barrio) })))
  const [extra, setExtra] = useState(() => read('ob_reviews', {}))
  const [barrio, setBarrio] = useState(() => migrarBarrio(read('ob_barrio', 'Banda Norte')))
  const [usuario, setUsuarioState] = useState(() => {
    const u = { ...USUARIO_INICIAL, ...read('ob_usuario', {}) }
    return { ...u, barrio: migrarBarrio(u.barrio) }
  })
  const [pedidosPropios, setPedidosPropios] = useState(() => read('ob_pedidos', []).map((p) => ({ ...p, barrio: migrarBarrio(p.barrio) })))
  const [pagos, setPagos] = useState(() => read('ob_pagos', []))

  useEffect(() => save('ob_custom', custom), [custom])
  useEffect(() => save('ob_reviews', extra), [extra])
  useEffect(() => save('ob_barrio', barrio), [barrio])
  useEffect(() => save('ob_usuario', usuario), [usuario])
  useEffect(() => save('ob_pedidos', pedidosPropios), [pedidosPropios])
  useEffect(() => save('ob_pagos', pagos), [pagos])

  const workers = useMemo(
    () =>
      [...SEED_WORKERS, ...custom].map((w) => {
        const reviews = [...(extra[w.id] || []), ...(w.reviews || [])]
        const votos = reviews.length
        const rating = votos ? reviews.reduce((s, x) => s + x.estrellas, 0) / votos : 0
        return { ...w, reviews, votos, rating }
      }),
    [custom, extra]
  )

  // Los pedidos propios van primero; los de ejemplo completan la lista
  const pedidos = useMemo(
    () => [...pedidosPropios.map((p) => ({ ...p, propio: true })), ...SEED_PEDIDOS],
    [pedidosPropios]
  )

  const setUsuario = useCallback((cambios) => setUsuarioState((u) => ({ ...u, ...cambios })), [])

  const addWorker = useCallback((w) => {
    const id = 'u' + Date.now()
    setCustom((c) => [...c, { ...w, id, reviews: [] }])
    return id
  }, [])

  const removeWorker = useCallback((id) => setCustom((c) => c.filter((w) => w.id !== id)), [])

  const addReview = useCallback((id, review) => {
    setExtra((e) => ({ ...e, [id]: [review, ...(e[id] || [])] }))
  }, [])

  const addPedido = useCallback((p) => {
    const id = 'ped' + Date.now()
    setPedidosPropios((l) => [{ ...p, id, fecha: new Date().toISOString().slice(0, 10) }, ...l])
    return id
  }, [])

  const removePedido = useCallback((id) => setPedidosPropios((l) => l.filter((p) => p.id !== id)), [])

  const addPago = useCallback((p) => {
    const id = 'pg' + Date.now()
    const pago = { ...p, id, fecha: new Date().toISOString(), operacion: String(Date.now()).slice(-8) }
    setPagos((l) => [pago, ...l])
    return pago
  }, [])

  const value = {
    workers, barrio, setBarrio, addWorker, removeWorker, addReview,
    usuario, setUsuario, pedidos, addPedido, removePedido, pagos, addPago,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export const useApp = () => useContext(Ctx)
