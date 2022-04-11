import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { editComment } from '../../store/comments';


const EditComment = ({Comment, hideForm}) => {
    const dispatch = useDispatch();
    const id = Comment.id;
    const userId = useSelector(state => state.session.user.id)

    const [comment, setComment] = useState(Comment.comment);

    const updateComment= (e) => setComment(e.target.value);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = Comment
            payload.comment = comment

        try{
            const editedComment = await dispatch(editComment(payload));
            if (editedComment) {
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
                    <h4> Edit Comment </h4>
                    {errors.map((error)=>(
                        <p key={error}>{error}</p>
                    ))}
                    <label>Comment</label>
                    <input
                        type="textarea"
                        id="url"
                        placeholder="comment"
                        value={comment}
                        onChange={updateComment}
                    />
                    <br />
                    <button type="submit">Update comment</button>
                </form>)
            }
        </>
   )
};

export default EditComment;
