type CollectionEvent = 'relay';

interface Dictionary<Item> {
  [ name: string ]: Item;
}

type SerializableValue = string | number | boolean | undefined;

interface CollectionData {
  name?: CollectionEvent;
  tags?: Dictionary<SerializableValue>;
  attachments?: Dictionary<SerializableValue>;
  titles?: Dictionary<SerializableValue>;
  properties?: Dictionary<string>;
  values?: Dictionary<{ value: string, e: string }>;
}

let sendInterval: number;
let collectedData: CollectionData[] = [];

window.addEventListener('blur', () => clearInterval(sendInterval));
window.addEventListener('focus', () => setup());

setup();

async function send() {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  const params = {
      site: 'Survival Clicker 2',
      referrer: document.referrer,
      properties: { width, height },
      events: collectedData,
  };

  await fetch('https://m.7777.lt/a_sites/entry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    credentials: 'include',
  });

  collectedData = [];
}

function setup() {
  sendInterval = setInterval(() => send(), 10e3);
  send();
}

export function collect(data: CollectionData) {
  collectedData.push(data);
}
