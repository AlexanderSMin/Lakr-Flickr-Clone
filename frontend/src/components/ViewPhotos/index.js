import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPhotos } from '../../store/photos';
import UploadPhoto  from './../UploadPhoto/';

import './ViewPhotos.css';


const ViewPhotos = () => {
    const dispatch = useDispatch();
    const photos = useSelector(state => {
        return Object.values(state.photos)
    });
    console.log('This is photos',photos);
    useEffect(() => {
      async function fetchData() {
        await dispatch(getPhotos());
      }
      fetchData();
    }, [dispatch])

    if (!photos.length) {
        return null;
      }
    return (
      <main>
        <div id="image-container">
          { photos.map((photo) => {
            return (
              <NavLink key={photo.id} to={`/photos/${photo.id}`}>
                  <div
                    className="browser-image"
                    style={{ backgroundImage: `url('${photo.imageUrl}')` }}
                  ></div>
              </NavLink>
            );
          })}
        </ div>
        <UploadPhoto  />
      </main>
    );
};

export default ViewPhotos;
