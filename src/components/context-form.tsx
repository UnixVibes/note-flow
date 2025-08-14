import { Input } from "./ui/input";
import { useTranslation } from "react-i18next";
import type { NoteType, NoteContext } from "../lib/data";
import { contextFields } from "../lib/data";

interface ContextFormProps {
  noteType: NoteType;
  context: NoteContext;
  onContextChange: (field: string, value: string) => void;
}

export function ContextForm({
  noteType,
  context,
  onContextChange,
}: ContextFormProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {contextFields[noteType].map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder={t(`context.${field.key}`)}
                value={
                  context[noteType][
                    field.key as keyof (typeof context)[typeof noteType]
                  ]
                }
                onChange={(e) => onContextChange(field.key, e.target.value)}
                className="pl-9 sm:pl-10"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
