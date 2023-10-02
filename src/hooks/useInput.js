import { useReducer } from 'react';
import {
  blurAction,
  inputAction,
  resetAction,
} from '../store/actions/auth.actions';
import inputStateReducer, {
  initialInputState,
} from '../store/reducers/auth.reducer';

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch(inputAction(event.target.value));
  };

  const inputBlurHandler = (event) => {
    dispatch(blurAction());
  };

  const reset = () => {
    dispatch(resetAction());
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
