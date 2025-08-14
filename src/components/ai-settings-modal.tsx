import { useState, useEffect } from "react";
import { Settings } from "lucide-react";
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
          Gemini Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Google Gemini Settings</DialogTitle>
          <DialogDescription>
            Configure your Google Gemini model preferences. Your API key is
            stored locally.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="model">Gemini Model</Label>
            <Select
              value={settings.model}
              onValueChange={(model) =>
                setSettings((prev) => ({ ...prev, model }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gemini model" />
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
            <Label htmlFor="apiKey">Google API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Google API key"
              value={settings.apiKey}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, apiKey: e.target.value }))
              }
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google AI Studio
              </a>
              . Your key is stored locally and never shared.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Settings</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
