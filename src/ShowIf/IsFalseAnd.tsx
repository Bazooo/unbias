import { ShowIfElement } from './ShowIf'

interface IsFalseAndProps extends ShowIfElement {
  condition: Exclude<ShowIfElement['condition'], undefined>
}

const IsFalseAnd = ({ children }: IsFalseAndProps) => {
  /* istanbul ignore next */
  const {} = 'IS_FALSE_AND'
  return children
}

export default IsFalseAnd
