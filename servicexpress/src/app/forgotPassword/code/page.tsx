"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import "../code/page.css"

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  const handleVerify = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post("https://your-backend.com/api/verify-otp", { email, otp });

      if (response.data.success) {
        setMessage("OTP verified successfully!");
        setTimeout(() => {
          router.push(`/reset-password?email=${email}&otp=${otp}`);
        }, 2000);
      } else {
        setError(response.data.message || "Invalid OTP.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Verify OTP</h2>
      <p className="subtext">Enter the OTP sent to your email.</p>
      <input
        type="text"
        placeholder="Enter OTP"
        className="input-field"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <button className="auth-button" onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>
    </div>
  );
};

export default VerifyOTP;
