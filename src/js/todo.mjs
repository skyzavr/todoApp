export function renderToDoList(listOfTasks, Ul, theme, dataType) {
  const todoUl = document.querySelector('.todo__ul');
  //TODO choosing a category (work, personal, gross)
  listOfTasks.forEach((el) => {
    const activeType = `<li class='list__el'><input type="checkbox"class="list__checkbox work">${el} <span class='list__bin'><img src="src/img/bin_${theme}Theme.svg" class="bin" alt="bin"><span/>
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
export function addValue(el, task, theme, dataType) {
  const inputText = document.querySelector('.input__form');
  const inputValue = inputText.value;
  if (inputText.value.trim() === '') {
    showError();
    inputText.value = '';
    return;
  }
  renderToDoList([inputValue], el, theme, dataType);
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
    if (e.target.className === 'bin') {
      removeElement(e, task);
    }
    if (e.target.className.includes('list__checkbox')) {
      completeTask(e, complTask, task);
    }
    //TODO editable element
    // if (e.target.className === 'list__el') {
    //   console.log('list__eeeel');
    // }
  });
}
