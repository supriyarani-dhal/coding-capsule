"use client";

import { useOthers, useSelf } from "@liveblocks/react";
import Image from "next/image";
import { useMemo } from "react";

const colors = [
  "#E57373",
  "#64B5F6",
  "#81C784",
  "#FFD54F",
  "#4DD0E1",
  "#A1887F",
  "#BA68C8",
];

// Utility to pick a color based on user ID
function getUserColor(userId: string) {
  const hash = [...userId].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

const LiveCursor = () => {
  const others = useOthers();
  const self = useSelf();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selfColor = useMemo(() => {
    return self ? getUserColor(self.connectionId.toString()) : "#90CAF9";
  }, [self]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {others.map(({ presence, id, info }) => {
        if (!presence?.cursor) return null;

        const { x, y } = (presence?.cursor as { x: number; y: number }) || {};
        const username = info?.name ?? `User ${id}`;
        const avatar = `https://api.dicebear.com/7.x/personas/svg?seed=${id}`;
        const color = getUserColor((id ?? "").toString());

        return (
          <div
            key={id}
            className="absolute z-50 transition-all duration-75"
            style={{
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded shadow">
              {avatar && (
                <Image
                  src={avatar}
                  alt={username}
                  className="w-6 h-6 rounded-full "
                />
              )}
              <div
                style={{ backgroundColor: color }}
                className="text-xs font-medium "
              >
                {username}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveCursor;
