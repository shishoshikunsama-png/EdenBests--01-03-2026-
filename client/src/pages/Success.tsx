import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Link } from "wouter";
import { trackLead } from "@/lib/pixel";

export default function Success() {
  const [countdown, setCountdown] = useState(5);
  const leadFired = useRef(false);
  const TELEGRAM_LINK = "https://t.me/+DD1IP31Oams5MDRk";

  useEffect(() => {
    // Fire Lead event only once when success page loads
    if (!leadFired.current) {
      leadFired.current = true;
      trackLead();
    }

    // Countdown timer for redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = TELEGRAM_LINK;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/stadium.jpg" 
          alt="Stadium Background" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full p-8 sm:p-12 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md text-center relative z-10"
      >
        <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-white">Success!</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Redirecting to Telegram VIP Group in{" "}
          <span className="text-primary font-bold text-2xl">{countdown}</span>{" "}
          seconds...
        </p>
        
        <div className="space-y-4">
          <a 
            href={TELEGRAM_LINK}
            className="block w-full py-3 px-6 bg-[#229ED9] hover:bg-[#229ED9]/90 text-white font-bold rounded-lg transition-colors"
          >
            Join Telegram Now
          </a>
          
          <Link href="/">
            <span className="block text-sm text-gray-500 hover:text-white transition-colors cursor-pointer">
              Return to Home
            </span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}