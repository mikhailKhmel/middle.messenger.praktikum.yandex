import Button from '../../../components/button'
import FormInput from '../../../components/forminput'
import Input from '../../../components/input'
import Block from '../../../types/block'
import { render } from '../../../utils/renderDOM'
import { validateEmail, validateLogin, validateName, validatePhone } from '../../../utils/validation'
import './edit.less'
import editTmpl from './edit.tmpl'

interface IProps {
  inputAvatar: Block
  inputEmail: Block
  inputLogin: Block
  inputFirstname: Block
  inputLastname: Block
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

let email: string
let login: string
let firstname: string
let lastname: string
let displayname: string
let phone: string

document.addEventListener('DOMContentLoaded', () => {
  const inputAvatar = new Input({ id: 'avatar', name: 'avatar', type: 'file' })
  const inputEmail = new Input({
    id: 'email',
    name: 'email',
    type: 'email',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateEmail(value)
        inputEmailForm.setProps({ error: isValidate ? '' : 'Email невалиден' })
        if (isValidate) {
          email = value
        }
      },
    },
  })
  const inputLogin = new Input({
    id: 'login',
    name: 'login',
    type: 'text',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateLogin(value)
        inputLoginForm.setProps({ error: isValidate ? '' : 'Логин невалиден' })
        if (isValidate) {
          login = value
        }
      },
    },
  })
  const inputFirstname = new Input({
    id: 'first_name',
    name: 'first_name',
    type: 'text',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateName(value)
        inputFirstnameForm.setProps({ error: isValidate ? '' : 'Имя невалидно' })
        if (isValidate) {
          firstname = value
        }
      },
    },
  })
  const inputLastname = new Input({
    id: 'last_name',
    name: 'last_name',
    type: 'text',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateName(value)
        inputLastnameForm.setProps({ error: isValidate ? '' : 'Имя невалидно' })
        if (isValidate) {
          lastname = value
        }
      },
    },
  })
  const inputDisplayname = new Input({
    id: 'display_name',
    name: 'display_name',
    type: 'text',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        displayname = value
      },
    },
  })
  const inputPhone = new Input({
    id: 'phone',
    name: 'phone',
    type: 'phone',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validatePhone(value)
        inputPhoneForm.setProps({ error: isValidate ? '' : 'Номер телефона невалиден' })
        if (isValidate) {
          phone = value
        }
      },
    },
  })

  const inputEmailForm = new FormInput({ input: inputEmail })
  const inputLoginForm = new FormInput({ input: inputLogin })
  const inputFirstnameForm = new FormInput({ input: inputFirstname })
  const inputLastnameForm = new FormInput({ input: inputLastname })
  const inputDisplaynameForm = new FormInput({ input: inputDisplayname })
  const inputPhoneForm = new FormInput({ input: inputPhone })
  const saveButton = new Button({
    label: 'Сохранить',
    events: {
      click: (event: any) => {
        event?.preventDefault()
        const emailValidate = validateEmail(email)
        const loginValidate = validateLogin(login)
        const firstnameValidate = validateName(firstname)
        const lastnameValidate = validateLogin(lastname)
        const phoneValidate = validateLogin(phone)
        if (emailValidate && loginValidate && firstnameValidate && lastnameValidate && phoneValidate) {
          console.log({ email, login, firstname, lastname, displayname, phone })
        }
      },
    },
  })
  const edit = new Edit({
    inputAvatar,
    inputEmail: inputEmailForm,
    inputLogin: inputLoginForm,
    inputFirstname: inputFirstnameForm,
    inputLastname: inputLastnameForm,
    inputDisplayname: inputDisplaynameForm,
    inputPhone: inputPhoneForm,
    saveButton,
  })
  render('#root', edit)
})
