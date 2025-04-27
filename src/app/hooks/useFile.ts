"use client";

import { useState, useEffect } from "react";
import { IFile } from "../models/File.model";

export const useFiles = (folderId: string) => {
  const [files, setFiles] = useState<IFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!folderId) return;

    const fetchFiles = async () => {
      const res = await fetch(`/api/files?folderId=${folderId}`);
      const data = await res.json();
      setFiles(data);
      setLoading(false);
    };

    fetchFiles();
  }, [folderId]);

  return { files, loading };
};
