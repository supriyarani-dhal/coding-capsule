"use client";

import { useState, useEffect } from "react";
import { IFolder } from "../models/Folder.model";
import axios from "axios";

// interface FolderType {
//   _id: string;
//   name: string;
//   parentFolderId?: string;
// }

export const useFolders = (params: {
  userId?: string;
  projectType?: string;
  parentFolderId?: string;
}) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [folderLoading, setFolderLoading] = useState(false);

  const fetchFolders = async () => {
    try {
      setFolderLoading(true);

      const { data } = await axios.get("/api/folders", {
        params,
      });

      setFolders(data || []);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    } finally {
      setFolderLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [params.projectType, params.parentFolderId, params.userId]);

  return { folders, folderLoading, fetchFolders };
};
