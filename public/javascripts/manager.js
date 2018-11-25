function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function getCall(value) {
  if (value.company === '' || value.phone === '') {
    console.log('NUMBER AND COMPANY IS EMPTY!');
  } else {
    const yandexID = $('#yandexID').val();
    window.location = `/manager/call?number=${btoa(value.phone)}&company=${value.company}&yandex=${yandexID}&username=${getParameterByName('username')}`;
  }
}
