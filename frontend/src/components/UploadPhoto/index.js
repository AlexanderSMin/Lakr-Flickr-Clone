import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { uploadPhoto } from '../../store/photos';
import { useHistory } from 'react-router-dom';
import './UploadPhoto.css';

const UploadPhoto = () => {
    const currentUser = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
        userId: currentUser,
        imageUrl,
        description,
        };
        try{
            const uploadedPhoto = await dispatch(uploadPhoto(payload));
            if (uploadedPhoto) {
              history.push(`/photos/${uploadedPhoto.photo.id}`);
            }
        } catch (err){
            const errorResponse = await err.json();
            const errorsHolder = errorResponse.errors.filter(error => error !=="Invalid value")
            setErrors(errorsHolder)
        }

      };

    return (
        <>
            { currentUser && (
                <form onSubmit={handleSubmit} className='form-class'>
                    <h3> Upload New Photo </h3>
                    {errors.map((error)=>(
                        <p key={error}>{error}</p>
                    ))}
                    <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={updateImageUrl} />
                    <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription} />
                    <button type="submit">Submit</button>
                </form>)
            }
        </>
   )
};

export default UploadPhoto;
