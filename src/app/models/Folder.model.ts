import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFolder extends Document {
  name: string;
  parentFolderId?: mongoose.Types.ObjectId | null; //if root then null
  createdy: string; 
  projectType: "individual" | "collaborative";
}

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  parentFolderId: { type: Schema.Types.ObjectId, ref: "Folder", default: null },
  createdBy: { type: String },
  projectType: { type: String },

});

const Folder: Model<IFolder> =
  mongoose.models.Folder || mongoose.model<IFolder>("Folder", FolderSchema);
export default Folder;
