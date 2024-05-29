import './profile.less'
import Handlebars from 'handlebars'
import profileTmpl from './profile.tmpl'
import Block, { Props } from '../../types/block'

export default class Profile extends Block {
  constructor(props?: Props) {
    super('section', props)
  }

  render(): DocumentFragment {
    const template = Handlebars.compile(profileTmpl)
    return template(this.props)
  }
}
