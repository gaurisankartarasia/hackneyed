//src/components/About/page.jsx
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

import { useMeConfig } from "../../hooks/useFetchMeConfig";

const AboutSection = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { data } = useMeConfig();

if (!data) return 

  return (
    <Box
      sx={{
        mx: "auto",
        p: 2,
        display: "flex",
        gap: 3,
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        alt={data.about.name}
        src={data.site_info.display_picture}
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
      <Card
        sx={(theme) => ({
          boxShadow: "none",
          maxWidth: "600px",
          p: 2,
          color:
            theme.palette.mode === "dark"
              ? "#abacad"
              : "rgba(0, 0, 0, 0.87)",
        })}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            About Me
          </Typography>
          <Typography variant="h4" gutterBottom>
            {data.about.role_title}
          </Typography>
          <Typography variant="body1" paragraph>
            {data.about.paragraph_1}
          </Typography>
          <Typography variant="body1" paragraph>
            {data.about.paragraph_2}
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box display="flex" alignItems="center">
                <GitHub sx={{ mr: 1 }} />
                <Typography variant="body1">Web:</Typography>
                <Link
                  href={data.site_info.web}
                  sx={{ ml: 1 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.site_info.web}
                </Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box display="flex" alignItems="center">
                <Mail sx={{ mr: 1 }} />
                <Typography variant="body1">Email:</Typography>
                <Link href={`mailto:${data.site_info.contact_mail}`} sx={{ ml: 1 }}>
                  {data.site_info.contact_mail}
                </Link>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body1">
                <strong>Country:</strong> {data.about.country}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Typography variant="body1">
                <strong>Qualification:</strong> {data.about.qualification}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutSection;
