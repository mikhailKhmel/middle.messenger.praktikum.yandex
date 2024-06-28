import Block, { Props } from '../../types/Block.ts';
import './passwordform.less';
import passwordformTmpl from './passwordform.tmpl.ts';

interface IProps extends Props {
  oldPassword: Block;
  newPassword1: Block;
  newPassword2: Block;
  saveButton: Block;
}

export default class Passwordform extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(passwordformTmpl, this.props);
  }
}
