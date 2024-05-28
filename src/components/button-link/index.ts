import Block from '../../types/block'
import './button-link.less'
import buttonLinkTmpl from './button-link.tmpl'

interface IProps {
  href: string
  label: string
}

export default class ButtonLink extends Block {
  constructor(props?: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(buttonLinkTmpl, this.props)
  }
}
