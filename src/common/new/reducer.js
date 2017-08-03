// @flow
import { omit, set, lensProp } from 'ramda';

const initValue = {};
const reducer = (state = initValue, action) => {
  switch (action.type) {
    case 'SET_CATEGORY_FILTER': {
      const category = action.payload;
      const categories = state.categories ? state.categories : [];
      const addCaterory = categories.indexOf(category) === -1 ? [category] : [];

      if (addCaterory.length === 0) {
        return omit(['categories'], state);
      }
      return set(lensProp('categories'), addCaterory, state);
    }

    default:
      return state;
  }
};

export default reducer;
