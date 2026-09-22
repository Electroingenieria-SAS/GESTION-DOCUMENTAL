export type ArchiveStage = 'Gestión' | 'Central' | 'Histórico'

export interface TrdSubseries {
  name: string
  classification: string | null
  support: string | null
  managementRetention: string | null
  centralRetention: string | null
  finalDisposition: string | null
  observations: string | null
  documentTypes: string[]
}

export interface TrdSeries {
  name: string
  classification: string | null
  support: string | null
  managementRetention: string | null
  centralRetention: string | null
  finalDisposition: string | null
  observations: string | null
  subseries: TrdSubseries[]
}

export interface TrdOffice { name: string; series: TrdSeries[] }
export interface TrdTree { entity: string; offices: TrdOffice[] }

export const archiveStageCode: Record<ArchiveStage, string> = {
  Gestión: '000',
  Central: '001',
  Histórico: '002',
}
