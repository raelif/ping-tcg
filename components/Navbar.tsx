"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import type { User } from "next-auth";
import { Menu } from "lucide-react";

import { navbar } from "@/data/static/navbar";
import AuthButton from "./AuthButton";

type NavbarProps = { user?: User | null };

const MenuLinks = () => {
	return (
		<ul className="flex grow justify-evenly gap-2">
			{navbar.map(route => (
				<li key={route.path} className="block px-4 py-2">
					<Link href={route.path}>{route.name}</Link>
				</li>
			))}
		</ul>
	);
};

const Navbar = ({ user }: NavbarProps) => {
	const mobileRef = useRef<HTMLDivElement>(null);

	const toggleMobile = useCallback(() => {
		if (mobileRef.current) {
			mobileRef.current.classList.toggle("max-h-0");
			mobileRef.current.classList.toggle("max-h-96");
			mobileRef.current.classList.toggle("opacity-0");
			mobileRef.current.classList.toggle("opacity-100");
		}
	}, []);

	return (
		<header className="sticky w-full bg-zinc-50 px-4 py-2">
			<nav className="rounded-md bg-zinc-800 text-white">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<Link href="/">
						<span className="block px-4 py-2">PingTCG</span>
					</Link>

					{/* Menu buttons */}
					<div className="flex gap-2 sm:order-2">
						<AuthButton isLogged={!!user} />
						<button
							type="button"
							onClick={toggleMobile}
							className="px-4 py-2 sm:hidden"
						>
							<Menu />
						</button>
					</div>

					{/* Links */}
					<div className="hidden w-full sm:flex">
						<MenuLinks />
					</div>
				</div>

				{/* Mobile Links */}
				<div
					ref={mobileRef}
					className="max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out sm:hidden"
				>
					<MenuLinks />
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
