import { motion } from "framer-motion";

export function AnimatedLogo() {
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
        width="80"
        height="80"
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <defs>
          {/* AI Neural Network Gradient */}
          <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#6366f1", stopOpacity: 1 }}
            />
            <stop
              offset="25%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
            <stop
              offset="75%"
              style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#10b981", stopOpacity: 1 }}
            />
          </linearGradient>

          {/* Document Gradient */}
          <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#f8fafc", stopOpacity: 0.95 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#e2e8f0", stopOpacity: 0.95 }}
            />
          </linearGradient>

          {/* Dark mode document gradient */}
          <linearGradient
            id="docGradientDark"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#1e293b", stopOpacity: 0.95 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#334155", stopOpacity: 0.95 }}
            />
          </linearGradient>

          {/* Glow effect */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* AI Brain pattern */}
          <pattern
            id="brainPattern"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="10"
              cy="10"
              r="1"
              fill="url(#aiGradient)"
              opacity="0.3"
            />
          </pattern>
        </defs>

        {/* Background AI Aura */}
        <motion.circle
          cx="120"
          cy="120"
          r="110"
          fill="url(#aiGradient)"
          opacity="0.08"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            scale: { delay: 0.1, duration: 0.8 },
            rotate: {
              delay: 1,
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />

        {/* Neural Network Base */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Central AI Core */}
          <motion.circle
            cx="120"
            cy="120"
            r="8"
            fill="url(#aiGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            filter="url(#glow)"
          />

          {/* Neural Network Nodes */}
          {/* Layer 1 - Input nodes */}
          <motion.circle
            cx="60"
            cy="80"
            r="4"
            fill="#6366f1"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.6, duration: 0.5 }}
          />
          <motion.circle
            cx="60"
            cy="120"
            r="4"
            fill="#8b5cf6"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />
          <motion.circle
            cx="60"
            cy="160"
            r="4"
            fill="#06b6d4"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.8, duration: 0.5 }}
          />

          {/* Layer 2 - Output nodes */}
          <motion.circle
            cx="180"
            cy="80"
            r="4"
            fill="#10b981"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
          <motion.circle
            cx="180"
            cy="120"
            r="4"
            fill="#06b6d4"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.0, duration: 0.5 }}
          />
          <motion.circle
            cx="180"
            cy="160"
            r="4"
            fill="#8b5cf6"
            opacity="0.8"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />

          {/* Neural Connections */}
          <motion.line
            x1="64"
            y1="80"
            x2="112"
            y2="120"
            stroke="url(#aiGradient)"
            strokeWidth="1.5"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
          />
          <motion.line
            x1="64"
            y1="120"
            x2="112"
            y2="120"
            stroke="url(#aiGradient)"
            strokeWidth="2"
            opacity="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.3, duration: 0.4 }}
          />
          <motion.line
            x1="64"
            y1="160"
            x2="112"
            y2="120"
            stroke="url(#aiGradient)"
            strokeWidth="1.5"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          />

          <motion.line
            x1="128"
            y1="120"
            x2="176"
            y2="80"
            stroke="url(#aiGradient)"
            strokeWidth="1.5"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          />
          <motion.line
            x1="128"
            y1="120"
            x2="176"
            y2="120"
            stroke="url(#aiGradient)"
            strokeWidth="2"
            opacity="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.6, duration: 0.4 }}
          />
          <motion.line
            x1="128"
            y1="120"
            x2="176"
            y2="160"
            stroke="url(#aiGradient)"
            strokeWidth="1.5"
            opacity="0.6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.7, duration: 0.4 }}
          />
        </motion.g>

        {/* Document Transformation Area */}
        <motion.g
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Input Document */}
          <motion.rect
            x="30"
            y="200"
            width="35"
            height="25"
            rx="4"
            fill="currentColor"
            className="text-muted-foreground dark:text-muted"
            opacity="0.3"
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 30, opacity: 0.3 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          />

          {/* Raw text lines */}
          <motion.line
            x1="35"
            y1="207"
            x2="55"
            y2="207"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.0, duration: 0.3 }}
          />
          <motion.line
            x1="35"
            y1="212"
            x2="50"
            y2="212"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.1, duration: 0.3 }}
          />
          <motion.line
            x1="35"
            y1="217"
            x2="58"
            y2="217"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-muted-foreground"
            opacity="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.2, duration: 0.3 }}
          />

          {/* AI Processing Flow */}
          <motion.path
            d="M70 212 Q95 205 120 212 Q145 219 170 212"
            stroke="url(#aiGradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 2.3, duration: 0.8 }}
            filter="url(#glow)"
          />

          {/* Output Document */}
          <motion.rect
            x="175"
            y="200"
            width="35"
            height="25"
            rx="4"
            fill="url(#aiGradient)"
            opacity="0.9"
            initial={{ x: 195, opacity: 0 }}
            animate={{ x: 175, opacity: 0.9 }}
            transition={{ delay: 2.4, duration: 0.5 }}
          />

          {/* Enhanced content lines */}
          <motion.rect
            x="180"
            y="206"
            width="15"
            height="1.5"
            rx="0.75"
            fill="white"
            opacity="0.9"
            initial={{ width: 0 }}
            animate={{ width: 15 }}
            transition={{ delay: 2.6, duration: 0.3 }}
          />
          <motion.rect
            x="180"
            y="210"
            width="20"
            height="1.5"
            rx="0.75"
            fill="white"
            opacity="0.9"
            initial={{ width: 0 }}
            animate={{ width: 20 }}
            transition={{ delay: 2.7, duration: 0.3 }}
          />
          <motion.rect
            x="180"
            y="214"
            width="12"
            height="1.5"
            rx="0.75"
            fill="white"
            opacity="0.9"
            initial={{ width: 0 }}
            animate={{ width: 12 }}
            transition={{ delay: 2.8, duration: 0.3 }}
          />
          <motion.rect
            x="180"
            y="218"
            width="18"
            height="1.5"
            rx="0.75"
            fill="white"
            opacity="0.9"
            initial={{ width: 0 }}
            animate={{ width: 18 }}
            transition={{ delay: 2.9, duration: 0.3 }}
          />
        </motion.g>

        {/* AI Sparkles and Magic */}
        <motion.g opacity="0.8">
          {/* Floating AI particles */}
          <motion.circle
            cx="50"
            cy="50"
            r="2"
            fill="#fbbf24"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.8, 1],
              opacity: [0, 1, 0.7, 1],
              y: [0, -5, 0],
            }}
            transition={{
              delay: 2.0,
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.circle
            cx="190"
            cy="60"
            r="1.5"
            fill="#06b6d4"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.2, 0.9, 1.2],
              opacity: [0, 1, 0.6, 1],
              y: [0, -3, 0],
            }}
            transition={{
              delay: 2.3,
              duration: 2.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.circle
            cx="200"
            cy="180"
            r="2.5"
            fill="#8b5cf6"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0.7, 1],
              opacity: [0, 1, 0.8, 1],
              x: [0, 3, 0],
            }}
            transition={{
              delay: 2.6,
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.circle
            cx="40"
            cy="180"
            r="1.8"
            fill="#10b981"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.1, 0.8, 1.1],
              opacity: [0, 1, 0.5, 1],
              x: [0, -2, 0],
            }}
            transition={{
              delay: 2.9,
              duration: 2.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.g>

        {/* Brand text effect (subtle) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 3, duration: 1 }}
          className="text-foreground"
        >
          <text
            x="120"
            y="40"
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            fill="currentColor"
            opacity="0.4"
          >
            AI
          </text>
        </motion.g>

        {/* Pulse effect for central core */}
        <motion.circle
          cx="120"
          cy="120"
          r="8"
          fill="none"
          stroke="url(#aiGradient)"
          strokeWidth="1"
          opacity="0.6"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            delay: 3.5,
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
