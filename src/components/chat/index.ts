import './chat.less';
import Block, { Props } from '../../types/Block.ts';
import chatTmpl from './chat.tmpl.ts';
import { ChatsApi } from '../../api/ChatsApi.ts';
import { AddUser } from '../add-user';
import Input from '../input';
import SendButton from '../send-button';
import { WSTransport } from '../../types/WSTransport.ts';
import { WEBSCOKET_URL } from '../../types/Consts.ts';
import Form from '../form';
import Avatarform from '../avatarform';

export class Chat extends Block {
  constructor(props: Props) {
    super('div', props);
    this.loadChat = this.loadChat.bind(this);
  }

  componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    if (!_oldProps || !_oldProps) return true;
    if (_oldProps.chatId !== _newProps.chatId) {
      this.loadChat();
    }

    return super.componentDidUpdate(_oldProps, _newProps);
  }

  async loadChat() {
    const id = this.props.chatId;
    const users = (await new ChatsApi().getChatUsers({ id })).map(
      (user: { first_name: string; second_name: string; id: number }) =>
        new User({
          id: user.id,
          chatId: this.props.chatId,
          first_name: user.first_name,
          second_name: user.second_name,
          onRefresh: this.loadChat,
        }),
    );
    const { token } = await new ChatsApi().token(id);
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
    this.setChildren({
      users,
    });
    this.setProps({
      token,
      socket,
    });
  }

  render(): DocumentFragment {
    this.children = {
      ...this.children,
      avatarForm: new Form({
        children: new Avatarform(),
        events: {
          submit: async (event: Event) => {
            event.preventDefault();
            if (!(event.target instanceof HTMLFormElement)) return;
            const formData = new FormData(event.target);
            formData.append('chatId', this.props.chatId);
            try {
              await new ChatsApi().updateAvatar(formData);
              this.props.onRefresh();
            } catch (error: unknown) {
              console.error(error);
            }
          },
        },
      }),
      addUser: new AddUser({
        chatId: this.props.chatId,
        onRefresh: this.loadChat,
      }),
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
            await this.loadChat();
          },
        },
      }),
    };
    return this.compile(chatTmpl, this.props);
  }
}

class User extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    this.children = {
      ...this.children,
      delete: new DeleteUserButton({
        events: {
          click: async () => {
            await new ChatsApi().deleteUser({
              chatId: this.props.chatId,
              users: [this.props.id],
            });
            this.props.onRefresh();
          },
        },
      }),
    };
    return this.compile(
      `<div class="user">
                <span>{{first_name}} {{second_name}}</span>
                {{{delete}}}
                </div>`,
      this.props,
    );
  }
}

class DeleteUserButton extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(
      `
                <button><i class="bi bi-x"></i></button>`,
      this.props,
    );
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
