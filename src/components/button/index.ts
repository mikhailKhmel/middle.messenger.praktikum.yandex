import './button.less';
import buttonTmpl from './button.tmpl';
import Block, { Props } from '../../types/Block.ts';

interface IProps extends Props {
  label: string;
}

export default class Button extends Block {
  constructor(props?: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(buttonTmpl, this.props);
  }
}
