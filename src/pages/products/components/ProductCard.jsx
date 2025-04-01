// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../../components/Loader";
// import { Card, CardActionArea, CardContent, Button } from "@mui/material";
// import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";

// const ProductCard = ({ build }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   const handleGetBuildClick = () => {
//     navigate(`/products/${build.codename}`);
//   };

//   const handleImageLoad = () => {
//     setLoading(false);
//   };

//   return (
//     <Card
//       className=" overflow-hidden"
//       sx={{ boxShadow: "none", borderRadius: 7 }}
//     >
//       <CardActionArea>
//         <CardContent>
//           {loading && (
//             <div className=" inset-0 flex justify-center items-center">
//               <Loader />
//             </div>
//           )}
//           <div
//             className={` w-full h-full overflow-hidden ${
//               loading ? "opacity-0" : "opacity-100"
//             } transition-opacity duration-500`}
//           >
//             <img
//               src={build.image}
//               alt={build.device}
//               className="w-full h-80 object-contain transform transition-transform duration-300 hover:scale-110"
//               onLoad={handleImageLoad}
//             />

//           </div>
//           <Card
//       className="absolute bottom-0 left-0 p-4 w-full flex justify-between items-center"
//       sx={{
//         backdropFilter: 'blur(10px)', // Adjust the blur radius as needed
//         backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a semi-transparent background for better blur effect
//       }}
//     >
//       <div>
//         <div className="flex gap-2 items-center">
//           <SmartphoneOutlinedIcon fontSize="small" />
//           <p className="text-md font-bold">{build.codename}</p>
//         </div>

//         <h2 className="text-lg  mb-4">{build.device}</h2>
//       </div>

//       <Button
//         onClick={handleGetBuildClick}
//         variant="contained"
//         className="float-end"
//       >
//         Get
//       </Button>
//     </Card>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };

// export default ProductCard;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import { useTheme } from "@mui/material/styles";

const ProductCard = ({ build }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const backdropColorLight = "rgba(240, 248, 255, 0.5)";
  const backdropColorDark = "rgb(17, 24, 39, 0.5)";

  const handleGetBuildClick = () => {
    navigate(`/products/${build.codename}`);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Card
      className=" overflow-hidden relative" // Added 'relative' for absolute positioning of the blurred Card
      sx={{ boxShadow: "none", borderRadius: 7 }}
    >
      <CardActionArea>
        <CardContent>
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center">
              <Loader />
            </div>
          )}
          <div
            className={` w-full h-full overflow-hidden ${
              loading ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
          >
            <img
              src={build.image}
              alt={build.device}
              className="w-full h-96 object-contain transform transition-transform duration-300 hover:scale-110"
              onLoad={handleImageLoad}
            />
          </div>
        </CardContent>
      </CardActionArea>
      <Card
        className="absolute bottom-0 left-0 p-7 w-full flex justify-between items-center"
        sx={{
          borderRadius: "0px",
          backdropFilter: "blur(24px)",
          backgroundColor:
            theme.palette.mode === "dark"
              ? backdropColorDark
              : backdropColorLight,
        }}
      >
        <div>
          <div className="flex gap-2 items-center">
            <SmartphoneOutlinedIcon fontSize="small" />
            <p className="text-lg font-bold">{build.codename}</p>
          </div>
          <h2 className="text-xl font-medium  mb-4">{build.device}</h2>
        </div>
        <Button
          onClick={handleGetBuildClick}
          variant="contained"
          className="float-end"
        >
          Get
        </Button>
      </Card>
    </Card>
  );
};

export default ProductCard;
