import Block, { Props } from '../../types/block'
import { render } from '../../utils/renderDOM'
import './profile.less'
import profileTmpl from './profile.tmpl'

class Profile extends Block {
  constructor(props: Props) {
    super('div', props)
  }
  render(): DocumentFragment {
    return this.compile(profileTmpl, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const profile = new Profile({})
  render('#root', profile)
})
