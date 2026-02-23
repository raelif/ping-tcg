"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import clsx from "clsx";

type AuthButtonProps = {
	isLogged: boolean;
};

const AuthButton = ({ isLogged }: AuthButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const callbackUrl = usePathname();

	const handleAuth = useCallback(async () => {
		setIsLoading(true);
		try {
			await (isLogged
				? signOut({ callbackUrl })
				: signIn("github", { callbackUrl }));
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}, [callbackUrl, isLogged]);

	return (
		<div className="block px-4 py-2">
			<button
				className={clsx(
					"bg-red-700 hover:bg-red-800",
					"cursor-pointer rounded px-4 py-2 font-bold text-white",
					isLoading && "cursor-not-allowed opacity-40"
				)}
				type="button"
				disabled={isLoading}
				onClick={handleAuth}
			>
				{isLogged ? "LOGOUT" : "LOGIN"}
			</button>
		</div>
	);
};

export default AuthButton;
