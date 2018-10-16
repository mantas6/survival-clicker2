/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Relay, RelayPayload } from '@/classes/relay';

interface MessageEvent {
  data: any;
}

class StubWorker {
  onmessage?: (event: MessageEvent) => void;

  postMessage(data: any) {
    return;
  }

  triggerMessage(data: RelayPayload) {
    if (this.onmessage) {
      this.onmessage({ data });
    }
  }
}

describe('classes/relay', () => {
  it('delivers a message', done => {
    const worker = new StubWorker();
    const relay = new Relay(worker as any);

    relay.on('testMessage', data => {
      expect(data).to.equals('testPayload');
      done();
    });

    worker.triggerMessage({ name: 'testMessage', data: 'testPayload' });
  });
});
