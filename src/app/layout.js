"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { ProductSelectedProvider } from "@/Providers/productSelectedProvider";
import { ModalProvider } from "@/Providers/ModalProvider";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/redux/store"; // ✅ Correct import

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// const metadata = {
//   title: "AJ Clothing",
//   description: "A clothing site",
// };

export default function RootLayout({ children }) {
  return (
    <Provider store={store}> {/* ✅ No need to call store() */}
      <ProductSelectedProvider>
        <ModalProvider>
          <PersistGate loading={null} persistor={persistor}> {/* ✅ Correct usage */}
            <html lang="en" className="h-full antialiased">
              <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
              >
                <div
                  className="flex min-h-full flex-1 flex-col bg-white"
                  vaul-drawer-wrapper=""
                >
                  {children}
                </div>
              </body>
            </html>
          </PersistGate>
        </ModalProvider>
      </ProductSelectedProvider>
    </Provider>
  );
}
