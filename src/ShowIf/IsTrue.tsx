import { ShowIfElementProps } from './ShowIf'
import { Omit } from 'type-zoo/types'

type ShowIfIsTrueProps = Omit<ShowIfElementProps, 'condition'>

const IsTrue = ({ children }: ShowIfIsTrueProps) => children

IsTrue.showElementType = 'IS_TRUE'

export default IsTrue
