import EventBus from './EventBus.ts';

export class WSTransport extends EventBus {
  private socket?: WebSocket;

  private pingInterval?: ReturnType<typeof setInterval>;

  private readonly pingIntervalTime = 30000;

  private url: string;

  constructor(url: string) {
    super();
    this.url = url;
  }

  public send(data: string | number | object) {
    if (!this.socket) return;
    this.socket.send(JSON.stringify(data));
  }

  public connect(): Promise<void> {
    if (this.socket) throw new Error('WSTransport connected');
    this.socket = new WebSocket(this.url);
    this.subscribe(this.socket);
    this.setupPing();

    return new Promise((resolve, reject) => {
      this.on('error', reject);
      this.on('connected', () => {
        this.off('error', reject);
        resolve();
      });
    });
  }

  public close() {
    this.socket?.close();
    clearTimeout(this.pingInterval);
  }

  private setupPing(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: 'ping' });
    }, this.pingIntervalTime);

    this.on('close', () => {
      clearInterval(this.pingInterval);
      this.pingInterval = undefined;
    });
  }

  private subscribe(socket: WebSocket) {
    socket.addEventListener('open', () => {
      this.emit('connected');
    });

    socket.addEventListener('error', () => {
      this.emit('error');
    });

    socket.addEventListener('close', () => {
      this.emit('close');
    });

    socket.addEventListener('message', (message) => {
      try {
        const data = JSON.parse(message.data);
        if (['pong', 'user connected'].includes(data.type)) {
          return;
        }
        this.emit('message', data);
      } catch (e) {
        /* empty */
      }
    });
  }
}
