
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const FeedbackModal = ({ open, onClose }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let emailToSend = "";
    let subject = "";

    switch (selectedOption) {
      case "links":
        emailToSend = "vivekachooz@gmail.com";
        subject = "FEEDBACK: Links not working";
        break;
      case "bugs":
        emailToSend = "gaurisankar.work@gmail.com, vivekachooz@gmail.com";
        subject = "FEEDBACK: Bugs found in site";
        break;
      case "others":
        emailToSend = "vivekachooz@gmail.com";
        subject = "FEEDBACK";
            break;
      default:
        return;
    }

    window.location.href = `mailto:${emailToSend}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h6">Feedback</Typography>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <FormControl component="fieldset">
          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <FormControlLabel
              value="links"
              control={<Radio />}
              label="Links not working"
            />
            <FormControlLabel
              value="bugs"
              control={<Radio />}
              label="Bugs found in site"
            />
            <FormControlLabel
              value="others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          margin="normal"
          label="Enter your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FeedbackModal;
