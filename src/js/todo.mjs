export function renderToDoList(listOfTasks, Ul, dataType, theme = '') {
  //TODO choosing a category (work, personal, gross)
  listOfTasks.forEach((el) => {
    const activeType = `<li class='list__el'><div><input type="checkbox" class="list__checkbox">${el} </div><span class='list__bin'><img src="src/img/bin_Theme.svg" class="bin ${theme}" alt="bin"><span/>
    </li>`;
    const complType = `<li class='list__el checked'><div>${el}</div> <span class='list__bin'><img src="src/img/bin_Theme.svg" class="bin ${theme}" alt="bin"><span/>
    </li>`;
    const li = dataType === 'active' ? activeType : complType;

    Ul.insertAdjacentHTML('afterbegin', li);
  });
}
export function switchInput(input, classInp) {
  return input.classList.toggle(`${classInp}`);
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

export function removeElement(e, task) {
  //1.remove element from an aray
  const text = e.target.closest('.list__el').innerText.trim();
  console.log(e.target.closest('.list__el'));
  const elId = task.findIndex((el) => el === text);
  task.splice(elId, 1);
  console.log(task);
  //2. hide element
  e.target.closest('.list__el').className = 'hideBin';
}

export function completeTask(e, task, complTask) {
  const el = e.target.closest('.list__el');
  //update list of complete task
  complTask.push(el.innerText.trim());
  //rempve element from list of tasks
  return new Promise((resolve) =>
    setTimeout(() => {
      el.className += ' checked';
      setTimeout(() => {
        el.style.display = 'none';
        setTimeout(() => {
          console.log(e.target);
          removeElement(e, task);
          resolve([...task, complTask]);
        }, 0);
      }, 600);
    }, 300)
  );
}
