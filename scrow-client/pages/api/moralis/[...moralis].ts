import { MoralisNextApi } from "@moralisweb3/next";

const apiKey = process.env.MORALIS_API_KEY || "";
const domain = process.env.APP_DOMAIN || "";
const uri = process.env.NEXTAUTH_URL || "";
const TIMEOUT = 120;
export default MoralisNextApi({
  apiKey,
  authentication: {
    domain,
    uri,
    timeout: TIMEOUT,
  },
});
