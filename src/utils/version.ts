export async function isUpdateAvailable() {
  const response = await fetch('/index.html', { cache: 'no-cache' });
  const content = await response.text();

  const doc = new DOMParser().parseFromString(content, 'text/html');
  const $element = doc.querySelector('meta[name="build-time"]');

  if ($element) {
    const latestVersion = $element.getAttribute('content');

    if (process.env.VUE_APP_BUILD_TIME !== latestVersion) {
      return true;
    }
  }

  return false;
}
