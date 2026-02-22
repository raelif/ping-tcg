import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "assets.tcgdex.net",
				port: "",
				pathname: "/en/**"
			}
		]
	}
};

export default nextConfig;
