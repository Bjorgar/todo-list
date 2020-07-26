import React, { useState, useEffect } from 'react';
import './attention-pop-up.scss'

const AttentionPopUp = ({ request, deleatingTask }) => {

  const [ showPopUp, setRequest ] = useState(false);

  useEffect(() => {
    setRequest(request);
  }, [ request ]);

  const popUpClass = (showPopUp) ? '' : 'hide-pop-up';

  return(
    <div className={`pop-up ${popUpClass}`}>
      <p>Do you really want to delete this task?</p>
      <button
        className="yes-btn"
        onClick={() => deleatingTask(true)}>
        Yes
      </button>
      <button
        className="no-btn"
        onClick={() => deleatingTask(false)}>
        No
      </button>
    </div>
  );
}

export default AttentionPopUp;