"use client";

import { useState, useEffect } from "react";
import { IFile } from "../models/File.model";
import axios from "axios";

// interface FileType {
//   _id: string;
//   name: string;
//   content: string;
//   language: string;
//   folderId?: string;
//}

export const useFiles = (params: { projectType?: string; folderId?: string; userId?: string })=> {
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/files", {
        params,
      });

      setFiles(data || []);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [params.projectType, params.folderId, params.userId]);

  return { files, loading, fetchFiles };
};
