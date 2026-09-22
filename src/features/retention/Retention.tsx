import { Clock3, Database, FileArchive, ShieldCheck, type LucideIcon } from 'lucide-react'
import type { TrdTree } from '../../domain/trd'
import { PageHeader } from '../../components/PageHeader'

export function Retention({ tree }: {tree:TrdTree}) {
  const rows=tree.offices.flatMap(o=>o.series.flatMap(s=>s.subseries.map(ss=>({
    office:o.name,series:s.name,name:ss.name,
    management:ss.managementRetention||s.managementRetention||'—',
    central:ss.centralRetention||s.centralRetention||'—',
    final:ss.finalDisposition||s.finalDisposition||'—'
  })))).slice(0,30)

  return <>
    <PageHeader eyebrow="CICLO DE VIDA" title="Retención y disposición" description="Lectura de tiempos de permanencia y disposición final sin reinterpretar la TRD original."/>
    <div className="kpi-grid compact-kpis">
      <KpiCardSmall icon={Clock3} title="Gestión" text="Permanencia activa por serie/subserie"/>
      <KpiCardSmall icon={Database} title="Central" text="Transferencia y conservación intermedia"/>
      <KpiCardSmall icon={FileArchive} title="Disposición" text="CT, selección u otra regla definida"/>
      <KpiCardSmall icon={ShieldCheck} title="Trazabilidad" text="Reglas preparadas para auditoría"/>
    </div>
    <section className="panel data-panel reveal-up">
      <div className="table-wrap"><table>
        <thead><tr><th>Oficina</th><th>Serie</th><th>Subserie</th><th>Gestión</th><th>Central</th><th>Disposición</th></tr></thead>
        <tbody>{rows.map(r=><tr key={[r.office,r.series,r.name].join('|')}><td>{r.office}</td><td>{r.series}</td><td><strong>{r.name}</strong></td><td>{r.management}</td><td>{r.central}</td><td><span className="status-pill neutral">{r.final}</span></td></tr>)}</tbody>
      </table></div>
    </section>
  </>
}

function KpiCardSmall({icon:Icon,title,text}:{icon:LucideIcon;title:string;text:string}){
  return <div className="mini-kpi panel"><Icon size={20}/><div><strong>{title}</strong><span>{text}</span></div></div>
}
