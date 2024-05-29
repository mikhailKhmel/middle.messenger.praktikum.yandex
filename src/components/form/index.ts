import Block, { Props } from '../../types/block'
import formTmpl from './form.tmpl'
import './form.less'

interface IProps extends Props {
  children: Block
}

export default class Form extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(formTmpl, this.props)
  }
}
