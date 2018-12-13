/* tslint:disable:max-classes-per-file only-arrow-functions no-unused-expression */

import { expect } from 'chai';
import { Relay, RelayPayload } from '@/classes/relay';

interface MessageEvent {
  data: any;
}

interface PostMessageEvent {
  name: string;
  data: any;
}

class StubWorker {
  onmessage?: (event: MessageEvent) => void;
  onPostMessage?: (event: PostMessageEvent) => void;

  postMessage(event: PostMessageEvent) {
    if (this.onPostMessage) {
      this.onPostMessage(event);
    }
  }

  triggerMessage(data: RelayPayload) {
    if (this.onmessage) {
      this.onmessage({ data });
    }
  }
}

describe('classes/relay', function() {
  it('delivers a message', function(done) {
    const worker = new StubWorker();
    const relay = new Relay(worker as any);

    relay.on('testMessage', data => {
      expect(data).to.equals('testPayload');
      done();
    });

    worker.triggerMessage({ name: 'testMessage', data: 'testPayload' });
  });

  it('receives a message', function(done) {
    const worker = new StubWorker();
    const relay = new Relay(worker as any);

    worker.onPostMessage = ({ name, data }) => {
      expect(name).to.equals('testMessage');
      expect(data).to.equals('testPayload');
      done();
    };

    relay.emit('testMessage', 'testPayload');
  });
});
