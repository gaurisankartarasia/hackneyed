
import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import GitHub from "@mui/icons-material/GitHub";
import Mail from "@mui/icons-material/Mail";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useTheme } from "@mui/material/styles";

const AboutSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
        display: "flex",
        gap:3,
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        alt="Vivekachooz"
        src="https://firebasestorage.googleapis.com/v0/b/personal-fe53d.appspot.com/o/me.jpg?alt=media&token=df1bf51f-073a-4d07-b4e1-397f4573fe43"
        sx={{
          width: isSmallScreen ? 200 : 400,
          height: isSmallScreen ? 200 : 400,
          boxShadow: 3,
          mb: isSmallScreen ? 2 : 0,
          transition: "transform 0.3s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
     <Card sx={(theme) => ({ boxShadow: "none", maxWidth: "600px", p: 2, color: theme.palette.mode === 'dark' ? '#abacad' : 'rgba(0, 0, 0, 0.87)', })}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            About Me
          </Typography>
          <Typography variant="h4" gutterBottom>
            Android Developer
          </Typography>
          <Typography variant="body1" paragraph>
            I'm Vivek, an Android developer, enthusiast, and freelancer. I'm
            also a BA English Language and Literature graduate student.
            Android development is my passion.
          </Typography>
          <Typography variant="body1" paragraph>
            I provide aftermarket software support for various devices, including
            Oneplus Nord CE3 Lite 5G, Realme 10 Pro 5G, and others. My Custom ROMs
            and kernels focus on performance and battery balance.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <GitHub sx={{ mr: 1 }} />
                <Typography variant="body1">Web:</Typography>
                <Link
                  href="https://vivekachooz.github.io"
                  sx={{ ml: 1 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vivekachooz.github.io
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box display="flex" alignItems="center">
                <Mail sx={{ mr: 1 }} />
                <Typography variant="body1">Email:</Typography>
                <Link href="mailto:vivekachooz@gmail.com" sx={{ ml: 1 }}>
                  vivekachooz@gmail.com
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Country:</strong> India
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Qualification:</strong> BA English graduate
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>

  );
};

export default AboutSection;
