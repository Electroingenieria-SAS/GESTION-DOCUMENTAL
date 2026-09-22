import { Archive, Download, Filter, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Expedient } from '../../domain/expedient'
import { PageHeader } from '../../components/PageHeader'

export function Inventory({ items }: { items: Expedient[] }) {
  const [q,setQ]=useState('')
  const filtered=useMemo(()=>items.filter(i=>[i.description,i.office,i.series,i.subseries,i.documentType].join(' ').toLowerCase().includes(q.toLowerCase())),[items,q])

  return <>
    <PageHeader eyebrow="VISTA DERIVADA" title="Inventario documental" description="Vista operativa construida desde la misma fuente de expedientes; sin duplicar registros entre formatos." actions={<button className="secondary-button"><Download size={16}/> Exportar</button>}/>
    <section className="panel data-panel reveal-up">
      <div className="data-toolbar">
        <div className="table-search"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar en inventario…"/></div>
        <button className="chip-button"><Filter size={15}/> Filtros</button>
        <span className="record-count">{filtered.length} registros</span>
      </div>
      {filtered.length ? <div className="table-wrap"><table>
        <thead><tr><th>ID</th><th>Oficina</th><th>Clasificación</th><th>Expediente</th><th>Fechas</th><th>Ubicación</th><th>Estado</th></tr></thead>
        <tbody>{filtered.map(i=><tr key={i.id}>
          <td><code>{i.id.slice(0,8)}</code></td>
          <td>{i.office}</td>
          <td><strong>{i.series}</strong><span>{i.subseries}</span></td>
          <td><strong>{i.description}</strong><span>{i.documentType}</span></td>
          <td>{i.initialDate||'—'}<span>{i.finalDate||'—'}</span></td>
          <td>{i.stage}<span>{i.box||'Sin caja'} · {i.folder||'Sin carpeta'}</span></td>
          <td><span className="status-pill">{i.status}</span></td>
        </tr>)}</tbody>
      </table></div> : <div className="empty-state"><div className="empty-icon"><Archive size={28}/></div><h3>El inventario está listo</h3><p>Los expedientes creados en la demo aparecerán aquí automáticamente.</p></div>}
    </section>
  </>
}
