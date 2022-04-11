import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getComment } from '../../store/comments';
import CommentsMain from '../CommentsMain';
import './CommentSection.css';

const CommentSection = ({photoId}) => {
    const dispatch = useDispatch();

    const comments = useSelector(state => {
        return state.comments;
    });
    console.log('THIS IS COMMENT', comments);
    console.log(photoId);
    useEffect(() => {
      dispatch(getComment(photoId));
    }, [dispatch, photoId])


    return (
      <main>
        <div className="comments-main">
          { comments && Object.values(comments).map((comment) => {
            return (
              <CommentsMain comment = {comment} />
            );
          })}
        </div>
      </main>
    );
};

export default CommentSection;
