import ButtonLink from '../../../components/button-link'
import Input from '../../../components/input'
import Block from '../../../types/block'
import { render } from '../../../utils/renderDOM'
import './password.less'
import passwordTmpl from './password.tmpl'

interface IProps {
  oldPassword: Block
  newPassword1: Block
  newPassword2: Block
  saveButton: Block
}

class Password extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(passwordTmpl, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const oldPassword = new Input({ id: 'oldPassword', name: 'oldPassword', type: 'password' })
  const newPassword1 = new Input({ id: 'newPassword1', name: 'newPassword1', type: 'password' })
  const newPassword2 = new Input({ id: 'newPassword2', name: 'newPassword2', type: 'password' })
  const saveButton = new ButtonLink({ label: 'Сохранить', href: '/pages/profile/' })
  const password = new Password({ oldPassword, newPassword1, newPassword2, saveButton })

  render('#root', password)
})
