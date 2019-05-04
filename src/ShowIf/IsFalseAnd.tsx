import { ShowIfElementProps } from './ShowIf'

interface IsFalseAndProps extends ShowIfElementProps {
  condition: Exclude<ShowIfElementProps['condition'], undefined>
}

const IsFalseAnd = ({ children }: IsFalseAndProps) => children

IsFalseAnd.showElementType = 'IS_FALSE_AND'

export default IsFalseAnd
