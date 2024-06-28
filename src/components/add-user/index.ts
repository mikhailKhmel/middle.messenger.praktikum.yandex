import Block, { Props } from '../../types/Block.ts';
import Form from '../form';
import { UserApi } from '../../api/UserApi.ts';
import { FoundUser } from './found-user';
import { ChatsApi } from '../../api/ChatsApi.ts';

export class AddUser extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    const result = new UsersResult({});
    const addUserForm = new AddUserForm();
    const form = new Form({
      children: addUserForm,
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          if (!(event.target instanceof HTMLFormElement)) return;
          const formData = new FormData(event.target);
          const login = formData.get('login')?.toString() ?? '';
          if (!login) return;
          const foundUsers = await new UserApi().searchUser({ login });
          const foundUsersBlocks = foundUsers.map(
            (user: { first_name: string; second_name: string; id: number }) =>
              new FoundUser({
                first_name: user.first_name,
                second_name: user.second_name,
                events: {
                  click: async () => {
                    await new ChatsApi().addUser({
                      users: [user.id],
                      chatId: this.props.chatId,
                    });
                    this.props.onRefresh();
                  },
                },
              }),
          );
          result.setChildren({ result: foundUsersBlocks });
        },
      },
    });
    this.children = {
      ...this.children,
      form,
      result,
    };
    return this.compile(
      `
    <dialog id="userSearchDialog">
      <h2>Поиск пользователя:</h2>
      {{{form}}}
       {{{result}}}
    </dialog>`,
      this.props,
    );
  }
}

class AddUserForm extends Block {
  constructor(props?: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(
      `
      <input type="text" id="login" name="login" required>
      <button type="submit">Найти</button>
      <button type="button" onclick="window.userSearchDialog.close()">Закрыть</button>
    `,
      this.props,
    );
  }
}

class UsersResult extends Block {
  constructor(props?: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(
      `
      {{{result}}}
    `,
      this.props,
    );
  }
}
