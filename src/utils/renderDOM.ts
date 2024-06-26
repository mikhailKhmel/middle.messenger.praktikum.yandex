import Block from '../types/Block.ts';

export function render(query: string, block: Block) {
  const root = document.querySelector(query)!;
  const content = block.getContent();
  root.appendChild(content as Node);
  block.dispatchComponentDidMount();
  return root;
}
