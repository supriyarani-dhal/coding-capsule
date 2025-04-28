// app/page.tsx (Home page - shows after login)
"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HomePage() {
  const { user } = useUser();
  console.log("user", user?.imageUrl);

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold">
          The Coding Capsule
        </Link>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <Image
                src={user?.imageUrl}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{user.fullName}</span>
            </>
          )}
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center py-20 gap-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome to Coding Capsule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Write Code Individually */}
          <Link
            href="/individual"
            className="p-6 rounded-xl shadow bg-white hover:bg-gray-50 transition border"
          >
            <h3 className="text-xl font-semibold">Write Code Individually</h3>
            <p className="text-sm mt-2 text-gray-600">
              Start coding on your own in a powerful editor.
            </p>
          </Link>

          {/* Create Team Collaboration (Popup) */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="p-6 w-full rounded-xl shadow bg-white hover:bg-gray-50 transition border">
                <h3 className="text-xl font-semibold">
                  Create Team Collaboration
                </h3>
                <p className="text-sm mt-2 text-gray-600">
                  Set up a real-time collaboration session.
                </p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Team Room</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-3">
                {/* You can add input fields to create or join room here */}
                <input
                  placeholder="Enter Room ID"
                  className="w-full p-2 border rounded"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Join Room
                </button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Generate Report */}
          <Link
            href="/report-making"
            className="p-6 rounded-xl shadow bg-white hover:bg-gray-50 transition border"
          >
            <h3 className="text-xl font-semibold">Generate Report</h3>
            <p className="text-sm mt-2 text-gray-600">
              Upload your project or GitHub repo to get a report.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
