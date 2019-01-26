export interface RelayPayload {
  name: string;
  data: any;
}

interface EventMap {
    [ name: string ]: RelayEvent[];
}

type EventWatchFunction = (name: string, data: any) => void;

type RelayEvent = (data: any) => void;

export class Relay {
  private events: EventMap = {};
  private ctx: Worker;
  private watchFunc?: EventWatchFunction;

  constructor(ctx: Worker) {
    this.ctx = ctx;

    ctx.onmessage = (messageEvent: MessageEvent) => {
      const event = messageEvent.data as RelayPayload;

      if (this.events[event.name]) {
        for (const cb of this.events[event.name]) {
          cb(event.data);
        }
      }

      if (this.watchFunc) {
        this.watchFunc(event.name, event.data);
      }
    };
  }

  on(name: string, cb: RelayEvent): void {
    if (!this.events[name]) {
      this.events[name] = [];
    }

    this.events[name].push(cb);
  }

  watch(watchFunc: EventWatchFunction) {
    this.watchFunc = watchFunc;
  }

  emit(name: string, data?: any): void {
    this.ctx.postMessage({ name, data });
  }
}
