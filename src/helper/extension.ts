export const getExtension = (language: string) => {
    const extensions: Record<string, string> = {
      javascript: "js",
      python: "py",
      c: "c",
      cpp: "cpp",
      java: "java",
      typescript: "ts",
      ruby: "rb",
      go: "go",
      php: "php",
    };
    return extensions[language] || "txt";
  };
  