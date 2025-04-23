"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
<<<<<<< HEAD
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
=======
import Image from "next/image";
import { useState } from "react";
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function HomePage() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
<<<<<<< HEAD
  const [roomId, setRoomId] = useState("");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <Link href="/" className="text-2xl font-bold">
          The Coding Capsule
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm">{user?.fullName}</span>
          <Avatar>
            <AvatarImage src={user?.imageUrl} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
=======

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold">The Coding Capsule</h1>
        <div className="flex items-center gap-2">
          {user && (
            <>
              <Image
                src={user.imageUrl}
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-sm font-medium">{user.fullName}</span>
            </>
          )}
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center py-20 gap-10 px-4">
<<<<<<< HEAD
        <h2 className="text-3xl font-bold">Welcome to Coding Capsule</h2>
=======
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Coding Capsule</h2>
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Write Code Individually */}
          <Link
<<<<<<< HEAD
            href="/individualCoding-editor"
            className="p-6 rounded-xl shadow bg-white hover:bg-gray-50 transition border"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              Write Code Individually
            </h3>
=======
            href="/coding-editor"
            className="p-6 rounded-xl shadow bg-white hover:bg-gray-50 transition border"
          >
            <h3 className="text-xl font-semibold">Write Code Individually</h3>
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
            <p className="text-sm mt-2 text-gray-600">
              Start coding on your own in a powerful editor.
            </p>
          </Link>

          {/* Create Team Collaboration (Popup) */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="p-6 w-full rounded-xl shadow bg-white hover:bg-gray-50 transition border">
<<<<<<< HEAD
                <h3 className="text-xl font-semibold text-gray-900">
                  Create Team Collaboration
                </h3>
=======
                <h3 className="text-xl font-semibold">Create Team Collaboration</h3>
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
                <p className="text-sm mt-2 text-gray-600">
                  Set up a real-time collaboration session.
                </p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
<<<<<<< HEAD
                <DialogTitle>
                  Create a Team RoomEnter Room ID to Join or Create
                </DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-6">
                <Input
                  className=" border-gray-700"
                  placeholder="Enter Room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
                <Link
                  href={`/coding-editor?room=${roomId}`}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-white text-center"
                >
                  Join Room
                </Link>
=======
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
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
              </div>
            </DialogContent>
          </Dialog>

          {/* Generate Report */}
          <Link
<<<<<<< HEAD
            href="/report-making"
            className="p-6 rounded-xl shadow bg-white hover:bg-gray-50 transition border"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              Generate Report
            </h3>
=======
            href="/report-generator"
            className="p-6 rounded-xl shadow bg-white hover:bg-gray-50 transition border"
          >
            <h3 className="text-xl font-semibold">Generate Report</h3>
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
            <p className="text-sm mt-2 text-gray-600">
              Upload your project or GitHub repo to get a report.
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
