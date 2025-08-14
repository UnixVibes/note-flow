import { ThemeProvider } from "./components/theme-provider.tsx";
import { Analytics } from "@vercel/analytics/react";
import { NoteTransformer } from "./components/note-transformer";

export function App() {
  return (
    <ThemeProvider>
      <NoteTransformer />
      {import.meta.env.NODE_ENV === "production" && <Analytics />}
    </ThemeProvider>
  );
}
