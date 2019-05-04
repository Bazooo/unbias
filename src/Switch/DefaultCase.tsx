import { SwitchElementProps } from './Switch'
import { Omit } from 'type-zoo/types'

type SwitchDefaultCaseProps = Omit<SwitchElementProps, 'equals'>

const DefaultCase = ({ children }: SwitchDefaultCaseProps) => children

DefaultCase.switchElementType = 'DEFAULT_CASE'

export default DefaultCase
