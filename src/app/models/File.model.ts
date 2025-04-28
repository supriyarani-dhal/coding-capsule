import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFile extends Document {
  name: string;
  folderId: mongoose.Types.ObjectId | null; //if root then null
  content: string;
  language: string;
  extension: string;
  createdBy: string;
  projectType: "individual" | "collaborative";
  
}

const FileSchema: Schema = new Schema({
  name: { type: String, required: true },
  folderId: { type: Schema.Types.ObjectId, ref: "Folder"},
  content: { type: String, default: "" },
  language: { type: String, required: true },
  extension: { type: String, required: true },
  createdBy: { type: String},
  projectType: { type: String},
  
});

const File: Model<IFile> =
  mongoose.models.File || mongoose.model<IFile>("File", FileSchema);
export default File;
