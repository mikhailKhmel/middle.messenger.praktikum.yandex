import './signin.less'
import signinTmpl from './signin.tmpl'
import ButtonLink from '../../components/button-link'
import Input from '../../components/input'
import Center from '../../components/center'
import { render } from '../../utils/renderDOM'
import Block, { Props } from '../../types/block'

interface IProps {
  loginInput: Block
  passwordInput: Block
  button: Block
}

class SignIn extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): string {
    return this.compile(signinTmpl, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttonLink = new ButtonLink({ href: '/pages/main/', label: 'Войти' })
  const loginInput = new Input({ id: 'login', type: 'text', name: 'login' })
  const passwordInput = new Input({ id: 'password', type: 'password', name: 'password' })
  const signIn = new SignIn({ loginInput, passwordInput, button: buttonLink })
  const center = new Center({ children: signIn })

  render('#root', center)
})
