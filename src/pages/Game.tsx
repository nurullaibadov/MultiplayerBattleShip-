import { useState } from "react";
import { motion } from "framer-motion";
import { Target, Ship, Crosshair, BarChart3 } from "lucide-react";
import GameBoard from "@/components/GameBoard";
import { useLanguage } from "@/contexts/LanguageContext";

type CellState = "water" | "ship" | "hit" | "miss";

const SHIPS = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

const Game = () => {
  const { t } = useLanguage();
  const [playerBoard] = useState<CellState[][]>(
    Array(10).fill(null).map(() => Array(10).fill("water"))
  );
  const [stats] = useState({ shots: 0, hits: 0, misses: 0 });

  return (
    <div className="min-h-screen ocean-waves radar-grid pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-3xl font-bold tracking-wider text-foreground glow-text mb-2">
            ⚓ {t("hero.title")}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">{t("game.place_ships")}</p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-6 mb-8"
        >
          {[
            { icon: Target, label: t("game.shots_fired"), value: stats.shots },
            { icon: Crosshair, label: t("game.hits"), value: stats.hits, highlight: true },
            { icon: BarChart3, label: t("game.misses"), value: stats.misses },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm">
              <stat.icon className={`h-4 w-4 ${stat.highlight ? "text-primary" : "text-muted-foreground"}`} />
              <span className="text-xs text-muted-foreground font-mono">{stat.label}:</span>
              <span className={`font-display text-sm font-bold ${stat.highlight ? "text-primary" : "text-foreground"}`}>
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Boards */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GameBoard board={playerBoard} label={t("game.your_fleet")} />
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center gap-3 pt-12">
            <div className="w-px h-20 bg-border/50" />
            <div className="p-2 rounded-full border border-primary/30 bg-primary/5">
              <Crosshair className="h-5 w-5 text-primary animate-pulse-glow" />
            </div>
            <div className="w-px h-20 bg-border/50" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GameBoard isEnemy label={t("game.enemy_waters")} />
          </motion.div>
        </div>

        {/* Ship List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {SHIPS.map((ship) => (
              <div
                key={ship.name}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm"
              >
                <Ship className="h-4 w-4 text-primary" />
                <span className="text-xs font-mono text-foreground">{ship.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: ship.size }, (_, i) => (
                    <div key={i} className="w-3 h-3 rounded-sm bg-primary/40 border border-primary/60" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Game;
