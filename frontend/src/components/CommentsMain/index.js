import { React, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { specificComment, deleteComment } from '../../store/comments';

import EditComment from '../EditComment';

import './CommentsMain.css';

export const CommentsMain = ({ comment }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.session.user?.id);



    const [showEdit, setShowEdit] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteComment(comment));
    }

    return (
        <div className="comments-main-container">
            <div className="comments-Main">
                <h4> {comment.title} </h4>
                {/* <img src={comment.comment} alt="" /> */}
                <p>{comment.comment}</p>
                {/* {comment.userId === userId ? <button onClick={() => setShowEdit(!showEdit)}>Edit</button> : null} */}
                {comment.userId === userId ? <button className='button' onClick={handleDelete}>Delete</button> : null}
                {<EditComment Comment={comment} hideForm={ null}/>}
            </div>
        </div>
    )
}

export default CommentsMain;
