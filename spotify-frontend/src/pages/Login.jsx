import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { assets } from "../assets/frontend-assets/assets";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    const result = login(email, password);
    if (result.ok) navigate("/", { replace: true });
    else setError(result.message);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-[450px]">
        <div className="flex justify-center mb-8">
          <img src={assets.spotify_logo} alt="" className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-black text-center mb-2 tracking-tight">Log in to Spotify</h1>
        <p className="text-center text-slate-400 text-sm mb-8">Clone app — accounts are stored in this browser only.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          {error ? (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-md px-3 py-2">{error}</p>
          ) : null}
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-[#121212] border border-[#727272] px-3 py-3 text-white outline-none focus:border-white"
              placeholder="name@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-[#121212] border border-[#727272] px-3 py-3 text-white outline-none focus:border-white"
              placeholder="Your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-[#1ed760] hover:bg-[#1db954] text-black font-bold py-3.5 transition-colors"
          >
            Log In
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-white font-semibold underline hover:text-[#1ed760]">
            Sign up for Spotify
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
