import { motion } from "framer-motion";
import { Users, Gamepad2, BarChart3, TrendingUp, Shield, Activity, Clock, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const mockUsers = [
  { id: 1, name: "Admiral_Nelson", email: "nelson@navy.mil", games: 42, wins: 28, status: "online" },
  { id: 2, name: "CaptainHook", email: "hook@navy.mil", games: 35, wins: 20, status: "offline" },
  { id: 3, name: "SubCommander", email: "sub@navy.mil", games: 58, wins: 41, status: "in-game" },
  { id: 4, name: "SeaWolf", email: "wolf@navy.mil", games: 19, wins: 12, status: "online" },
  { id: 5, name: "TorpedoJoe", email: "joe@navy.mil", games: 67, wins: 45, status: "offline" },
];

const mockGames = [
  { id: "G-001", player1: "Admiral_Nelson", player2: "CaptainHook", status: "active", turns: 14 },
  { id: "G-002", player1: "SubCommander", player2: "SeaWolf", status: "active", turns: 8 },
  { id: "G-003", player1: "TorpedoJoe", player2: "Admiral_Nelson", status: "waiting", turns: 0 },
];

const Admin = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, label: t("admin.total_users"), value: "2,847", change: "+12%" },
    { icon: Gamepad2, label: t("admin.active_games"), value: "156", change: "+8%" },
    { icon: BarChart3, label: t("admin.total_games"), value: "18,432", change: "+23%" },
    { icon: TrendingUp, label: t("admin.win_rate"), value: "52.3%", change: "+1.2%" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "text-primary";
      case "in-game": return "text-accent";
      case "active": return "text-primary";
      case "waiting": return "text-accent";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen ocean-waves pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mb-8"
        >
          <Shield className="h-8 w-8 text-primary" />
          <h1 className="font-display text-3xl font-bold tracking-wider text-foreground">
            {t("admin.title")}
          </h1>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-5 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="h-5 w-5 text-primary" />
                <span className="text-xs font-mono text-primary">{stat.change}</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-mono mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Table */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border/50">
              <Users className="h-4 w-4 text-primary" />
              <h2 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
                {t("admin.users")}
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/30">
                    <th className="text-left px-5 py-3 text-xs font-mono text-muted-foreground uppercase">Name</th>
                    <th className="text-left px-5 py-3 text-xs font-mono text-muted-foreground uppercase">Games</th>
                    <th className="text-left px-5 py-3 text-xs font-mono text-muted-foreground uppercase">Win%</th>
                    <th className="text-left px-5 py-3 text-xs font-mono text-muted-foreground uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-b border-border/20 hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <Award className="h-3.5 w-3.5 text-accent" />
                          <span className="font-mono text-foreground">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-mono text-muted-foreground">{user.games}</td>
                      <td className="px-5 py-3 font-mono text-foreground">{Math.round((user.wins / user.games) * 100)}%</td>
                      <td className="px-5 py-3">
                        <span className={`flex items-center gap-1.5 text-xs font-mono ${getStatusColor(user.status)}`}>
                          <Activity className="h-3 w-3" />
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Active Games */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center gap-2 px-5 py-4 border-b border-border/50">
              <Gamepad2 className="h-4 w-4 text-primary" />
              <h2 className="font-display text-sm font-bold tracking-wider text-foreground uppercase">
                {t("admin.games")}
              </h2>
            </div>
            <div className="divide-y divide-border/20">
              {mockGames.map((game) => (
                <div key={game.id} className="px-5 py-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">{game.id}</span>
                    <span className={`flex items-center gap-1 text-xs font-mono ${getStatusColor(game.status)}`}>
                      <Activity className="h-3 w-3" />
                      {game.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-mono text-foreground">{game.player1}</span>
                    <span className="text-primary font-display text-xs">VS</span>
                    <span className="font-mono text-foreground">{game.player2}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground font-mono">
                    <Clock className="h-3 w-3" />
                    {game.turns} turns
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
