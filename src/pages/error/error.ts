import './error.less';
import errorTmpl from './error.tmpl';
import Block from '../../types/block';
import { render } from '../../utils/renderDOM';

interface IProps {
}

class Error extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(errorTmpl, this.props);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render('#root', new Error({}));
});
