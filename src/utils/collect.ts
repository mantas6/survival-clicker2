import { Subject } from 'rxjs';
import { bufferTime, filter } from 'rxjs/operators';

let isActiveWindow = true;

window.addEventListener('focus', () => isActiveWindow = true);
window.addEventListener('blur', () => isActiveWindow = false);

const collectionSubject = new Subject();

collectionSubject.pipe(
  bufferTime(10e3),
  filter(() => isActiveWindow),
).subscribe(input => {
  send(input);
});

type CollectionEvent = 'error' | 'action';

interface Dictionary<Item> {
  [ name: string ]: Item;
}

interface CollectionData {
  name?: CollectionEvent;
  tags?: Dictionary<string>;
  attachments?: Dictionary<string>;
  titles?: Dictionary<string>;
  properties?: Dictionary<string>;
  values?: Dictionary<{ value: string, e: string }>;
}

export function send(events: CollectionData[]) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  const params = {
      site: 'Survival Clicker 2',
      referrer: document.referrer,
      properties: { width, height },
      events,
  };

  fetch('https://m.7777.lt/a_sites/entry', {
    method: 'POST',
    body: JSON.stringify(params),
    credentials: 'include',
  });
}

export function collect(data?: CollectionData) {
  collectionSubject.next(data);
}
