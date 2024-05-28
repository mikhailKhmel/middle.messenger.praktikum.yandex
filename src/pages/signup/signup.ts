import './signup.less'
import ButtonLink from '../../components/button-link'
import Input from '../../components/input'
import Center from '../../components/center'
import { render } from '../../utils/renderDOM'
import Block from '../../types/block'
import signupTmpl from './signup.tmpl'

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

  render(): string {
    return this.compile(signupTmpl, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttonLink = new ButtonLink({ href: '/pages/main/', label: 'Зарегистрироваться' })
  const inputEmail = new Input({ id: 'email', type: 'text', name: 'email' })
  const inputLogin = new Input({ id: 'login', type: 'text', name: 'login' })
  const inputFirstname = new Input({ id: 'first_name', type: 'text', name: 'first_name' })
  const inputLastname = new Input({ id: 'last_name', type: 'text', name: 'last_name' })
  const inputPhone = new Input({ id: 'phone', type: 'phone', name: 'phone' })
  const inputFirstPassword = new Input({ id: 'password', type: 'password', name: 'password' })
  const inputSecondPassword = new Input({ id: 'password', type: 'password', name: 'password' })
  const signIn = new SignUp({
    inputEmail,
    inputLogin,
    inputFirstname,
    inputLastname,
    inputPhone,
    inputFirstPassword,
    inputSecondPassword,
    button: buttonLink,
  })
  const center = new Center({ children: signIn })

  render('#root', center)
})
