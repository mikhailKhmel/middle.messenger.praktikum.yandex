import Block, { Props } from '../../../types/Block.ts';

export class FoundUser extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment | null {
    return this.compile(
      `<button class="user">
                <span>{{first_name}} {{second_name}}</span>
                </button>`,
      this.props,
    );
  }
}
