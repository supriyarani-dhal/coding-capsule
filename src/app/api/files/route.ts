import File from "@/app/models/File.model";
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

    const { name, folderId, content, language, extension, projectType } =
      await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "File name is required" },
        { status: 400 }
      );
    }
    // require a dot
    if (!name.includes(".")) {
      return NextResponse.json(
        { error: "Filename must include an extension, e.g. 'foo.js'" },
        { status: 400 }
      );
    }

    // extract ext
    const parts = name.split(".");
    const ext = parts.pop()!.toLowerCase();
    const newName = parts.join(".");

    if (ext !== extension) {
      return NextResponse.json(
        { error: "Extension does not match" },
        { status: 400 }
      );
    }

    const newFile = await File.create({
      name: newName,
      content,
      language,
      extension,
      folderId: folderId || undefined, // If nested
      createdBy: !folderId ? userId : undefined, // Only for root
      projectType: !folderId ? projectType : undefined, // Only for root
    });

    return NextResponse.json(newFile, { status: 201 });
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
    //todo:correct it after
    const folderId = url.searchParams.get("folderId");
    const createdBy = url.searchParams.get("createdBy");
    const projectType = url.searchParams.get("projectType");

    let files;

    if (folderId) {
      // Fetch files inside a folder
      files = await File.find({ folderId });
    } else {
      // Fetch root-level files
      files = await File.find({
        createdBy,
        projectType,
        folderId: { $exists: false },
      });
    }

    return NextResponse.json(files, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectDB();
    const { fileId, content, language } = await req.json();

    if (!fileId) {
      return NextResponse.json(
        { error: "fileId is required" },
        { status: 400 }
      );
    }

    const updated = await File.findByIdAndUpdate(
      fileId,
      { content, language },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("[FILES_PUT]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
