import './message.less';
import messageTmpl from './message.tmpl';
import Block, { Props } from '../../types/Block.ts';
import Form from '../form';
import Input from '../input';
import SendButton from '../send-button';
import { WSTransport } from '../../types/WSTransport.ts';
import { WEBSCOKET_URL } from '../../types/Consts.ts';
import { ChatsApi } from '../../api/ChatsApi.ts';

export default class Messages extends Block {
  constructor(props: Props) {
    super('section', props);
    this.loadMessages = this.loadMessages.bind(this);
  }

  componentDidMount(_oldProps?: Props) {
    if (!this.props.chatId) return;
    this.loadMessages();
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    if (!_oldProps || !_newProps) return true;
    if (_oldProps.chatId !== _newProps.chatId) {
      this.loadMessages();
    }

    return super.componentDidUpdate(_oldProps, _newProps);
  }

  async loadMessages() {
    if (!this.props.chatdId) return;
    const { token } = await new ChatsApi().token(this.props.chatId);
    const socket = new WSTransport(
      `${WEBSCOKET_URL}/${this.props.userId}/${this.props.chatId}/${token}`,
    );
    await socket.connect();
    socket.send({
      content: '0',
      type: 'get old',
    });
    socket.on('message', (data) => {
      console.log({ data });
      this.setProps({ messages: data });
    });
  }

  render(): DocumentFragment {
    this.children = {
      ...this.children,
      form: new Form({
        children: new SendMessageForm({
          messageInput: new Input({
            id: 'message',
            name: 'message',
            type: 'text',
          }),
          sendButton: new SendButton({}),
        }),
        events: {
          submit: async (event: Event) => {
            event.preventDefault();
            if (!(event.target instanceof HTMLFormElement)) return;
            const formData = new FormData(event.target);
            const message = formData.get('message')?.toString() ?? '';
            if (!message) return;
            this.props.socket.send({
              content: message,
              type: 'message',
            });
          },
        },
      }),
    };
    return this.compile(messageTmpl, this.props);
  }
}

class SendMessageForm extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(
      `
      <div class="message-input">
                {{{messageInput}}}
              {{{sendButton}}}
</div>`,
      this.props,
    );
  }
}
