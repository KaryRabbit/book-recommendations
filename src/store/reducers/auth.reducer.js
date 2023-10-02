export const initialInputState = {
  value: '',
  isTouched: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT':
      return { value: action.value, isTouched: state.isTouched };
    case 'BLUR':
      return { isTouched: true, value: state.value };
    case 'RESET':
      return { isTouched: false, value: '' };
    default:
      return state;
  }
};

export default authReducer;
