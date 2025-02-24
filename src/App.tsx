import React, { useRef, useEffect, useState } from 'react';
import Navbar from './components/Navbar.tsx';
import FeatureCard from './components/FeatureCard.tsx';

const features = [
  {
    title: "AI-Powered Workouts",
    description: "Personalized training programs adapted to your goals and progress"
  },
  {
    title: "Real-time Form Analysis",
    description: "Get instant feedback on your exercise technique"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your fitness journey with advanced analytics"
  },
  {
    title: "Community Challenges",
    description: "Compete and connect with fellow athletes worldwide"
  },
  {
    title: "Virtual Training",
    description: "Train with AI coaches anytime, anywhere"
  },
  {
    title: "Nutrition Planning",
    description: "Smart meal recommendations based on your workout routine"
  }
];

const OutlineAnimatedText = ({ children, fontSize, fontWeight, fontFamily }: { children: React.ReactNode; fontSize: string; fontWeight: number; fontFamily: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const textElement = textRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!textElement) return;
      const rect = textElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate distance from cursor to text center
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
      const intensity = 0.1 + (0.5 - 0.1) * (1 - distance / maxDistance); // Range from 0.1 to 0.5

      // Apply dynamic glowing outline effect (cyan)
      textElement.style.textShadow = `0 0 ${intensity * 10}px rgba(0, 255, 255, ${intensity})`;
    };

    const handleMouseLeave = () => {
      if (!textElement) return;
      // Reset to grey outline with no glow when mouse leaves
      textElement.style.textShadow = 'none'; // Remove glow
    };

    textElement.addEventListener('mousemove', handleMouseMove);
    textElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      textElement.removeEventListener('mousemove', handleMouseMove);
      textElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <span
      ref={textRef}
      style={{
        fontSize,
        fontWeight,
        fontFamily,
        color: 'transparent', // Makes the text fill transparent
        WebkitTextStroke: '2px #808080', // Grey outline (adjust thickness and color as needed)
        textStroke: '2px #808080', // Fallback for non-WebKit browsers
        position: 'relative',
        display: 'inline-block',
        transition: 'text-shadow 0.1s ease-out',
      }}
    >
      {children}
    </span>
  );
};

// Testimonials Data (Example)
const testimonials = [
  {
    name: "Sarah M.",
    quote: "AI.thlete transformed my fitness routine! The real-time feedback and personalized workouts have helped me reach my goals faster than ever.",
    role: "Fitness Enthusiast"
  },
  {
    name: "John D.",
    quote: "The virtual training and nutrition planning are game-changers. I feel more connected to my fitness journey now.",
    role: "Professional Athlete"
  }
];

// Footer Data
const footerLinks = {
  about: ["Our Mission", "Team", "Careers"],
  support: ["Help Center", "Contact Us", "FAQ"],
  legal: ["Privacy Policy", "Terms of Service"]
};

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayPrompt, setShowPlayPrompt] = useState(false);

  // Play audio on load
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.log("Audio playback failed:", error);
        setShowPlayPrompt(true); // Show prompt if autoplay fails
      });
    }
  }, []);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setShowPlayPrompt(false); // Hide prompt after successful play
      }).catch(error => console.log("Failed to play audio after user interaction:", error));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-montserrat">
      <Navbar />
      
      {/* Audio Player for "TV Off" by Kendrick Lamar (Placeholder) */}
      <audio ref={audioRef} loop>
        <source src="/audio/tv-off.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Optional Play Prompt if Autoplay Fails */}
      {showPlayPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <button
            onClick={handlePlayAudio}
            className="bg-white text-black px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Click to Play Music
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative h-screen">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/4761702-uhd_4096_2160_25fps.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <OutlineAnimatedText
              fontSize="clamp(4rem, 15vw, 12rem)"
              fontWeight={900}
              fontFamily="Protest Guerrilla"
            >
              AI.thlete
            </OutlineAnimatedText>
            <p className="text-2xl text-gray-300 mb-8 font-montserrat">
              Transform your fitness journey with AI-powered personal training
            </p>
            <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-lg text-lg transition-all">
              Start Training
            </button>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-900/50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">About AI.thlete</h2>
        <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
          AI.thlete is a revolutionary fitness platform that leverages cutting-edge artificial intelligence to deliver personalized workouts, real-time form analysis, and tailored nutrition plans. Our mission is to empower athletes of all levels to achieve their fitness goals with the help of advanced technology and a supportive community. Whether you're a beginner or a pro, AI.thlete is your partner in unlocking your full potential.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 bg-gray-900/50 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-gray-400">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">AI.thlete</h3>
            <p className="text-gray-400">
              Empowering your fitness journey with AI-driven solutions. Join us today and transform your life!
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-xl font-bold mb-4 capitalize">{section}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">Email: support@aiathlete.com</p>
            <p className="text-gray-400">Phone: (91) 9341207002</p>
            <p className="text-gray-400">Address: SRM Institute of Science and Technology</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} AI.thlete. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;