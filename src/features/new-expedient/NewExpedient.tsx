import { Check, ChevronRight, FileText, FolderOpen, Info, Layers3, Save, ShieldCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Expedient, ExpedientDraft } from '../../domain/expedient'
import type { ArchiveStage } from '../../domain/trd'
import { PageHeader } from '../../components/PageHeader'
import { TrdService } from '../../application/trdService'
import { materializeExpedient, validateExpedient } from '../../application/expedientRules'

const EMPTY: ExpedientDraft = { entity:'ELECTROINGENIERÍA S.A.S.',office:'',process:'',series:'',subseries:'',documentType:'',description:'',initialDate:'',finalDate:'',folioFrom:null,folioTo:null,box:'',folder:'',stage:'Gestión' }

export function NewExpedient({ trd, existing, onCreate }: {trd:TrdService,existing:Expedient[],onCreate:(e:Expedient)=>Promise<void>}) {
  const [draft,setDraft] = useState<ExpedientDraft>(EMPTY)
  const [messages,setMessages] = useState<string[]>([])
  const [saved,setSaved] = useState(false)
  const series = useMemo(()=>trd.getSeries(draft.office),[trd,draft.office])
  const subseries = useMemo(()=>trd.getSubseries(draft.office,draft.series),[trd,draft.office,draft.series])
  const docTypes = useMemo(()=>trd.getDocumentTypes(draft.office,draft.series,draft.subseries),[trd,draft.office,draft.series,draft.subseries])
  const retention = useMemo(()=>draft.subseries ? trd.getRetention(draft.office,draft.series,draft.subseries):null,[trd,draft.office,draft.series,draft.subseries])

  const patch = <K extends keyof ExpedientDraft>(key:K,value:ExpedientDraft[K]) => setDraft(prev=>({...prev,[key]:value}))
  const changeOffice=(v:string)=>setDraft(prev=>({...prev,office:v,process:v,series:'',subseries:'',documentType:''}))
  const changeSeries=(v:string)=>setDraft(prev=>({...prev,series:v,subseries:'',documentType:''}))
  const changeSubseries=(v:string)=>setDraft(prev=>({...prev,subseries:v,documentType:''}))

  const save = async () => {
    const result=validateExpedient(draft,trd,existing)
    setMessages(result.messages)
    if(!result.valid) return
    await onCreate(materializeExpedient(draft))
    setDraft(EMPTY); setSaved(true); setTimeout(()=>setSaved(false),2600)
  }

  return <>
    <PageHeader eyebrow="CAPTURA CONTROLADA" title="Nuevo expediente" description="Registre una sola vez. La clasificación y las reglas de retención se heredan directamente del árbol TRD."/>
    <div className="capture-layout">
      <section className="panel capture-card reveal-up">
        <div className="stepper"><div className="step active"><span>1</span><b>Clasificación</b></div><i/><div className="step active"><span>2</span><b>Expediente</b></div><i/><div className="step"><span>3</span><b>Archivo</b></div></div>

        <div className="form-section"><div className="section-title"><Layers3 size={18}/><div><h2>Clasificación documental</h2><p>Selección dependiente según la TRD maestra.</p></div></div>
          <div className="form-grid cols-2">
            <label>Oficina productora<select value={draft.office} onChange={e=>changeOffice(e.target.value)}><option value="">Seleccione una oficina…</option>{trd.offices.map(o=><option key={o.name}>{o.name}</option>)}</select></label>
            <label>Proceso<input value={draft.process} onChange={e=>patch('process',e.target.value)} placeholder="Se autocompleta con la oficina"/></label>
            <label>Serie<select value={draft.series} disabled={!draft.office} onChange={e=>changeSeries(e.target.value)}><option value="">Seleccione una serie…</option>{series.map(s=><option key={s.name}>{s.name}</option>)}</select></label>
            <label>Subserie<select value={draft.subseries} disabled={!draft.series} onChange={e=>changeSubseries(e.target.value)}><option value="">Seleccione una subserie…</option>{subseries.map(s=><option key={s.name}>{s.name}</option>)}</select></label>
            <label className="span-2">Tipo documental<select value={draft.documentType} disabled={!draft.subseries} onChange={e=>patch('documentType',e.target.value)}><option value="">Seleccione un tipo documental…</option>{docTypes.map(t=><option key={t}>{t}</option>)}</select></label>
          </div>
        </div>

        <div className="form-section"><div className="section-title"><FileText size={18}/><div><h2>Datos del expediente</h2><p>Metadatos de identificación, fechas y foliación.</p></div></div>
          <div className="form-grid cols-2">
            <label className="span-2">Nombre / descripción del expediente<textarea value={draft.description} onChange={e=>patch('description',e.target.value)} rows={3} placeholder="Ej. Investigación de accidente de trabajo — sede principal"/></label>
            <label>Fecha inicial<input type="date" value={draft.initialDate} onChange={e=>patch('initialDate',e.target.value)}/></label>
            <label>Fecha final<input type="date" value={draft.finalDate} onChange={e=>patch('finalDate',e.target.value)}/></label>
            <label>Folio desde<input type="number" min="1" value={draft.folioFrom ?? ''} onChange={e=>patch('folioFrom',e.target.value?Number(e.target.value):null)}/></label>
            <label>Folio hasta<input type="number" min="1" value={draft.folioTo ?? ''} onChange={e=>patch('folioTo',e.target.value?Number(e.target.value):null)}/></label>
          </div>
        </div>

        <div className="form-section"><div className="section-title"><FolderOpen size={18}/><div><h2>Ubicación archivística</h2><p>Fase y referencia física del expediente.</p></div></div>
          <div className="form-grid cols-3"><label>Archivo / fase<select value={draft.stage} onChange={e=>patch('stage',e.target.value as ArchiveStage)}><option>Gestión</option><option>Central</option><option>Histórico</option></select></label><label>Caja<input value={draft.box} onChange={e=>patch('box',e.target.value)} placeholder="Ej. CJ-014"/></label><label>Carpeta<input value={draft.folder} onChange={e=>patch('folder',e.target.value)} placeholder="Ej. CP-03"/></label></div>
        </div>

        {messages.length>0 && <div className="validation-box"><Info size={18}/><div><strong>Revise antes de guardar</strong>{messages.map(m=><span key={m}>{m}</span>)}</div></div>}
        <div className="form-actions"><button className="secondary-button" onClick={()=>{setDraft(EMPTY);setMessages([])}}>Limpiar</button><button className="primary-button" onClick={save}><Save size={17}/> Guardar expediente</button></div>
        {saved && <div className="toast-success"><Check size={18}/> Expediente registrado correctamente.</div>}
      </section>

      <aside className="capture-aside">
        <div className="panel metadata-card reveal-up delay-1"><span className="eyebrow">METADATOS TRD</span><h3>Contexto de clasificación</h3>
          <div className="metadata-path">{[draft.office,draft.series,draft.subseries,draft.documentType].map((v,i)=><div key={i} className={v?'filled':''}><span>{i+1}</span><p>{v||['Oficina','Serie','Subserie','Tipo documental'][i]}</p>{i<3&&<ChevronRight size={14}/>}</div>)}</div>
          {retention ? <div className="retention-mini"><div><span>Gestión</span><strong>{retention.management}</strong></div><div><span>Central</span><strong>{retention.central}</strong></div><div><span>Disposición</span><strong>{retention.disposition}</strong></div></div> : <p className="muted-text">Seleccione una subserie para consultar sus tiempos de retención.</p>}
        </div>
        <div className="panel secure-note reveal-up delay-2"><ShieldCheck size={20}/><div><strong>Validación de integridad</strong><p>La aplicación comprueba fechas, foliación, duplicados y la combinación completa de la TRD antes de persistir.</p></div></div>
      </aside>
    </div>
  </>
}
