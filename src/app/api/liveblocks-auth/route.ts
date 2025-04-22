import { NextRequest } from "next/server";
import { Liveblocks } from "@liveblocks/node";
import { auth } from "@clerk/nextjs/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(request: NextRequest) {
  const { userId, sessionClaims } = await auth(); // Get Clerk user ID

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(userId, {
    userInfo: {
      name:
        typeof sessionClaims?.name === "string"
          ? sessionClaims.name
          : "Anonymous",
      picture:
        typeof sessionClaims?.picture === "string" ? sessionClaims.picture : "",
      color: "#FF0000",
    },
  });

  // Authorize the user and return the result
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}
