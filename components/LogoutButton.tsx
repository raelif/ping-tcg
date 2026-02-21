"use client";

import { logout } from "@/lib/auth";

const LogoutButton = () => {
	return <button onClick={() => logout()}>{"LOGOUT"}</button>;
};

export default LogoutButton;
