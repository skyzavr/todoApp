import * as data from './data.mjs';
import greeting from './greetings.mjs';
import * as list from './todo.mjs';
function pushArr(item) {
  list.addValue(data.todoUl, data.state.tasks, data.state.dataType);
  clearInpField(item);
}
function addValueToList(item) {
  data.inpBtn.addEventListener('click', function () {
    pushArr(item);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
      pushArr(item);
    }
  });
}
function switchTasks() {
  const swithcListLi = document.querySelectorAll('.ul_li');
  const swithcList = document.querySelectorAll('.barList');
  const inputField = document.querySelector('.todo__input');
  let { dataType } = data.state.dataType;
  swithcList.forEach((el) => {
    el.addEventListener('click', function (e) {
      const elPar = el.closest('.ul_li');
      if (elPar.classList.contains('active')) return;
      dataType = e.target.dataset.type;
      list.switchInput(inputField, 'inpDisplay');
      data.todoUl.innerHTML = '';
      const taskArr = dataType.includes('active')
        ? data.state.tasks
        : data.state.completeTasks;
      list.renderToDoList(taskArr, data.todoUl, dataType, getBinTheme());
      swithcListLi.forEach((el) => el.classList.toggle(`active`));
    });
  });
}
function getBinTheme() {
  if (document.querySelector('body').classList.value.includes('dark'))
    return 'BinDark';
}
function changeThemeBin(theme) {
  const binList = document.querySelectorAll('.bin');
  binList.forEach((el) => {
    if (theme) el.classList.toggle(`${theme}`);
  });
}
function themeSwithc() {
  //btnSwitch
  const btn = document.querySelector('.btnSwitch');
  const body = document.querySelector('body').classList;
  btn.addEventListener('click', function () {
    body.value === 'dark' ? (btn.value = 'Dark') : (btn.value = 'Light');
    body.toggle('dark');
    changeThemeBin(getBinTheme());
  });
}
function rndList(items) {
  const len = items.length - 1;
  const rnd = Math.floor(Math.random() * (len - 0 + 1));
  return items[rnd];
}
function clearInpField(item) {
  const inp = document.querySelector('.input__form');
  inp.placeholder = `Start typing something, like ${rndList(item)}`;
  inp.addEventListener('click', function () {
    inp.value = '';
  });
}
function init() {
  clearInpField(data.state.exmList);
  rndList(data.state.exmList);
  themeSwithc();
  greeting(data.state.hours.hour, data.state.hours.name);
  data.initTasks();
  list.renderToDoList(data.state.tasks, data.todoUl, data.state.dataType);
  addValueToList(data.state.exmList);
  list.statusChanging(data.todoUl, data.state.tasks, data.state.completeTasks);
  switchTasks();
}
init();
