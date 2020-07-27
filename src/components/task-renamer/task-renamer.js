import React, { useState, useEffect } from 'react';
import './task-renamer.scss';
import processValue from '../utils/processValue';
import makeCorrectValue from '../utils/makeCorrectValue';

const TaskRenamer = ({ taskToRename, taskId, submitRenamedTask }) => {

  const [ action, setAction ] = useState('');

  const [ isValid, setValid ] = useState(true);

  useEffect(() => {
    setAction(taskToRename);
    document.querySelector(`#${taskId}`).focus();
  }, [ taskToRename, taskId ]);

  const submitReanamed = (e) => {
    e.preventDefault();
    if (isValid) {
      const value = makeCorrectValue(action);
      submitRenamedTask(value, taskId);
      setAction(value);
    } else {
      return
    }
  }

  const clickEvent = (e) => {
    const form = document.querySelector(`.renamer`);
    const target = e.target;
    if (form === !target || !form.contains(target)) {
      cancelRename(e);
    } else {
      return
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickEvent);
    return () => document.removeEventListener('click', clickEvent);
  }, [ ]);

  const onValueChange = (e) => {
    const value = e.target.value;
    processValue(setAction, setValid, value);
  }

  const cancelRename = (e) => {
    e.preventDefault();
    submitRenamedTask(taskToRename, taskId);
  }

  const acceptBtnClass = (!isValid) ? 'unactive-btn' : '';
  const inputClass = (!isValid) ? 'err-input' : '';
  const placeholderClass = (isValid) ? 'hide-placeholder': '';

  return (
    <form
      className={`renamer`}
      onSubmit={submitReanamed}>
      <input
        id={taskId}
        className={`input-rename ${inputClass}`}
        type="text"
        onChange={onValueChange}
        value={action}>
      </input>
      <p className={`placeholder ${placeholderClass}`}>field can`t be empty...</p>
      <div className="rename-btns">
        <button
          className={`submit-btn ${acceptBtnClass}`}>
          <i className="fas fa-check"></i>
        </button>
        <button
          className='cancel-btn'
          onClick={cancelRename}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </form>
  );
}

export default TaskRenamer;