import Block, { Props } from '../../types/Block.ts';
import './settingsform.less';
import settingsformTmpl from './settingsform.tmpl.ts';

interface IProps extends Props {
  inputEmail: Block;
  inputLogin: Block;
  inputFirstname: Block;
  inputLastname: Block;
  inputDisplayname: Block;
  inputPhone: Block;
  saveButton: Block;
}

export default class Settingsform extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(settingsformTmpl, this.props);
  }
}
