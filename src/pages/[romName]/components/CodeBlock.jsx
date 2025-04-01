

// import { useState } from "react";
// import { IconButton, Tooltip, Box, useTheme } from "@mui/material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import CheckIcon from "@mui/icons-material/Check";

// const CodeBlock = ({ text, inline = false, multiline = false }) => {
//   const [copied, setCopied] = useState(false);
//   const theme = useTheme();

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
//         position: "relative",
//         width: inline ? "auto" : "100%", // Changed from fit-content to auto for better flexibility
//         mb: inline ? 0 : "1rem",
//         whiteSpace: inline ? "pre" : "pre-wrap", // Always use pre-wrap for multiline
//         lineHeight: 1.5, // Consistent line height
//         maxWidth: "100%", // Prevent overflow of container
//         overflowX: "auto", // Enable horizontal scroll when needed
//         overflowY: "hidden", // Prevent vertical scrollbar
//       }}
//     >
//       <Box 
//         component="span" 
//         sx={{ 
//           flexGrow: 1,
//           pr: inline ? 0 : "2.5rem",
//           // Improved word breaking and wrapping
//           overflowWrap: "break-word", // Handles long words
//           wordBreak: "break-word", // Enhanced word breaking
//           wordWrap: "break-word", // Fallback for older browsers
//           hyphens: "auto", // Enable hyphenation where possible
//           minWidth: 0, // Allows text to shrink below its minimum content size
//           display: "block", // Ensures proper text wrapping
//         }}
//       >
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
//             backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
//             flexShrink: 0, // Prevent button from shrinking
//             zIndex: 1, // Ensure button stays above text
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
  const theme = useTheme();

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
        position: "relative",
        width: inline ? "auto" : "100%",
        mb: inline ? 0 : "1rem",
        whiteSpace: inline ? "pre" : "pre-wrap",
        lineHeight: 1.5,
        maxWidth: "100%",
        overflowX: "auto",
        overflowY: "hidden",
      }}
    >
      <Box 
        component="span" 
        sx={{ 
          flexGrow: 1,
          pr: inline ? 0 : "2.5rem",
          overflowWrap: "break-word",
          wordBreak: "break-word",
          wordWrap: "break-word",
          hyphens: "auto",
          minWidth: 0,
          display: "block",
        }}
      >
        {text} 
      </Box>
      {!inline && (
        <Tooltip title={copied ? "Copied!" : "Copy"}>
          <IconButton
            onClick={handleCopy}
            size="small"
            sx={{
              position: "absolute",
              top: "0.5rem",
              right: "0.5rem",
              color: theme.palette.mode === "dark" ? "#bbb" : "#666",
              padding: "0.25rem",
              backgroundColor: theme.palette.mode === "dark" ? "#000" : "#fff",
              flexShrink: 0,
              zIndex: 1,
            }}
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default CodeBlock;
