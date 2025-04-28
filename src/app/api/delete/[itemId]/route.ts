import File from "@/app/models/File.model";
import Folder from "@/app/models/Folder.model";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { itemId: string } }) {
  await connectDB();
  const { itemId } = params;

  try {
    // First, try deleting as a File
    const file = await File.findById(itemId);
    if (file) {
      await file.deleteOne();
      return new NextResponse("File Deleted Successfully", { status: 200 });
    }

    // If not a file, try deleting as a Folder
    const folder = await Folder.findById(itemId);
    if (!folder) {
      return new NextResponse("File or Folder not found", { status: 404 });
    }

    // RECURSIVELY delete all subfolders and files inside
    await deleteFolderAndContents(folder._id);

    return new NextResponse("Folder and contents deleted successfully", { status: 200 });

  } catch (error) {
    console.error(error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

// Recursive function to delete folder and its contents
async function deleteFolderAndContents(folderId: string) {
  // Delete all files inside this folder
  await File.deleteMany({ parentFolder: folderId });

  // Find all subfolders
  const subfolders = await Folder.find({ parentFolder: folderId });

  for (const subfolder of subfolders) {
    // Recursively delete their contents
    await deleteFolderAndContents(subfolder._id);
  }

  // Finally, delete this folder
  await Folder.findByIdAndDelete(folderId);
}
