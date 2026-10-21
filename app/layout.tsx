import type { Metadata, Viewport } from "next";
import { Baloo_2, DM_Sans } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Duck Crossing · One tap. Keep moving.",
  description:
    "A one-button road-crossing game. Hop a duck forward one lane at a time, dodge cars, ride logs across rivers and beat the train.",
};

export const viewport: Viewport = {
  themeColor: "#2F6B3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${baloo.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
