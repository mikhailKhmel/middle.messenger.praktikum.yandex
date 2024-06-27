import './send-button.less';
import sendButtonTmpl from './send-button.tmpl';
import Block, { Props } from '../../types/Block.ts';

interface IProps extends Props {}

export default class SendButton extends Block {
  constructor(props?: IProps) {
    super('button', props);
  }

  render(): DocumentFragment {
    return this.compile(sendButtonTmpl, this.props);
  }
}
