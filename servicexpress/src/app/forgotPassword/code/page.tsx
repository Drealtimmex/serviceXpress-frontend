import { Suspense } from "react";
import OTPVerification from "./otpVerify";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <OTPVerification />
    </Suspense>
  );
}
