import { React, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { specificPhoto, deletePhoto } from '../../store/photos';
import CreateCommentForm from '../CreateComment';


import EditPhoto from '../EditPhoto';

import './PhotosMain.css';

export const PhotosMain = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { photoId } = useParams();
    const photos = useSelector(state => state.photos);
    const userId = useSelector(state => state.session.user?.id);
    const selectedPhoto = photos[photoId]


    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try{
                await dispatch(specificPhoto(photoId));
            } catch (err){
                console.log("ID Not Available");
                history.push("/photos");
            }

        }
        fetchData();
    }, [dispatch, photoId, ]);

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deletePhoto(selectedPhoto));
        history.push("/photos");
    }

    let content = null;
    if (showEdit){
        content = (
            <EditPhoto photo={selectedPhoto} hideForm={() => setShowEdit(false)} />
          )
        }
    if(!selectedPhoto){
        return null;
    }
    return (
        <div className="photos-main-container">
            <div className="photos-Main">
                <h4> {selectedPhoto.title} </h4>
                <img src={selectedPhoto.imageUrl} alt="" />
                <p>{selectedPhoto.description}</p>
                {selectedPhoto.userId === userId ? <button onClick={() => setShowEdit(!showEdit)}>Edit</button> : null}
                {selectedPhoto.userId === userId ? <button onClick={handleDelete}>Delete</button> : null}
                {content}
                <CreateCommentForm photoId = {selectedPhoto.id} />
            </div>
        </div>
    )
}

export default PhotosMain;
