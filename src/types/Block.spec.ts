import { expect } from 'chai';
import Block from './Block';

describe('Block', () => {
  let block: Block | null;

  beforeEach(() => {
    block = new Block('div', {});
  });

  afterEach(() => {
    block = null;
  });

  it('должен иметь валидный элемент после инициализации', () => {
    block?.init();
    expect(block?.element).to.be.an.instanceOf(HTMLElement);
  });

  it('должен корректно устанавливать пропсы', () => {
    const initialProps = { someProp: 'initialValue' };
    const newProps = { someProp: 'updatedValue' };

    block?.setProps(initialProps);
    expect(block?.getProps().someProp).to.equal('initialValue');

    block?.setProps(newProps);
    expect(block?.getProps().someProp).to.equal('updatedValue');
  });

  it('должен отрендерить и вернуть фрагмент документа', () => {
    block?.init();
    const template = '<div>{{someContent}}</div>';
    const props = { someContent: 'Hello, World!' };
    const fragment = block?.compile(template, props);

    expect(fragment).to.be.an.instanceOf(DocumentFragment);
    expect(fragment?.firstChild?.textContent).to.equal('Hello, World!');
  });
});
