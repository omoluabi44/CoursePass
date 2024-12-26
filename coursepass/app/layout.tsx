

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar  from "./components/sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";
import {store} from "../app/redux/store/store";
import {Provider} from "react-redux";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Provider store={store}>
          <div className="layout">
            <Navbar />
            <div className="main">
              <Sidebar />
              <div className="content">{children}</div>
            </div>
          </div>
        </Provider>
      </body>
    </html>

    
  );
}
