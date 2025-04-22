// 📁 src/liveblocks.config.ts

import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

export const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
});

export const {
  RoomProvider,
  useOthers,
  useMyPresence,
  useUpdateMyPresence,
  useRoom,
  useSelf,
  useOthersMapped,
} = createRoomContext(client);
