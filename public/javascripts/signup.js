$('#submit_button').click(() => {
  axios.post('/api/v3/signup', {
    username: $('body > div > div > div.col-lg-6.text-center.pt-3.lg1 > form > div:nth-child(1) > input').val(),
    role: $('#exampleFormControlSelect1').val(),
    yandex: $('#exampleInputPassword1').val(),
    email: $('#exampleInputEmail1').val(),
  })
    .then((response) => {
      swal(`Логин: ${response.data.username.toString()}\n Пароль: ${response.data.password.toString()}`);
    })
    .catch((error) => {
      console.log(error);
      swal(`${error}`, {
        button: false,
      });
    });
});
