import { ShowIfElement } from './ShowIf'

interface IsFalseAndProps extends ShowIfElement {
  condition: Exclude<ShowIfElement['condition'], undefined>
}

const IsFalseAnd = ({ children }: IsFalseAndProps) => {
  const {} = 'IS_FALSE_AND'
  return children
}

export default IsFalseAnd
