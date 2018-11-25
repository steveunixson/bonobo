$('#remove').click(() => {
  axios.post('/api/v3/remove', {
    username: $('body > div > div > div.col-lg-6.text-center.pt-3.lg2 > form > div > input').val(),
  })
    .then((response) => {
      $('body > div > div > div.col-lg-6.text-center.pt-3.lg2 > form > div > input').val('');
      swal(`Статус: ${response.data.message.toString()}`, {
        button: false,
      });
    })
    .catch((error) => {
      console.log(error);
      swal(`${error}`, {
        button: false,
      });
    });
});
