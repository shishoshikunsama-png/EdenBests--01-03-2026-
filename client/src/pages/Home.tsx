import { motion } from "framer-motion";
import { Send, TrendingUp, ShieldCheck, Trophy } from "lucide-react";
import { Button } from "@/components/Button";

export default function Home() {
  const TELEGRAM_LINK = "https://t.me/+QidebStIHb1hOGM0";

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      {/* Hero Background Image with Overlay */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/stadium.jpg" 
          alt="Stadium Background" 
          className="w-full h-full object-cover opacity-100"
          style={{ objectPosition: 'center center' }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      {/* Background ambient glow - kept for additional atmosphere */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full py-6 px-4 sm:px-8 flex justify-between items-center z-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Logo Placeholder */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-yellow-600 flex items-center justify-center">
            <span className="text-black font-bold text-lg">E</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Eden Bets</span>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col justify-center items-center px-4 py-12 sm:py-20 z-10 text-center max-w-4xl mx-auto w-full">
        
        {/* Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">Free Access Now Open</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 font-display"
        >
          Advanced <span className="text-primary relative inline-block">
            Sports Betting
            <svg className="absolute w-full h-3 bottom-1 left-0 text-primary/20 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
            </svg>
          </span> Picks — Delivered on Telegram
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Join our Telegram community for daily sports betting insights and structured analysis from experienced bettors.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <a 
            href="/success.html"
            className="w-full sm:w-[260px] animate-shake-periodic"
          >
            <Button className="w-full h-12 inline-flex items-center justify-center gap-2 text-lg font-bold bg-[#229ED9] hover:bg-[#229ED9]/90 text-white border-none px-6 py-3">
              <Send className="w-5 h-5 flex-shrink-0" />
              <span>Join Free Group</span>
            </Button>
          </a>
          
          <a 
            href="https://sublaunch.com/eden"
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-[260px]"
          >
            <Button variant="secondary" className="w-full h-12 inline-flex items-center justify-center gap-2 text-lg font-bold text-black px-6 py-3">
              <span>VIP Access</span>
            </Button>
          </a>
        </motion.div>

        {/* Social Proof / Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 sm:mt-24 grid grid-cols-3 gap-8 sm:gap-16 border-t border-white/5 pt-8 w-full max-w-2xl"
        >
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-2 rounded-full mb-3 text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">High</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Win Rate</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-2 rounded-full mb-3 text-primary">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">Daily</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Updates</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-primary/10 p-2 rounded-full mb-3 text-primary">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold text-white">Top</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Quality</span>
          </div>
        </motion.div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-white/5 w-full">
        <p>© {new Date().getFullYear()} Eden Bets. All rights reserved.</p>
      </footer>
    </div>
  );
}
