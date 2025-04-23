<<<<<<< HEAD
import { Loader2 } from "lucide-react";
=======
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
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
<<<<<<< HEAD
        <div className="flex items-center gap-2 text-yellow-400">
          <Loader2 className="animate-spin w-6 h-6 text-white" />
          <span>⏳ Running...</span>
        </div>
=======
        <div className="text-yellow-400">⏳ Running...</div>
>>>>>>> 8ed5734575220d4200cb1e6bd056718fbe503226
      ) : error ? (
        <div className="text-red-400 whitespace-pre-wrap">{error}</div>
      ) : (
        <div className="whitespace-pre-wrap">{output || "// No output"}</div>
      )}
    </div>
  );
};

export default OutputConsole;
