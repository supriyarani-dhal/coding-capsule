import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import DndWrapper from "@/components/DndWrapper";
import "./globals.css";
import { Providers } from "./Providers";

//import { Editor } from "./Editor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Coding Capsule",
  description: "The future of coding",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            href="https://liveblocks.io/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="https://liveblocks.io/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
        </head>
        <body className={`${inter.variable} antialiased`}>
          <Providers>
            <DndWrapper>{children}</DndWrapper>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${inter.variable} antialiased`}>
//         <LiveblocksProvider
//           publicApiKey={
//             "pk_dev_HPs2G_RtKo7gzYL_SygcJOfk5vaO2bT7S2byctoja2CcXqAmOeElU2Bv_duqrMjK"
//           }
//         >
//           <RoomProvider id="my-room">{children}</RoomProvider>
//         </LiveblocksProvider>
//       </body>
//     </html>
//   );
// }
