import Block, { Props } from '../../types/block'
import './button-link.less'
import buttonLinkTmpl from './button-link.tmpl'

interface IProps extends Props {
  href: string
  label: string
}

export default class ButtonLink extends Block {
  constructor(props?: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(buttonLinkTmpl, this.props)
  }
}
