import type { TrdTree } from '../domain/trd'
import part1 from './trd-01.json'
import part2 from './trd-02.json'
import part3 from './trd-03.json'
import part4 from './trd-04.json'

export const trdTree: TrdTree = {
  entity: 'ELECTROINGENIERÍA S.A.S.',
  offices: [...part1, ...part2, ...part3, ...part4],
}
