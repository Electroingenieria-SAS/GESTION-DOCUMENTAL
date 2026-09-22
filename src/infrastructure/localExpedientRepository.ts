import type { Expedient } from '../domain/expedient'
import type { ExpedientRepository } from './expedientRepository'

const STORAGE_KEY = 'ei-trd-expedients-v1'

export class LocalExpedientRepository implements ExpedientRepository {
  async list(): Promise<Expedient[]> {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    try { return JSON.parse(raw) as Expedient[] } catch { return [] }
  }
  async create(expedient: Expedient): Promise<void> {
    const current = await this.list()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([expedient, ...current]))
  }
  async clear(): Promise<void> { localStorage.removeItem(STORAGE_KEY) }
}
