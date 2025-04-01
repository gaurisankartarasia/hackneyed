
import React, { useState } from "react";
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.default,
}));

const StyledCode = styled(Typography)(({ theme }) => ({
  overflowX: "auto",
  fontSize: theme.typography.body2.fontSize,
  fontFamily: "monospace",
  marginRight: theme.spacing(1),
  flexGrow: 1,
}));

const StyledCopyButton = styled(IconButton)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const StyledCheckIcon = styled(CheckOutlinedIcon)(({ theme }) => ({
  color: theme.palette.success.main,
}));

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
    <StyledCard sx={{ boxShadow: "none" }}>
      <CardContent sx={{ padding: 0, flexGrow: 1 }}>
        <StyledCode variant="body2">{command}</StyledCode>
      </CardContent>
      {copied ? (
        <StyledCopyButton disabled>
          <StyledCheckIcon size={20} />
        </StyledCopyButton>
      ) : (
        <StyledCopyButton
          onClick={copyToClipboard}
          aria-label="copy"
          color="primary"
        >
          <ContentPasteOutlinedIcon fontSize="small" />
        </StyledCopyButton>
      )}
    </StyledCard>

  );
};

export default CopyableCommand;
