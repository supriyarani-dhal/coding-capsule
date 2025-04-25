export const createFile = async () => {
    //Since not all browsers support this API, so add this fallback:
    if (!window.showSaveFilePicker) {
        alert("File System Access API not supported in this browser.");
        return;
      }

    const handle = await window.showSaveFilePicker({
      types: [
        {
          description: "Code files",
          accept: {
            "text/plain": [".js", ".py", ".cpp", ".java", ".ts", ".c", ".go", ".php"],
          },
        },
      ],
    });
  
    const writable = await handle.createWritable();
    await writable.write(""); // empty file
    await writable.close();
    return handle;
  };
  
  export const openFile = async () => {
    if (typeof window.showOpenFilePicker === "function") {
    const [fileHandle] = await window.showOpenFilePicker({
        types: [
          {
            description: "Code files",
            accept: {
              "text/plain": [".js", ".ts", ".py", ".cpp", ".java", ".c", ".go", ".php"],
            },
          },
        ],
        multiple: false,
      });
       const file = await fileHandle.getFile();
       const content = await file.text();
       return { content, name: file.name, handle: fileHandle };
    } else {
       alert("File system access is not supported in this browser.");
    } 
  };
  