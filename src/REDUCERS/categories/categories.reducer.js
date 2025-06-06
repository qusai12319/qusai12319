import { USER_ACTION_TYPES } from "./cagtegories.type";

const INITIAL_STATE = {
  currentUser: null,
  categoriesMap: {}  // ← خليها object
};

export const categoriesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case USER_ACTION_TYPES.GET_CATEFORIES:
      return {
        ...state,
        categoriesMap: payload
      };
    default:
      return state;
  }
};
