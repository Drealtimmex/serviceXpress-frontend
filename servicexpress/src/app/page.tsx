"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out effect after 2.5 seconds
    const fadeTimer = setTimeout(() => setFadeOut(true), 2500);

    // Navigate after 3 seconds
    const timer = setTimeout(() => {
      router.push("/Onboarding");
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="homescreen">
      <Image
        alt="servicexpress logo"
        className={`logo ${fadeOut ? "fade-out" : ""}`}
        src={"/images/logo.png"}
        width={300}
        height={400}
      />
    </div>
  );
}
