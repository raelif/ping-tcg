"use client";

import { useCallback, useState } from "react";
import { signIn, signOut } from "next-auth/react";

type AuthButtonProps = {
	isLogged: boolean;
};

const AuthButton = ({ isLogged }: AuthButtonProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleAuth = useCallback(async () => {
		setIsLoading(true);
		try {
			await (isLogged
				? signOut({ callbackUrl: "/" })
				: signIn("github", { callbackUrl: "/" }));
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	}, [isLogged]);

	return (
		<button
			className={`${isLogged ? "bg-red-700 hover:bg-red-900" : "bg-blue-500 hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded cursor-pointer`}
			type="button"
			disabled={isLoading}
			onClick={handleAuth}
		>
			{isLogged ? "LOGOUT" : "LOGIN"}
		</button>
	);
};

export default AuthButton;
