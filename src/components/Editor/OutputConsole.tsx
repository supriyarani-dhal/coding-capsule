import React from "react";

type Props = {
  output: string;
  error: string;
  loading: boolean;
};

const OutputConsole = ({ output, error, loading }: Props) => {
  return (
    <div className="bg-black text-white h-48 p-3 overflow-y-auto text-sm font-mono border-t border-gray-700">
      <div className="text-green-400 mb-1">Console Output:</div>
      {loading ? (
        <div className="text-yellow-400">⏳ Running...</div>
      ) : error ? (
        <div className="text-red-400 whitespace-pre-wrap">{error}</div>
      ) : (
        <div className="whitespace-pre-wrap">{output || "// No output"}</div>
      )}
    </div>
  );
};

export default OutputConsole;
