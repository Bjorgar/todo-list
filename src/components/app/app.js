import React, { useState } from 'react';
import './app.scss';

import Tasks from '../tasks';
import TaskAdder from '../task-adder';
import TaskFilter from '../task-filter';
import TaskSearcher from '../task-searcher';
import TaskRenamer from '../task-renamer';

const App = () => {

  const [ taskList, changeTasks ] = useState([
    {
      action: 'Learn JS',
      id: 's1',
      important: false,
      done: false,
    },
    {
      action: 'Learn React',
      important: false,
      done: false,
      id: 's2'
    },
    {
      action: 'Drink tea',
      important: false,
      done: false,
      id: 's3'
    },
  ]);

  const [ label, setLabel ] = useState('all');

  const [ term, setTerm ] = useState('');

  const addNewTask = (action) => {

    const id = String.fromCodePoint((Math.ceil(Math.random() * 25) + 97)) + Math.floor(Math.random() * 10000);

    const newTask = {
      action,
      id,
      important: false,
      done: false,
    };

    changeTasks((s) => [...s, newTask]); 
  }

  const findTask = (itemId) => {
    const idx = taskList.findIndex(({ id }) => id === itemId);
    const task = taskList[idx];
    return { task, idx };
  }

  const taskListForming = (taskToChange, idx) => {
    return changeTasks((s) => [...s.slice(0, idx), taskToChange, ...s.slice(idx + 1)]);
  }
  
  const changeTaskOrDelete = (taskId, property) => {

    const taskData = findTask(taskId);
    const { idx } = taskData;

    if (property) {
      changeTask(idx, property);
    } else {
      deleteTask(idx);
    }
  }

  const changeTask = (idx, property) => {
    
    const taskToChange = taskList[idx];
    
    if (property === 'important' || property === 'done') {
      taskToChange[property] = !taskToChange[property];
    } else {
      taskToChange.action =
        <TaskRenamer
          taskToRename={taskList[idx].action}
          taskId={taskList[idx].id}
          submitRenamedTask={submitRenamedTask}/>;
    } 
    taskListForming(taskToChange, idx);
  }

  const deleteTask = (idx) => {
    changeTasks((s) => [...s.slice(0, idx), ...s.slice(idx + 1)]);
  }

  const submitRenamedTask = (action, taskId) => {

    const taskData = findTask(taskId);
    const { task, idx } = taskData;
    task.action = action;
    taskListForming(task, idx);
  }

  const filterTasks = (label) => {

    switch(label) {
      case('all'):
        return taskList;
      case('active'):
        return taskList.filter((item) => !item.done);
      case('important'):
        return taskList.filter((item) => item.important);
      case('done'):
        return taskList.filter((item) => item.done);
      default:
        return taskList;
    }
  };

  const searchTask = (term) => {
    const filteredTasks = filterTasks(label);

    if (term) {
      return filteredTasks.filter(({ action }) => action.toLowerCase().includes(term.toLowerCase()));
    }
    return filteredTasks;
  }

  const viewTasks = searchTask(term);

  const listColor =
    (label === 'all') ? 'blue' :
    (label === 'active') ? 'green' :
    (label === 'important') ? 'red' :
    'pink';
    
  return(
    <div className="main">
      <h1>Your Awesome Todo-List</h1>
      <div className={`todo-list ${listColor}`}>
        <div
          className="top-of-list">
          <TaskSearcher 
            setTerm={setTerm}
            term={term}/>
          <TaskFilter 
            activeLabel={label}
            setLabel={setLabel}/>
        </div>
        <Tasks
          changeTaskOrDelete={changeTaskOrDelete}
          tasks={viewTasks} />
        <TaskAdder
          addNewTask={addNewTask} />
      </div>
    </div>
  );
};

export default App;