import { v4 } from 'uuid'
import EventBus from './event-bus'
import Handlebars from 'handlebars'

export type Props = Record<string, any>
export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  }

  private _id: string | null = null
  private _element: HTMLElement | null = null
  private _meta: { tagName: string; props: Props } | null = null
  protected props: Props
  protected children: { [key: string]: Block } = {}
  private eventBus: () => EventBus

  constructor(tagName: string = 'div', propsAndChildren: Props = {}) {
    const eventBus = new EventBus()
    const { children, props } = this._getChildren(propsAndChildren)
    this._meta = { tagName, props }
    this._id = v4()

    this.children = children
    this.props = this._makePropsProxy({ ...props, __id: this._id })

    this.eventBus = () => eventBus

    this._registerEvents(eventBus)
    eventBus.emit(Block.EVENTS.INIT)
  }

  private _registerEvents(eventBus: EventBus): void {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this))
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
  }

  private _createResources(): void {
    const { tagName } = this._meta!
    this._element = this._createDocumentElement(tagName)
  }

  _getChildren(propsAndChildren: Props) {
    const children: { [k: string]: any } = {}
    const props: { [k: string]: any } = {}

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value
      } else {
        props[key] = value
      }
    })

    return { children, props }
  }

  init(): void {
    this._createResources()
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER)
  }

  compile(template: string, props: Props) {
    const propsAndStubs = { ...props }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const compiledTemplate = Handlebars.compile(template.trim())
    const resultTemplate = compiledTemplate(propsAndStubs)
    const fragment = document.createElement('template')
    fragment.innerHTML = resultTemplate

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`)

      stub?.replaceWith(child.getContent()!)
    })

    return fragment.content
  }

  private _componentDidMount(): void {
    this.componentDidMount()
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount()
    })
  }

  private _addEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      const e = this._element?.firstChild
      e!.addEventListener(eventName, events[eventName])
    })
  }

  private _removeEvents() {
    const { events = {} } = this.props

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName])
    })
  }

  componentDidMount(oldProps?: Props): void {}

  dispatchComponentDidMount(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM)
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const response = this.componentDidUpdate(oldProps, newProps)
    if (!response) {
      return
    }
    this._render()
  }

  componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    return true
  }

  setProps(nextProps: Props): void {
    if (!nextProps) {
      return
    }
    Object.assign(this.props, nextProps)
  }

  get element(): HTMLElement | null {
    return this._element
  }

  private _render(): void {
    const block = this.render()! // render теперь возвращает DocumentFragment

    this._removeEvents()
    this._element!.innerHTML = ''
    this._element?.appendChild(block)

    this._addEvents()
  }

  render(): DocumentFragment | null {
    return null
  }

  getContent(): HTMLElement | null {
    return this.element
  }

  private _makePropsProxy(props: Props): Props {
    const self = this

    return new Proxy(props, {
      get(target, prop: string) {
        const value = target[prop]
        return typeof value === 'function' ? value.bind(target) : value
      },
      set(target, prop: string, value) {
        target[prop] = value

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target)
        return true
      },
      deleteProperty() {
        throw new Error('Нет доступа')
      },
    })
  }

  private _createDocumentElement(tagName: string): HTMLElement {
    const element = document.createElement(tagName)
    element.setAttribute('data-id', `${this._id}`)
    return element
  }

  show(): void {
    const element = this.getContent()
    if (element) {
      element.style.display = 'block'
    }
  }

  hide(): void {
    const element = this.getContent()
    if (element) {
      element.style.display = 'none'
    }
  }
}
