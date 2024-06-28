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

  componentDidMount(_oldProps?: Props) {
    super.componentDidMount(_oldProps);
    new AuthApi().getUserInfo().then((userInfo) => {
      this.setProps({
        avatar: userInfo.avatar,
        display_name: userInfo.display_name,
        email: userInfo.email,
        first_name: userInfo.first_name,
        login: userInfo.login,
        phone: userInfo.phone,
        second_name: userInfo.second_name,
      });
    });
  }

  render(): DocumentFragment {
    const logoutButton = new Button({
      label: 'Выйти из профиля',
      events: {
        click: async () => {
          await new AuthApi().logout();
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
