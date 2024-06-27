import Block from '../../types/Block.ts';
import './signupform.less';
import signinformTmpl from './signupform.tmpl.ts';

interface IProps {
  inputEmail: Block;
  inputLogin: Block;
  inputFirstname: Block;
  inputLastname: Block;
  inputPhone: Block;
  inputFirstPassword: Block;
  inputSecondPassword: Block;
  button: Block;
}

export default class SignUpForm extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(signinformTmpl, this.props);
  }
}
