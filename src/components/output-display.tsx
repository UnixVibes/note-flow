"use client"

import { Copy, FileText, Loader2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useTranslation } from "react-i18next";
import { MemoizedMarkdown } from "./memoized-markdown";
import { StreamingText } from "./streaming-text";
import { useState } from "react";

interface OutputDisplayProps {
  output: string;
  onCopy: () => void;
  isStreaming?: boolean;
}

export function OutputDisplay({
  output,
  onCopy,
  isStreaming = false,
}: OutputDisplayProps) {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    onCopy();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Card className="p-4 sm:p-6">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-0 pb-4 space-y-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg sm:text-xl">
            {t("output.title")}
          </CardTitle>
          {isStreaming && (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          )}
        </div>
        {output && !isStreaming && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex items-center space-x-2"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span>{isCopied ? t("output.copied") : t("output.copy")}</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="min-h-[300px] sm:min-h-[400px] p-3 sm:p-4 bg-muted rounded-lg border">
          {output ? (
            <div className="text-foreground leading-relaxed text-sm sm:text-base">
              {isStreaming ? (
                <StreamingText text={output} speed={15} />
              ) : (
                <div className="whitespace-pre-wrap">
                  <MemoizedMarkdown content={output} />
                </div>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground text-center py-16 sm:py-20">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4" />
              <p className="text-sm sm:text-base">{t("output.placeholder")}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
