import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Anchor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auth will be connected later
  };

  return (
    <div className="min-h-screen flex items-center justify-center radar-grid ocean-waves px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Anchor className="h-10 w-10 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold tracking-wider text-foreground">
            {t("auth.login")}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm neon-border">
          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
              {t("auth.email")}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm font-mono transition-all"
                placeholder="commander@navy.mil"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-muted-foreground mb-1.5 uppercase tracking-wider">
              {t("auth.password")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm font-mono transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider uppercase hover:shadow-[var(--shadow-neon)] transition-all"
          >
            <LogIn className="h-4 w-4" />
            {t("auth.submit_login")}
          </motion.button>

          <div className="flex items-center justify-between text-xs">
            <Link to="/forgot-password" className="text-primary hover:underline font-mono">
              {t("auth.forgot_link")}
            </Link>
            <Link to="/register" className="text-muted-foreground hover:text-foreground font-mono">
              {t("auth.register_link")}
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
