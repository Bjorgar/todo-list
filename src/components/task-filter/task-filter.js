import React from 'react';
import './task-filter.scss';

const TaskFilter = ({ setLabel, activeLabel }) => {

  const buttons = [
    {name: 'All', label: 'all'},
    {name: 'Active', label: 'active'},
    {name: 'Important', label: 'important'},
    {name: 'Done', label: 'done'}
  ];

  return (
    <div className="filter-div">
      {
        buttons.map((btn) => {
          const { name, label } = btn;
          const activeBtn = (activeLabel === label) ? 'active' : '';
          return (
            <button
              key={ label }
              className={`btns ${activeBtn}`}
              onClick={() => setLabel(label)}
              >{ name }
            </button>
          );
        })
      }
    </div>
  );
}

export default TaskFilter;