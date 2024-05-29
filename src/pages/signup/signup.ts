import './signup.less'
import Input from '../../components/input'
import Center from '../../components/center'
import { render } from '../../utils/renderDOM'
import Block from '../../types/block'
import signupTmpl from './signup.tmpl'
import { validateEmail, validateLogin, validateName, validatePassword, validatePhone } from '../../utils/validation'
import FormInput from '../../components/forminput'
import Button from '../../components/button'

interface IProps {
  inputEmail: Block
  inputLogin: Block
  inputFirstname: Block
  inputLastname: Block
  inputPhone: Block
  inputFirstPassword: Block
  inputSecondPassword: Block
  button: Block
}

class SignUp extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(signupTmpl, this.props)
  }
}

let email: string
let login: string
let firstname: string
let lastname: string
let phone: string
let firstpassword: string
let secondpassword: string

document.addEventListener('DOMContentLoaded', () => {
  const buttonLink = new Button({
    label: 'Зарегистрироваться',
    events: {
      click: (event: any) => {
        event.preventDefault()
        const isEmailValidate = validateLogin(email)
        if (!isEmailValidate) {
          emailFormInput.setProps({ error: 'Email невалиден' })
        }
        const isLoginValidate = validateLogin(login)
        if (!isLoginValidate) {
          loginFormInput.setProps({ error: 'Логин невалиден' })
        }
        const isFirstnameValidate = validateName(firstname)
        if (!isFirstnameValidate) {
          firstnameFormInput.setProps({ error: 'Имя невалидно' })
        }
        const isLastnameValidate = validateName(lastname)
        if (!isLastnameValidate) {
          lastnameFormInput.setProps({ error: 'Имя невалидно' })
        }
        const isPhoneValidate = validateLogin(phone)
        if (!isPhoneValidate) {
          phoneFormInput.setProps({ error: 'Номер невалиден' })
        }
        const isFirstPasswordValidate = validateName(firstpassword)
        if (!isFirstPasswordValidate) {
          firstPasswordFormInput.setProps({ error: 'Пароль невалиден' })
        }
        const isSecondPasswordValidate = validateName(secondpassword)
        if (!isSecondPasswordValidate) {
          secondPasswordFormInput.setProps({ error: 'Пароль невалиден' })
        }
        const isPasswordsEquel = firstpassword === secondpassword
        if (!isPasswordsEquel) {
          firstPasswordFormInput.setProps({ error: 'Пароли не совпадают' })
          secondPasswordFormInput.setProps({ error: 'Пароли не совпадают' })
        }

        if (
          isEmailValidate &&
          isLoginValidate &&
          isFirstnameValidate &&
          isLastnameValidate &&
          isPhoneValidate &&
          isFirstPasswordValidate &&
          isSecondPasswordValidate &&
          isPasswordsEquel
        ) {
          console.log({ email, login, firstname, lastname, phone, password: firstpassword })
        }
      },
    },
  })
  const inputEmail = new Input({
    id: 'email',
    type: 'text',
    name: 'email',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateEmail(value)
        emailFormInput.setProps({ error: isValidate ? '' : 'Email невалиден' })
        if (isValidate) {
          email = value
        }
      },
    },
  })
  const inputLogin = new Input({
    id: 'login',
    type: 'text',
    name: 'login',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateLogin(value)
        loginFormInput.setProps({ error: isValidate ? '' : 'Логин невалиден' })
        if (isValidate) {
          login = value
        }
      },
    },
  })
  const inputFirstname = new Input({
    id: 'first_name',
    type: 'text',
    name: 'first_name',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateName(value)
        firstnameFormInput.setProps({ error: isValidate ? '' : 'Имя невалидно' })
        if (isValidate) {
          firstname = value
        }
      },
    },
  })
  const inputLastname = new Input({
    id: 'last_name',
    type: 'text',
    name: 'last_name',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validateName(value)
        lastnameFormInput.setProps({ error: isValidate ? '' : 'Имя невалидно' })
        if (isValidate) {
          lastname = value
        }
      },
    },
  })
  const inputPhone = new Input({
    id: 'phone',
    type: 'phone',
    name: 'phone',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validatePhone(value)
        phoneFormInput.setProps({ error: isValidate ? '' : 'Номер телефона невалиден' })
        if (isValidate) {
          phone = value
        }
      },
    },
  })
  const inputFirstPassword = new Input({
    id: 'password',
    type: 'password',
    name: 'password',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validatePassword(value)
        firstPasswordFormInput.setProps({ error: isValidate ? '' : 'Пароль невалиден' })
        if (isValidate) {
          firstpassword = value
        }
      },
    },
  })
  const inputSecondPassword = new Input({
    id: 'password',
    type: 'password',
    name: 'password',
    events: {
      blur: (event: any) => {
        const value = event.target.value
        const isValidate = validatePassword(value)
        secondPasswordFormInput.setProps({ error: isValidate ? '' : 'Пароль невалиден' })
        if (isValidate) {
          secondpassword = value
        }
      },
    },
  })

  const emailFormInput = new FormInput({ input: inputEmail })
  const loginFormInput = new FormInput({ input: inputLogin })
  const firstnameFormInput = new FormInput({ input: inputFirstname })
  const lastnameFormInput = new FormInput({ input: inputLastname })
  const phoneFormInput = new FormInput({ input: inputPhone })
  const firstPasswordFormInput = new FormInput({ input: inputFirstPassword })
  const secondPasswordFormInput = new FormInput({ input: inputSecondPassword })

  const signIn = new SignUp({
    inputEmail: emailFormInput,
    inputLogin: loginFormInput,
    inputFirstname: firstnameFormInput,
    inputLastname: lastnameFormInput,
    inputPhone: phoneFormInput,
    inputFirstPassword: firstPasswordFormInput,
    inputSecondPassword: secondPasswordFormInput,
    button: buttonLink,
  })
  const center = new Center({ children: signIn })

  render('#root', center)
})
