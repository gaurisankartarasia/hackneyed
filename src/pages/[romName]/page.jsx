
// src/pages/[romName]/ROMDetailsPage.js
import { useParams, useNavigate, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useROMDetails } from "../../hooks/useROMDetails";
import LazyImage from "./components/LazyImage";
import { RenderFieldValue, formatKeyName } from "./components/RenderFieldValue";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MuiLink from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

import ROMSourceLinks from "./components/ROMSourceLinks";
import ROMDownloads from "./components/ROMDownloads";
import ROMWarning from "./components/ROMWarning";

const ROMDetailsPage = () => {
  const { codename, romName } = useParams();
  const navigate = useNavigate();
  const { romDetails, deviceInfo, loading } = useROMDetails(codename, romName);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!romDetails || !deviceInfo) {
    return (
      <div className="text-center mt-8">
        <p className="text-lg">ROM or Device details not found.</p>
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          onClick={() => navigate(`/products`)}
        >
          Go Back to Devices
        </Button>
      </div>
    );
  }

  const headerKeys = [
    "romLogo",
    "name",
    "version",
    "project_name",
    "models",
    "date",
    "android_version",
  ];

  const allRomDetailKeys = Object.keys(romDetails);

  const excludedKeys = ["warning", "downloads", "sourcelink"]; // Prevents duplicate rendering
  const genericKeys = allRomDetailKeys.filter(
    (key) => !headerKeys.includes(key) && !excludedKeys.includes(key)
  );

  return (
    <div className="container mx-auto py-4">
      <Breadcrumbs separator={<KeyboardArrowRightOutlinedIcon />}  aria-label="breadcrumb" sx={{ margin: 3 }}>
         <MuiLink
          component={Link}
          color="#3B82F6"
          to="/products"
          underline="never"
          sx={{fontWeight: "600" }}
        >
          Devices
        </MuiLink>
        <MuiLink
          component={Link}
          underline="never"
          color="#3B82F6"
          to={`/products/${deviceInfo.codename}`}
          sx={{fontWeight: "600" }}
        >
          {deviceInfo.device} ({deviceInfo.codename})
        </MuiLink>
        <Typography sx={{  color: "inherit", fontWeight: "600" }}>
          {romDetails.name} {romDetails.version} {romDetails.project_name}
        </Typography>
      </Breadcrumbs>

      <Card
        sx={{ boxShadow: "none", borderRadius: 7 }}
        className="overflow-hidden"
      >
        <CardContent>
          <Grid container spacing={5} sx={{ marginBottom: 7 }}>
            {romDetails.romLogo && (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  alignSelf: "flex-start",
                  pr: { sm: 2 }, 
                }}
              >
                <LazyImage
                  src={romDetails.romLogo}
                  alt="ROM Logo"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    margin: { xs: "auto", sm: "0" },
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
              </Grid>
            )}

            <Grid
              item
              xs={12}
              sm={romDetails.romLogo ? 8 : 12}
              md={romDetails.romLogo ? 9 : 12}
            >
              <h1 className="text-2xl lg:text-3xl font-semibold mb-2 ">
                {romDetails.name} {romDetails.version} {romDetails.project_name}
              </h1>
              <p className=" font-semibold text-lg mb-4">
                Codename: <b>{deviceInfo.codename}</b>
              </p>
              <p className=" mb-4">Device: {deviceInfo.device}</p>
              <p className=" mb-4">Supported Models: {romDetails.models}</p>
              <p className=" mb-6">Updated: {romDetails.date}</p>
              <p className=" mb-6">
                Android Version: {romDetails.android_version}
              </p>
              {romDetails.downloads && romDetails.downloads.length > 0 && (
                <ROMDownloads downloads={romDetails.downloads} />
              )}
            </Grid>   {romDetails.warning && romDetails.warning.length > 0 && (
            <ROMWarning warnings={romDetails.warning} />
          )}
          </Grid>


       

         


          {genericKeys.map((key) => {
            const value = romDetails[key];

            if (
              value === null ||
              value === undefined ||
              (Array.isArray(value) && value.length === 0)
            ) {
              return null;
            }

            return (
              <div key={key} style={{ margin: "1rem 0" }}>
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ marginTop: 1 }}
                >
                  {formatKeyName(key)} 
                </Typography>
                <RenderFieldValue value={value} />
              </div>
            );
            
          })}
           {romDetails.sourcelink && romDetails.sourcelink.length > 0 && (
            <ROMSourceLinks sourceLinks={romDetails.sourcelink} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ROMDetailsPage;