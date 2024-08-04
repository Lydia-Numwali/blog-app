import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { Loading } from "@/components/Loading";
import { toast } from "react-toastify";

/**
 * Login component that handles user authentication.
 *
 * @returns {JSX.Element} The Login component.
 */
const Login = (): JSX.Element => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await login(input);
      console.log("You are now logged in");
      toast.success("You are now logged in");
      navigate("/");
    } catch (error: any) {
      setError(error.response.data);
      toast.error('failed to log in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      {isLoading && <Loading />}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
        {error && (
          <div className="bg-red-500 text-white text-center py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4">
          <Input
            placeholder="Email"
            name="username"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            type="password"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Button variant="hust" onClick={handleSubmit} className="w-full py-2 bg-gray-900 text-white rounded">
            Sign In
          </Button>
        </form>
        <p className="text-center mt-4">
          You don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
