"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "../forgotPassword/page.css"
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("https://your-backend.com/api/forgot-password", { email });

      if (response.data.success) {
        setMessage("OTP sent to your email!");
        setTimeout(() => {
          router.push(`/verify-otp?email=${email}`);
        }, 2000);
      } else {
        setError(response.data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password?</h2>
      <p className="subtext">Enter your email to receive a reset OTP.</p>
      <input
        type="email"
        placeholder="Email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <button className="auth-button" onClick={handleSubmit} disabled={loading}>
        {loading ? "Sending..." : "Send OTP"}
      </button>
    </div>
  );
};

export default ForgotPassword;
