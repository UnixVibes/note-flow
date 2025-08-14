import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface StreamingTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export function StreamingText({
  text,
  className = "",
  speed = 25,
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // If text is shorter than what we're currently displaying, update immediately
    if (text.length < displayedText.length) {
      setDisplayedText(text);
      return;
    }

    // If text is longer, gradually add characters
    if (displayedText.length < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);
    }

    // Auto-scroll to bottom when content updates
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, displayedText, speed]);

  useEffect(() => {
    // Show cursor when streaming
    setShowCursor(displayedText.length < text.length);
  }, [displayedText.length, text.length]);

  return (
    <motion.div
      ref={containerRef}
      className={`${className} max-h-[400px] overflow-auto`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="prose prose-sm max-w-none dark:prose-invert">
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            h1: ({ children }) => (
              <h1 className="text-lg font-bold mb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-base font-semibold mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-sm font-medium mb-1">{children}</h3>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>
            ),
            li: ({ children }) => <li className="text-sm">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">
                {children}
              </strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">
                {children}
              </code>
            ),
          }}
        >
          {displayedText}
        </ReactMarkdown>
      </div>

      {showCursor && (
        <motion.span
          className="inline-block w-0.5 h-4 bg-primary ml-1 align-text-top"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
