import type { TrdTree, TrdSeries, TrdSubseries } from '../domain/trd'

export class TrdService {
  constructor(private readonly tree: TrdTree) {}
  get offices() { return this.tree.offices }

  getSeries(office: string): TrdSeries[] {
    return this.tree.offices.find((item) => item.name === office)?.series ?? []
  }

  getSubseries(office: string, series: string): TrdSubseries[] {
    return this.getSeries(office).find((item) => item.name === series)?.subseries ?? []
  }

  getDocumentTypes(office: string, series: string, subseries: string): string[] {
    return this.getSubseries(office, series).find((item) => item.name === subseries)?.documentTypes ?? []
  }

  getRetention(office: string, series: string, subseries: string) {
    const child = this.getSubseries(office, series).find((item) => item.name === subseries)
    const parent = this.getSeries(office).find((item) => item.name === series)
    return {
      management: child?.managementRetention ?? parent?.managementRetention ?? '—',
      central: child?.centralRetention ?? parent?.centralRetention ?? '—',
      disposition: child?.finalDisposition ?? parent?.finalDisposition ?? '—',
      support: child?.support ?? parent?.support ?? '—',
      observations: child?.observations ?? parent?.observations ?? '',
    }
  }

  isValidCombination(office: string, series: string, subseries: string, documentType: string) {
    return this.getDocumentTypes(office, series, subseries).includes(documentType)
  }
}
