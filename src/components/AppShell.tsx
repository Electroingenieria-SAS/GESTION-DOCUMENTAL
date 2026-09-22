import { Bell, Command, Menu, Search, X } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { navigation, type AppView } from '../app/navigation'

interface Props {
  activeView: AppView
  onNavigate: (view: AppView) => void
  children: ReactNode
}

export function AppShell({ activeView, onNavigate, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const current = useMemo(() => navigation.find((item) => item.id === activeView), [activeView])

  const navigate = (id: AppView) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  return <div className="app-shell">
    <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
      <div className="brand">
        <div className="brand-mark">EI</div>
        <div><strong>Gestión Documental</strong><span>Sistema Maestro TRD</span></div>
        <button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú"><X size={20}/></button>
      </div>
      <nav className="side-nav">
        <span className="nav-eyebrow">ESPACIO DE TRABAJO</span>
        {navigation.map(({ id, label, icon: Icon }) =>
          <button key={id} className={activeView === id ? 'nav-item active' : 'nav-item'} onClick={() => navigate(id)}>
            <Icon size={18}/><span>{label}</span>{id === 'new' && <span className="nav-dot"/>}
          </button>
        )}
      </nav>
      <div className="sidebar-foot">
        <div className="system-badge"><span className="status-pulse"/><div><strong>Demo local</strong><span>Lista para Supabase</span></div></div>
        <small>Electroingeniería S.A.S. · v0.1</small>
      </div>
    </aside>

    {mobileOpen && <div className="mobile-backdrop" onClick={() => setMobileOpen(false)}/>}

    <main className="main-area">
      <header className="topbar">
        <div className="topbar-left">
          <button className="mobile-menu icon-button" onClick={() => setMobileOpen(true)} aria-label="Abrir menú"><Menu size={21}/></button>
          <div><span className="breadcrumb">Repositorio /</span><strong>{current?.label}</strong></div>
        </div>
        <div className="global-search"><Search size={17}/><input placeholder="Buscar expediente, serie o documento…"/><kbd><Command size={12}/> K</kbd></div>
        <div className="topbar-actions"><button className="icon-button"><Bell size={19}/><span className="notification-dot"/></button><div className="avatar">EI</div></div>
      </header>

      <section className="content-area">{children}</section>

      <nav className="mobile-bottom-nav">
        {navigation.slice(0,5).map(({ id, label, icon: Icon }) =>
          <button key={id} className={activeView === id ? 'active' : ''} onClick={() => navigate(id)}>
            <Icon size={20}/><span>{label === 'Nuevo expediente' ? 'Nuevo' : label}</span>
          </button>
        )}
      </nav>
    </main>
  </div>
}
