import Block, { Props } from '../../types/block';
import centerTmpl from './center.tmpl';
import './center.less';

interface IProps extends Props {
  children: Block;
}

export default class Center extends Block {
  constructor(props: IProps) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(centerTmpl, this.props);
  }
}
