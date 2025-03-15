"use client";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function OTPVerification() {
  const router = useRouter();
  const { email } = router.query; // Get email from query params
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isValid, setIsValid] = useState(null); // null = no status, true = valid, false = invalid

  useEffect(() => {
    if (!email) {
      router.push("/forgotPassword"); // Redirect if email is missing
    }
  }, [email, router]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus(); // Move to next box
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus(); // Move back
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,
        { email, otp: enteredOtp },
        { headers: { "Content-Type": "application/json" } }
      );

      setIsValid(true);
      setTimeout(() => {
        router.push({
          pathname: "/resetPassword",
          query: { email, otp: enteredOtp },
        });
      }, 1000);
    } catch (error) {
      setIsValid(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Password Reset</h2>
      <p>We sent a code to <strong>{email}</strong></p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            pattern="[0-9]*"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleBackspace(index, e)}
            className={isValid === false ? "error" : isValid === true ? "success" : ""}
          />
        ))}
      </div>

      <button className="auth-button" onClick={verifyOTP} disabled={otp.join("").length !== 6}>
        Verify
      </button>

      {isValid === false && <p className="error-text">Invalid OTP. Try again.</p>}

      <p className="resend-text">Didn't receive the email? <a href="#">Resend</a></p>
      <a href="#" className="back-link">← Back to log in</a>
    </div>
  );
}
