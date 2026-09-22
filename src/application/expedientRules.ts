import { archiveStageCode } from '../domain/trd'
import type { Expedient, ExpedientDraft } from '../domain/expedient'
import type { TrdService } from './trdService'

export interface ValidationResult { valid: boolean; messages: string[] }

export function validateExpedient(draft: ExpedientDraft, trd: TrdService, existing: Expedient[]): ValidationResult {
  const messages: string[] = []
  if (!draft.office) messages.push('Seleccione la oficina productora.')
  if (!draft.series) messages.push('Seleccione la serie documental.')
  if (!draft.subseries) messages.push('Seleccione la subserie.')
  if (!draft.documentType) messages.push('Seleccione el tipo documental.')
  if (!draft.description.trim()) messages.push('La descripción del expediente es obligatoria.')

  if (draft.office && draft.series && draft.subseries && draft.documentType &&
      !trd.isValidCombination(draft.office, draft.series, draft.subseries, draft.documentType)) {
    messages.push('La combinación Oficina → Serie → Subserie → Tipo documental no existe en la TRD.')
  }
  if (draft.initialDate && draft.finalDate && draft.finalDate < draft.initialDate) {
    messages.push('La fecha final no puede ser anterior a la fecha inicial.')
  }
  if (draft.folioFrom !== null && draft.folioTo !== null && draft.folioTo < draft.folioFrom) {
    messages.push('El folio final no puede ser menor al folio inicial.')
  }

  const duplicated = existing.some((item) =>
    item.office === draft.office && item.series === draft.series && item.subseries === draft.subseries &&
    item.description.trim().toLocaleLowerCase() === draft.description.trim().toLocaleLowerCase() &&
    item.initialDate === draft.initialDate && item.finalDate === draft.finalDate
  )
  if (duplicated) messages.push('Existe un expediente potencialmente duplicado con los mismos datos principales.')
  return { valid: messages.length === 0, messages }
}

export function materializeExpedient(draft: ExpedientDraft): Expedient {
  const folioCount = draft.folioFrom !== null && draft.folioTo !== null ? draft.folioTo - draft.folioFrom + 1 : null
  return {
    ...draft,
    id: crypto.randomUUID(),
    folioCount,
    stageCode: archiveStageCode[draft.stage],
    trdKey: [draft.office, draft.series, draft.subseries, draft.documentType].join('|'),
    status: 'Activo',
    createdAt: new Date().toISOString(),
  }
}
