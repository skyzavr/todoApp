let name = '';
const defaultName = 'mate';
const hour = new Date().getHours();
export const todoUl = document.querySelector('.todo__ul');
export const inpBtn = document.querySelector('.input__btn');
export const state = {
  hours: {
    hour: hour,
    name: defaultName,
  },
  completeTasks: [],
  tasks: [],
  exmList: [
    'morning running',
    'bye milk',
    'clean car',
    'have a bike trip',
    'finish task',
  ],
  dataType: 'active',
};
export function UpdateTasksLS() {
  state.tasks = [...JSON.parse(localStorage.getItem('LSData'))['LStasks']];
  state.completeTasks = [
    ...JSON.parse(localStorage.getItem('LSData'))['LSCompTasks'],
  ];
}
export function initTasks() {
  const myStorage = window.localStorage;
  if (!myStorage['LSData']) {
    state.tasks = ['have fun', 'be rich', 'be happy at least'];
    state.completeTasks = [];
    const LSDataObj = JSON.stringify({
      LStasks: state.tasks,
      LSCompTasks: state.completeTasks,
    });
    localStorage.setItem('LSData', LSDataObj);
    return [...state.tasks, state.completeTasks];
  }
  UpdateTasksLS();
  return [...state.tasks, state.completeTasks];
}
