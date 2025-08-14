import { motion } from "framer-motion";
import { isRTL } from "../lib/i18n";

export function AnimatedLogo() {
  const rtl = isRTL() || false;

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <motion.svg
        width="145"
        height="145"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <defs>
          {/* Primary Gradient - Modern AI Blue to Purple */}
          <linearGradient
            id="primaryGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="1" />
            <stop offset="50%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
          </linearGradient>

          {/* Secondary Gradient - Accent */}
          <linearGradient
            id="accentGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="1" />
          </linearGradient>

          {/* Success Gradient */}
          <linearGradient
            id="successGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#059669" stopOpacity="1" />
          </linearGradient>

          {/* Glow Effect */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Neural Network Pattern */}
          <pattern
            id="neuralPattern"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="15"
              cy="15"
              r="1.5"
              fill="url(#primaryGradient)"
              opacity="0.2"
            />
            <circle
              cx="5"
              cy="5"
              r="1"
              fill="url(#accentGradient)"
              opacity="0.15"
            />
            <circle
              cx="25"
              cy="10"
              r="0.8"
              fill="url(#successGradient)"
              opacity="0.1"
            />
          </pattern>
        </defs>

        {/* Background Neural Network */}
        <motion.circle
          cx="120"
          cy="120"
          r="115"
          fill="url(#neuralPattern)"
          opacity="0.3"
          initial={{ scale: 0, rotate: 0 }}
          animate={{
            scale: 1,
            rotate: rtl ? -360 : 360,
          }}
          transition={{
            scale: { delay: 0.2, duration: 1.2, ease: "easeOut" },
            rotate: {
              delay: 1.5,
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />

        {/* Main Logo Container */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        >
          {/* Central Brain/Core */}
          <motion.circle
            cx="120"
            cy="120"
            r="32"
            fill="url(#primaryGradient)"
            opacity="0.15"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.1, 1] }}
            transition={{ delay: 0.6, duration: 0.6 }}
          />

          {/* Inner AI Core */}
          <motion.circle
            cx="120"
            cy="120"
            r="18"
            fill="url(#primaryGradient)"
            opacity="0.8"
            filter="url(#glow)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* AI Symbol - Modern Hexagonal Pattern */}
          <motion.g
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 1, rotate: rtl ? -360 : 360 }}
            transition={{
              opacity: { delay: 1.0, duration: 0.5 },
              rotate: {
                delay: 2,
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {/* Hexagonal AI Pattern */}
            <polygon
              points="120,102 132,108 132,132 120,138 108,132 108,108"
              fill="none"
              stroke="white"
              strokeWidth="2"
              opacity="0.9"
            />
            <polygon
              points="120,108 126,111 126,129 120,132 114,129 114,111"
              fill="white"
              opacity="0.7"
            />
          </motion.g>

          {/* Data Flow Particles */}
          <motion.g>
            {/* Left to Right Data Flow */}
            <motion.circle
              cx={rtl ? 180 : 60}
              cy="120"
              r="3"
              fill="url(#accentGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                cx: rtl ? [180, 140, 120, 100, 60] : [60, 100, 120, 140, 180],
              }}
              transition={{
                delay: 1.2,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Second particle with delay */}
            <motion.circle
              cx={rtl ? 180 : 60}
              cy="110"
              r="2.5"
              fill="url(#successGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                cx: rtl ? [180, 140, 120, 100, 60] : [60, 100, 120, 140, 180],
              }}
              transition={{
                delay: 1.6,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />

            {/* Third particle */}
            <motion.circle
              cx={rtl ? 180 : 60}
              cy="130"
              r="2"
              fill="url(#primaryGradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                cx: rtl ? [180, 140, 120, 100, 60] : [60, 100, 120, 140, 180],
              }}
              transition={{
                delay: 2.0,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            />
          </motion.g>

          {/* Document Transformation Metaphor */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            {/* Input Document Icon */}
            <motion.rect
              x={rtl ? 175 : 65}
              y="70"
              width="20"
              height="24"
              rx="3"
              fill="currentColor"
              className="text-muted-foreground"
              opacity="0.4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            />

            {/* Rough content lines */}
            <motion.line
              x1={rtl ? 178 : 68}
              y1="76"
              x2={rtl ? 188 : 78}
              y2="76"
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted-foreground"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.8, duration: 0.3 }}
            />
            <motion.line
              x1={rtl ? 178 : 68}
              y1="80"
              x2={rtl ? 185 : 75}
              y2="80"
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted-foreground"
              opacity="0.6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.9, duration: 0.3 }}
            />

            {/* Output Document Icon */}
            <motion.rect
              x={rtl ? 65 : 175}
              y="70"
              width="20"
              height="24"
              rx="3"
              fill="url(#primaryGradient)"
              opacity="0.9"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.2, duration: 0.4 }}
            />

            {/* Polished content lines */}
            <motion.rect
              x={rtl ? 68 : 178}
              y="75"
              width="14"
              height="1"
              rx="0.5"
              fill="white"
              opacity="0.9"
              initial={{ width: 0 }}
              animate={{ width: 14 }}
              transition={{ delay: 2.4, duration: 0.3 }}
            />
            <motion.rect
              x={rtl ? 68 : 178}
              y="78"
              width="14"
              height="1"
              rx="0.5"
              fill="white"
              opacity="0.9"
              initial={{ width: 0 }}
              animate={{ width: 14 }}
              transition={{ delay: 2.5, duration: 0.3 }}
            />
            <motion.rect
              x={rtl ? 68 : 178}
              y="81"
              width="10"
              height="1"
              rx="0.5"
              fill="white"
              opacity="0.9"
              initial={{ width: 0 }}
              animate={{ width: 10 }}
              transition={{ delay: 2.6, duration: 0.3 }}
            />
          </motion.g>

          {/* Floating Enhancement Indicators */}
          <motion.g opacity="0.7">
            <motion.circle
              cx="90"
              cy="90"
              r="2"
              fill="url(#accentGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0.8, 1],
                opacity: [0, 1, 0.7, 1],
                y: [0, -3, 0],
              }}
              transition={{
                delay: 2.5,
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.circle
              cx="150"
              cy="95"
              r="1.5"
              fill="url(#successGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 0.9, 1.2],
                opacity: [0, 1, 0.6, 1],
                y: [0, -4, 0],
              }}
              transition={{
                delay: 2.8,
                duration: 2.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.circle
              cx="85"
              cy="155"
              r="1.8"
              fill="#fbbf24"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0.7, 1],
                opacity: [0, 1, 0.8, 1],
                x: [0, -2, 0],
              }}
              transition={{
                delay: 3.1,
                duration: 2.8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.circle
              cx="155"
              cy="150"
              r="2.2"
              fill="url(#primaryGradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.1, 0.8, 1.1],
                opacity: [0, 1, 0.5, 1],
                x: [0, 3, 0],
              }}
              transition={{
                delay: 3.4,
                duration: 3.2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.g>
        </motion.g>

        {/* Pulse Ring Effect */}
        <motion.circle
          cx="120"
          cy="120"
          r="18"
          fill="none"
          stroke="url(#primaryGradient)"
          strokeWidth="1.5"
          opacity="0.4"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            delay: 4,
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Outer Pulse Ring */}
        <motion.circle
          cx="120"
          cy="120"
          r="18"
          fill="none"
          stroke="url(#accentGradient)"
          strokeWidth="1"
          opacity="0.3"
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            delay: 4.5,
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
