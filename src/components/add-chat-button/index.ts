import Block, { Props } from '../../types/Block.ts';
import addChatButtonTmpl from './add-chat-button.tmpl.ts';
import Form from '../form';
import { ChatsApi } from '../../api/ChatsApi.ts';
import './add-chat-button.less';

interface IProps extends Props {
  onRefresh: () => void;
}

export default class AddChatButton extends Block {
  constructor(props?: IProps) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    const addChatForm = new AddChatForm();
    const form = new Form({
      children: addChatForm,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          const title = formData.get('title')
            ?.toString() ?? '';
          if (!title) return;
          await (new ChatsApi().createChat({ title }));
          this.props.onRefresh();
        },
      },
    });

    this.children = {
      form,
    };
    return this.compile(addChatButtonTmpl, this.props);
  }
}

class AddChatForm extends Block {
  constructor(props?: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(`
      <input type="text" id="title" name="title" required>
      <button type="submit">Подвердить</button>
      <button type="button" onclick="window.chatTitleDialog.close()">Закрыть</button>
    `, this.props);
  }
}
