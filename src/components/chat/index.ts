import './chat.less';
import contactTmpl from './chat.tmpl.ts';
import Block from '../../types/Block.ts';

interface IProps {
  name: string;
}

export default class Chat extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(contactTmpl, this.props);
  }
}
