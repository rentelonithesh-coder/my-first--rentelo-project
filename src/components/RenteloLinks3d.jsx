import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ExternalLink,
  Phone,
  Navigation,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* NOTE: In your actual project, uncomment the imports below 
   and remove the Mock Definitions section.
*/
// import { Link, useNavigate } from "react-router-dom";
// import RenteloLogo from "../assests/logo.png";
// import icon from "../assests/logo copy.png";

// --- MOCK DEFINITIONS FOR PREVIEW (Remove in production) ---
const useNavigate = () => {
  return (path) => console.log("Navigating to:", path);
};
// Using a placeholder logo for the preview
const RenteloLogo = "src/assests/logo 1 copy.png";
const icon = "src/assests/logo copy.png";
// ---------------------------------------------------------

// --- Custom SVG Assets for Animation (Optimized for Performance) ---
const CarSVG = () => (
  <svg viewBox="0 0 240 100" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id="sport-car-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#7f1d1d" />
      </linearGradient>
    </defs>
    <style>
      {`
        @keyframes gas-puff {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.9; }
          100% { transform: translate(-40px, -10px) scale(2.5); opacity: 0; }
        }
        .puff-1 { animation: gas-puff 0.7s infinite linear; }
        .puff-2 { animation: gas-puff 0.7s infinite linear 0.25s; }
        .puff-3 { animation: gas-puff 0.7s infinite linear 0.5s; }
      `}
    </style>
    
    {/* Gas Exhaust */}
    <g transform="translate(15, 80)">
      <circle cx="0" cy="0" r="4" fill="#cbd5e1" className="puff-1" />
      <circle cx="0" cy="0" r="5" fill="#94a3b8" className="puff-2" />
      <circle cx="0" cy="0" r="3" fill="#e2e8f0" className="puff-3" />
    </g>

    {/* Spoiler */}
    <path d="M15,55 L5,35 L40,35 L45,45 Z" fill="#1e293b" />
    <rect x="25" y="45" width="5" height="15" fill="#1e293b" />
    
    {/* Body */}
    <path d="M15,80 L15,55 Q15,45 40,40 L90,35 L120,25 Q160,20 190,40 L230,55 Q240,60 235,80 Z" fill="url(#sport-car-grad)" />
    
    {/* Windows */}
    <path d="M95,35 L120,27 Q150,22 170,38 L110,45 Z" fill="#bae6fd" />
    
    {/* Headlights & Taillights */}
    <path d="M225,65 L235,65 L233,70 L225,70 Z" fill="#fef08a" />
    <path d="M15,65 L20,65 L20,70 L15,70 Z" fill="#fca5a5" />
    
    {/* Wheels */}
    <circle cx="65" cy="80" r="18" fill="#0f172a" />
    <circle cx="65" cy="80" r="10" fill="#e2e8f0" stroke="#334155" strokeWidth="3" />
    <circle cx="185" cy="80" r="18" fill="#0f172a" />
    <circle cx="185" cy="80" r="10" fill="#e2e8f0" stroke="#334155" strokeWidth="3" />
  </svg>
);

const BikeSVG = () => (
  <svg viewBox="0 0 200 120" className="w-full h-full overflow-visible">
    <defs>
      <linearGradient id="sport-bike-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3b82f6" />
        <stop offset="100%" stopColor="#1e3a8a" />
      </linearGradient>
    </defs>
    <style>
      {`
        @keyframes gas-puff-right {
          0% { transform: translate(0, 0) scale(0.5); opacity: 0.9; }
          100% { transform: translate(40px, -10px) scale(2.5); opacity: 0; }
        }
        .puff-r1 { animation: gas-puff-right 0.6s infinite linear; }
        .puff-r2 { animation: gas-puff-right 0.6s infinite linear 0.2s; }
        .puff-r3 { animation: gas-puff-right 0.6s infinite linear 0.4s; }
      `}
    </style>

    {/* Gas Exhaust */}
    <g transform="translate(185, 85)">
      <circle cx="0" cy="0" r="4" fill="#cbd5e1" className="puff-r1" />
      <circle cx="0" cy="0" r="5" fill="#94a3b8" className="puff-r2" />
      <circle cx="0" cy="0" r="3" fill="#e2e8f0" className="puff-r3" />
    </g>

    {/* Exhaust Pipe */}
    <path d="M140,95 L180,85" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />

    {/* Frame & Engine Area */}
    <path d="M60,60 L140,60 L150,90 L70,90 Z" fill="#1e293b" />

    {/* Front Forks & Handle */}
    <path d="M45,95 L70,30 L85,25" fill="none" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
    
    {/* Body / Fairings (Facing Left) */}
    <path d="M45,95 Q25,60 50,45 L70,25 L100,45 L150,45 L180,30 Q185,45 160,60 L140,90 Z" fill="url(#sport-bike-grad)" />
    
    {/* Windshield */}
    <path d="M70,25 L50,45 L65,45 Z" fill="#bae6fd" />
    
    {/* Wheels */}
    <circle cx="45" cy="95" r="22" fill="#0f172a" />
    <circle cx="45" cy="95" r="10" fill="#e2e8f0" stroke="#334155" strokeWidth="3" />
    
    <circle cx="150" cy="95" r="22" fill="#0f172a" />
    <circle cx="150" cy="95" r="10" fill="#e2e8f0" stroke="#334155" strokeWidth="3" />

    {/* Headlight & Taillight */}
    <circle cx="45" cy="55" r="6" fill="#fef08a" />
    <circle cx="178" cy="32" r="4" fill="#fca5a5" />
  </svg>
);

// --- Brand Icons (Inline SVGs) ---
const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
    <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 384 512" className="w-6 h-6 fill-current">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 448 512" className="w-6 h-6 fill-current">
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l121.7-31.9c32.6 18.6 69.5 28.4 107 28.4 122.4 0 222-99.6 222-222 0-59.3-23.1-115.1-69.8-157.4zM223.9 440c-33.6 0-66.5-9-95.6-26.2l-6.8-4-71.1 18.6 19-69.3-4.5-7.1c-19.1-30.5-29.2-66-29.2-102.7 0-106 86.2-192.3 192.3-192.3 51.4 0 99.7 20 136 56.3 36.3 36.3 56.3 84.6 56.3 136 0 106.1-86.2 192.4-192.4 192.4zM353.1 326.3c-6-3-35.5-17.5-41-19.5-5.5-2-9.5-3-13.5 3-4 6-15.5 19.5-19 23.5-3.5 4-7 4.5-13 1.5-6-3-25.3-9.3-48.2-29.7-17.9-15.9-30-35.5-33.5-41.5-3.5-6-.4-9.3 2.6-12.3 2.7-2.7 6-7 9-10.5 3-3.5 4-6 6-10 .7-4 .3-7.5-1.5-11-1.8-3.5-13.5-32.5-18.5-44.5-4.8-11.6-9.8-10-13.5-10.2-3.5-.2-7.5-.2-11.5-.2-4 0-10.5 1.5-16 7.5-5.5 6-21 20.5-21 49.5 0 29 21.1 57 24.1 61 3 4 41.5 63.4 100.5 88.9 59 25.5 59 17 70 15.8 11-1.2 35.5-14.5 40.5-28.5 5-14 5-26 3.5-28.5-1.5-2.5-5.5-4-11.5-7z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 448 512" className="w-6 h-6 fill-current">
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 512 512" className="w-6 h-6 fill-current">
    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 576 512" className="w-6 h-6 fill-current">
    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 42.155 48.284 48.476C117.22 448 288 448 288 448s170.78 0 213.371-11.493c23.497-6.321 42.003-24.826 48.284-48.476 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zM232 337.741V174.259l144 81.741-144 81.741z" />
  </svg>
);

// --- Background Illustration for Main Page ---
const BackgroundIllustration = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-end justify-center">
    <motion.svg 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 0.45, y: 0 }}
      transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
      viewBox="0 0 1440 600" 
      className="w-full min-w-[1200px] max-h-[80vh] object-cover object-bottom" 
      preserveAspectRatio="xMidYMax slice"
    >
      {/* Sun/Atmosphere */}
      <circle cx="720" cy="200" r="150" fill="#ffe4e6" />
      <circle cx="720" cy="200" r="100" fill="#fecaca" opacity="0.6" />

      {/* Clouds */}
      <path d="M 250 180 Q 280 140 330 160 Q 370 130 410 160 Q 450 150 460 180 Z" fill="#ffffff" opacity="0.7" />
      <path d="M 1000 220 Q 1030 180 1080 200 Q 1120 170 1160 200 Q 1200 190 1210 220 Z" fill="#ffffff" opacity="0.5" />

      {/* Distant City Skyline */}
      <path d="M50 600 V 380 h 40 v 220 z" fill="#cbd5e1" />
      <path d="M120 600 V 310 h 70 v 290 z" fill="#94a3b8" />
      <path d="M160 600 V 250 h 40 v 350 z" fill="#cbd5e1" />
      <path d="M1150 600 V 320 h 60 v 280 z" fill="#94a3b8" />
      <path d="M1230 600 V 240 h 50 v 360 z" fill="#cbd5e1" />
      <path d="M1300 600 V 380 h 80 v 220 z" fill="#e2e8f0" />

      {/* Layered Hills */}
      <path fill="#fecdd3" d="M0,420 C250,320 450,480 750,380 C1050,280 1300,400 1440,320 L1440,600 L0,600 Z" />
      <path fill="#fda4af" d="M0,500 C350,400 600,550 900,450 C1200,350 1350,480 1440,420 L1440,600 L0,600 Z" />

      {/* Winding Road */}
      <path d="M -100 600 C 300 550 650 500 900 450 C 700 550 300 620 -50 650 Z" fill="#475569" opacity="0.6" />
      
      {/* Abstract Trees/Details */}
      <path d="M 200 450 L 215 400 L 230 450 Z" fill="#e11d48" opacity="0.4" />
      <path d="M 240 480 L 250 440 L 260 480 Z" fill="#e11d48" opacity="0.4" />
      <path d="M 1100 420 L 1120 360 L 1140 420 Z" fill="#be123c" opacity="0.3" />
    </motion.svg>
  </div>
);

// --- The Intro Animation Component ---
const RenteloIntro = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-50" />

      {/* Main Text Fade In */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="z-10 text-center mb-12"
      >
        <h1 className="text-3xl sm:text-5xl font-bold text-slate-800 tracking-tight">
        WELCOME TO <span className="text-red-600">RENTELO</span>
        </h1>
        <p className="text-slate-500 mt-2 font-medium tracking-wide text-sm sm:text-base">
         SELF-DRIVE BIKES & CARS
        </p>
      </motion.div>

      {/* Car Animation (Left to Right) - Hardware Accelerated */}
      <motion.div
        className="absolute w-40 sm:w-64 z-20"
        initial={{ x: "-120vw", top: "55%" }}
        animate={{ x: "120vw" }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.2 }}
        style={{ willChange: "transform" }}
      >
        <CarSVG />
        {/* Speed lines */}
        <motion.div
          className="absolute top-1/2 -left-20 w-32 h-1 bg-gradient-to-r from-transparent to-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      </motion.div>

      {/* Bike Animation (Right to Left) - Hardware Accelerated */}
      <motion.div
        className="absolute w-24 sm:w-40 z-30"
        initial={{ x: "120vw", top: "60%" }}
        animate={{ x: "-120vw" }}
        transition={{ duration: 1.8, ease: "easeInOut", delay: 0.4 }}
        style={{ willChange: "transform" }}
      >
        <BikeSVG />
        {/* Speed lines */}
        <motion.div
          className="absolute top-1/2 -right-20 w-32 h-1 bg-gradient-to-l from-transparent to-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
        />
      </motion.div>
    </motion.div>
  );
};

const RenteloLinks = () => {
  const navigate = useNavigate();
  const [openInfo, setOpenInfo] = useState(null);
  
  // Load instantly if they've already seen the intro this session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("renteloIntroSeen");
  });

  // Intro duration logic - Set to exactly 2.5s for smoothness
  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem("renteloIntroSeen", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Primary Links (Downloads)
  const primaryLinks = [
    {
      name: "Download for Android",
      icon: <GooglePlayIcon />,
      to: "https://play.google.com/store/apps/details?id=com.rentelo",
      bgColor: "bg-green-600 hover:bg-green-700",
      textColor: "text-white",
      subtext: "Get it on Google Play",
    },
    {
      name: "Download for iOS",
      icon: <AppleIcon />,
      to: "https://apps.apple.com/in/app/rentelo-bike-rental-company/id6448843515",
      bgColor: "bg-gray-900 hover:bg-black",
      textColor: "text-white",
      subtext: "Download on the App Store",
    },
  ];

  // Secondary Links
  const secondaryLinks = [
    {
      name: "Rentelo Website",
      icon: <img src={icon} alt="Rentelo" className="w-5 h-5 object-contain" />,
      to: "https://rentelo.in",
      color: "text-blue-600 bg-blue-50",
      border: "border-blue-100",
    },
    {
      name: "Customer Support (24/7)",
      icon: <Phone className="w-5 h-5" />,
      to: "tel:+919010100300",
      color: "text-green-600 bg-green-50",
      border: "border-green-100",
    },
    {
      name: "Whats app (Quick Chat)",
      icon: <WhatsAppIcon />,
      to: "https://wa.me/message/I6AJLZIGP2QTP1",
      color: "text-emerald-600 bg-emerald-50",
      border: "border-emerald-100",
    },
  ];

  // Social Links
  const socialLinks = [
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      to: "https://www.instagram.com/renteloindia?igsh=MW04aHIydnVudWwzcg==",
      color: "text-pink-600 hover:bg-pink-50",
    },
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      to: "https://www.facebook.com/share/1B5oF2jX8a",
      color: "text-blue-600 hover:bg-blue-50",
    },
    {
      name: "YouTube",
      icon: <YoutubeIcon />,
      to: "https://www.youtube.com/@rentelo",
      color: "text-red-600 hover:bg-red-50",
    },
  ];

  // Bike Locations
  const bikeLocations = [
    {
      title: "BTM 1st Stage",
      link: "https://g.co/kgs/UdvHr6",
      address:
        "20th Main Road, 14th Cross Road, Maruthi Nagar, Madiwala, BTM Stage 1, Bengaluru – 560029",
    },
    {
      title: "HSR Layout",
      link: "https://maps.app.goo.gl/nySKpRGM6zYRF3FB6",
      address: "9th Main Road, 7th Sector, HSR Layout, Bengaluru – 560102",
    },
    {
      title: "Marathahalli",
      link: "https://g.co/kgs/99Rqrn",
      address:
        "Behind @ Home Centre, Marathahalli Village, Bengaluru – 560037",
    },
    {
      title: "Electronic City",
      link: "https://maps.app.goo.gl/gaqnR45L7ZBf1qEC6",
      address:
        "Opp. Doddathogur Main Rd, Konappana Agrahara, Electronic City, Bengaluru – 560100",
    },
    {
      title: "Kengeri",
      link: "https://g.co/kgs/5TgD878",
      address:
        "Global Village Backgate, 3rd Main Road, BEML Layout 7th Stage, Mailasandra, Bengaluru – 560098",
    },
    {
      title: "Majestic",
      link: "https://g.co/kgs/FP1PNXL",
      address: "Freedom Park MLCP, Seshadri Rd, Gandhi Nagar, Bengaluru – 560009",
    },
    {
      title: "Manyata Tech Park",
      link: "https://share.google/cx0QKmiZNbRiuELnS",
      address:
        "Flat no 74/1, Kanaka Nagar, Arabic College Post, Veerannapalya, Nagavara, Bengaluru, Karnataka 560045",
    },
    {
      title: "Madiwala Main Road",
      link: "HI",
      address: "Welcome",
    },
  ];

  // Car Locations
  const carLocations = [
    {
      title: "BTM Layout",
      link: "https://maps.app.goo.gl/PV89e1B5YNuU2i5v5",
      address:
        "Basement, 83, Hosur Main Road, Next to Savoury Business Hotel, BTM Layout, Bengaluru – 560068",
    },
    {
      title: "Marathahalli",
      link: "https://maps.app.goo.gl/DfUm5hxhck8xv9iT6",
      address:
        "Basement Parking, 88, Outer Ring Rd, Behind Nagarjuna Restaurant, Marathahalli Village, Bengaluru – 560037",
    },
  ];

  const handleClick = (link) => {
    if (link.name === "Call") {
      window.location.href = link.to;
    } else if (link.to.startsWith("http")) {
      window.open(link.to, "_blank", "noopener,noreferrer");
    } else if (link.to) {
      navigate(link.to);
    }
  };

  const toggleInfo = (id) => {
    setOpenInfo(openInfo === id ? null : id);
  };

  // --- NEW STATE FOR CATEGORY POP-UP ---
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
    setOpenInfo(null); 
  };

  return (
    <>
      {/* Overlay the Intro on top to allow the Main Content to pre-render silently in the background, fixing the mount glitch */}
      <AnimatePresence>
        {showIntro && <RenteloIntro key="intro" />}
      </AnimatePresence>

      <div className="min-h-screen relative overflow-x-hidden bg-[#fffcfd] flex flex-col items-center font-sans text-slate-800 selection:bg-red-200 selection:text-red-900 p-6 z-0">
        {/* Elegant Vector Illustration Background */}
        <BackgroundIllustration />

        {/* Main Content Container */}
        <main className="relative z-10 w-full max-w-2xl flex flex-col items-center py-8">
          
          {/* Header Section */}
          <header className="flex flex-col items-center mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <img
                src={RenteloLogo}
                alt="Rentelo Logo"
                className="h-16 sm:h-20 w-auto object-contain mb-2"
              />
            </motion.div>

            <p className="text-slate-500 text-lg sm:text-2xl font-medium mt-1">
              Self-Drive Bikes & Cars
            </p>
          </header>

          {/* Primary Actions (Downloads) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 mt-2">
            {primaryLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleClick(link)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${link.bgColor} ${link.textColor}`}
              >
                <div className="shrink-0">{link.icon}</div>
                <div className="flex flex-col text-left">
                  <span className="text-xs opacity-90 font-medium uppercase tracking-widest drop-shadow-sm">
                    {link.subtext}
                  </span>
                  <span className="font-extrabold text-lg leading-tight drop-shadow-sm">
                    {link.name.split(" ").slice(-1)}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Secondary Links (Website, Contact) */}
          <div className="w-full space-y-4 mb-8">
            {secondaryLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleClick(link)}
                className={`group flex items-center justify-between w-full border ${link.border} rounded-2xl px-6 py-5 hover:bg-white/90 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`p-2.5 rounded-xl ${
                      link.color.split(" ")[1]
                    } shadow-inner`}
                  >
                    <div className={link.color.split(" ")[0]}>
                      {link.icon}
                    </div>
                  </div>
                  <span className="text-slate-700 font-bold tracking-wide group-hover:text-slate-900 transition-colors">
                    {link.name}
                  </span>
                </div>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </button>
            ))}
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-3 gap-4 w-full mb-12">
            {socialLinks.map((social, idx) => (
              <button
                key={idx}
                onClick={() => handleClick(social)}
                className="flex flex-col items-center justify-center bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white/90 hover:shadow-[0_10px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`mb-3 ${social.color.split(" ")[0]} transform group-hover:scale-110 transition-transform duration-300`}>
                  {social.icon}
                </div>
                <span className="text-xs font-bold tracking-wide text-slate-600 group-hover:text-slate-900">
                  {social.name}
                </span>
              </button>
            ))}
          </div>

          {/* --- GROUPED LOCATIONS SECTION --- */}
          <div className="w-full flex flex-col gap-8 sm:gap-10 mb-10 mt-4">
            
            {/* 1. Bikes Category Card */}
            <div className="relative w-full">
              
              {/* Animated Bike moving RIGHT to LEFT across the top (Outside Card) */}
              <motion.div
                className="absolute bottom-full mb-[-2px] sm:mb-[-4px] z-20 w-16 sm:w-20 pointer-events-none opacity-100"
                animate={{ left: ["100%", "-20%"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
              >
                <BikeSVG />
              </motion.div>

              <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleCategory('bikes')}
                  className="relative z-10 w-full p-5 sm:p-6 flex items-center justify-between hover:bg-white/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-xl text-blue-600 shadow-inner">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-wide">Bikes Locations</h2>
                      <p className="text-xs text-slate-500 font-bold mt-1 tracking-wider uppercase">{bikeLocations.length} Locations Available</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 ${openCategory === 'bikes' ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {openCategory === 'bikes' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-white/50 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {bikeLocations.map((loc, index) => {
                          const cardId = `bike-${index}`;
                          return (
                            <div
                              key={cardId}
                              className={`bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm transition-all duration-300 overflow-hidden ${
                                openInfo === cardId
                                  ? "ring-2 ring-blue-300/50 bg-white/80 shadow-md"
                                  : "hover:bg-white/80 hover:shadow-md"
                              }`}
                            >
                              <div className="p-4">
                                <button
                                  onClick={() => handleClick({ to: loc.link })}
                                  className="w-full flex justify-between items-start text-left group"
                                  title="Open in Maps"
                                >
                                  <h3 className="font-bold text-slate-800 pr-2 leading-tight group-hover:text-blue-600 transition-colors">
                                    {loc.title}
                                  </h3>
                                  <div className="p-2 text-blue-600 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors shadow-sm shrink-0">
                                    <Navigation className="w-4 h-4" />
                                  </div>
                                </button>

                                <button
                                  onClick={() => toggleInfo(cardId)}
                                  className="mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-blue-600 transition-colors w-full"
                                >
                                  {openInfo === cardId ? (
                                    <>Hide Address <ChevronUp className="w-3 h-3" /></>
                                  ) : (
                                    <>Show Address <ChevronDown className="w-3 h-3" /></>
                                  )}
                                </button>
                              </div>

                              {/* Expandable Address Section */}
                              <div
                                className={`bg-white/40 px-4 transition-all duration-300 ease-in-out overflow-hidden ${
                                  openInfo === cardId ? "max-h-40 py-3 border-t border-white/50" : "max-h-0 py-0"
                                }`}
                              >
                                <p className="text-xs font-medium text-slate-600 leading-relaxed text-left">
                                  {loc.address}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 2. Cars Category Card */}
            <div className="relative w-full">
              
              {/* Animated Car moving LEFT to RIGHT across the top (Outside Card) */}
              <motion.div
                className="absolute bottom-full mb-[-2px] sm:mb-[-4px] z-20 w-20 sm:w-24 pointer-events-none opacity-100"
                animate={{ left: ["-20%", "100%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                style={{ willChange: "transform" }}
              >
                <CarSVG />
              </motion.div>

              <div className="relative bg-white/70 backdrop-blur-md rounded-3xl border border-white/80 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleCategory('cars')}
                  className="relative z-10 w-full p-5 sm:p-6 flex items-center justify-between hover:bg-white/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-xl text-red-600 shadow-inner">
                       <MapPin className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-wide">Cars Locations</h2>
                      <p className="text-xs text-slate-500 font-bold mt-1 tracking-wider uppercase">{carLocations.length} Locations Available</p>
                    </div>
                  </div>
                  <div className={`p-2 rounded-full bg-red-50 text-red-600 transition-transform duration-300 ${openCategory === 'cars' ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                <AnimatePresence>
                  {openCategory === 'cars' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 border-t border-white/50 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        {carLocations.map((loc, index) => {
                          const cardId = `car-${index}`;
                          return (
                            <div
                              key={cardId}
                              className={`bg-white/50 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm transition-all duration-300 overflow-hidden ${
                                openInfo === cardId
                                  ? "ring-2 ring-red-300/50 bg-white/80 shadow-md"
                                  : "hover:bg-white/80 hover:shadow-md"
                              }`}
                            >
                              <div className="p-4">
                                <button
                                  onClick={() => handleClick({ to: loc.link })}
                                  className="w-full flex justify-between items-start text-left group"
                                  title="Open in Maps"
                                >
                                  <h3 className="font-bold text-slate-800 pr-2 leading-tight group-hover:text-red-600 transition-colors">
                                    {loc.title}
                                  </h3>
                                  <div className="p-2 text-red-600 bg-red-50 rounded-xl group-hover:bg-red-100 transition-colors shadow-sm shrink-0">
                                    <Navigation className="w-4 h-4" />
                                  </div>
                                </button>

                                <button
                                  onClick={() => toggleInfo(cardId)}
                                  className="mt-4 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-red-600 transition-colors w-full"
                                >
                                  {openInfo === cardId ? (
                                    <>Hide Address <ChevronUp className="w-3 h-3" /></>
                                  ) : (
                                    <>Show Address <ChevronDown className="w-3 h-3" /></>
                                  )}
                                </button>
                              </div>

                              {/* Expandable Address Section */}
                              <div
                                className={`bg-white/40 px-4 transition-all duration-300 ease-in-out overflow-hidden ${
                                  openInfo === cardId ? "max-h-40 py-3 border-t border-white/50" : "max-h-0 py-0"
                                }`}
                              >
                                <p className="text-xs font-medium text-slate-600 leading-relaxed text-left">
                                  {loc.address}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>

          {/* Footer */}
          <footer className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} Rentelo. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </>
  );
};

export default RenteloLinks;