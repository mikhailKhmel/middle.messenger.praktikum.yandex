import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport, MethodEnum } from './HTTPTransport';

describe('HTTPTransport', () => {
  let http: HTTPTransport;
  let xhr: sinon.SinonFakeXMLHttpRequestStatic;
  let requests: sinon.SinonFakeXMLHttpRequest[];

  beforeEach(() => {
    // Создаем экземпляр HTTPTransport
    http = new HTTPTransport();

    // Подменим глобальный XMLHttpRequest
    xhr = sinon.useFakeXMLHttpRequest();
    requests = [];

    xhr.onCreate = (req) => {
      requests.push(req);
    };
  });

  afterEach(() => {
    // Восстанавливаем оригинальный XMLHttpRequest после каждого теста
    xhr.restore();
  });

  it('should build correct query string for GET requests', () => {
    const testURL = '/api/test';
    const testData = { param1: 'value1', param2: 'value2' };

    http.get(testURL, { data: testData });

    expect(requests).to.have.lengthOf(1);
    expect(requests[0].url).to.equal(`${testURL}?param1=value1&param2=value2`);
  });

  it('should send data as JSON for POST requests', () => {
    const testURL = '/api/test';
    const testData = { key: 'value' };

    http.post(testURL, { data: testData });

    expect(requests).to.have.lengthOf(1);
    expect(requests[0].method).to.equal(MethodEnum.POST);
    expect(requests[0].requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8');
    expect(requests[0].requestBody).to.equal(JSON.stringify(testData));
  });

  it('should send data as JSON for PUT requests', () => {
    const testURL = '/api/test';
    const testData = { key: 'value' };

    http.put(testURL, { data: testData });

    expect(requests).to.have.lengthOf(1);
    expect(requests[0].method).to.equal(MethodEnum.PUT);
    expect(requests[0].requestHeaders['Content-Type']).to.equal('application/json;charset=utf-8');
    expect(requests[0].requestBody).to.equal(JSON.stringify(testData));
  });

  it('should send correct DELETE request', () => {
    const testURL = '/api/test';

    http.delete(testURL);

    expect(requests).to.have.lengthOf(1);
    expect(requests[0].method).to.equal(MethodEnum.DELETE);
    expect(requests[0].url).to.equal(`${testURL}`);
  });

  it('should set custom headers', () => {
    const testURL = '/api/test';
    const customHeaders = { 'X-Custom-Header': 'value' };

    http.post(testURL, { headers: customHeaders, data: {} });

    expect(requests).to.have.lengthOf(1);
    expect(requests[0].requestHeaders['X-Custom-Header']).to.equal('value');
  });

  it('should handle request errors', (done) => {
    const testURL = '/api/test';

    http.get(testURL).catch(() => {
      done();
    });

    requests[0].error();
  });
});
