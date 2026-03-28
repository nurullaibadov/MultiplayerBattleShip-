import React, { createContext, useContext, useState } from "react";

type Language = "en" | "es" | "fr" | "de";

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.play": "Play",
    "nav.admin": "Admin",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "hero.title": "BATTLESHIP",
    "hero.subtitle": "NAVAL WARFARE COMMAND",
    "hero.description": "Engage in tactical naval combat. Deploy your fleet, locate enemy vessels, and dominate the seas in this classic strategy game.",
    "hero.play": "Deploy Fleet",
    "hero.register": "Enlist Now",
    "auth.login": "Commander Login",
    "auth.register": "Enlist New Commander",
    "auth.forgot": "Recovery Protocol",
    "auth.email": "Command Email",
    "auth.password": "Access Code",
    "auth.confirm_password": "Confirm Access Code",
    "auth.username": "Commander Name",
    "auth.submit_login": "Access Command Center",
    "auth.submit_register": "Begin Enlistment",
    "auth.submit_forgot": "Initiate Recovery",
    "auth.forgot_link": "Forgot access code?",
    "auth.login_link": "Already enlisted? Login",
    "auth.register_link": "New commander? Enlist",
    "game.your_fleet": "Your Fleet",
    "game.enemy_waters": "Enemy Waters",
    "game.ships_remaining": "Ships Remaining",
    "game.shots_fired": "Shots Fired",
    "game.hits": "Hits",
    "game.misses": "Misses",
    "game.place_ships": "Place Your Ships",
    "game.ready": "Ready for Battle",
    "game.fire": "Fire!",
    "admin.title": "Command Center",
    "admin.users": "Commanders",
    "admin.games": "Active Battles",
    "admin.stats": "Fleet Statistics",
    "admin.total_users": "Total Commanders",
    "admin.active_games": "Active Battles",
    "admin.total_games": "Total Battles",
    "admin.win_rate": "Avg Win Rate",
    "features.realtime": "Real-Time Combat",
    "features.realtime_desc": "Engage opponents in live tactical warfare with instant updates.",
    "features.strategy": "Strategic Depth",
    "features.strategy_desc": "Plan your fleet placement and attack patterns for maximum devastation.",
    "features.ranks": "Ranking System",
    "features.ranks_desc": "Climb the leaderboard from Ensign to Admiral with every victory.",
    "features.multiplayer": "Global Warfare",
    "features.multiplayer_desc": "Challenge commanders from around the world in ranked battles.",
  },
  es: {
    "nav.home": "Inicio",
    "nav.play": "Jugar",
    "nav.admin": "Admin",
    "nav.login": "Entrar",
    "nav.register": "Registro",
    "nav.logout": "Salir",
    "hero.title": "BATALLA NAVAL",
    "hero.subtitle": "COMANDO DE GUERRA NAVAL",
    "hero.description": "Participa en combate naval táctico. Despliega tu flota, localiza los barcos enemigos y domina los mares.",
    "hero.play": "Desplegar Flota",
    "hero.register": "Alistarse Ahora",
    "auth.login": "Acceso del Comandante",
    "auth.register": "Alistar Nuevo Comandante",
    "auth.forgot": "Protocolo de Recuperación",
    "auth.email": "Email de Comando",
    "auth.password": "Código de Acceso",
    "auth.confirm_password": "Confirmar Código",
    "auth.username": "Nombre de Comandante",
    "auth.submit_login": "Acceder al Centro de Comando",
    "auth.submit_register": "Iniciar Alistamiento",
    "auth.submit_forgot": "Iniciar Recuperación",
    "auth.forgot_link": "¿Olvidaste tu código?",
    "auth.login_link": "¿Ya alistado? Entrar",
    "auth.register_link": "¿Nuevo comandante? Alistarse",
    "game.your_fleet": "Tu Flota",
    "game.enemy_waters": "Aguas Enemigas",
    "game.ships_remaining": "Barcos Restantes",
    "game.shots_fired": "Disparos Realizados",
    "game.hits": "Impactos",
    "game.misses": "Fallos",
    "game.place_ships": "Coloca tus Barcos",
    "game.ready": "Listo para la Batalla",
    "game.fire": "¡Fuego!",
    "admin.title": "Centro de Comando",
    "admin.users": "Comandantes",
    "admin.games": "Batallas Activas",
    "admin.stats": "Estadísticas de Flota",
    "admin.total_users": "Total Comandantes",
    "admin.active_games": "Batallas Activas",
    "admin.total_games": "Total Batallas",
    "admin.win_rate": "Tasa de Victoria",
    "features.realtime": "Combate en Tiempo Real",
    "features.realtime_desc": "Enfrenta oponentes en guerra táctica en vivo.",
    "features.strategy": "Profundidad Estratégica",
    "features.strategy_desc": "Planifica la colocación de tu flota y patrones de ataque.",
    "features.ranks": "Sistema de Rangos",
    "features.ranks_desc": "Sube en el ranking de Alférez a Almirante.",
    "features.multiplayer": "Guerra Global",
    "features.multiplayer_desc": "Desafía comandantes de todo el mundo.",
  },
  fr: {
    "nav.home": "Accueil",
    "nav.play": "Jouer",
    "nav.admin": "Admin",
    "nav.login": "Connexion",
    "nav.register": "Inscription",
    "nav.logout": "Déconnexion",
    "hero.title": "BATAILLE NAVALE",
    "hero.subtitle": "COMMANDEMENT NAVAL",
    "hero.description": "Engagez-vous dans un combat naval tactique. Déployez votre flotte et dominez les mers.",
    "hero.play": "Déployer la Flotte",
    "hero.register": "S'enrôler",
    "auth.login": "Connexion Commandant",
    "auth.register": "Nouvel Enrôlement",
    "auth.forgot": "Protocole de Récupération",
    "auth.email": "Email de Commande",
    "auth.password": "Code d'Accès",
    "auth.confirm_password": "Confirmer le Code",
    "auth.username": "Nom du Commandant",
    "auth.submit_login": "Accéder au Centre",
    "auth.submit_register": "Commencer l'Enrôlement",
    "auth.submit_forgot": "Initier la Récupération",
    "auth.forgot_link": "Code oublié?",
    "auth.login_link": "Déjà enrôlé? Connexion",
    "auth.register_link": "Nouveau? S'enrôler",
    "game.your_fleet": "Votre Flotte",
    "game.enemy_waters": "Eaux Ennemies",
    "game.ships_remaining": "Navires Restants",
    "game.shots_fired": "Tirs Effectués",
    "game.hits": "Touches",
    "game.misses": "Ratés",
    "game.place_ships": "Placez vos Navires",
    "game.ready": "Prêt au Combat",
    "game.fire": "Feu!",
    "admin.title": "Centre de Commandement",
    "admin.users": "Commandants",
    "admin.games": "Batailles Actives",
    "admin.stats": "Statistiques",
    "admin.total_users": "Total Commandants",
    "admin.active_games": "Batailles Actives",
    "admin.total_games": "Total Batailles",
    "admin.win_rate": "Taux de Victoire",
    "features.realtime": "Combat en Temps Réel",
    "features.realtime_desc": "Affrontez des adversaires en direct.",
    "features.strategy": "Profondeur Stratégique",
    "features.strategy_desc": "Planifiez votre flotte et vos attaques.",
    "features.ranks": "Système de Rangs",
    "features.ranks_desc": "Montez de Enseigne à Amiral.",
    "features.multiplayer": "Guerre Mondiale",
    "features.multiplayer_desc": "Défiez des commandants du monde entier.",
  },
  de: {
    "nav.home": "Start",
    "nav.play": "Spielen",
    "nav.admin": "Admin",
    "nav.login": "Anmelden",
    "nav.register": "Registrieren",
    "nav.logout": "Abmelden",
    "hero.title": "SCHIFFE VERSENKEN",
    "hero.subtitle": "MARINEKOMMANDO",
    "hero.description": "Taktischer Seekampf. Setze deine Flotte ein und beherrsche die Meere.",
    "hero.play": "Flotte Einsetzen",
    "hero.register": "Jetzt Einschreiben",
    "auth.login": "Kommandant Login",
    "auth.register": "Neuer Kommandant",
    "auth.forgot": "Wiederherstellung",
    "auth.email": "Kommando-Email",
    "auth.password": "Zugangscode",
    "auth.confirm_password": "Code Bestätigen",
    "auth.username": "Kommandantname",
    "auth.submit_login": "Zugang Erhalten",
    "auth.submit_register": "Einschreibung Starten",
    "auth.submit_forgot": "Wiederherstellung Starten",
    "auth.forgot_link": "Code vergessen?",
    "auth.login_link": "Schon registriert? Anmelden",
    "auth.register_link": "Neu? Registrieren",
    "game.your_fleet": "Deine Flotte",
    "game.enemy_waters": "Feindgewässer",
    "game.ships_remaining": "Verbleibende Schiffe",
    "game.shots_fired": "Abgefeuerte Schüsse",
    "game.hits": "Treffer",
    "game.misses": "Fehlschüsse",
    "game.place_ships": "Schiffe Platzieren",
    "game.ready": "Kampfbereit",
    "game.fire": "Feuer!",
    "admin.title": "Kommandozentrale",
    "admin.users": "Kommandanten",
    "admin.games": "Aktive Schlachten",
    "admin.stats": "Flottenstatistiken",
    "admin.total_users": "Gesamt Kommandanten",
    "admin.active_games": "Aktive Schlachten",
    "admin.total_games": "Gesamt Schlachten",
    "admin.win_rate": "Siegesrate",
    "features.realtime": "Echtzeitkampf",
    "features.realtime_desc": "Kämpfe live gegen Gegner.",
    "features.strategy": "Strategische Tiefe",
    "features.strategy_desc": "Plane deine Flottenaufstellung.",
    "features.ranks": "Rangsystem",
    "features.ranks_desc": "Steige vom Fähnrich zum Admiral auf.",
    "features.multiplayer": "Globaler Krieg",
    "features.multiplayer_desc": "Fordere Kommandanten weltweit heraus.",
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languages: { code: Language; name: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("battleship-lang");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("battleship-lang", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  const languages = Object.entries(languageNames).map(([code, name]) => ({
    code: code as Language,
    name,
  }));

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
