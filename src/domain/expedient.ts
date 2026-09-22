import type { ArchiveStage } from './trd'

export interface Expedient {
  id: string
  entity: string
  office: string
  process: string
  series: string
  subseries: string
  documentType: string
  description: string
  initialDate: string
  finalDate: string
  folioFrom: number | null
  folioTo: number | null
  folioCount: number | null
  box: string
  folder: string
  stage: ArchiveStage
  stageCode: string
  trdKey: string
  status: 'Activo' | 'Transferencia' | 'Cerrado'
  createdAt: string
}

export type ExpedientDraft = Omit<Expedient, 'id' | 'folioCount' | 'stageCode' | 'trdKey' | 'status' | 'createdAt'>
