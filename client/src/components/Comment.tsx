import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import Comment from './Comment';
import { AuthContext } from '@/context/authContext';
import { toast } from 'react-toastify';

interface CommentProps {
  comment_id: number;
  post_id: number;
  user_id: number;
  username: string;
  user_img: string;
  comment: string;
  img: string;
  date: string;
}

interface CommentsProps {
  postId: number; 
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${postId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const date = new Date().toISOString();
      const res = await axios.post('/comments', { post_id: postId, comment: newComment, date });
      setComments([...comments, { ...res.data, user_id: user?.id, username: user?.username }]);
      setNewComment(''); 
      toast.success('comment added')
    } catch (error) {
      toast.error('failed to add the comment')
      console.error("Error adding comment", error);
    }
  };

  return (
    <div className="comments-section">
      <div className="comments-header" onClick={() => setIsExpanded(!isExpanded)}>
        <h2>Comments</h2>
      </div>
      {isExpanded && (
        <div className="comments">
          <div className="comments__list">
            {comments?.map(comment => (
              <Comment postId={comment.post_id}/>
            ))}
          </div>
          <div className="comments__add">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
