export function renderToDoList(listOfTasks, Ul, dataType, theme = '') {
  //TODO choosing a category (work, personal, gross)
  listOfTasks.forEach((el) => {
    //fix image white in dark theme
    const activeType = `<li class='list__el'><input type="checkbox"class="list__checkbox work">${el} <span class='list__bin'><img src="src/img/bin_Theme.svg" class="bin ${theme}" alt="bin"><span/>
    </li>`;
    const complType = `<li class='list__el checked'>${el} 
    </li>`;
    const li = dataType === 'active' ? activeType : complType;

    Ul.insertAdjacentHTML('afterbegin', li);
  });
}
function showError() {
  const btn = document.querySelector('.closePopUpBtn');
  const popUp = document.querySelector('.popUp');
  const msgWind = document.querySelector('.message');
  [popUp, msgWind].forEach((el) => el.classList.remove('hidden_PP'));
  btn.addEventListener('click', function () {
    [popUp, msgWind].forEach((el) => el.classList.add('hidden_PP'));
  });
}
export function addValue(el, task, dataType) {
  const inputText = document.querySelector('.input__form');
  const inputValue = inputText.value;
  if (inputText.value.trim() === '') {
    showError();
    inputText.value = '';
    return;
  }
  renderToDoList([inputValue], el, dataType);
  task.push(`${inputValue}`);
  inputText.value = '';
}
function removeElement(e, task) {
  //1.remove element from an aray
  const text = e.target.closest('.list__el').innerText.trim();
  const elId = task.findIndex((el) => el === text);
  task.splice(elId, 1);
  //2. hide element
  e.target.closest('.list__el').className = 'hideBin';
}
function completeTask(e, complTask, task) {
  const el = e.target.closest('.list__el');

  complTask.push(el.innerText.trim());

  setTimeout(() => {
    el.className += ' checked';
    setTimeout(() => {
      el.style.display = 'none';
      setTimeout(() => {
        removeElement(e, task);
      }, 0);
    }, 600);
  }, 300);
}
export function statusChanging(el, task, complTask) {
  el.addEventListener('click', function (e) {
    if (e.target.className.includes('bin')) {
      removeElement(e, task);
    }
    if (e.target.className.includes('list__checkbox')) {
      completeTask(e, complTask, task);
    }
  });
}
