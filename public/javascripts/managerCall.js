const phoneNumber = $('#number').val();
const init = async () => {
  const Token = await axios.get('/api/v3/yandex-key');
  const secretKey = await $('#yandexID').val();
  const mcConfig = { login: `${Token.data.yandex}`, password: `${secretKey}` };
  await MightyCallWebPhone.ApplyConfig(mcConfig);
  await MightyCallWebPhone.Phone.Init('phone');
};
init()
  .then(() => {
    // MightyCallWebPhone.Phone.Call(atob(phoneNumber.toString()));
    console.log(atob(phoneNumber.toString()));
    $('body > div.container-fluid.pt-2 > div > div.col-lg-10').css('visibility', 'hidden');
  })
  .catch((exception) => {
    swal(`${exception.toString()}`, {
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
// .css('visibility', 'hidden').val('Выберите проект');

function disable() {
  $('#selectDeal').css('visibility', 'hidden').val('Выберите проект'); // сделка перезвонить
  $('#selectDealStatus').css('visibility', 'hidden').val('Выберите статус'); // сделка статус
  $('#dealTextArea > textarea').css('visibility', 'hidden').val(''); // сделка текст
  $('#selectRecall').css('visibility', 'hidden').val('Выберите проект'); // перезвонить проект
  $('#selectRecallStatus').css('visibility', 'hidden').val('Выберите статус'); // перезвонить статус
  $('#recallDate').css('visibility', 'hidden').val('');
  $('#recallTime').css('visibility', 'hidden').val('');
  $('#selectDenyStatus').css('visibility', 'hidden').val('Выберите статус');
  $('#exampleInputEmail1').css('visibility', 'hidden').val('');
}

$('body > div.container-fluid.pt-3 > div > div:nth-child(2) > button').click(() => { // отправить статус
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').css('visibility', 'hidden');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').css('visibility', 'hidden');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').css('visibility', 'hidden');
  const send = async () => {
    if ($('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val() === 'active') {
      const data = {
        phone: atob(phoneNumber.toString()),
        company: getParameterByName('company'),
        success: true,
        operator: getParameterByName('username'),
        type: 'Сделка',
        project: $('#selectDeal').val(),
        status: $('#selectDealStatus').val(),
        comment: $('#dealTextArea > textarea').val(),
      };
      await axios.post('/api/v3/status', data);
    }
    if ($('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val() === 'active') {
      const data = {
        phone: atob(phoneNumber.toString()),
        company: getParameterByName('company'),
        success: false,
        operator: getParameterByName('username'),
        type: 'Перезвон',
        project: $('#selectRecall').val(),
        status: $('#selectRecallStatus').val(),
      };
      await axios.post('/api/v3/status', data);
    }
    if ($('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val() === 'active') {
      const data = {
        phone: atob(phoneNumber.toString()),
        company: getParameterByName('company'),
        success: false,
        operator: getParameterByName('username'),
        type: 'Отказ',
        status: $('#selectDenyStatus').val(),
        email: $('#exampleInputEmail1').val(),
      };
      await axios.post('/api/v3/status', data);
    }
  };
  send()
    .then(() => {
      disable();
      window.location = `/manager/start?username=${getParameterByName('username')}`;
    })
    .catch((exception) => {
      swal(`${exception.toString()}`, {
        button: false,
      });
    });
});

$('body > div.container-fluid.pt-3 > div > div:nth-child(1) > div > button').click(() => {
  MightyCallWebPhone.Phone.HangUp();
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').css('visibility', 'visible');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').css('visibility', 'visible');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').css('visibility', 'visible');
});

$('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').click(() => {
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val('active');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val('');
  disable();
  $('#selectDeal').css('visibility', 'visible').val('Выберите проект').change(() => {
    if ($('#selectDeal').val() === 'Good Morning') {
      $('#selectDealStatus > option:nth-child(2)').prop('disabled', false);
      $('#selectDealStatus > option:nth-child(3)').prop('disabled', false);
      $('#selectDealStatus > option:nth-child(4)').prop('disabled', true);
      $('#selectDealStatus > option:nth-child(5)').prop('disabled', true);
    } else {
      $('#selectDealStatus > option:nth-child(2)').prop('disabled', true);
      $('#selectDealStatus > option:nth-child(3)').prop('disabled', true);
      $('#selectDealStatus > option:nth-child(4)').prop('disabled', false);
      $('#selectDealStatus > option:nth-child(5)').prop('disabled', false);
    }
    $('#selectDealStatus').css('visibility', 'visible').val('Выберите статус').change(() => {
      $('#dealTextArea > textarea').css('visibility', 'visible').val(''); // сделка текст
    }); // сделка статус
  });
});

$('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').click(() => {
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val('active');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val('');
  disable();
  $('#selectRecall').css('visibility', 'visible').val('Выберите проект').change(() => {
    if ($('#selectRecall').val() === 'Good Morning') {
      $('#selectRecallStatus > option:nth-child(2)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(3)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(4)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(5)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(6)').prop('disabled', true);
      $('#selectRecallStatus > option:nth-child(7)').prop('disabled', true);
      $('#selectRecallStatus > option:nth-child(8)').prop('disabled', true);
      $('#selectRecallStatus > option:nth-child(9)').prop('disabled', true);
    } else {
      $('#selectRecallStatus > option:nth-child(2)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(3)').prop('disabled', true);
      $('#selectRecallStatus > option:nth-child(4)').prop('disabled', true);
      $('#selectRecallStatus > option:nth-child(5)').prop('disabled', true);
      $('#selectRecallStatus > option:nth-child(6)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(7)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(8)').prop('disabled', false);
      $('#selectRecallStatus > option:nth-child(9)').prop('disabled', false);
    }
    $('#selectRecallStatus').css('visibility', 'visible').val('Выберите статус').change(() => {
      $('#recallDate').css('visibility', 'visible');
      $('#recallTime').css('visibility', 'visible');
    });
  });
});

$('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').click(() => {
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(1)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(2)').val('');
  $('body > div.container-fluid.pt-2 > div > div.col-lg-2.text-center > div > button:nth-child(3)').val('active');
  disable();
  $('#selectDenyStatus').css('visibility', 'visible').val('Выберите статус').change(() => {
    if ($('#selectDenyStatus').val() === 'offer') {
      $('#exampleInputEmail1').val('').css('visibility', 'visible');
    } else {
      $('#exampleInputEmail1').val('').css('visibility', 'hidden');
    }
  });
});
