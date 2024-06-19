import Block, { Props } from '../../types/Block.ts';
import './avatarform.less';
import Input from '../input';
import Button from '../button';
import avatarformTmpl from './avatarform.tmpl.ts';

export default class Avatarform extends Block {
  constructor(props?: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    const inputAvatar = new Input({
      id: 'avatar',
      name: 'avatar',
      type: 'file',
    });
    const button = new Button({
      label: 'Сохранить',
    });
    return this.compile(avatarformTmpl, { inputAvatar, button });
  }
}
