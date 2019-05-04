import { SwitchElementProps, SwitchPrimitive } from './Switch'

interface SwitchCaseProps extends SwitchElementProps {
  equals: SwitchPrimitive
}

const Case = ({ children }: SwitchCaseProps) => children

Case.switchElementType = 'CASE'

export default Case
