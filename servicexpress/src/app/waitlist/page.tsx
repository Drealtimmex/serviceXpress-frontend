"use client"
import { useState } from "react";
import axios,{AxiosError} from "axios";
import "./page.css"; // External CSS file for styling

const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [inAppRole, setInAppRole] = useState("buyer");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/waitlist/register`, {
          email,
          inApprole: inAppRole,
        });
        setMessage(response.data.message);
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>; 
        setError(error.response?.data?.message || "Something went wrong. Try again.");
      } finally {
        setLoading(false);
      }}


  return (
    <div className="waitlist-container">
      <div className="header">
        <img src="images/serviceXpressLOGO.jpg" alt="ServiceXpress Logo" className="logo" />
        <h1 className="app-name">
          Service<span className="highlight">X</span>press
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="waitlist-form">
        <h2>Join Our Waitlist</h2>
        <p>Be the first to experience our platform!</p>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <select value={inAppRole} onChange={(e) => setInAppRole(e.target.value)}>
          <option value="buyer">I want to buy services</option>
          <option value="seller">I want to offer services</option>
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Join Waitlist"}
        </button>
      </form>
    </div>
  );
};

export default WaitlistForm;
