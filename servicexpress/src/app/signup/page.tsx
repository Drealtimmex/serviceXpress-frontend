"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./page.css"

export default function CreateAccount() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
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
      <h1 className="title">Create Account</h1>
      <p className="subtitle">Join thousands of users finding trusted services effortlessly</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          required
          className="input"
        />
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
     
      <button className="oauth-button google">Sign Up with Google</button>
      <button className="oauth-button apple">Sign Up with Apple</button>

      <p className="login-link">
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}
