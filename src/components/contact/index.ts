import './contact.less'
import contactTmpl from './contact.tmpl'
import Block from '../../types/block'

interface IProps {
  name: string
}

export default class Contact extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(contactTmpl, this.props)
  }
}
