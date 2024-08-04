import { PostProps } from "@/types/auth.types";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import { useEffect, useState } from "react";
import axios from 'axios'

interface OtherPostsProps {
  post_id: string;
  category: string;
}
const OtherPosts: React.FC<OtherPostsProps> = ({ post_id, category }) => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${post_id}/related?category=${category}`
        );
        setPosts(response.data); 
      } catch (error) {
        toast.error('failed to retrieve the posts')
        console.error("Error fetching related posts", error); 
      } finally {
        setIsLoading(false); 
      }
    };
    fetchData(); 
  }, [post_id, category]); 

  return (
    <div className="w-3/4 flex flex-col space-y-5">
      <h1 className="text-xl text-black font-semibold">
        Other posts you may like
      </h1>
      {!isLoading && posts.length > 0 ? (
        posts.map((post: PostProps) => (
          <div className="flex-2 flex flex-col gap-3" key={post.id}>
            <img
              className="w-full h-56 object-cover rounded-xl shadow-xl"
              src={post.img}
              alt={post.title}
            />
            <h2 className="text-2xl font-bold hyphen-auto text-gray-900">
              {post.title}
            </h2>
            <Button
              variant="hust"
              className="w-28"
              onClick={() => navigate(`/post/${post.id}`)}
            >
              Read more
            </Button>
          </div>
        ))
      ) : (
        !isLoading && <p>No related posts available.</p>
      )}
    </div>
  );
};

export default OtherPosts;
