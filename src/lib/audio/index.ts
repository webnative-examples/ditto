import type { NodeRepr_t } from '@elemaudio/core'

export type Channels = { left: NodeRepr_t | number; right: NodeRepr_t | number }

export type Limits = {
  [key: string]: { min: number; max: number }
}

type Param = {
  label: string
  min: number
  max: number
  unitLabel: string
}

export type Params = {
  delayTime: Param
  feedback: Param
  mix: Param
}