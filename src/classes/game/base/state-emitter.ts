import { StateNode } from './state-node';

type ListenerHandler = (node: StateNode) => void;

interface Listener {
  name: string;
  callback: ListenerHandler;
}

export class StateEmitter {
  private listeners: Listener[] = [];
  private node: StateNode;

  constructor(node: StateNode) {
    this.node = node;
  }

  on(name: string, callback: ListenerHandler) {
    this.listeners.push({ name, callback });
  }

  emit(name: string, origin?: StateNode) {
    if (!origin) {
      origin = this.node;
    }

    const listeners = this.listeners.filter(listener => listener.name === name);

    for (const listener of listeners) {
      listener.callback(origin);
    }

    if (this.node.parent) {
      this.node.parent.events.emit(name, origin);
    }
  }
}
