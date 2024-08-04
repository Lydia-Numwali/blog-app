import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';


const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", input);
      console.log("User has been successfully created");
      toast.success('Successfully registered user');
      navigate("/login");
    } catch (err: any) {
      toast.error('Failed to register user');
      setError(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Register Page</h1>
        {error && (
          <div className="bg-red-500 text-white text-center py-2 rounded mb-4">
            {error}
          </div>
        )}
        <form className="flex flex-col gap-4">
          <Input
            required
            placeholder="Username"
            type="text"
            value={input.username}
            name="username"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            required
            placeholder="Email"
            type="email"
            value={input.email}
            name="email"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Input
            placeholder="Password"
            type="password"
            value={input.password}
            name="password"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <Button onClick={handleSubmit} variant="hust" className="w-full py-2 bg-gray-900 text-white rounded">
            Register
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
