import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { uploadComment } from '../../store/comments';
import { useHistory } from 'react-router-dom';
import './CreateComment.css';

const CreateCommentForm= ({photoId}) => {
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
        photoId: photoId,
        };
        // try{
        //     const addedComment= await dispatch(uploadComment(payload));
        //     if (addedComment) {
        //       history.push(`/photos/${addedComment.photo.id}`);
        //     }
        // } catch (err){
        //     const errorResponse = await err.json();
        //     const errorsHolder = errorResponse.errors.filter(error => error !=="Invalid value")
        //     setErrors(errorsHolder)
        // }
         const addedComment= await dispatch(uploadComment(payload));
            if (addedComment) {
              history.push(`/photos/${photoId}`);
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

export default CreateCommentForm;
