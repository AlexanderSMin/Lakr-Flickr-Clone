import { csrfFetch } from './csrf';

const LOAD_PHOTO = 'photos/LOAD';
const ADD_PHOTO = 'photos/ADD_PHOTO';
const UPDATE_PHOTO = 'photos/UPDATE_PHOTO';
const REMOVE_PHOTO = 'photos/REMOVE_PHOTO';

const loadPhoto = list => ({
    type: LOAD_PHOTO,
    list,
});

const addPhoto = photo => ({
    type: ADD_PHOTO,
    photo,
})

const removePhoto = photoId => ({
    type: REMOVE_PHOTO,
    photoId,
});

export const getPhotos = () => async dispatch => {
    const response = await fetch('/api/photos');
    if(response.ok){
        const photos = await response.json();
        dispatch(loadPhoto(photos));
    }
}

export const specificPhoto = (photoId) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photoId}`)
    if(response.ok){
        const photo = await response.json();
        dispatch(addPhoto(photo))
    }
}

export const uploadPhoto = (Photo) => async dispatch => {
    const response = await csrfFetch('/api/photos',
     {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(Photo),
    })
    if(response.ok){
        const newPhoto = await response.json();
        dispatch(addPhoto(newPhoto))
        // const finishedPhoto = await dispatch(addPhoto(newPhoto))
        return newPhoto;
        // return finishedPhoto;
    }
}
export const editPhoto = (photo) => async dispatch => {
    console.log(photo, 'Photo from store');
    const response = await csrfFetch(`/api/photos/${photo.id}`,
     {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo),
    })
    if (response.ok) {
      const editedPhoto = await response.json();
      dispatch(addPhoto(editedPhoto))
      return editedPhoto;
    }
  }

export const deletePhoto = (photo) => async dispatch => {
    const response = await csrfFetch(`/api/photos/${photo.id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(photo),
    })
    if (response.ok) {
      dispatch(removePhoto(photo.id))
      return true;
    }
  }

const initialState = {};

  const photoReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOAD_PHOTO: {
        console.log("This is action list", action.list )
        const allPhotos = {};
        action.list.forEach(photo => {
            allPhotos[photo.id] = photo;
        });
        return {
          ...allPhotos,
          ...state.photos,
        };
      }
      case ADD_PHOTO: {
        if (!state[action.photo.id]) {
          const newState = {
            ...state,
            [action.photo.id]: action.photo
          };
          return newState;
        }
        return {
          ...state,
          [action.photo.id]: {
            ...action.photo,
          }
        };
      }
    case UPDATE_PHOTO:{
        return {
            ...state,
            [action.photo.id]: {
              ...state[action.photo.id],
              ...action.photo,
            }
          };
      }
      case REMOVE_PHOTO: {
          const newState = { ...state };
          delete newState[ action.photoId];
          return newState;
        }
      default: {
        return state;
    }
  }
}
  export default photoReducer;
