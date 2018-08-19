interface RelayPayload {
  name: string;
  data: any;
}

type RelayEvent = (data: any) => void;

export class Relay {
  private events: { [ name: string ]: RelayEvent[] } = {};
  private ctx: Worker;

  constructor(ctx: Worker) {
    this.ctx = ctx;

    ctx.onmessage = (messageEvent: MessageEvent) => {
      const event = messageEvent.data as RelayPayload;

      if (this.events[event.name]) {
        for (const cb of this.events[event.name]) {
          cb(event.data);
        }
      }
    };
  }

  public on(name: string, cb: RelayEvent): void {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(cb);
  }

  public emit(name: string, data: any): void {
    this.ctx.postMessage({ name, data });
  }
}
