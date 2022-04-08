import { csrfFetch } from './csrf';

const LOAD_COMMENT = 'comments/LOAD';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const REMOVE_PHOTO = 'comments/REMOVE_COMMENT';

const loadComment = list => ({
    type: LOAD_COMMENT,
    list,
});

const addComment = comment => ({
    type: ADD_COMMENT,
    comment,
})

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId,
});

export const getComment= () => async dispatch => {
    const response = await fetch('/api/comments');
    if(response.ok){
        const comments = await response.json();
        dispatch(loadComment(comments));
    }
}

export const specificComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`)
    if(response.ok){
        const comment = await response.json();
        dispatch(addComment(comment))
    }
}

export const uploadComment = (Comment) => async dispatch => {
    const response = await csrfFetch('/api/comments',
     {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(Comment),
    })
    if(response.ok){
        const newComment = await response.json();
        const finishedComment = await dispatch(addComment(newComment)
        return finishedComment;
    }
}
export const editComment = (comment) => async dispatch => {
    // console.log(comment, ;
    const response = await csrfFetch(`/api/photos/${comment.id}`,
     {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      const editedComment = await response.json();
      dispatch(addComment(editedComment))
      return editedComment;
    }
  }

export const deleteComment = (comment) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment),
    })
    if (response.ok) {
      dispatch(removeComment(comment.id))
      return true;
    }
  }

const initialState = {};

  const commentReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_COMMENT: {
        const allComments = {};
        action.list.forEach(comment => {
            allComments[comment.id] = comment;
        });
        return {
          ...allComments,
          ...state,
        };
      }
      case ADD_COMMENT: {
        if (!state[action.comment.id]) {
          const newState = {
            ...state,
            [action.comment.id]: action.comment
          };
          return newState;
        }
        return {
          ...state,
          [action.comment.id]: {
            ...action.comment,
          }
        };
      }
    case UPDATE_COMMENT:{
        return {
            ...state,
            [action.comment.id]: {
              ...state[action.comment.id],
              ...action.comment,
            }
          };
      }
      case REMOVE_COMMENT: {
          const newState = { ...state };
          delete newState[ action.commentId];
          return newState;
        }
      default: {
        return state;
    }
  }
}
  export default commentReducer;
