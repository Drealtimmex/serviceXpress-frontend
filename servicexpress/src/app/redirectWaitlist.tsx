"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectToWaitlist() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.pathname !== "/waitlist") {
      router.replace("/waitlist"); // Redirect all pages to waitlist
    }
  }, []);

  return null;
}
