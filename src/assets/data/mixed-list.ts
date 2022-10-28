import bollards from '@/assets/data/bollards-list'
import poles from '@/assets/data/poles-list'

import type { AnswerList } from '@/assets/types/list-types'

const mixed: AnswerList = [
  ...bollards,
  ...poles
]

export default mixed
