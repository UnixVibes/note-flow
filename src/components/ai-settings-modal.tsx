"use client"

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import type { GeminiSettings } from "../lib/ai";
import {
  GEMINI_MODELS,
  getGeminiSettings,
  saveGeminiSettings,
} from "../lib/ai";

interface AISettingsModalProps {
  onSettingsChange?: () => void;
}

export function AISettingsModal({ onSettingsChange }: AISettingsModalProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<GeminiSettings>({
    model: "gemini-1.5-flash",
    apiKey: "",
  });

  useEffect(() => {
    const currentSettings = getGeminiSettings();
    setSettings(currentSettings);
  }, [open]);

  const handleSave = () => {
    saveGeminiSettings(settings);
    setOpen(false);
    onSettingsChange?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4" />
          {t("settings.title")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("settings.title")}</DialogTitle>
          <DialogDescription>{t("settings.description")}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">{t("settings.model")}</Label>
            <Select
              value={settings.model}
              onValueChange={(model) =>
                setSettings((prev) => ({ ...prev, model }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={t("settings.selectModel")} />
              </SelectTrigger>
              <SelectContent>
                {GEMINI_MODELS.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">{t("settings.apiKey")}</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder={t("settings.apiKeyPlaceholder")}
              value={settings.apiKey}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, apiKey: e.target.value }))
              }
            />
            <p className="text-xs text-muted-foreground">
              {t("settings.apiKeyDescription")}{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google AI Studio
              </a>
              . {t("settings.apiKeySecurity")}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("settings.cancel")}
          </Button>
          <Button onClick={handleSave}>{t("settings.save")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
