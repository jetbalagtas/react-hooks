import { useState } from 'react';

export const useFormInput = () => {
  const [value, setValue] = useState('');
  const [validity, setValidity] = useState(false);

  const inputChangedHandler = event => {
    setValue(event.target.value);
    if (event.target.value.trim() === '') setValidity(false);
    setValidity(true);
  }

  return { value: value, onChange: inputChangedHandler, validity };
}
