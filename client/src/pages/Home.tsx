import axios from 'axios';
import { Loading } from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { PostProps } from "@/types/auth.types";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Home component that fetches and displays posts.
 *
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const category = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const res = await axios.get(`http://localhost:5000/posts${category}`);
        setPosts(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching data", error);
        setPosts([]); 
      }
      setIsLoading(false);
    };

    fetchData();
  }, [category]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {isLoading && <Loading />}
      <div className="py-12 bg-foreground-hust">
        {posts.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: PostProps) => (
              <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg flex flex-col">
                <div className="w-full h-48 sm:h-56 lg:h-64 overflow-hidden rounded-t-lg mb-4">
                  <img
                    src={post.img}
                    alt="post img"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{post.title}</h1>
                <p className="text-gray-700 line-clamp-3 mb-4">{post.content}</p>
                <Link to={`/post/${post.id}`} className="mt-auto">
                  <Button className="w-full">Read more</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-gray-500 text-lg">
            No Posts Yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
