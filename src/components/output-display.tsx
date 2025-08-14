import { Copy, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { t } from "../lib/translations";
import { MemoizedMarkdown } from "./memoized-markdown.tsx";

interface OutputDisplayProps {
  output: string;
  onCopy: () => void;
}

export function OutputDisplay({ output, onCopy }: OutputDisplayProps) {
  return (
    <Card className="p-4 sm:p-6">
      <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-0 pb-4 space-y-0">
        <CardTitle className="text-lg sm:text-xl">{t("output")}</CardTitle>
        {output && (
          <Button
            variant="outline"
            size="sm"
            onClick={onCopy}
            className="flex items-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>{t("copy")}</span>
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className="min-h-[300px] sm:min-h-[400px] p-3 sm:p-4 bg-muted rounded-lg border">
          {output ? (
            <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm sm:text-base">
              <MemoizedMarkdown content={output} />
            </div>
          ) : (
            <div className="text-muted-foreground text-center py-16 sm:py-20">
              <FileText className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4" />
              <p className="text-sm sm:text-base">
                {t("transformedNotesPlaceholder")}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
