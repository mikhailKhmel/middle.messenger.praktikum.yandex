import Block, { Props } from '../../types/Block.ts';
import './profile.less';
import profileTmpl from './profile.tmpl';
import Button from '../../components/button';
import { AuthApi } from '../../api/AuthApi.ts';
import { router } from '../../index.ts';

export class Profile extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    const logoutButton = new Button({
      label: 'Выйти из профиля',
      events: {
        click: async () => {
          await (new AuthApi().logout());
          router.go('/');
        },
      },
    });
    this.children = {
      logoutButton,
    };
    return this.compile(profileTmpl, this.props);
  }
}
