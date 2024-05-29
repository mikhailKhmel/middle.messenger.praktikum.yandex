import './profile.less';
import profileTmpl from './profile.tmpl';
import Block, { Props } from '../../types/block';

export default class Profile extends Block {
  constructor(props?: Props) {
    super('section', props);
  }

  render(): DocumentFragment {
    return this.compile(profileTmpl, this.props);
  }
}
