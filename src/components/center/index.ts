import Block, { Props } from '../../types/block'
import centerTmpl from './center.tmpl'
import './center.less'

interface IProps {
  children: Block
}

export default class Center extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(centerTmpl, this.props)
  }
}
