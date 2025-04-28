"use client";

import { useState, useEffect } from "react";
import { IFolder } from "../models/Folder.model";
import axios from "axios";

// interface FolderType {
//   _id: string;
//   name: string;
//   parentFolderId?: string;
// }

export const useFolders = (params: { projectType?: string; parentFolderId?: string; userId?: string }) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFolders = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/folders", {
        params,
      });

      setFolders(data || []);
    } catch (error) {
      console.error("Failed to fetch folders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [params.projectType, params.parentFolderId, params.userId]);

  return { folders, loading, fetchFolders };
};
