// import React from "react";
// import { useParams,  Link } from "react-router-dom";
// import Loader from "../../components/Loader";
// import { useROMData } from "./hooks/useCodenameData";
// import LazyImage from "./components/LazyImage";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardActionArea from "@mui/material/CardActionArea";
// import Breadcrumbs from '@mui/material/Breadcrumbs'
// import  Typography  from "@mui/material/Typography";

// const encodeROMName = (name, version, projectName) => {
//   return `${name}-${version}-${projectName}`
//     .toLowerCase()
//     .replace(/[\s()]+/g, "-")
//     .replace(/-+/g, "-")
//     .replace(/^-|-$/g, "");
// };

// const AvailableROMsPage = () => {
//   const { codename } = useParams();
//   const { device, availableROMs, loading } = useROMData(codename);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <Loader size={50} color="#fff" />
//       </div>
//     );
//   }

//   if (!device) {
//     return (
//       <div className="text-center mt-8">
//         <p>No device information found for the specified codename.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">

//       <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{margin:3}} >

//   <Link
//     underline="hover"
//     color="inherit"
//     to="/products"
//   >
//     Devices list
//   </Link>
//   <Typography sx={{ color: 'text.primary' }}>{device.device}</Typography>
// </Breadcrumbs>

//       <h1 className="text-xl font-bold mb-6">
//         Available ROMs for {device.device}
//       </h1>

//       {availableROMs.length === 0 ? (
//         <p>No ROMs available for this device.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {availableROMs.map((rom) => (
//             <Card
//               key={rom.name}
//               className="overflow-hidden"
//               sx={{
//                 borderRadius: 7,
//                 boxShadow: "none",
//                 // border: "1px solid gray",
//                 bgcolor:'aliceblue'
//               }}
//             >
//               <CardActionArea>
//                 <Link
//                   to={`/products/${codename}/${encodeROMName(
//                     rom.name,
//                     rom.version,
//                     rom.project_name
//                   )}`}
//                 >
//                   <CardContent sx={{padding:1.5}}>
//                     <LazyImage src={rom.romLogo} alt={rom.nae} />
//                     <h2 className="text-xl font-semibold m-4">
//                       {rom.name} {rom.version} {rom.project_name}
//                     </h2>
//                     <p className=" m-3">Updated: {rom.date}</p>
//                   </CardContent>{" "}
//                 </Link>
//               </CardActionArea>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailableROMsPage;

// src/pages/AvailableROMsPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { useROMData } from "../../hooks/useCodenameData"; // Check path if needed
import LazyImage from "./components/LazyImage"; // Check path if needed
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { encodeROMName } from "../../utils/encodeROMName";
import Button from "@mui/material/Button";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import MuiLink from "@mui/material/Link";
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';


const AvailableROMsPage = () => {
  const { codename } = useParams();
  const { device, availableROMs, loading } = useROMData(codename); // Ensure this hook fetches correctly

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} />
      </div>
    );
  }

  // It might be better to show an error or a specific message if the device fetch failed in useROMData
  if (!device && !loading) {
    // Check !loading to avoid showing this during initial load
    return (
      <div className="text-center mt-8 container mx-auto px-4 py-8">
        <SearchOffOutlinedIcon sx={{ fontSize: "4rem" }} />
        <h1 className="text-lg">
          Device information not found for codename: {codename}.
        </h1>
        <Button
          to="/products"
          sx={{ marginTop: "10px" }}
          variant="contained"
          component={Link}
        >
          Back to Devices list
        </Button>
      </div>
    );
  }

  // Handle case where device exists but no ROMs are found (or ROM fetch failed)
  if (!availableROMs && !loading) {
    return (
      <div className="container mx-auto px-4 py-4">
        {/* Breadcrumbs might still be useful */}
        <Breadcrumbs separator={<KeyboardArrowRightOutlinedIcon/>} aria-label="breadcrumb" sx={{ margin: 3 }}>
          <MuiLink
            component={Link}
            color="#3B82F6"
            to="/products"
            sx={{fontWeight: "600"}}
            underline="never"
          >
            Devices
          </MuiLink>
          {device && (
            <Typography sx={{ color: "inherit", fontWeight: "600" }}>{device.device}</Typography>
          )}
        </Breadcrumbs>
        {device && (
          <h1 className="text-xl font-bold mb-6">
            Available ROMs for {device.device}
          </h1>
        )}
        <p className="text-center">Could not load ROMs for this device.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumbs separator={<KeyboardArrowRightOutlinedIcon/>} aria-label="breadcrumb" sx={{ margin: 3 }}>
        <MuiLink
          component={Link}
          color="#3B82F6"
          to="/products"
          sx={{fontWeight: "600"}}
          underline="never"
        >
          Devices
        </MuiLink>
        <Typography sx={{ color: "inherity", fontWeight: "600" }}>
          {device?.device || codename}
        </Typography>
      </Breadcrumbs>

      {/* Ensure device exists before accessing properties */}
      <h1 className="text-xl font-bold mb-6">
        Available ROMs for {device?.device || "this device"}
      </h1>

      {availableROMs.length === 0 ? (
        <p className="text-center">No ROMs available for this device.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableROMs.map((rom, index) => {
            // Use a more robust key if names can collide, e.g., index or a generated ID
            // For now, using name + index as a fallback
            const uniqueKey = `${rom.name}-${index}`;
            // Generate the slug using the modified function
            const romSlug = encodeROMName(
              rom.name,
              rom.version,
              rom.project_name
            );

            // Conditionally build the display title
            const displayTitle = [rom.name, rom.version, rom.project_name]
              .filter(Boolean) // Remove null/undefined/empty strings
              .join(" "); // Join remaining parts with a space

            return (
              <Card
                key={uniqueKey} // Use a more reliable key
                className="overflow-hidden"
                sx={{
                  borderRadius: 7,
                  boxShadow: "none",
                }}
              >
                <CardActionArea>
                  {/* Ensure Link component handles 'to' prop correctly */}
                  {/* <Link
                    to={`/products/${codename}/${romSlug}`} 
                    style={{ textDecoration: "none", color: "inherit" }}
                  > */}
                  <CardContent sx={{ padding: 1.5 }}>
                    <LazyImage
                      src={rom.romLogo || "/placeholder-logo.png"}
                      alt={rom.name || "ROM Logo"}
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-medium m-3">
                          {displayTitle}
                        </h2>

                        {rom.date && <p className="m-3">Updated: {rom.date}</p>}
                      </div>

                      <Button
                        variant="contained"
                        className="float-end "
                        to={`/products/${codename}/${romSlug}`}
                        component={Link}
                      >
                        Get
                      </Button>
                    </div>
                  </CardContent>
                  {/* </Link> */}
                </CardActionArea>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AvailableROMsPage;
