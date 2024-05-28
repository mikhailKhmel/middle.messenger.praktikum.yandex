import ButtonLink from './components/button-link'
import { render } from './utils/renderDOM'
import Center from './components/center'

document.addEventListener('DOMContentLoaded', () => {
  const buttonLink = new ButtonLink({ href: '/pages/signin/', label: 'Войти' })
  const center = new Center({ children: buttonLink })

  render('#root', center)
})
