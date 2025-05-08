import Folder from "@/app/models/Folder.model";
import connectDB from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, parentFolderId, projectType, createdBy } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Folder name is required" },
        { status: 400 }
      );
    }

    const newFolder = await Folder.create({
      name,
      parentFolderId: parentFolderId || undefined,
      createdBy: !parentFolderId ? createdBy : undefined,
      projectType: !parentFolderId ? projectType : undefined,
    });

    return NextResponse.json(newFolder, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);

    const parentFolderId = url?.searchParams?.get("parentFolderId");
    const createdBy = url?.searchParams?.get("userId");
    const projectType = url?.searchParams?.get("projectType");

    let folders;

    if (parentFolderId) {
      // Fetch folders inside a parent folder
      folders = await Folder.find({ parentFolderId });
    } else {
      // Fetch top-level folders (root)
      folders = await Folder.find({
        createdBy,
        projectType,
        parentFolderId: null,
      });
    }

    return NextResponse.json(folders, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
