import { expect } from 'chai';
import { Router } from './Router';
import Block from './Block';

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    router = new Router('/').use('/', Block);
  });

  it('должен успешно создавать экземпляр класса Router', () => {
    expect(router).to.be.an.instanceOf(Router);
  });

  it('должен создавать только один экземпляр класса Router (Singleton)', () => {
    const router1 = new Router('/');
    const router2 = new Router('/');

    expect(router1).to.equal(router2);
  });

  it('должен правильно находить маршрут по пути', () => {
    const route = router.getRoute('/');
    expect(route?._pathname).to.equal('/');
  });

  it('должен успешно увеличивать и уменьшать исторический индекс', () => {
    const initialIndex = router._historyIndex!;
    router.go('/new-route');
    expect(router._historyIndex).to.equal(initialIndex + 1);

    router.back();
    expect(router._historyIndex).to.equal(initialIndex);
  });

  it('должен правильно обрабатывать переходы назад и вперед в истории', () => {
    const initialPathname = window.location.pathname;
    router.go('/new-route');

    router.back();
    expect(window.location.pathname).to.equal(initialPathname);

    router.forward();
    expect(window.location.pathname).to.equal('/new-route');
  });
});
