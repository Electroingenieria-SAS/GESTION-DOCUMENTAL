import type { Expedient } from '../domain/expedient'

export interface ExpedientRepository {
  list(): Promise<Expedient[]>
  create(expedient: Expedient): Promise<void>
  clear(): Promise<void>
}
