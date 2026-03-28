import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Anchor, Crosshair, Trophy, Globe, Zap, Shield, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  { icon: Zap, key: "realtime" },
  { icon: Crosshair, key: "strategy" },
  { icon: Trophy, key: "ranks" },
  { icon: Globe, key: "multiplayer" },
];

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen ocean-waves">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center radar-grid overflow-hidden">
        {/* Animated radar sweep */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full border border-primary/10 relative">
            <div className="absolute inset-0 rounded-full border border-primary/5" />
            <div
              className="absolute top-1/2 left-1/2 w-1/2 h-0.5 origin-left animate-radar-sweep"
              style={{ background: "linear-gradient(90deg, hsl(var(--primary) / 0.5), transparent)" }}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-mono mb-8">
              <Shield className="h-3.5 w-3.5" />
              {t("hero.subtitle")}
            </div>

            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-foreground mb-6 glow-text">
              {t("hero.title")}
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed font-body">
              {t("hero.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/game">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-display text-sm font-bold tracking-wider uppercase transition-all hover:shadow-[var(--shadow-neon)]"
                >
                  <Anchor className="h-5 w-5" />
                  {t("hero.play")}
                  <ChevronRight className="h-4 w-4" />
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-lg border border-border text-foreground font-display text-sm font-bold tracking-wider uppercase hover:bg-muted/50 transition-all"
                >
                  {t("hero.register")}
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Mini game board preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-20 inline-block"
          >
            <div className="grid grid-cols-8 gap-1 p-3 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm neon-border">
              {Array.from({ length: 64 }, (_, i) => {
                const isShip = [10, 11, 12, 26, 27, 28, 29, 41, 42, 50, 51, 52].includes(i);
                const isHit = [11, 27, 42].includes(i);
                const isMiss = [3, 15, 33, 55, 60].includes(i);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`w-6 h-6 sm:w-8 sm:h-8 rounded-sm ${
                      isHit ? "cell-hit" : isMiss ? "cell-miss" : isShip ? "cell-ship" : "cell-water"
                    }`}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group p-6 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-sm font-bold tracking-wider text-foreground mb-2">
                  {t(`features.${feature.key}`)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`features.${feature.key}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Anchor className="h-4 w-4 text-primary" />
            <span className="font-display tracking-wider">BATTLESHIP</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 Naval Command. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
