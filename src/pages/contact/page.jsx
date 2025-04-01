// import React, { useState } from 'react';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, message } = formData;
//     const mailtoLink = `mailto:vivekachooz@gmail.com?subject= ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
//     window.location.href = mailtoLink;
//   };

//   return (
//     <div className=" mt-16 flex flex-col justify-center items-center ">
     
//         <div className="w-full md:w-1/2 bg-gray-900 rounded-3xl p-8">
//           <h2 className="text-2xl font-semibold text-gray-100 mb-6">Contact Us</h2>
          
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label htmlFor="name" className="block text-gray-100">Name</label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-2 rounded-3xl bg-gray-800"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-gray-100">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-2 rounded-3xl bg-gray-800"
//               />
//             </div>

//             <div>
//               <label htmlFor="message" className="block text-gray-100">Message</label>
//               <textarea
//                 id="message"
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full px-4 py-2 rounded-3xl bg-gray-800"
//                 rows="5"
//               />
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full bg-gray-100 text-black py-2 rounded-3xl font-semibold hover:bg-[#393f44] hover:text-white active:scale-95 transition-all duration-500"
//               >
//                 Send Message
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
    
//   );
// };

// export default ContactPage;







import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const ContactPage = () => {
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
    const mailtoLink = `mailto:vivekachooz@gmail.com?subject=${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
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
