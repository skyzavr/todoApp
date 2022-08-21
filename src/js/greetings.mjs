function getTimeOfTheDay(hours) {
  if (hours > 4 && hours < 12) return 'morning';
  if (hours > 12 && hours < 16) return 'day';
  if ((hours > 16 && hours < 24) || (hours > 0 && hours < 4)) return 'night';
}
export default function greeting(hours, name) {
  const greetingsP = document.querySelector('.greetings');
  return (greetingsP.innerHTML = `Good ${getTimeOfTheDay(hours)}, ${name} :)`);
}
