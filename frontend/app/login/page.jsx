"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("client");
  const [image, setImage] = useState(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    let newError = {};
    if (!name || !name.trim()) newError.name = "Name is required";
    if (!email || !email.trim()) newError.email = "Email is required";
    if (!password || !password.trim())
      newError.password = "Password is required";
    if (!phoneNumber || !phoneNumber.trim())
      newError.phoneNumber = "Phone number is required";
    if (!role) newError.role = "Role is required";
    if (!image) newError.image = "Image is required";
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      formData.append("role", role);
      formData.append("image", image);

      const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      setLoading(false);
      const data = await response.json();
      if (!response.ok) {
        setError({ signup: data.error });
        return;
      }
      // Check if the user is seller or client
      if (data.role === "seller") {
        router.push("/seller");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log("Error Signing up.", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && (
            <span className="text-sm text-red-500">{error.name}</span>
          )}
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {error.email && (
            <span className="text-sm text-red-500">{error.email}</span>
          )}
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.password && (
            <span className="text-sm text-red-500">{error.password}</span>
          )}
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            value={phoneNumber}
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {error.phoneNumber && (
            <span className="text-sm text-red-500">{error.phoneNumber}</span>
          )}
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="client"
                checked={role === "client"}
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Client</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="seller"
                checked={role === "seller"}
                onChange={(e) => setRole(e.target.value)}
                className="form-radio h-4 w-4 text-blue-600"
              />
              <span className="ml-2">seller</span>
            </label>
          </div>
          {error.role && (
            <span className="text-sm text-red-500">{error.role}</span>
          )}
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {error.image && (
            <span className="text-sm text-red-500">{error.image}</span>
          )}
        </div>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?&nbsp;
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
        <button
          className="w-full mt-6 p-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Signing up ..." : "Signup"}
        </button>
        {error.signup && (
          <span className="block text-center text-sm text-red-500 mt-4">
            {error.signup}
          </span>
        )}
      </div>
    </div>
  );
};

export default Signup;
