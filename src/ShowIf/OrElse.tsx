import { ShowIfElementProps } from './ShowIf'
import { Omit } from 'type-zoo/types'

type ShowIfOrElseProps = Omit<ShowIfElementProps, 'condition'>

const OrElse = ({ children }: ShowIfOrElseProps) => children

OrElse.showElementType = 'OR_ELSE'

export default OrElse
