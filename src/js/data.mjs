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
  dataType: 'active',
};
export function initTasks() {
  //TODO if we have something in local storage, we'll put it in an array
  state.tasks = ['have fun', 'be rich', 'be happy at least'];
  //TODO the same with complete tasks
}
