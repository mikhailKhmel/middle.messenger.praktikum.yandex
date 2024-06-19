import Block, { Props } from '../../types/Block.ts';
import formTmpl from './form.tmpl';
import './form.less';

export default class Form extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(formTmpl, this.props);
  }
}
