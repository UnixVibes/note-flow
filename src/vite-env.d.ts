/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Next.js environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_GOOGLE_API_KEY?: string;
  }
}
