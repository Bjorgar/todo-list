const checkValue = (value) => {
    
  if (/^\s+$/.test(value) || value === '') {
    return false;
  } 
    return true;
}

export default checkValue;