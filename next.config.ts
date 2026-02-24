import type { NextConfig } from "next";
import withLitSSR from "@lit-labs/nextjs";

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
	},
	transpilePackages: ["lit", "@lit-labs/ssr-react", "@lit-labs/nextjs"]
};

export default withLitSSR()(nextConfig);
