import { useState } from 'react';

const useFormHook = (callback: (() => void)) => {
  const [values, setValues] = useState({});

  const handleSubmit = (event:any) => {
    if (event) event.preventDefault();
      callback();
  };

  const handleChange = (event:any) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    // handleSubmit,
    values,
  }
};

export default useFormHook;