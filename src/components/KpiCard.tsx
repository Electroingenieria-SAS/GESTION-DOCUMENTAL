import type { LucideIcon } from 'lucide-react'

export function KpiCard({ label, value, hint, icon: Icon, tone='blue' }: { label: string; value: string | number; hint: string; icon: LucideIcon; tone?: 'blue'|'teal'|'violet'|'amber' }) {
  return <article className={`kpi-card tone-${tone} card-hover`}>
    <div className="kpi-icon"><Icon size={20}/></div>
    <div className="kpi-meta"><span>{label}</span><strong>{value}</strong><small>{hint}</small></div>
  </article>
}
