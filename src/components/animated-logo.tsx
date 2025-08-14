import { motion } from "framer-motion";

export function AnimatedLogo() {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <motion.svg
        width="80"
        height="80"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#6366f1", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <motion.circle
          cx="100"
          cy="100"
          r="90"
          fill="url(#gradient1)"
          opacity="0.1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        />

        {/* Main document icon */}
        <motion.rect
          x="60"
          y="40"
          width="80"
          height="100"
          rx="8"
          fill="url(#gradient1)"
          opacity="0.8"
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 60, opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        />
        <motion.rect
          x="70"
          y="50"
          width="60"
          height="80"
          rx="4"
          fill="white"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 70, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Document lines */}
        <motion.line
          x1="80"
          y1="65"
          x2="120"
          y2="65"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        />
        <motion.line
          x1="80"
          y1="75"
          x2="115"
          y2="75"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        />
        <motion.line
          x1="80"
          y1="85"
          x2="110"
          y2="85"
          stroke="#6366f1"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        />

        {/* Transformation arrow */}
        <motion.path
          d="M35 100 Q50 80 65 100 Q80 120 95 100"
          stroke="url(#gradient2)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        />
        <motion.polygon
          points="90,95 100,100 90,105"
          fill="url(#gradient2)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3 }}
        />

        {/* AI sparkles */}
        <motion.g opacity="0.7">
          <motion.circle
            cx="45"
            cy="70"
            r="2"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.0, duration: 0.5 }}
          />
          <motion.circle
            cx="155"
            cy="60"
            r="2"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.1, duration: 0.5 }}
          />
          <motion.circle
            cx="165"
            cy="140"
            r="2"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.2, duration: 0.5 }}
          />
          <motion.circle
            cx="35"
            cy="130"
            r="2"
            fill="#fbbf24"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 1.3, duration: 0.5 }}
          />
        </motion.g>

        {/* Enhanced document */}
        <motion.rect
          x="105"
          y="60"
          width="80"
          height="100"
          rx="8"
          fill="url(#gradient2)"
          opacity="0.9"
          initial={{ x: 125, opacity: 0 }}
          animate={{ x: 105, opacity: 0.9 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        />
        <motion.rect
          x="115"
          y="70"
          width="60"
          height="80"
          rx="4"
          fill="white"
          initial={{ x: 135, opacity: 0 }}
          animate={{ x: 115, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />

        {/* Enhanced content */}
        <motion.rect
          x="125"
          y="85"
          width="30"
          height="4"
          rx="2"
          fill="#06b6d4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 30, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.3 }}
        />
        <motion.rect
          x="125"
          y="95"
          width="35"
          height="4"
          rx="2"
          fill="#06b6d4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 35, opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.3 }}
        />
        <motion.rect
          x="125"
          y="105"
          width="25"
          height="4"
          rx="2"
          fill="#06b6d4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 25, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.3 }}
        />
        <motion.rect
          x="125"
          y="115"
          width="30"
          height="4"
          rx="2"
          fill="#06b6d4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 30, opacity: 1 }}
          transition={{ delay: 1.9, duration: 0.3 }}
        />
        <motion.rect
          x="125"
          y="125"
          width="35"
          height="4"
          rx="2"
          fill="#06b6d4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 35, opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.3 }}
        />
      </motion.svg>
    </motion.div>
  );
}
