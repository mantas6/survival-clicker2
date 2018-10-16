export interface RelayPayload {
  name: string;
  data: any;
}

interface EventMap {
    [ name: string ]: RelayEvent[];
}

type RelayEvent = (data: any) => void;

export class Relay {
  private events: EventMap = {};
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

  on(name: string, cb: RelayEvent): void {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(cb);
  }

  emit(name: string, data?: any): void {
    this.ctx.postMessage({ name, data });
  }
}
