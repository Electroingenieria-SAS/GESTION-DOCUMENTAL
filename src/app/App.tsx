import { useEffect, useMemo, useState } from 'react'
import type { AppView } from './navigation'
import { AppShell } from '../components/AppShell'
import { trdTree as tree } from '../data/trd-tree'
import type { Expedient } from '../domain/expedient'
import { TrdService } from '../application/trdService'
import { LocalExpedientRepository } from '../infrastructure/localExpedientRepository'
import { Dashboard } from '../features/dashboard/Dashboard'
import { NewExpedient } from '../features/new-expedient/NewExpedient'
import { Inventory } from '../features/inventory/Inventory'
import { TrdExplorer } from '../features/trd-tree/TrdExplorer'
import { Retention } from '../features/retention/Retention'
import { Audit } from '../features/audit/Audit'
import { Settings } from '../features/settings/Settings'

const trd = new TrdService(tree)
const repository = new LocalExpedientRepository()

export function App() {
  const [view, setView] = useState<AppView>('dashboard')
  const [expedients, setExpedients] = useState<Expedient[]>([])

  useEffect(() => { repository.list().then(setExpedients) }, [])

  const create = async (item: Expedient) => {
    await repository.create(item)
    setExpedients(await repository.list())
  }

  const screen = useMemo(() => {
    switch (view) {
      case 'new': return <NewExpedient trd={trd} existing={expedients} onCreate={create} />
      case 'inventory': return <Inventory items={expedients} />
      case 'tree': return <TrdExplorer tree={tree} />
      case 'retention': return <Retention tree={tree} />
      case 'audit': return <Audit />
      case 'settings': return <Settings />
      default: return <Dashboard tree={tree} expedients={expedients} onNew={() => setView('new')} onTree={() => setView('tree')} />
    }
  }, [view, expedients])

  return <AppShell activeView={view} onNavigate={setView}>{screen}</AppShell>
}
