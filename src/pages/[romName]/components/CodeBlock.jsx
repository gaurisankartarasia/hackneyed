// import { useState } from "react";
// import { IconButton, Tooltip, Box, useTheme } from "@mui/material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import CheckIcon from "@mui/icons-material/Check";

// const CodeBlock = ({ text, inline = false }) => {
//   const [copied, setCopied] = useState(false);
//   const theme = useTheme(); // Get current theme mode

//   const handleCopy = async () => {
//     try {
//       if (navigator.clipboard && window.isSecureContext) {
//         await navigator.clipboard.writeText(text);
//       } else {
//         const textArea = document.createElement("textarea");
//         textArea.value = text;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand("copy");
//         document.body.removeChild(textArea);
//       }
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (error) {
//       console.error("Copy failed", error);
//     }
//   };

//   return (
//     <Box
//       component={inline ? "span" : "pre"}
//       sx={{
//         display: inline ? "inline-flex" : "flex",
//         alignItems: "center",
//         backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
//         color: theme.palette.mode === "dark" ? "#f5f5f5" : "#333",
//         padding: inline ? "0.2rem 0.6rem" : "1rem",
//         borderRadius: "0.375rem",
//         fontFamily: "monospace",
//         fontSize: inline ? "0.8rem" : "0.9rem",
//         overflowX: "auto",
//         position: "relative",
//         width: inline ? "fit-content" : "100%", // Full width for `[command]`, fit-content for inline
//         mb: inline ? 0 : "1rem",
//         whiteSpace: inline ? "nowrap" : "pre-wrap", // Prevent wrapping in inline, allow wrapping in command blocks
//       }}
//     >
//       <Box component="span" sx={{ flexGrow: 1, overflowX: "auto", pr: inline ? 0 : "2.5rem" }}>
//         {text}
//       </Box>
//       <Tooltip title={copied ? "Copied!" : "Copy"}>
//         <IconButton
//           onClick={handleCopy}
//           size="small"
//           sx={{
//             position: inline ? "relative" : "absolute",
//             top: inline ? "unset" : "0.5rem",
//             right: inline ? "unset" : "0.5rem",
//             ml: inline ? "0.5rem" : 0,
//             color: theme.palette.mode === "dark" ? "#bbb" : "#666",
//             padding: "0.25rem",
//             backgroundColor: inline ? "transparent" : "rgba(255,255,255,0.1)",
//             "&:hover": {
//               backgroundColor: inline ? "transparent" : "rgba(255,255,255,0.2)",
//             },
//           }}
//         >
//           {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
//         </IconButton>
//       </Tooltip>
//     </Box>
//   );
// };

// export default CodeBlock;






import { useState } from "react";
import { IconButton, Tooltip, Box, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

const CodeBlock = ({ text, inline = false, multiline = false }) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme(); // Get current theme mode

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <Box
      component={inline ? "span" : "pre"}
      sx={{
        display: inline ? "inline-flex" : "flex",
        alignItems: "center",
        backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
        color: theme.palette.mode === "dark" ? "#f5f5f5" : "#333",
        padding: inline ? "0.2rem 0.6rem" : "1rem",
        borderRadius: "0.375rem",
        fontFamily: "monospace",
        fontSize: inline ? "0.8rem" : "0.9rem",
        overflowX: "auto",
        position: "relative",
        width: inline ? "fit-content" : "100%", // Full width for `[command]` and `[code]`, fit-content for inline
        mb: inline ? 0 : "1rem",
        whiteSpace: inline ? "nowrap" : multiline ? "pre-wrap" : "pre", // Handle line breaks differently for each type
        lineHeight: multiline ? "1.5" : "normal", // Improved line height for multiline code
      }}
    >
      <Box 
        component="span" 
        sx={{ 
          flexGrow: 1, 
          overflowX: "auto", 
          pr: inline ? 0 : "2.5rem",
          wordBreak: multiline ? "break-word" : "normal", // Better word wrapping for multiline code
        }}
      >
        {text}
      </Box>
      <Tooltip title={copied ? "Copied!" : "Copy"}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: inline ? "relative" : "absolute",
            top: inline ? "unset" : "0.5rem",
            right: inline ? "unset" : "0.5rem",
            ml: inline ? "0.5rem" : 0,
            color: theme.palette.mode === "dark" ? "#bbb" : "#666",
            padding: "0.25rem",
            backgroundColor: inline ? "transparent" : "rgba(255,255,255,0.1)",
            "&:hover": {
              backgroundColor: inline ? "transparent" : "rgba(255,255,255,0.2)",
            },
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CodeBlock;