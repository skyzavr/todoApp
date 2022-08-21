import * as data from './data.mjs';
import greeting from './greetings.mjs';
import * as list from './todo.mjs';
function pushArr() {
  list.addValue(
    data.todoUl,
    data.state.tasks,
    data.state.theme,
    data.state.dataType
  );
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
  if (!data.state.dataType)
    list.renderToDoList(
      data.state.tasks,
      data.todoUl,
      data.state.theme,
      (data.state.dataType = 'active')
    );
  const swithcList = document.querySelector('.sideBar__list');
  swithcList.addEventListener('click', function (e) {
    data.state.dataType = e.target.dataset.type;
    let taskArr =
      data.state.dataType === 'active'
        ? data.state.tasks
        : data.state.completeTasks;
    data.todoUl.innerHTML = '';
    list.renderToDoList(
      taskArr,
      data.todoUl,
      data.state.theme,
      data.state.dataType
    );
    document
      .querySelectorAll('.ul_li')
      .forEach((el) => el.classList.toggle('active'));
  });
}
function init() {
  greeting(data.state.hours.hour, data.state.hours.name);
  data.initTasks();
  addValueToList();
  list.statusChanging(data.todoUl, data.state.tasks, data.state.completeTasks);
  switchTasks();
}
init();
