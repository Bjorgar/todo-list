const makeCorrectValue = (task) => {
  const value = task.split(/\s+/g).join(' ');
  const correctTask =
    (value[0] === ' ' && value[value.length - 1] === ' ') ? value.slice(1, -1) :
    (value[0] === ' ') ? value.slice(1) :
    (value[value.length -1 ] === ' ') ? value.slice(0, -1) : value;
  return correctTask;
}

export default makeCorrectValue;