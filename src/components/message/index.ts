import './message.less';
import messageTmpl from './message.tmpl';
import Block from '../../types/block';

interface IProps {
  message: string;
  isIncome: boolean;
}

export default class Message extends Block {
  constructor(props: IProps) {
    super('section', props);
  }

  render(): DocumentFragment {
    return this.compile(messageTmpl, this.props);
  }
}
