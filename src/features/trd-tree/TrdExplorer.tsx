import { ChevronDown, ChevronRight, File, Folder, FolderOpen, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { TrdTree } from '../../domain/trd'
import { PageHeader } from '../../components/PageHeader'

export function TrdExplorer({ tree }: {tree:TrdTree}) {
  const [office,setOffice]=useState(tree.offices[0]?.name??'')
  const [series,setSeries]=useState(tree.offices[0]?.series[0]?.name??'')
  const [subseries,setSubseries]=useState(tree.offices[0]?.series[0]?.subseries[0]?.name??'')
  const [q,setQ]=useState('')
  const currentOffice=tree.offices.find(o=>o.name===office)
  const currentSeries=currentOffice?.series.find(s=>s.name===series)
  const currentSub=currentSeries?.subseries.find(s=>s.name===subseries)
  const docs=useMemo(()=>currentSub?.documentTypes.filter(d=>d.toLowerCase().includes(q.toLowerCase()))??[],[currentSub,q])

  return <>
    <PageHeader eyebrow="FILE PLAN" title="Árbol de procesos y TRD" description="Navegación jerárquica Oficina → Serie → Subserie → Tipo documental derivada de 385 registros maestros."/>
    <section className="panel explorer-shell reveal-up">
      <div className="tree-pane">
        <div className="tree-title"><strong>Plan de clasificación</strong><span>{tree.offices.length} oficinas</span></div>
        <div className="tree-scroll">
          {tree.offices.map(o=><div className="tree-office" key={o.name}>
            <button className={office===o.name?'selected':''} onClick={()=>{setOffice(o.name);setSeries(o.series[0]?.name??'');setSubseries(o.series[0]?.subseries[0]?.name??'')}}>
              {office===o.name?<ChevronDown size={15}/>:<ChevronRight size={15}/>}<FolderOpen size={17}/><span>{o.name}</span>
            </button>
            {office===o.name&&<div className="tree-children">{o.series.map(s=><div key={s.name}>
              <button className={series===s.name?'selected':''} onClick={()=>{setSeries(s.name);setSubseries(s.subseries[0]?.name??'')}}><Folder size={16}/><span>{s.name}</span></button>
              {series===s.name&&<div className="tree-subchildren">{s.subseries.map(ss=><button className={subseries===ss.name?'selected':''} key={ss.name} onClick={()=>setSubseries(ss.name)}><File size={14}/><span>{ss.name}</span></button>)}</div>}
            </div>)}</div>}
          </div>)}
        </div>
      </div>

      <div className="detail-pane">
        <div className="detail-head">
          <div><span className="eyebrow">SUBSERIE SELECCIONADA</span><h2>{currentSub?.name||'Seleccione una subserie'}</h2><p>{currentSeries?.name} · {currentOffice?.name}</p></div>
          <div className="table-search compact"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Filtrar tipos…"/></div>
        </div>
        {currentSub&&<>
          <div className="retention-strip">
            <div><span>Archivo de gestión</span><strong>{currentSub.managementRetention||currentSeries?.managementRetention||'—'}</strong></div>
            <div><span>Archivo central</span><strong>{currentSub.centralRetention||currentSeries?.centralRetention||'—'}</strong></div>
            <div><span>Disposición final</span><strong>{currentSub.finalDisposition||currentSeries?.finalDisposition||'—'}</strong></div>
            <div><span>Soporte</span><strong>{currentSub.support||currentSeries?.support||'—'}</strong></div>
          </div>
          <div className="doc-type-list">
            <div className="list-head"><span>Tipos documentales</span><b>{docs.length}</b></div>
            {docs.map((doc,i)=><div className="doc-type-row" key={doc}><span>{String(i+1).padStart(2,'0')}</span><File size={17}/><strong>{doc}</strong><i>TRD válida</i></div>)}
          </div>
        </>}
      </div>
    </section>
  </>
}
