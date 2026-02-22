import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export const config = {
	matcher: ["/((?!api|_next|favicon\\.ico|.*\\..*).*)"]
};

export async function proxy(request: NextRequest) {
	const session = await auth();
	const { pathname } = request.nextUrl;

	const isAuthenticatedPath = pathname.startsWith("/decks");

	if (isAuthenticatedPath && !session) {
		return NextResponse.redirect(new URL("/api/auth/signin", request.url));
	}

	return NextResponse.next();
}
