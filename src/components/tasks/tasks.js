import React, { useState, Fragment } from 'react';
import './task.scss';
import AttentionPopUp from '../attention-pop-up';

const Tasks = ({ tasks, changeTaskOrDelete }) => {

  const [ idOfDeleatingTask, setId ] = useState('');

  const todo = tasks.map((task) => {
    const { action, id, important, done } = task;

    const doneClass = (done) ? 'done' : '';
    const classes = (important) ?
      { importantClass: 'important', starClass: 'fas fa-star' } : 
      { importantClass: '', starClass: 'far fa-star' };
    const { importantClass, starClass } = classes;

    const item = (action) => {
      if (typeof(action) === 'string') {
        return (
          <Fragment>
            <p
              className={`first-list-child ${doneClass} ${importantClass}`}
              // click to change 'done' property at task
              onClick={() => changeTaskOrDelete(id, 'done')}>
              { action }
            </p>
            <p className="pencil btn-actions"
              // click to rename task
              onClick={() => changeTaskOrDelete(id, 'rename') }>
              <i className="fas fa-pencil-alt"></i>
            </p>
          </Fragment>
        );
      }
      return <div className="first-list-child form-div" >{action}</div>
    };

    const render = item(action);

    return( 
      <div
        className="task-item"
        key={ id }>
        { render }
        <p className="star btn-actions"
          // click to change 'important' property at task
          onClick={() => changeTaskOrDelete(id, 'important')}>
          <i className={starClass}></i>
        </p>
        <p className={`btn-actions trash trash-${doneClass}`}
          onClick={() => setId(id)}>
          <i className="fas fa-trash"></i>
        </p>
      </div>
    );
  })

  const deleatingTask = (choise) => {
    if (choise) {
      changeTaskOrDelete(idOfDeleatingTask, null);
      setId('');
    } else {
      setId('');
    }
  }

  return(
    <div>
      <AttentionPopUp 
        request={idOfDeleatingTask && true}
        deleatingTask={deleatingTask}/>
      {todo}
    </div>
  );
}

export default Tasks;