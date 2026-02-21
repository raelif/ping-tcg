"use client";

import { login } from "@/lib/auth";

const LoginButton = () => {
	return <button onClick={() => login()}>{"LOGIN"}</button>;
};

export default LoginButton;
