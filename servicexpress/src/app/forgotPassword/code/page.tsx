"use client";

import { useRouter, useSearchParams } from "next/navigation"; // Corrected import
import { useState, useEffect } from "react";
import axios from "axios";

export default function OTPVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // Get email from URL params

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isValid, setIsValid] = useState<boolean | null>(null); // Handle validity state

  useEffect(() => {
    if (!email) {
      router.push("/forgotPassword"); // Redirect if email is missing
    }
  }, [email, router]);

  // Handle OTP input change
  const handleChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if a digit is entered
    if (value !== "" && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  // Handle backspace key event
  const handleBackspace = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // Verify OTP function
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
        router.push(`/resetPassword?email=${email}&otp=${enteredOtp}`);
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
            maxLength={1} // Fixed maxLength
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
