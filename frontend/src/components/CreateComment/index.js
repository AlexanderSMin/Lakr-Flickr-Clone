import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { createComment } from '../../store/comments';
import { useHistory } from 'react-router-dom';
import './CreateComment.css';

const CreateComment= () => {
    const currentUser = useSelector(state => state.session.user?.id);
    const dispatch = useDispatch();
    const history = useHistory();

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);

    const updatedComment = (e) => setComment(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
        userId: currentUser,
        comment,
        photoId,
        };
        try{
            const addedComment= await dispatch(createComment(payload));
            if (addedComment) {
              history.push(`/photos/${addedComment.photo.id}`);
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
                <form onSubmit={handleSubmit} className='form'>
                    {errors.map((error)=>(
                        <p key={error}>{error}</p>
                    ))}
                    <input
                    type="text"
                    placeholder="Add Comment"
                    value={comment}
                    onChange={updatedComment} />
                    <button type="submit">Submit</button>
                </form>)
            }
        </>
   )
};

export default CreateComment;
