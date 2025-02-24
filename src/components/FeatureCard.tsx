import React, { useRef, useEffect } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(1.1) translate(${(x - 0.5) * 10}px, ${(y - 0.5) * 10}px)`;
      }
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-xl bg-black/50 backdrop-blur-sm group h-[400px]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-300 ease-out"
        src="https://videos.pexels.com/video-files/4761702/4761702-uhd_4096_2160_25fps.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative h-full p-6 flex flex-col justify-end z-10">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;