import { expect } from 'chai';
import { Relay, RelayPayload } from '@/classes/relay';

interface MessageEvent {
  data: any;
}

class StubWorker {
  public onmessage?: (event: MessageEvent) => void;

  public postMessage(data: any) {
    return;
  }

  public triggerMessage(data: RelayPayload) {
    if (this.onmessage) {
      this.onmessage({ data });
    }
  }
}

describe('classes/relay', () => {
  it('delivers a message', (done) => {
    const worker = new StubWorker();
    const relay = new Relay(worker as any);

    relay.on('testMessage', (data) => {
      expect(data).to.equals('testPayload');
      done();
    });

    worker.triggerMessage({ name: 'testMessage', data: 'testPayload' });
  });
});
