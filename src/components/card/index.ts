import './card.less'
import Block from '../../types/block'
import cardtmpl from './card.tmpl'

interface IProps {
  title?: Block
  body?: Block
}

export default class Card extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(cardtmpl, this.props)
  }
}
