
import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useMeConfig } from "../../hooks/useFetchMeConfig";

const ContactPage = () => {


 const { data, error, isLoading } = useMeConfig();
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoLink = `mailto:${data.site_info.contact_mail}?subject=${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
    window.location.href = mailtoLink;
  };

  return (
    <Container maxWidth="sm" sx={{marginTop:10}} >
      <Box display="flex" justifyContent="center" alignItems="center" >
        <Paper elevation={4} sx={{ padding: 4, borderRadius: 7, boxShadow:'none' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Contact Us
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              margin="normal"
              sx={{
                borderRadius: 20,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 20,
                  "& fieldset": {
                    borderRadius: 20,
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              margin="normal"
              sx={{
                borderRadius: 20,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 20,
                  "& fieldset": {
                    borderRadius: 20,
                  },
                },
              }}
            />

            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              multiline
              rows={5}
              margin="normal"
              sx={{
                borderRadius: 7,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 7,
                  "& fieldset": {
                    borderRadius: 7,
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2,}}
            >
              Send Message
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default ContactPage;
