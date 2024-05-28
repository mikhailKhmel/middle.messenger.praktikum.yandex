import Block from '../types/block'

export function render(query: string, block: Block) {
  const root = document.querySelector(query)!

  // Можно завязаться на реализации вашего класса Block
  root.appendChild(block.getContent() as Node)

  block.dispatchComponentDidMount()

  return root
}
