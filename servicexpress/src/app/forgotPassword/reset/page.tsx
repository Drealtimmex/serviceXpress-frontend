"use client";

import { Suspense } from "react";
import ResetPassword from "./resetPassword"; // Import the ResetPassword component

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
}
