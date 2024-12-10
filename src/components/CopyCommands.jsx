import React, { useState } from "react";
import { TbCopy } from "react-icons/tb";

const CopyableCommand = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function"
    ) {
      navigator.clipboard.writeText(command).then(
        () => handleCopySuccess(),
        (err) => {
          console.error("Failed to copy: ", err);
          fallbackCopyToClipboard(command);
        }
      );
    } else {
      fallbackCopyToClipboard(command);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        handleCopySuccess();
      } else {
        alert("Failed to copy command.");
      }
    } catch (err) {
      console.error("Fallback: Unable to copy", err);
    }

    document.body.removeChild(textArea);
  };

  const handleCopySuccess = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="w-full bg-gray-800 rounded-2xl text-gray-300 p-4 my-2 flex items-center justify-between relative">
      <code className="overflow-x-auto text-sm">{command}</code>
      <button
        onClick={copyToClipboard}
        className="bg-gray-700 hover:bg-gray-600 text-white text-sm px-3 py-2 rounded ml-4"
      >
        <TbCopy />
      </button>
      {copied && (
        <span className="absolute top-0 right-0 mt-1 mr-1 text-xs text-green-500 bg-gray-900 p-1 rounded">
          Copied!
        </span>
      )}
    </div>
  );
};

export default CopyableCommand;
