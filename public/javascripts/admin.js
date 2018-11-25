$('#signup').click(() => {
  document.getElementById('iframeData').src = '/admin/signup';
});

$('#remove').click(() => {
  document.getElementById('iframeData').src = '/admin/remove';
});

$('#upload').click(() => {
  document.getElementById('iframeData').src = '/admin/upload';
});

$('#distribution').click(() => {
  document.getElementById('iframeData').src = '/admin/base';
});

$('#statistics').click(() => {
  document.getElementById('iframeData').src = '/admin/statistics';
});

$('#status').click(() => {
  document.getElementById('iframeData').src = '/PM/status.html';
});

$('#leads').click(() => {
  document.getElementById('iframeData').src = '/PM/lid.html';
});
