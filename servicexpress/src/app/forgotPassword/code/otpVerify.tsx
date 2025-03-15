"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      router.push("/forgotPassword");
    }
  }, [email, router]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const verifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the full 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");
    setIsValid(null);

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verify-otp`,
        { email, otp: enteredOtp },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success) {
        setIsValid(true);
        setTimeout(() => {
          router.push(`/resetPassword?email=${email}&otp=${enteredOtp}`);
        }, 1000);
      } else {
        setIsValid(false);
        setError(data.message || "Invalid OTP. Try again.");
      }
    } catch (error) {
      setIsValid(false);
      setError("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Password Reset</h2>
      <p>We sent a code to <strong>{email}</strong></p>

      <div className="otp-inputs">
        {otp.map((digit, index) => (
      <input
      key={index}
      ref={(el) => {
        inputRefs.current[index] = el;
      }}
            type="text"
            maxLength={1}
            pattern="[0-9]*"
            inputMode="numeric"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleBackspace(index, e)}
            className={isValid === false ? "error" : isValid === true ? "success" : ""}
          />
        ))}
      </div>

      {error && <p className="error-text">{error}</p>}

      <button className="auth-button" onClick={verifyOTP} disabled={loading || otp.join("").length !== 6}>
        {loading ? "Verifying..." : "Verify"}
      </button>

      {isValid === false && <p className="error-text">Invalid OTP. Try again.</p>}

      <p className="resend-text">
        Didn't receive the email? <a href="#">Resend</a>
      </p>
      <a href="#" className="back-link">← Back to log in</a>
    </div>
  );
}
