import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editPhoto } from '../../store/photos';
import './EditPhoto.css';


const EditPhoto = ({photo, hideForm}) => {
    const dispatch = useDispatch();
    const id = photo.id;
    const userId = useSelector(state => state.session.user.id)

    const [imageUrl, setImageUrl] = useState(photo.imageUrl);
    const [description, setDescription] = useState(photo.description);

    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = photo
            payload.imageUrl = imageUrl
            payload.description = description

        try{
            const editedPhoto = await dispatch(editPhoto(payload));
            if (editedPhoto) {
                 hideForm();
            }
        } catch(err){
            const errorResponse = await err.json();
        }
      };


    return (
        <>
            { userId && (
                <form onSubmit={handleSubmit} className='form'>
                    <h4> Edit Lakr Photo </h4>
                    {errors.map((error)=>(
                        <p key={error}>{error}</p>
                    ))}
                    <label htmlFor="url">Url</label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        id="url"
                        value={imageUrl}
                        onChange={updateImageUrl}
                    />
                    <label>Description</label>
                    <input
                        type="textarea"
                        id="url"
                        placeholder="description"
                        value={description}
                        onChange={updateDescription}
                    />
                    <br />
                    <button type="submit">Update photo</button>
                </form>)
            }
        </>
   )
};

export default EditPhoto;
