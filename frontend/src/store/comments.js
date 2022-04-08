import { csrfFetch } from './csrf';

const LOAD_COMMENTS = 'comments/LOAD';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const REMOVE_COMMENT = 'comments/REMOVE_COMMENT';

const loadComments = comments => ({
    type: LOAD_COMMENTS,
    comments,
});

const addComment = comment => ({
    type: ADD_COMMENT,
    comment,
})

const removeComment = commentId => ({
    type: REMOVE_COMMENT,
    commentId,
});

export const getComment= (id) => async dispatch => {
    const response = await fetch(`/api/photos/${id}/comments`);
    if(response.ok){
        const comments = await response.json();
        dispatch(loadComments(comments));
    }
}

export const specificComment = (commentId) => async dispatch => {
    const response = await csrfFetch(`/api/comments/${commentId}`)
    if(response.ok){
        const comment = await response.json();
        dispatch(addComment(comment))
    }
}

export const uploadComment = (Comment, id) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${id}/comments`,
     {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(Comment),
    })
    if(response.ok){
        const newComment = await response.json();
        console.log('THIS IS RESPONSE', newComment)
        dispatch(addComment(newComment));
        return newComment;
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
      case LOAD_COMMENTS: {
        console.log('THIS IS STATE', state)
        console.log('THIS IS ACTION', action.comments)
        const allComments = {};
        action.comments.forEach(comment => {
            allComments[comment.id] = comment;
        });
        return allComments;
      }
      case ADD_COMMENT: {
        // console.log('THIS IS STATE', state)
        // console.log('THIS IS ACTION', action.comment)
          const newState = {
            ...state,
            [action.comment.id]: action.comment
          };
          return newState;
        // return {
        //   ...state,
        //   [action.comment.id]: {
        //     ...action.comment,
        //   }
        // };
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
