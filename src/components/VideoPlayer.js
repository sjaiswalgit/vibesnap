import React, { useState, useEffect, useRef } from "react";

const VideoPlayer = ({ videoUrl,showDeleteBTn=false }) => {
  const videoRef = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const controlTimeoutRef = useRef(null);

  // Toggle Play/Pause
  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
    resetControlTimeout();
  };

  // Toggle Mute
  const handleMute = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Show controls on interaction
  const handleInteraction = () => {
    setShowControls(true);
    resetControlTimeout();
  };

  // Reset the control timeout
  const resetControlTimeout = () => {
    clearTimeout(controlTimeoutRef.current);
    controlTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("play", () => setIsPlaying(true));
    video.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      video.removeEventListener("play", () => setIsPlaying(true));
      video.removeEventListener("pause", () => setIsPlaying(false));
      clearTimeout(controlTimeoutRef.current);
    };
  }, []);


  
  useEffect(() => {
    const videoElement = videoRef.current;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.5 } // At least 50% of the video should be visible
    );
  
    if (videoElement) {
      observer.observe(videoElement);
    }
  
    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
      }
    };
  }, []);
  
  useEffect(() => {
    if (showDeleteBTn) {
      return;
    }
  
    const videoElement = videoRef.current;
    if (videoElement) {
      const isPlaying = !videoElement.paused && !videoElement.ended;
  
      if (isIntersecting) {
        videoElement
          .play()
          .catch((error) => {
            console.warn("Video play interrupted:", error.message);
          });
      } else if (isPlaying) {
        videoElement.pause();
      }
    }
  }, [isIntersecting]);
  


  return (
    <div
      className="relative w-full max-w-3xl mx-auto"
      onClick={handleInteraction}
    >
      <video
        ref={videoRef}
        className="w-full h-auto"
        onClick={handlePlayPause}
        src={videoUrl}
        muted
        controls={false} // Disable default controls
      ></video>

      {/* Play/Pause Button */}
      {showControls && (
        <button
          onClick={handlePlayPause}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/50 text-white rounded-full px-4 py-2"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      )}

      {/* Mute Button */}
      {showControls && (
        <button
          onClick={handleMute}
          className="absolute bottom-4 right-4 bg-black/50 text-white rounded-md px-3 py-1"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
