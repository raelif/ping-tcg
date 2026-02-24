import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { auth } from "@/auth";
import Navbar from "@/components/Navbar";

import Providers from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Ping TCG",
	description: "Pokémon TCG Deck Builder"
};

const RootLayout = async ({
	children
}: Readonly<{ children: React.ReactNode }>) => {
	const session = await auth();

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Providers>
					<Navbar user={session?.user} />
					{children}
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
