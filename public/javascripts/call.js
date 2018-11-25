/* eslint-disable no-plusplus */
const init = async () => {
  const Token = await axios.get('/api/v3/yandex-key');
  const secretKey = await $('#yandexid').val();
  const mcConfig = { login: `${Token.data.yandex}`, password: `${secretKey}` };
  await MightyCallWebPhone.ApplyConfig(mcConfig);
  await MightyCallWebPhone.Phone.Init('phone');
};
init()
  .catch((exception) => {
    swal(`${exception}`, {
      button: false,
    });
  });

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

if (localStorage.getItem('base') === null) {
  const base = $('#base').val();
  localStorage.setItem('base', base);
} else if (localStorage.getItem('base') !== $('#base').val()) {
  const base = $('#base').val();
  localStorage.removeItem('step');
  localStorage.setItem('base', base);
}

if (localStorage.getItem('step') === null) {
  localStorage.setItem('step', '0');
}
let step = parseInt(localStorage.getItem('step'));


$('#nextNumber').click(() => {
  function counter() {
    localStorage.setItem('step', step);
    return step++;
  }
  axios.post('/api/v3/numbers', { base: $('#base').val(), id: `${counter()}` })
    .then((response) => {
      console.log(`+7${response.data.msg.phoneNumber.replace(/\D/g, '').substring(1)}`);
      MightyCallWebPhone.Phone.Call(`+7${response.data.msg.phoneNumber.replace(/\D/g, '').substring(1)}`);
      $('#companyName').text(`Компания: ${response.data.msg.companyName}`);
      $('#phoneNumber').val(`+7${response.data.msg.phoneNumber.replace(/\D/g, '').substring(1)}`);
      $('#company').val(response.data.msg.companyName);
    })
    .catch((exception) => {
      swal(`${exception}`, {
        button: false,
      });
    });
});

$('#prevNumber').click(() => {
  function counter() {
    return step--;
  }
  axios.post('/api/v3/numbers', { base: $('#base').val(), id: `${counter()}` })
    .then((response) => {
      console.log(`+7${response.data.msg.phoneNumber.replace(/\D/g, '').substring(1)}`);
      $('#companyName').text(`Компания: ${response.data.msg.companyName}`);
    })
    .catch((exception) => {
      swal(`${exception}`, {
        button: false,
      });
    });
});

const startTime = new Date().toLocaleTimeString();
localStorage.setItem('startTime', startTime);

function disable() {
  // select option disabler---------------
  $('#selectLeed').css('visibility', 'hidden').val('Выберите проект');
  $('#selectLeedStatus').css('visibility', 'hidden').val('Выберите направление');
  $('#date_lead').css('visibility', 'hidden').val('');
  $('#time_lead').css('visibility', 'hidden').val('');
  $('#selectRecallProject').css('visibility', 'hidden').val('Выберите проект');
  $('#selectRecallReason').css('visibility', 'hidden').val('Выберите статус');
  $('#date_recall').css('visibility', 'hidden').val('');
  $('#time_recall').css('visibility', 'hidden').val('');
  $('#selectDeny').css('visibility', 'hidden').val('Выберите причину');
  $('#lprEmailInput').css('visibility', 'hidden').val('');
  // --------------------------------------
}
$('body > div.container-fluid.pt-2').css('visibility', 'hidden');
$('body > div.container-fluid.pt-3 > div > div:nth-child(1) > button').click(() => { // Закончить разговор
  disable();
  MightyCallWebPhone.Phone.HangUp();
  $('body > div.container-fluid.pt-2').css('visibility', 'visible');
  $('body > div.container-fluid.pt-3 > div > div:nth-child(1) > button').prop('disabled', true);
  $('#nextNumber').prop('disabled', true);
  $('#prevNumber').prop('disabled', true);
  $('body > div.container-fluid.pt-3 > div > div:nth-child(3) > button').prop('disabled', true);
});

$('body > div.container-fluid.pt-3 > div > div:nth-child(3) > button').click(() => {
  const endTime = new Date().toLocaleTimeString();
  const sendTime = async () => {
    await axios.post('/api/v3/user/stats', {
      start: localStorage.getItem('startTime'),
      end: endTime,
      operator: getParameterByName('operator'),
      localTime: endTime,
      localDate: new Date().toLocaleDateString(),
      callNumber: step,
    });
  };
  sendTime()
    .then(() => {
      window.location = `/operator/start?operator=${getParameterByName('operator')}`;
    })
    .catch((exception) => {
      swal(`${exception.toString()}`, {
        button: false,
      });
    });
});

$('body > div.container-fluid.pt-3 > div > div:nth-child(2) > div > button').click(() => { // Кнопка отправить статус
  $('body > div.container-fluid.pt-2').css('visibility', 'hidden');
  $('body > div.container-fluid.pt-3 > div > div:nth-child(1) > button').prop('disabled', false);
  $('#nextNumber').prop('disabled', false);
  $('#prevNumber').prop('disabled', false);
  $('body > div.container-fluid.pt-3 > div > div:nth-child(3) > button').prop('disabled', false);
  const send = async () => {
    if ($('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val() === 'active') {
      const data = {
        id: step,
        base: $('#base').val(),
        phone: $('#phoneNumber').val(),
        company: $('#company').val(),
        success: true,
        operator: getParameterByName('operator'),
        type: 'Лид',
        project: $('#selectLeed').val(),
        status: $('#selectLeedStatus').val(),
        date: $('#date_lead').val(),
        time: $('#time_lead').val(),
      };
      await axios.post('/api/v3/status', data);
    }
    if ($('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val() === 'active') {
      const data = {
        id: step,
        base: $('#base').val(),
        phone: $('#phoneNumber').val(),
        company: $('#company').val(),
        success: false,
        operator: getParameterByName('operator'),
        type: 'Перезвон',
        project: $('#selectRecallProject').val(),
        status: $('#selectRecallReason').val(),
        date: $('#date_recall').val(),
        time: $('#time_recall').val(),
      };
      await axios.post('/api/v3/status', data);
    }
    if ($('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val() === 'active') {
      const data = {
        id: step,
        base: $('#base').val(),
        phone: $('#phoneNumber').val(),
        company: $('#company').val(),
        success: false,
        operator: getParameterByName('operator'),
        type: 'Отказ',
        status: $('#selectDeny').val(),
        email: $('#lprEmailInput').val(),
      };
      await axios.post('/api/v3/status', data);
    }
  };
  send()
    .then(() => { disable(); })
    .catch((exception) => {
      disable();
      swal(`${exception}`, {
        button: false,
      });
    });
});

$('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').click(() => { // Кнопка ЛИД
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val('active');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val('');
  disable();
  $('#selectLeed').css('visibility', 'visible').change(() => {
    if ($('#selectLeed').val() === 'Good Morning') {
      $('#selectLeedStatus > option:nth-child(2)').prop('disabled', false);
      $('#selectLeedStatus > option:nth-child(3)').prop('disabled', false);
      $('#selectLeedStatus > option:nth-child(4)').prop('disabled', true);
      $('#selectLeedStatus > option:nth-child(5)').prop('disabled', true);
    } else {
      $('#selectLeedStatus > option:nth-child(2)').prop('disabled', true);
      $('#selectLeedStatus > option:nth-child(3)').prop('disabled', true);
      $('#selectLeedStatus > option:nth-child(4)').prop('disabled', false);
      $('#selectLeedStatus > option:nth-child(5)').prop('disabled', false);
    }
    $('#selectLeedStatus').css('visibility', 'visible').change(() => {
      $('#date_lead').css('visibility', 'visible');
      $('#time_lead').css('visibility', 'visible');
    });
  });
});

$('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').click(() => { // Кнопка перезвонить
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val('active');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val('');
  disable();
  $('#selectRecallProject').css('visibility', 'visible').change(() => {
    if ($('#selectRecallProject').val() === 'Good Morning') {
      $('#selectRecallReason > option:nth-child(3)').prop('disabled', false);
      $('#selectRecallReason > option:nth-child(4)').prop('disabled', false);
      $('#selectRecallReason > option:nth-child(5)').prop('disabled', false);
      // ------------------------Bonobo-------------------------------------
      $('#selectRecallReason > option:nth-child(6)').prop('disabled', true);
      $('#selectRecallReason > option:nth-child(7)').prop('disabled', true);
      $('#selectRecallReason > option:nth-child(8)').prop('disabled', true);
      $('#selectRecallReason > option:nth-child(9)').prop('disabled', true);
    } else {
      $('#selectRecallReason > option:nth-child(3)').prop('disabled', true);
      $('#selectRecallReason > option:nth-child(4)').prop('disabled', true);
      $('#selectRecallReason > option:nth-child(5)').prop('disabled', true);
      // ------------------------Bonobo-------------------------------------
      $('#selectRecallReason > option:nth-child(6)').prop('disabled', false);
      $('#selectRecallReason > option:nth-child(7)').prop('disabled', false);
      $('#selectRecallReason > option:nth-child(8)').prop('disabled', false);
      $('#selectRecallReason > option:nth-child(9)').prop('disabled', false);
    }
    $('#selectRecallReason').css('visibility', 'visible').change(() => {
      $('#date_recall').css('visibility', 'visible');
      $('#time_recall').css('visibility', 'visible');
    });
  });
});

$('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').click(() => { // Кнопка отказ
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val('active');
  disable();
  $('#selectDeny').css('visibility', 'visible').change(() => {
    if ($('#selectDeny').val() === 'offer') {
      $('#lprEmailInput').css('visibility', 'visible');
    } else {
      $('#lprEmailInput').css('visibility', 'hidden');
    }
  });
});
