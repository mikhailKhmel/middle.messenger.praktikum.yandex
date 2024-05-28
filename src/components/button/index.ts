import './button.less'
import buttonTmpl from './button.tmpl'
import Block, { Props } from '../../types/block'

interface IProps {
  label: string
}

export default class Button extends Block {
  constructor(props: IProps) {
    super('button', props)
  }

  render(): string {
    return this.compile(buttonTmpl, this.props)
  }
}
