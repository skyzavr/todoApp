import * as data from './data.mjs';
import greeting from './greetings.mjs';
import * as list from './todo.mjs';
///////////////
//updating our LS data
function updateLS(tasks, completeTask) {
  const LSDataObj = JSON.stringify({
    LStasks: tasks,
    LSCompTasks: completeTask,
  });
  localStorage.setItem('LSData', LSDataObj);
}
function pushArr(item) {
  list.addValue(data.todoUl, data.state.tasks, data.state.dataType);
  updateLS(data.state.tasks, data.state.completeTasks);
  clearInpField(item);
}
function addValueToList(item) {
  data.inpBtn.addEventListener('click', function () {
    pushArr(item);
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
}
async function statusChanging(el, task, complTask) {
  el.addEventListener('click', function (e) {
    if (e.target.className.includes('bin')) {
      e.target.closest('.list__el').classList.contains('checked')
        ? list.removeElement(e, complTask)
        : list.removeElement(e, task);
      updateLS(task, complTask);
    }
    if (e.target.className.includes('list__checkbox')) {
      list
        .completeTask(e, task, complTask)
        .then(() => updateLS(task, complTask));
    }
  });
}
function updateEditableList(prevText, task, index) {
  const value = document.querySelector('.input').value;
  prevText.innerHTML = ` <span class='el'>${value}</span>`;
  //if we click on the first item, it's means it's the last one in the array
  const length = task.length - 1;
  const ind = length - index;
  task.splice(ind, 1, value);
}
function updateEditableField(task, completeTask) {
  document.addEventListener('click', (e) => {
    const prevText = e.target;
    if (prevText.classList.contains('el')) {
      let li = prevText.closest('li'); // get reference by using closest
      let nodes = Array.from(li.closest('ul').children); // get array
      let index = nodes.indexOf(li);
      prevText.innerHTML = `<input type='text' autofocus value='${prevText.innerHTML}' class='input'>`;
      prevText.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
          updateEditableList(prevText, task, index);
          updateLS(task, completeTask);
        }
      });
    }
  });
}
function init() {
  data.initTasks();
  greeting(data.state.hours.hour, data.state.hours.name);
  list.renderToDoList(data.state.tasks, data.todoUl, data.state.dataType);
  updateEditableField(data.state.tasks, data.state.completeTasks);
  clearInpField(data.state.exmList);
  themeSwithc();
  addValueToList(data.state.exmList);
  statusChanging(data.todoUl, data.state.tasks, data.state.completeTasks);
  switchTasks();
}
init();
