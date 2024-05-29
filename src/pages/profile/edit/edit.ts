import ButtonLink from '../../../components/button-link'
import Input from '../../../components/input'
import Block from '../../../types/block'
import { render } from '../../../utils/renderDOM'
import './edit.less'
import editTmpl from './edit.tmpl'

interface IProps {
  inputAvatar: Block
  inputEmail: Block
  inputLogin: Block
  inputFirstname: Block
  inputSecondname: Block
  inputDisplayname: Block
  inputPhone: Block
  saveButton: Block
}

class Edit extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(editTmpl, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const inputAvatar = new Input({ id: 'avatar', name: 'avatar', type: 'file' })
  const inputEmail = new Input({ id: 'email', name: 'email', type: 'email' })
  const inputLogin = new Input({ id: 'login', name: 'login', type: 'text' })
  const inputFirstname = new Input({ id: 'first_name', name: 'first_name', type: 'text' })
  const inputSecondname = new Input({ id: 'second_name', name: 'second_name', type: 'text' })
  const inputDisplayname = new Input({ id: 'display_name', name: 'display_name', type: 'text' })
  const inputPhone = new Input({ id: 'phone', name: 'phone', type: 'phone' })
  const saveButton = new ButtonLink({ label: 'Сохранить', href: '/pages/profile/' })
  const edit = new Edit({
    inputAvatar,
    inputEmail,
    inputLogin,
    inputFirstname,
    inputSecondname,
    inputDisplayname,
    inputPhone,
    saveButton,
  })
  render('#root', edit)
})
