import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFolder extends Document {
  name: string;
  projectId: mongoose.Types.ObjectId;
  parentFolderId?: mongoose.Types.ObjectId | null;
}

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  parentFolderId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
});

const Folder: Model<IFolder> =
  mongoose.models.Folder || mongoose.model<IFolder>("Folder", FolderSchema);
export default Folder;
