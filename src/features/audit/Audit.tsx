import { CheckCircle2, FileSpreadsheet, GitBranch, ShieldCheck } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'

const rows=[
 ['TRD maestra','385 registros normalizados','Excel suministrado','Fuente maestra'],
 ['Árbol de clasificación','18 oficinas / 39 series / 56 subseries','TRD estructurada','Implementado'],
 ['Nuevo expediente','Validación de fechas, folios, combinación y duplicado','Reglas Excel migradas','Implementado'],
 ['Inventario','Vista derivada desde expedientes','BASE MAESTRA / INVENTARIO','Implementado'],
 ['Supabase','Esquema, RLS, perfiles y auditoría','Arquitectura nueva','Base preparada'],
 ['CI/CD','Build automático y GitHub Pages','GitHub Actions','Implementado'],
]

export function Audit(){
  return <>
    <PageHeader eyebrow="TRAZABILIDAD" title="Auditoría de migración" description="Qué se tomó del Sistema Maestro TRD y cómo se transformó a componentes de software mantenibles."/>
    <div className="audit-grid">
      <section className="panel data-panel reveal-up"><div className="audit-table">
        {rows.map(([item,change,source,status])=><div className="audit-row" key={item}>
          <div className="audit-icon"><CheckCircle2 size={18}/></div>
          <div><strong>{item}</strong><span>{change}</span></div>
          <div><small>Fuente</small><span>{source}</span></div>
          <b>{status}</b>
        </div>)}
      </div></section>
      <aside className="panel audit-aside reveal-up delay-1">
        <div className="audit-feature"><FileSpreadsheet/><div><strong>Excel como especificación</strong><p>Las fórmulas dejan de gobernar la solución y se traducen a reglas testeables.</p></div></div>
        <div className="audit-feature"><GitBranch/><div><strong>Capas desacopladas</strong><p>Dominio, infraestructura y UI pueden evolucionar sin mezclarse.</p></div></div>
        <div className="audit-feature"><ShieldCheck/><div><strong>Seguridad por diseño</strong><p>RLS y auditoría se definen desde la base, no como parche posterior.</p></div></div>
      </aside>
    </div>
  </>
}
