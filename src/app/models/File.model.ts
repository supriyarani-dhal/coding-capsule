import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFile extends Document {
  name: string;
  content: string;
  language: string;
  extension: string;
  folderId: mongoose.Types.ObjectId;
}

const FileSchema: Schema = new Schema({
  name: { type: String, required: true },
  content: { type: String, default: "" },
  language: { type: String, required: true },
  extension: { type: String, required: true },
  folderId: { type: Schema.Types.ObjectId, ref: "Folder", required: true },
});

const File: Model<IFile> =
  mongoose.models.File || mongoose.model<IFile>("File", FileSchema);
export default File;
