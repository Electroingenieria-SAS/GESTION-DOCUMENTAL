import type { Expedient } from '../../domain/expedient'
import type { ExpedientRepository } from '../expedientRepository'
import { supabase } from './client'

export class SupabaseExpedientRepository implements ExpedientRepository {
  async list(): Promise<Expedient[]> {
    if (!supabase) return []
    const { data, error } = await supabase.from('expedients').select('*').order('created_at', { ascending: false })
    if (error) throw error
    return (data ?? []).map((row: Record<string, any>) => ({
      id: row.id, entity: row.entity, office: row.office, process: row.process,
      series: row.series, subseries: row.subseries, documentType: row.document_type,
      description: row.description, initialDate: row.initial_date ?? '', finalDate: row.final_date ?? '',
      folioFrom: row.folio_from, folioTo: row.folio_to, folioCount: row.folio_count,
      box: row.box ?? '', folder: row.folder ?? '', stage: row.archive_stage,
      stageCode: row.archive_stage_code, trdKey: row.trd_key, status: row.status, createdAt: row.created_at,
    })) as Expedient[]
  }

  async create(expedient: Expedient): Promise<void> {
    if (!supabase) throw new Error('Supabase no está configurado.')
    const { error } = await supabase.from('expedients').insert({
      id: expedient.id, entity: expedient.entity, office: expedient.office, process: expedient.process,
      series: expedient.series, subseries: expedient.subseries, document_type: expedient.documentType,
      description: expedient.description, initial_date: expedient.initialDate || null,
      final_date: expedient.finalDate || null, folio_from: expedient.folioFrom, folio_to: expedient.folioTo,
      box: expedient.box || null, folder: expedient.folder || null, archive_stage: expedient.stage,
      archive_stage_code: expedient.stageCode, trd_key: expedient.trdKey, status: expedient.status,
    })
    if (error) throw error
  }

  async clear(): Promise<void> {
    throw new Error('La eliminación masiva no está habilitada para Supabase.')
  }
}
