import './chat.less';
import Block, { Props } from '../../types/Block.ts';
import chatButtonTmpl from './ChatButton.tmpl.ts';

interface IProps extends Props{
  name: string;
  avatar: string;
}

export default class ChatButton extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(chatButtonTmpl, this.props);
  }
}
