import './notfound.less'
import tmpl404 from './notfound.tmpl'
import notfoudImg from '../../assets/tumbleweed.gif'
import Block from '../../types/block'
import { render } from '../../utils/renderDOM'

interface IProps {
  img: string
}

class Notfound extends Block {
  constructor(props: IProps) {
    super('div', props)
  }

  render(): DocumentFragment {
    return this.compile(tmpl404, this.props)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render('#root', new Notfound({ img: notfoudImg }))
})
