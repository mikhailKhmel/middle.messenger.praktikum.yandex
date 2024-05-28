import Block from '../../../types/block'
import './card.less'
import cardTitleTmpl from './card-title.tmpl'

interface IProps {
  children: Block | string
}

export default class CardTitle extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(cardTitleTmpl, this.props)
  }
}
