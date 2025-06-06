import { USER_ACTION_TYPES } from "../user/user.types";

export const setCategoriesMap = (categoryMap) => {
  return {
    type: USER_ACTION_TYPES.GET_CATEFORIES,
    payload: categoryMap,
  };
};
