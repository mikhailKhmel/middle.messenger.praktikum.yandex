import Block, { Props } from '../../types/block';
import './forminput.less';
import forminputTmpl from './forminput.tmpl';

interface IProps extends Props {
  input: Block;
  error?: string;
}

export default class FormInput extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(forminputTmpl, this.props);
  }
}
