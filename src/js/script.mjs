import * as data from './data.mjs';
import greeting from './greetings.mjs';
import * as list from './todo.mjs';
function pushArr() {
  list.addValue(data.todoUl, data.state.tasks, data.state.dataType);
}
function addValueToList() {
  data.inpBtn.addEventListener('click', function () {
    pushArr();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
      pushArr();
    }
  });
}
function switchTasks() {
  const swithcList = document.querySelectorAll('.ul_li');
  swithcList.forEach((el) => {
    el.addEventListener('click', function (e) {
      console.log(el);
      data.todoUl.innerHTML = '';
      data.state.dataType = e.target.dataset.type;
      if (!data.state.dataType) return;
      const taskArr = data.state.dataType.includes('active')
        ? data.state.tasks
        : data.state.completeTasks;
      list.renderToDoList(
        taskArr,
        data.todoUl,
        data.state.dataType,
        getBinTheme()
      );
      swithcList.forEach((el) => {
        el.classList.toggle(`active`);
      });
    });
  });
}
function getBinTheme() {
  if (document.querySelector('body').classList.value === 'dark')
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
    body.toggle('dark');
    changeThemeBin(getBinTheme());
  });
}
function init() {
  themeSwithc();
  greeting(data.state.hours.hour, data.state.hours.name);
  data.initTasks();
  list.renderToDoList(data.state.tasks, data.todoUl, data.state.dataType);
  addValueToList();
  list.statusChanging(data.todoUl, data.state.tasks, data.state.completeTasks);
  switchTasks();
}
init();
