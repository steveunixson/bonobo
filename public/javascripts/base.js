$('body > div > div > div.col-lg-6.text-center.pt-3.lg4 > div:nth-child(1) > div.btn-group > button:nth-child(2)').click(() => {
  axios.put('/admin/distribution', {
    username: $('body > div > div > div.col-lg-6.text-center.pt-3.lg4 > div:nth-child(1) > div:nth-child(1) > input').val(),
    base: $('#exampleFormControlSelect1').val(),
  })
    .then((result) => {
      swal(`${result.data.msg.toString()}`, {
        button: false,
      });
    })
    .catch((exception) => {
      swal(`${exception.toString()}`, {
        button: false,
      });
    });
});
