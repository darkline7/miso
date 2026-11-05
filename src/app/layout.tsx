import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MISO - Musicbox & Photobooth | Trải Nghiệm Karaoke & Chụp Ảnh Chuẩn Hàn",
  description: "Tổ hợp phòng hát karaoke phong cách hiện đại và photobooth chuẩn Hàn Quốc tại TP.HCM. Không gian riêng tư, âm thanh cao cấp, studio chụp ảnh lấy ngay.",
  keywords: ["karaoke", "musicbox", "photobooth", "chụp ảnh hàn quốc", "karaoke tphcm", "phòng hát gia đình", "miso"],
  authors: [{ name: "MISO Team" }],
  openGraph: {
    title: "MISO - Musicbox & Photobooth",
    description: "Nơi giai điệu gặp gỡ khoảnh khắc. Đặt phòng karaoke riêng tư & trải nghiệm photobooth chuẩn Hàn Quốc.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${jakarta.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-miso-bg text-miso-dark antialiased selection:bg-miso-accent-light selection:text-miso-dark">
        {children}
      </body>
    </html>
  );
}

