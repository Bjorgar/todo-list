import checkValue from './checkValue';

const processValue = (setValue, setValid, value) => {
  setValue(value);
  setValid(checkValue(value));
}

export default processValue;