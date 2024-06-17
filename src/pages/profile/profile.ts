import Block, { Props } from '../../types/block';
import './profile.less';
import profileTmpl from './profile.tmpl';

export class Profile extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(profileTmpl, this.props);
  }
}
