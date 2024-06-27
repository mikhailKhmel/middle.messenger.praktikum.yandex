import Block from './Block.ts';
import { isEqual } from '../utils/isEqual.ts';
import { render } from '../utils/renderDOM.ts';
import { Class } from './Class.ts';

export default class Route {
  _pathname: string;

  _blockClass: Class<Block>;

  _block: Block | null;

  _props: any;

  constructor(pathname: string, view: Class<Block>, props: any) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block!);
      return;
    }

    this._block.show();
  }
}
