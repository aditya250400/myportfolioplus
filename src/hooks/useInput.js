import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onChange = ({ target }) => setValue(target.value);

  return [value, onChange, setValue];
}

export default useInput;
