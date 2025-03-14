"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./page.css"

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call your Node.js backend
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`, formData, {withCredentials:true});

      if (res.status === 201) {
        router.push("/verify-account");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-account-container">
      <h1 className="title">Welcome Back</h1>
      <p className="subtitle">Log in to access trusted services and manage your bookings</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="input"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="input"
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="button" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
      <div className="line-divider">
      <hr />
      <div className="or-divider">Or</div>
      <hr />
      </div>
     
      <button className="oauth-button google">Sign in with Google</button>

      <p className="login-link">
        Dont have an account? <a href="/login">Sign in</a>
      </p>
    </div>
  );
}
