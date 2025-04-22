import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
//import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Page: FC = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <nav className="flex justify-between items-center p-4 border-b border-gray-800">
        <div className="text-lg font-bold flex items-center gap-2">
          <span>💎</span> Coding Capsule
        </div>
        <div className="flex justify-end items-center gap-4">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      <main className="container mx-auto pb-12 px-4 space-y-12">
        {/* Hero Section */}
        <section className="text-center">
          <div className="rounded-2xl relative overflow-hidden w-full mb-8 h-[600px]">
            <Image
              src="/collaboration-image.webp"
              alt="Collaboration"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-black opacity-70 rounded-xl"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <h1 className="text-4xl font-bold text-white mb-4">
                The Coding Capsule
              </h1>
              <p className="text-gray-300 mb-6">
                Collaborate with anyone, anywhere. Debug with AR. Code with your
                voice. All in your browser.
              </p>
              <SignUpButton>
                <Button className="cursor-pointer">Get Started</Button>
              </SignUpButton>
            </div>
          </div>
          {/* <h1 className="text-4xl font-bold mb-4">The Coding Capsule</h1>
            <p className="text-gray-400 mb-6">
              Collaborate with anyone, anywhere. Debug with AR. Code with your
              voice. All in your browser.
            </p>
            <Button>Get Started</Button> */}
        </section>

        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold mb-4">
            Features you won&apos;t find anywhere else
          </h2>
          <p className="text-gray-400 mb-8">
            The coding Capsule is the only development environment built for the
            way we&apos;ll code in the future. Here&apos;s how we&apos;re
            different:
          </p>
          <SignUpButton>
            <Button variant="default">Try for free</Button>
          </SignUpButton>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            {[
              "Real-Time Collaboration",
              "Augmented Reality Debugging",
              "Voice Coding",
              "Local File Saving",
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent>
                  <h3 className="text-xl font-bold mb-2">{feature}</h3>
                  <p className="text-gray-400 text-sm">
                    {feature === "Real-Time Collaboration" &&
                      "Work together in real-time. No more waiting for pull requests."}
                    {feature === "Augmented Reality Debugging" &&
                      "See your code in 3D. Spot bugs faster."}
                    {feature === "Voice Coding" &&
                      "Write code by speaking. Perfect for pair programming."}
                    {feature === "Local File Saving" &&
                      "Save your work to your computer. No need to rely on the cloud."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Join the Future Section */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-bold mb-4">Join the future of coding</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              "1,000+ devs are already here",
              "AR debugging is 70% faster",
              "Voice coding is 3x faster",
              "Local file saving is 100% secure",
            ].map((stat, index) => (
              <Card key={index}>
                <CardContent>
                  <p className="text-gray-400">{stat}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <SignUpButton>
              <Button size="lg" className="cursor-pointer">
                Sign up for free
              </Button>
            </SignUpButton>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
