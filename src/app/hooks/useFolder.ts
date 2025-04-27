"use client";

import { useState, useEffect } from "react";
import { IFolder } from "../models/Folder.model";

export const useFolders = (projectId: string) => {
  const [folders, setFolders] = useState<IFolder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchFolders = async () => {
      const res = await fetch(`/api/folders?projectId=${projectId}`);
      const data = await res.json();
      setFolders(data);
      setLoading(false);
    };

    fetchFolders();
  }, [projectId]);

  return { folders, loading };
};
