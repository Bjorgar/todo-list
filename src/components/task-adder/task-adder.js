import React, { useState, useEffect } from 'react';
import './task-adder.scss';
import makeCorrectValue from '../utils/makeCorrectValue';

import processValue from '../utils/processValue';

const TaskAdder = ({ addNewTask }) => {

  const [ action, setAction ] = useState('');

  const [ isValid, setValid ] = useState(false);

  useEffect(() => {
    const form = document.querySelector('.add-form');
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (form === !target || !form.contains(target)) {
        setAction('');
        setValid(false);
      } else { return }
    })
  }, [ ]);

  const onValueChange = (e) => {
    const value = e.target.value;
    processValue(setAction, setValid, value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const value = makeCorrectValue(action);
      addNewTask(value);
      setAction('');
      setValid(false);
    }
    return
  }

  const buttonClass = (!isValid) ? 'unactive-add-btn' : '';

  return(
    <form
      className="add-form"
      onSubmit={onSubmit}>
      <input
        className="add-input"
        type="text"
        onChange={onValueChange}
        placeholder="write new task..."
        value={action}>
      </input>
      <button
        className={`add-btn ${buttonClass}`}>
        Add
      </button>
    </form>
  );
}

export default TaskAdder;