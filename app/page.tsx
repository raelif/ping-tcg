import { auth } from "@/auth";

import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

const HomePage = async () => {
	const session = await auth();
	console.log({ user: session?.user });

	return (
		<div className="flex items-center justify-center bg-zinc-50 font-sans">
			<main className="flex flex-col items-center justify-between py-32 px-16">
				{"Homepage"}
				<LoginButton />
				<LogoutButton />
			</main>
		</div>
	);
};

export default HomePage;
