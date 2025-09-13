// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // shadcn 템플릿이면 색/반경 변수도 보통 여기에 포함됨
    },
  },
  plugins: [require("tailwindcss-animate")], // ✅ shadcn 권장
} satisfies Config;
