"use client"

import { Button } from "./ui/button";
import type { NoteType } from "../lib/data";
import { useCaseOptions } from "../lib/data";
import { useTranslation } from "react-i18next";

interface OutputFormatSelectorProps {
  noteType: NoteType;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
}

export function OutputFormatSelector({
  noteType,
  selectedFormat,
  onFormatChange,
}: OutputFormatSelectorProps) {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-foreground">
        {t("input.outputFormat")}
      </h3>
      <div className="flex flex-col sm:flex-row flex-wrap gap-2">
        {useCaseOptions[noteType].map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.value}
              variant={selectedFormat === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFormatChange(option.value)}
              className="flex items-center justify-center sm:justify-start space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{t(`formats.${option.value}`)}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
