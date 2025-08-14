import { ThemeProvider } from "./components/theme-provider.tsx";
import { Analytics } from "@vercel/analytics/react";
import { NoteTransformer } from "./components/note-transformer";

export function App() {
  return (
    <ThemeProvider>
      <NoteTransformer />
      <Analytics />
    </ThemeProvider>
  );
}
