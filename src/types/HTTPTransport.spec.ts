import { expect, use } from 'chai';
import { SinonStub, createSandbox } from 'sinon';
import sinonChai from 'sinon-chai';
import { HTTPTransport, MethodEnum, queryStringify } from './HTTPTransport';

describe('HTTPTransport', () => {
  use(sinonChai);
  const sandbox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub<any>;

  beforeEach(() => {
    http = new HTTPTransport();
    request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve());
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('должен корректно передавать GET-запрос', () => {
    http.get('', { data: { a: '1', b: '2' } });
    expect(request).calledWithMatch('', { data: { a: '1', b: '2' }, method: MethodEnum.GET });
  });
  it('должен корректно передавать POST-запрос', () => {
    http.post('', { data: { a: '1', b: '2' } });
    expect(request).calledWithMatch('', { data: { a: '1', b: '2' }, method: MethodEnum.POST });
  });
  it('должен корректно передавать PUT-запрос', () => {
    http.put('', { data: { a: '1', b: '2' } });
    expect(request).calledWithMatch('', { data: { a: '1', b: '2' }, method: MethodEnum.PUT });
  });
  it('должен корректно передавать DELETE-запрос', () => {
    http.delete('', { data: { a: '1', b: '2' } });
    expect(request).calledWithMatch('', { data: { a: '1', b: '2' }, method: MethodEnum.DELETE });
  });
});

describe('queryStringify', () => {
  it('должен возвращать пустую строку если передан пустой объект', () => {
    const result = queryStringify({});
    expect(result).to.equal('');
  });

  it('должен корректно превращать объект в параметры запроса', () => {
    const result = queryStringify({ name: 'John', age: 30 });
    expect(result).to.equal('name=John&age=30');
  });

  it('должен корректно кодировать специальные символы в параметры запроса', () => {
    const result = queryStringify({ name: 'John Doe', city: 'New York' });
    expect(result).to.equal('name=John%20Doe&city=New%20York');
  });

  it('должен корректно интерпретировать числа и строки', () => {
    const result = queryStringify({ id: 123, name: 'Alice' });
    expect(result).to.equal('id=123&name=Alice');
  });

  it('должен корретно обрабатывать null и undefined', () => {
    const result = queryStringify({ name: null, age: undefined });
    expect(result).to.equal('name=null&age=undefined');
  });

  it('должен корректно обрабатывать булевые значения', () => {
    const result = queryStringify({ isActive: true, isAdmin: false });
    expect(result).to.equal('isActive=true&isAdmin=false');
  });
});
