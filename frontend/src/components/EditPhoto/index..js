import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editPhoto } from '../../store/photos';
import './editPhoto.css';


const EditPhoto = ({photo, hideForm}) => {
    const dispatch = useDispatch();
    const id = photo.id;
    // const userId =

    const [imageUrl, setImageUrl] = useState(photo.imageUrl);
    const [description, setDescription] = useState(photo.description);

    const updateImageUrl = (e) => setImageUrl(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id,
            userId: sessionUser.id,
            imageUrl,
            description,
        }

        try{
            const dispatchPhoto = await dispatch(editPhoto(payload));
            if (dispatchPhoto) {
                 hideForm();
            }
        } catch(err){
            const errorResponse = await err.json();
            const errorsHolder = errorResponse.errors.filter(error => error !=="Invalid value")
            setErrors(errorsHolder)
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