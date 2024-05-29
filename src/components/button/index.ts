import './button.less'
import buttonTmpl from './button.tmpl'
import Block, { Props } from '../../types/block'

interface IProps extends Props {
  label: string
}

export default class Button extends Block {
  constructor(props?: IProps) {
    super('button', props)
  }

  render(): DocumentFragment {
    return this.compile(buttonTmpl, this.props)
  }
}