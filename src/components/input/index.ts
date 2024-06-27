import Block, { Props } from '../../types/block';
import './input.less';
import inputTmpl from './input.tmpl';

interface IProps extends Props {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}

export default class Input extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(inputTmpl, this.props);
  }
}
