import Block, { Props } from '../../types/block';
import './signinform.less';
import signinformTmpl from './signinform.tmpl';

interface IProps extends Props {
  loginInput: Block;
  passwordInput: Block;
  button: Block;
}

export default class SignInForm extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(signinformTmpl, this.props);
  }
}
