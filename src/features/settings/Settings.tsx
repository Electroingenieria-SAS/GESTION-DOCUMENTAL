import { Cloud, Github, KeyRound, LockKeyhole, Server, Smartphone, type LucideIcon } from 'lucide-react'
import { PageHeader } from '../../components/PageHeader'
import { isSupabaseConfigured } from '../../infrastructure/supabase/client'

export function Settings(){
  return <>
    <PageHeader eyebrow="ARQUITECTURA" title="Configuración de plataforma" description="Estado de la demo y bases preparadas para autenticación, RLS, MFA y despliegue."/>
    <div className="settings-grid">
      <Setting icon={Server} title="Persistencia" status={isSupabaseConfigured?'Supabase conectado':'Local demo'} text="Repositorio intercambiable mediante una interfaz de infraestructura."/>
      <Setting icon={LockKeyhole} title="Row Level Security" status="SQL preparado" text="Políticas por usuario, oficina y rol para expedientes y auditoría."/>
      <Setting icon={KeyRound} title="MFA" status="Base preparada" text="El flujo podrá exigir AAL2 para acciones sensibles cuando se conecte Supabase Auth."/>
      <Setting icon={Github} title="GitHub Actions" status="Activo en main" text="Build con Node 20 y despliegue automático de la SPA."/>
      <Setting icon={Cloud} title="Vercel" status="Compatible" text="Configuración de reescritura para navegación SPA y variables de entorno."/>
      <Setting icon={Smartphone} title="Responsive" status="Desktop + móvil" text="Sidebar adaptativa, navegación inferior y formularios reordenables."/>
    </div>
  </>
}

function Setting({icon:Icon,title,status,text}:{icon:LucideIcon;title:string;status:string;text:string}){
  return <article className="panel setting-card card-hover">
    <div className="setting-icon"><Icon size={20}/></div>
    <div><span className="eyebrow">{status}</span><h3>{title}</h3><p>{text}</p></div>
  </article>
}
