import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

import { unstable_noStore as noStore } from "next/cache";

export const GET = () => {
  noStore();
  handleAuth();
};
