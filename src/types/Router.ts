import Block from './Block.ts';
import Route from './Route.ts';
import { Class } from './Class.ts';

export class Router {
  static __instance: Router | undefined;

  _rootQuery: string | undefined;

  routes: Route[] | undefined;

  history: History | undefined;

  _currentRoute: Route | null | undefined;

  _historyIndex: number | undefined;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._historyIndex = 0; // Добавляем индекс для истории

    Router.__instance = this;
  }

  use(pathname: string, block: Class<Block>) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes?.push(route);
    return this; // Возвращаем this для цепочечного вызова
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute(event.state);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history?.pushState({}, '', pathname);
    this._historyIndex!++;
    this._onRoute(pathname);
  }

  refresh() {
    window.location.href = document.referrer;
  }

  back() {
    if (this._historyIndex! > 0) {
      this._historyIndex!--;
      this.history?.back();
    }
  }

  forward() {
    if (this._historyIndex! < this.history!.length - 1) {
      this._historyIndex!++;
      this.history!.forward();
    }
  }

  getRoute(pathname: string) {
    return this.routes?.find((route) => route.match(pathname));
  }
}
