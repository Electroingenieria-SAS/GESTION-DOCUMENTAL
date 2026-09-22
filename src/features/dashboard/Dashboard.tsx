import { Archive, FileCheck2, FolderTree, Layers3, Plus, ScanSearch, ShieldCheck, TimerReset } from 'lucide-react'
import type { Expedient } from '../../domain/expedient'
import type { TrdTree } from '../../domain/trd'
import { KpiCard } from '../../components/KpiCard'
import { PageHeader } from '../../components/PageHeader'

export function Dashboard({ tree, expedients, onNew, onTree }: { tree: TrdTree; expedients: Expedient[]; onNew: () => void; onTree: () => void }) {
  const series = tree.offices.reduce((acc,o)=>acc+o.series.length,0)
  const subseries = tree.offices.reduce((acc,o)=>acc+o.series.reduce((a,s)=>a+s.subseries.length,0),0)
  const types = tree.offices.reduce((acc,o)=>acc+o.series.reduce((a,s)=>a+s.subseries.reduce((b,ss)=>b+ss.documentTypes.length,0),0),0)

  return <>
    <PageHeader eyebrow="CENTRO DE CONTROL" title="Repositorio documental" description="Vista unificada para clasificar, controlar y consultar expedientes conforme a la TRD maestra." actions={<button className="primary-button" onClick={onNew}><Plus size={17}/> Nuevo expediente</button>}/>

    <div className="kpi-grid stagger-grid">
      <KpiCard label="Oficinas productoras" value={tree.offices.length} hint="TRD normalizadas" icon={Layers3}/>
      <KpiCard label="Series documentales" value={series} hint={`${subseries} subseries`} icon={FolderTree} tone="teal"/>
      <KpiCard label="Tipos documentales" value={types} hint="Árbol listo para captura" icon={FileCheck2} tone="violet"/>
      <KpiCard label="Expedientes demo" value={expedients.length} hint="Fuente única de verdad" icon={Archive} tone="amber"/>
    </div>

    <div className="dashboard-grid">
      <section className="panel repository-panel reveal-up delay-1">
        <div className="panel-heading"><div><span className="eyebrow">ESTRUCTURA TRD</span><h2>Mapa documental</h2></div><button className="text-button" onClick={onTree}>Explorar árbol</button></div>
        <div className="repo-path"><span>Electroingeniería S.A.S.</span><b>›</b><span>18 oficinas</span><b>›</b><span>{series} series</span><b>›</b><span>{types} tipos</span></div>
        <div className="office-list">
          {tree.offices.slice(0,6).map((office,index)=><div className="office-row" key={office.name}>
            <div className="office-index">{String(index+1).padStart(2,'0')}</div>
            <div className="office-main"><strong>{office.name}</strong><span>{office.series.length} series · {office.series.reduce((a,s)=>a+s.subseries.length,0)} subseries</span></div>
            <div className="progress-rail"><span style={{width:`${Math.min(100,35+office.series.length*9)}%`}}/></div>
          </div>)}
        </div>
      </section>

      <aside className="panel lifecycle-panel reveal-up delay-2">
        <div className="panel-heading"><div><span className="eyebrow">CICLO DE VIDA</span><h2>Control documental</h2></div></div>
        <div className="lifecycle">
          {[['Captura','Metadatos TRD',ScanSearch],['Gestión','Archivo activo',FileCheck2],['Transferencia','Paso a central',TimerReset],['Disposición','CT / selección',ShieldCheck]].map(([title,desc,Icon],i)=>
            <div className="life-step" key={String(title)}>
              <div className="life-marker"><span>{i+1}</span>{i<3&&<i/>}</div>
              <div><strong>{String(title)}</strong><span>{String(desc)}</span></div>
              <Icon size={18}/>
            </div>)}
        </div>
        <div className="info-callout"><ShieldCheck size={18}/><p>La demo valida la combinación TRD antes de registrar un expediente. Las políticas RLS quedan preparadas para la conexión con Supabase.</p></div>
      </aside>
    </div>
  </>
}
