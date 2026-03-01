import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Clock } from "lucide-react";
import { Button } from "@/components/Button";

export default function Services() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card max-w-md w-full p-8 sm:p-12 rounded-2xl border border-white/10 text-center relative z-10"
      >
        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
          <Clock className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold font-display mb-4 text-white">Coming Soon</h1>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          We are currently crafting our premium service packages. Join the Telegram channel to be notified when we launch.
        </p>
        
        <Link href="/">
          <Button variant="outline" className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:text-primary hover:border-primary/60">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
      
      <div className="absolute bottom-8 text-xs text-muted-foreground opacity-50">
        Eden Bets — Premium Sports Analysis
      </div>
    </div>
  );
}
