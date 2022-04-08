import { React, useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory} from 'react-router-dom';
import { specificComment, deleteComment } from '../../store/comments';

import EditComment from '../EditComment';

import './CommentsMain.css';

export const CommentsMain = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { commentId } = useParams();
    const comments = useSelector(state => state.comments);
    const userId = useSelector(state => state.session.user?.id);
    const selectedComment = comments[commentId]


    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try{
                await dispatch(specificComment(commentId));
            } catch (err){
                console.log("ID Not Available");
                history.push("/comments");
            }

        }
        fetchData();
    }, [dispatch, commentId, ]);

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteComment(selectedComment));
        history.push("/comments");
    }

    let content = null;
    if (showEdit){
        content = (
            <EditComment comment={selectedComment} hideForm={() => setShowEdit(false)} />
          )
        }
    if(!selectedComment){
        return null;
    }
    return (
        <div className="comments-main-container">
            <div className="comments-Main">
                <h4> {selectedComment.title} </h4>
                <img src={selectedComment.comment} alt="" />
                <p>{selectedComment.comment}</p>
                {selectedComment.userId === userId ? <button onClick={() => setShowEdit(!showEdit)}>Edit</button> : null}
                {selectedComment.userId === userId ? <button onClick={handleDelete}>Delete</button> : null}
                {content}
            </div>
        </div>
    )
}

export default CommentsMain;
