
function getCostWeek(cost) {
  if (cost <= 1000 || cost <= 2999) {
    return 1.7;
  }
  if (cost <= 3000 || cost <= 4999) {
    return 1.6;
  }
  if (cost <= 5000 || cost <= 9999) {
    return 1.5;
  }
  if (cost <= 10000 || cost <= 19999) {
    return 1.4;
  }
  if (cost <= 20000 || cost <= 29999) {
    return 1.3;
  }
  if (cost <= 30000 || cost <= 39999) {
    return 1.2;
  }
  if (cost <= 40000 || cost <= 49999) {
    return 1.1;
  }
  if (cost <= 50000 || cost <= 59999) {
    return 1;
  }
  if (cost <= 60000 || cost <= 69999) {
    return 0.9;
  }
  if (cost <= 70000 || cost <= 79999) {
    return 0.9;
  }
  if (cost <= 80000 || cost <= 89999) {
    return 0.8;
  }
  if (cost <= 90000 || cost <= 99999) {
    return 0.8;
  }
  if (cost <= 100000 || cost <= 499999) {
    return 0.8;
  }
  if (cost <= 500000 || cost <= 999999) {
    return 0.3;
  }
  if (cost <= 1000000) {
    return 0.2;
  }
}

// TODO
function getCostMonth(cost) {
  if (cost <= 1000 || cost <= 2999) {
    return 1.5;
  }
  if (cost <= 3000 || cost <= 4999) {
    return 1.5;
  }
  if (cost <= 5000 || cost <= 9999) {
    return 1.4;
  }
  if (cost <= 10000 || cost <= 19999) {
    return 1.3;
  }
  if (cost <= 20000 || cost <= 29999) {
    return 1.2;
  }
  if (cost <= 30000 || cost <= 39999) {
    return 1.1;
  }
  if (cost <= 40000 || cost <= 49999) {
    return 1;
  }
  if (cost <= 50000 || cost <= 59999) {
    return 0.9;
  }
  if (cost <= 60000 || cost <= 69999) {
    return 0.8;
  }
  if (cost <= 70000 || cost <= 79999) {
    return 0.8;
  }
  if (cost <= 80000 || cost <= 89999) {
    return 0.8;
  }
  if (cost <= 90000 || cost <= 99999) {
    return 0.8;
  }
  if (cost <= 100000 || cost <= 499999) {
    return 0.3;
  }
  if (cost <= 500000 || cost <= 999999) {
    return 0.2;
  }
  if (cost <= 1000000) {
    return 0.2;
  }
}

// TODO
function getOneTimeCost(cost) {
  if (cost <= 1000 || cost <= 2999) {
    return 1.4;
  }
  if (cost <= 3000 || cost <= 4999) {
    return 1.2;
  }
  if (cost <= 5000 || cost <= 9999) {
    return 1.2;
  }
  if (cost <= 10000 || cost <= 19999) {
    return 1;
  }
  if (cost <= 20000 || cost <= 29999) {
    return 1;
  }
  if (cost <= 30000 || cost <= 39999) {
    return 0.9;
  }
  if (cost <= 40000 || cost <= 49999) {
    return 0.8;
  }
  if (cost <= 50000 || cost <= 59999) {
    return 0.7;
  }
  if (cost <= 60000 || cost <= 69999) {
    return 0.6;
  }
  if (cost <= 70000 || cost <= 79999) {
    return 0.6;
  }
  if (cost <= 80000 || cost <= 89999) {
    return 0.6;
  }
  if (cost <= 90000 || cost <= 99999) {
    return 0.6;
  }
  if (cost <= 100000 || cost <= 499999) {
    return 0.6;
  }
  if (cost <= 500000 || cost <= 999999) {
    return 0.3;
  }
  if (cost <= 1000000) {
    return 0.2;
  }
}

function getPhisCostWeek(cost) {
  if (cost <= 1000 || cost <= 2999) {
    return 1.5;
  }
  if (cost <= 3000 || cost <= 4999) {
    return 1.5;
  }
  if (cost <= 5000 || cost <= 9999) {
    return 1.4;
  }
  if (cost <= 10000 || cost <= 19999) {
    return 1.3;
  }
  if (cost <= 20000 || cost <= 29999) {
    return 1.2;
  }
  if (cost <= 30000 || cost <= 39999) {
    return 1.1;
  }
  if (cost <= 40000 || cost <= 49999) {
    return 1;
  }
  if (cost <= 50000 || cost <= 59999) {
    return 0.9;
  }
  if (cost <= 60000 || cost <= 69999) {
    return 0.9;
  }
  if (cost <= 70000 || cost <= 79999) {
    return 0.8;
  }
  if (cost <= 80000 || cost <= 89999) {
    return 0.8;
  }
  if (cost <= 90000 || cost <= 99999) {
    return 0.8;
  }
  if (cost <= 100000 || cost <= 499999) {
    return 0.8;
  }
  if (cost <= 500000 || cost <= 999999) {
    return 0.3;
  }
  if (cost <= 1000000) {
    return 0.2;
  }
}

function getPhisCostMonth(cost) {
  if (cost <= 1000 || cost <= 2999) {
    return 1.3;
  }
  if (cost <= 3000 || cost <= 4999) {
    return 1.3;
  }
  if (cost <= 5000 || cost <= 9999) {
    return 1.2;
  }
  if (cost <= 10000 || cost <= 19999) {
    return 1.1;
  }
  if (cost <= 20000 || cost <= 29999) {
    return 1;
  }
  if (cost <= 30000 || cost <= 39999) {
    return 1;
  }
  if (cost <= 40000 || cost <= 49999) {
    return 0.9;
  }
  if (cost <= 50000 || cost <= 59999) {
    return 0.8;
  }
  if (cost <= 60000 || cost <= 69999) {
    return 0.8;
  }
  if (cost <= 70000 || cost <= 79999) {
    return 0.7;
  }
  if (cost <= 80000 || cost <= 89999) {
    return 0.7;
  }
  if (cost <= 90000 || cost <= 99999) {
    return 0.7;
  }
  if (cost <= 100000 || cost <= 499999) {
    return 0.7;
  }
  if (cost <= 500000 || cost <= 999999) {
    return 0.3;
  }
  if (cost <= 1000000) {
    return 0.2;
  }
}

function getPhisCostOneTime(cost) {
  if (cost <= 1000 || cost <= 2999) {
    return 0.4;
  }
  if (cost <= 3000 || cost <= 4999) {
    return 0.4;
  }
  if (cost <= 5000 || cost <= 9999) {
    return 0.4;
  }
  if (cost <= 10000 || cost <= 19999) {
    return 0.4;
  }
  if (cost <= 20000 || cost <= 29999) {
    return 0.4;
  }
  if (cost <= 30000 || cost <= 39999) {
    return 0.4;
  }
  if (cost <= 40000 || cost <= 49999) {
    return 0.4;
  }
  if (cost <= 50000 || cost <= 59999) {
    return 0.4;
  }
  if (cost <= 60000 || cost <= 69999) {
    return 0.3;
  }
  if (cost <= 70000 || cost <= 79999) {
    return 0.3;
  }
  if (cost <= 80000 || cost <= 89999) {
    return 0.3;
  }
  if (cost <= 90000 || cost <= 99999) {
    return 0.3;
  }
  if (cost <= 100000 || cost <= 499999) {
    return 0.3;
  }
  if (cost <= 500000 || cost <= 999999) {
    return 0.3;
  }
  if (cost <= 1000000) {
    return 0.2;
  }
}
// 1)Кол-во контактов в день = кол-во операторов * кол-во звонков в день
function dayContacts(operators, dayCalls) {
  return operators * dayCalls;
}

// 2)Кол-во контактов в неделю = кол-во операторов * кол-во звонков в день * кол-во рабочих дней в неделю(В ЗАВИСИМОСТИ ОТ ВЫСТАВЛЕННОГО ГРАФИКА РАБОТЫ)
function weekContacts(operators, dayCalls, schedule) {
  return operators * dayCalls * schedule;
}

function monthContacts(operators, dayCalls, schedule) {
  return operators * dayCalls * schedule;
}

function oneTimeSubCost(contactsAll) {
  return contactsAll * getOneTimeCost(contactsAll);
}

function oneTimeSubCostFis(contactsAll) {
  return contactsAll * getPhisCostOneTime(contactsAll);
}

function remove() {
  document.getElementById('schedule').style.visibility = 'hidden';
  document.getElementById('operatorNumber').style.visibility = 'hidden';
  document.getElementById('callNumber').style.visibility = 'hidden';
  document.getElementById('contactNumber').style.visibility = 'visible';
  document.getElementById('sumDay').innerText = '';
  document.getElementById('sumWeek').innerText = '';
  document.getElementById('sumMonth').innerText = '';
  document.getElementById('operators').value = '';
  document.getElementById('phoneCalls').value = '';
  document.getElementById('costWeek').innerText = '';
  document.getElementById('costMonth').innerText = '';
}

function show() {
  document.getElementById('schedule').style.visibility = 'visible';
  document.getElementById('operatorNumber').style.visibility = 'visible';
  document.getElementById('callNumber').style.visibility = 'visible';
  document.getElementById('contactNumber').style.visibility = 'hidden';
  document.getElementById('totalContacts').value = '';
  document.getElementById('sumDay').innerText = '';
  document.getElementById('sumWeek').innerText = '';
  document.getElementById('sumMonth').innerText = '';
  document.getElementById('costWeek').innerText = '';
  document.getElementById('costMonth').innerText = '';
}

function clearResult() {
  document.getElementById('sumDay').innerText = '';
  document.getElementById('sumWeek').innerText = '';
  document.getElementById('sumMonth').innerText = '';
  document.getElementById('costWeek').innerText = '';
  document.getElementById('costMonth').innerText = '';
  document.getElementById('sumBase').innerText = '';
}

function getPricing() {
  const business = document.getElementById('business').value; // Тип базы
  const totalContacts = document.getElementById('totalContacts').valueAsNumber; // Количество контактов:
  const scheduleMonth = document.getElementById('duration').value.split(' ')[1];
  const scheduleWeek = document.getElementById('duration').value.split(' ')[0]; // График:

  const operators = document.getElementById('operators').valueAsNumber; // Количество операторов:
  const dayCalls = document.getElementById('phoneCalls').valueAsNumber; // Количество звонков в день:
  const week = weekContacts(operators, dayCalls, scheduleWeek);
  const month = monthContacts(operators, dayCalls, scheduleMonth);
  console.log(scheduleWeek);
  console.log(scheduleMonth);

  if (isNaN(operators) || isNaN(dayCalls)) {
    if (business === 'false') {
      document.getElementById('sumBase').innerText = `Стоимость базы: ${oneTimeSubCostFis(totalContacts)}`;
    } else {
      document.getElementById('sumBase').innerText = `Стоимость базы: ${oneTimeSubCost(totalContacts)}`;
    }
  } else if (business === 'false') {
    document.getElementById('sumDay').innerText = `Итак, в день вы будете получать по ${dayContacts(operators, dayCalls)} контактов, `;
    document.getElementById('sumWeek').innerText = `\n В неделю по ${weekContacts(operators, dayCalls, scheduleWeek)} контактов `;
    document.getElementById('sumMonth').innerText = ` В месяц по ${monthContacts(operators, dayCalls, scheduleMonth)} контактов `;
    document.getElementById('costWeek').innerText = `\n за ${Math.round(weekContacts(operators, dayCalls, scheduleWeek) * getPhisCostWeek(week))} рублей,`;
    document.getElementById('costMonth').innerText = `\n за ${Math.round(monthContacts(operators, dayCalls, scheduleMonth) * getPhisCostMonth(month))} рублей.`;
  } else {
    document.getElementById('sumDay').innerText = `Итак, в день вы будете получать по ${dayContacts(operators, dayCalls)} контактов, `;
    document.getElementById('sumWeek').innerText = `\n В неделю по ${weekContacts(operators, dayCalls, scheduleWeek)} контактов `;
    document.getElementById('sumMonth').innerText = ` В месяц по ${monthContacts(operators, dayCalls, scheduleMonth)} контактов `;
    document.getElementById('costWeek').innerText = `\n за ${weekContacts(operators, dayCalls, scheduleWeek) * getCostWeek(week)} рублей,`;
    document.getElementById('costMonth').innerText = `\n за ${Math.round(monthContacts(operators, dayCalls, scheduleMonth) * getCostMonth(month))} рублей.`;
  }
}
