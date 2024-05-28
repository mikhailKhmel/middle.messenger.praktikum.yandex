import Block from '../../types/block'
import './input.less'
import inputTmpl from './input.tmpl'
import Handlebars from 'handlebars'

interface IProps {
  id: string
  name: string
  type: string
  required?: boolean
  placeholder?: string
}

export default class Input extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    const template = Handlebars.compile(inputTmpl)
    return template(this.props)
  }
}
