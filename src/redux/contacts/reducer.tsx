import {
  UPDATE_CONTACT,
  CLEAR_CONTACT,
} from '../types'

interface StateType {
  contacts: {};
}

const initialState: StateType = {
  contacts: {}
};

const reducer = (
  state: {} = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case UPDATE_CONTACT:
      return {
        ...state,
        ...{ contacts: action.payload },
    }
    case CLEAR_CONTACT:
      return {
        ...initialState,
    }
    default:
      return state;
  }
};

export default reducer;
