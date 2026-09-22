import { Archive, BarChart3, Boxes, FilePlus2, FolderTree, History, Settings2 } from 'lucide-react'

export type AppView = 'dashboard' | 'new' | 'inventory' | 'tree' | 'retention' | 'audit' | 'settings'

export const navigation = [
  { id: 'dashboard' as const, label: 'Resumen', icon: BarChart3 },
  { id: 'new' as const, label: 'Nuevo expediente', icon: FilePlus2 },
  { id: 'inventory' as const, label: 'Inventario', icon: Archive },
  { id: 'tree' as const, label: 'Árbol TRD', icon: FolderTree },
  { id: 'retention' as const, label: 'Retención', icon: Boxes },
  { id: 'audit' as const, label: 'Auditoría', icon: History },
  { id: 'settings' as const, label: 'Configuración', icon: Settings2 },
]
