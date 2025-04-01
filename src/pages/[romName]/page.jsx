// // src/pages/[romName]/ROMDetailsPage.js
// import { useParams, useNavigate, Link } from "react-router-dom";
// import Loader from "../../components/Loader";
// import { useROMDetails } from "../../hooks/useROMDetails";
// import LazyImage from "./components/LazyImage";
// import { RenderFieldValue, formatKeyName } from "./components/c";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";

// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
// import MuiLink from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

// import ROMSourceLinks from "./components/ROMSourceLinks";
// import ROMDownloads from "./components/ROMDownloads";
// import ROMWarning from "./components/ROMWarning";

// const ROMDetailsPage = () => {
//   const { codename, romName } = useParams();
//   const navigate = useNavigate();
//   const { romDetails, deviceInfo, loading } = useROMDetails(codename, romName);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader />
//       </div>
//     );
//   }

//   if (!romDetails || !deviceInfo) {
//     return (
//       <div className="text-center mt-8">
//         <p className="text-lg">ROM or Device details not found.</p>
//         <Button
//           variant="contained"
//           sx={{ marginTop: "10px" }}
//           onClick={() => navigate(`/products`)}
//         >
//           Go Back to Devices
//         </Button>
//       </div>
//     );
//   }

//   const headerKeys = [
//     "romLogo",
//     "name",
//     "version",
//     "project_name",
//     "models",
//     "date",
//     "android_version",
//   ];

//   const allRomDetailKeys = Object.keys(romDetails);

//   // const genericKeys = allRomDetailKeys.filter(
//   //   (key) => !headerKeys.includes(key)
//   // );

//   const excludedKeys = ["warning", "downloads", "sourcelink"]; // Prevents duplicate rendering
//   const genericKeys = allRomDetailKeys.filter(
//     (key) => !headerKeys.includes(key) && !excludedKeys.includes(key)
//   );

//   return (
//     <div className="container mx-auto md:px-8 md:py-12">
//       <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ margin: 3 }}>
//         <MuiLink
//           component={Link}
//           underline="hover"
//           color="#3B82F6"
//           to="/products"
//         >
//           Devices
//         </MuiLink>
//         <MuiLink
//           component={Link}
//           underline="hover"
//           color="#3B82F6"
//           to={`/products/${deviceInfo.codename}`}
//         >
//           {deviceInfo.device} ({deviceInfo.codename})
//         </MuiLink>
//         <Typography sx={{ color: "text.primary", color: "inherit" }}>
//           {romDetails.name} {romDetails.version} {romDetails.project_name}
//         </Typography>
//       </Breadcrumbs>

//       <Card
//         sx={{ boxShadow: "none", borderRadius: 7 }}
//         className="overflow-hidden"
//       >
//         <CardContent>
//           <Grid container spacing={2} sx={{ marginBottom: 3 }}>
//             {romDetails.romLogo && (
//               <Grid
//                 item
//                 xs={12}
//                 sm={4}
//                 md={3}
//                 sx={{
//                   textAlign: { xs: "center", sm: "left" },
//                   alignSelf: "center",
//                 }}
//               >
//                 <LazyImage
//                   src={romDetails.romLogo}
//                   alt="ROM Logo"
//                   style={{
//                     maxWidth: "150px",
//                     maxHeight: "150px",
//                     margin: { xs: "auto", sm: "0" },
//                     display: "block",
//                     borderRadius: "8px",
//                   }}
//                 />
//               </Grid>
//             )}

//             <Grid
//               item
//               xs={12}
//               sm={romDetails.romLogo ? 8 : 12}
//               md={romDetails.romLogo ? 9 : 12}
//             >
//               <h1 className="text-2xl lg:text-3xl font-semibold mb-2 ">
//                 {romDetails.name} {romDetails.version} {romDetails.project_name}
//               </h1>
//               <p className=" font-semibold text-lg mb-4">
//                 Codename: <b>{deviceInfo.codename}</b>
//               </p>
//               <p className=" mb-4">Device: {deviceInfo.device}</p>
//               <p className=" mb-4">Supported Models: {romDetails.models}</p>
//               <p className=" mb-6">Updated: {romDetails.date}</p>
//               <p className=" mb-6">
//                 Android Version: {romDetails.android_version}
//               </p>
//               {romDetails.downloads && romDetails.downloads.length > 0 && (
//                 <ROMDownloads downloads={romDetails.downloads} />
//               )}
//             </Grid>
//           </Grid>

//           {romDetails.warning && romDetails.warning.length > 0 && (
//             <ROMWarning warnings={romDetails.warning} />
//           )}

//           {romDetails.sourcelink && romDetails.sourcelink.length > 0 && (
//             <ROMSourceLinks sourceLinks={romDetails.sourcelink} />
//           )}

//           {genericKeys.length > 0 && <Divider />}

//           {genericKeys.map((key) => {
//             const value = romDetails[key];

//             if (
//               value === null ||
//               value === undefined ||
//               (Array.isArray(value) && value.length === 0)
//             ) {
//               return null;
//             }

//             return (
//               <div key={key} style={{ marginBottom: "20px" }}>
//                 <Typography
//                   variant="h6"
//                   component="h3"
//                   gutterBottom
//                   sx={{ marginTop: 1 }}
//                 >
//                   {formatKeyName(key)}
//                 </Typography>
//                 <RenderFieldValue value={value} />
//               </div>
//             );
//           })}
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default ROMDetailsPage;







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
import Divider from "@mui/material/Divider";
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
    <div className="container mx-auto px-4 py-4">
      <Breadcrumbs separator={<KeyboardArrowRightOutlinedIcon />}  aria-label="breadcrumb" sx={{ margin: 3 }}>
        {/* ... Breadcrumb links ... */}
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
          {/* --- CHANGE IS IN THE GRID CONTAINER AND THE IMAGE GRID ITEM --- */}
          <Grid container spacing={5} sx={{ marginBottom: 7 }}>
            {romDetails.romLogo && (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  // Align item to the top instead of center
                  alignSelf: "flex-start",
                  // Add padding to the right (adjust value 2, 3, 4 etc. as needed)
                  pr: { sm: 2 }, // Apply padding only on sm screens and up
                }}
              >
                <LazyImage
                  src={romDetails.romLogo}
                  alt="ROM Logo"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                    // Ensure margin doesn't interfere on sm+ screens
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
              // Adjust column count based on whether the logo exists
              sm={romDetails.romLogo ? 8 : 12}
              md={romDetails.romLogo ? 9 : 12}
            >
              {/* ... Text details ... */}
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
          {/* --- END OF CHANGES --- */}


       

         


          {genericKeys.map((key) => {
            const value = romDetails[key];

            // Skip rendering if value is null, undefined, or an empty array
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
                  {formatKeyName(key)} {/* Assuming formatKeyName handles conversion */}
                </Typography>
                {/* Ensure RenderFieldValue handles different value types (string, array, etc.) */}
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