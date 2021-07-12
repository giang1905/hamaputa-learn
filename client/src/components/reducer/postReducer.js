import {
  POSTS_LOADED_FAIL,
  POSTS_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  FIND_POST,
} from "../contexts/constants";

export const postReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case POSTS_LOADED_SUCCESS:
      return {
        ...state,
        postLoading: false,
        post: payload,
      };
    case POSTS_LOADED_FAIL:
      return {
        ...state,
        postLoading: true,
        post: payload,
      };
    case ADD_POST:
      return {
        ...state,
        post: [...state.post, payload],
      };
    case DELETE_POST:
      return {
        ...state,
        post: state.post.filter((post) => post._id !== payload),
      };
    case FIND_POST:
      return {
        ...state,
        findPost: payload,
      };
    case UPDATE_POST:
      const updatePost = state.post.map((post) => {
        return post._id == payload._id ? payload : post;
      });
      return {
        ...state,
        post: updatePost,
      };

    default:
      return state;
  }
};
