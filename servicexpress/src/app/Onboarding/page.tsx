"use client"
import { useState, useEffect, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import "./page.css"

export default function  Onboarding ()  {
  const router = useRouter();
  const slides = [
    {
      title: "Find Trusted Service, Anytime, Anywhere.",
      description: "Discover a world of reliable service providers at your fingertips.",
      image: "/images/firstimg.png",
    },
    {
      title: "Explore Services Tailored to Your Needs",
      description: "Easily browse a wide range of categories and find professionals.",
      image: "/images/firstimg.png",
    },
    {
      title: "Book Services in Minutes",
      description: "Enjoy a simple and secure booking process with just a few taps.",
      image: "/images/firstimg.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Check if user has already seen onboarding
  // useEffect(() => {
  //   if (localStorage.getItem("seenOnboarding")) {
  //     router.push("/signup"); // Redirect to signup if already seen
  //   }
  // }, [router]);

  // Auto-slide function
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Swipe handling
  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left" && currentIndex < slides.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (direction === "right" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    },
    [currentIndex]
  );

  // React-Swipeable hook
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackTouch: true,  // Ensures touch gestures work
    trackMouse: true,  // Ensures mouse gestures work
  });
  

  // Finish onboarding and go to signup page
  const finishOnboarding = () => {
    localStorage.setItem("seenOnboarding", "true"); // Save progress
    router.push("/signup"); // Navigate to signup page
  };

  return (
    <div className="container" {...handlers}>
      <div className="slider">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="slide"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className="image" />
            <h2>{slides[currentIndex].title}</h2>
            <p>{slides[currentIndex].description}</p>
            {currentIndex === slides.length - 1 ? (
              <button className="createAccount" onClick={finishOnboarding}>
                Create Account
              </button>
            ) : (
              <button className="skip" onClick={() => setCurrentIndex(slides.length - 1)}>
                Skip
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page Indicator */}
      <div className="indicatorContainer">
        {slides.map((_, index) => (
          <span key={index} className={`indicator ${currentIndex === index ? "active" : ""}`} />
        ))}
      </div>
    </div>
  );
};


