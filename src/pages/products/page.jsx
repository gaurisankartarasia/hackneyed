// import React from "react";
// import { useROMBuilds } from "../../hooks/useROMBuilds";
// import ProductCard from "./components/ProductCard";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import SearchIcon from "@mui/icons-material/Search";
// import Loader from "../../components/Loader";

// const CustomROMProductsPage = () => {
//   const { filteredBuilds, searchTerm, setSearchTerm, error, isLoading } =
//     useROMBuilds();

//   if (error)
//     return (
//       <p className="flex justify-center items-center min-h-screen">
//         Error occured.
//       </p>
//     );
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader />
//       </div>
//     );

//   return (
//     <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
//       <h2 className="text-xl font-extrabold mb-8 text-center">
//         Select Your Device
//       </h2>

//       <div className="mb-10 relative max-w-md mx-auto flex item-center">
//         <TextField
//           type="text"
//           placeholder="Search by device name or codename..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-3 text-base "
//           sx={{
//             borderRadius: 20,
//             "& .MuiOutlinedInput-root": {
//               borderRadius: 20,
//               "& fieldset": {
//                 borderRadius: 20,
//               },
//             },
//           }}
//           variant="outlined"
//           slotProps={{
//             input: {
//               startAdornment: (
//                 <InputAdornment position="start">

//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             },
//           }}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {filteredBuilds.map((build) => (
//           <ProductCard key={build.codename} build={build} />
//         ))}
//       </div>

//       {filteredBuilds.length === 0 && (
//         <p className="text-center  mt-8">No matching ROM builds found.</p>
//       )}
//     </div>
//   );
// };

// export default CustomROMProductsPage;








import React from "react";
import { useROMBuilds } from "../../hooks/useROMBuilds";
import ProductCard from "./components/ProductCard";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../components/Loader";

const CustomROMProductsPage = () => {
  const { filteredBuilds, searchTerm, setSearchTerm, error, isLoading } =
    useROMBuilds();

  if (error)
    return (
      <p className="flex justify-center items-center min-h-screen">
        Error occurred.
      </p>
    );
  
  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl font-extrabold mb-8 text-center">
        Select Your Device
      </h2>

      <div className="mb-10 relative max-w-md mx-auto flex item-center">
        <TextField
          type="text"
          placeholder="Search by device name or codename..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-base "
          sx={{
            borderRadius: 20,
            "& .MuiOutlinedInput-root": {
              borderRadius: 20,
              "& fieldset": {
                borderRadius: 20,
              },
            },
          }}
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBuilds.map((build) => (
          <ProductCard key={build.codename} build={build} />
        ))}
      </div>

      {filteredBuilds.length === 0 && (
        <p className="text-center mt-8">No matching ROM builds found.</p>
      )}
    </div>
  );
};

export default CustomROMProductsPage;
