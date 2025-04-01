
// // components/SupportSection.jsx
// import React from "react";
// import { useSupportGroups } from "../../hooks/useSupportGroups"; 
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardActionArea from "@mui/material/CardActionArea";
// import Typography from "@mui/material/Typography";
// import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import { DonateMeCard } from "./components/card";

// import  TextField from "@mui/material/TextField";

// const SupportSection = () => {
//   const { filteredGroups, searchTerm, setSearchTerm, isLoading, error } = useSupportGroups();

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//     <section className="py-16">
      
//       <div className="container mx-auto px-6">
        
//         <div className="text-center mb-12">
          
//           <h2 className="text-4xl font-bold">Support</h2>
//           <p className="text-lg opacity-80 mb-5">Support groups for my works.</p>
//           <TextField
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search support groups"
//             sx={{
//               borderRadius: 20,
//               "& .MuiOutlinedInput-root": {
//                 borderRadius: 20,
//                 "& fieldset": {
//                   borderRadius: 20,
//                 },
//               },
//             }}
//           />
//         </div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredGroups.map((group, index) => (
//             <Card key={index} className="transition-shadow">
//               <CardActionArea component="a" href={group.link} target="_blank">
//                 <CardContent className="flex flex-col items-center text-center">
//                   <GroupsOutlinedIcon fontSize="large" />
//                   <Typography variant="h5" className="font-bold">
//                     {group.name}
//                   </Typography>
//                   <Typography variant="body2" className="mt-2">
//                     {group.description}
//                   </Typography>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
          
//         </div>
        
//       </div>
      
//     </section>
//     <div className="float-end">
//     <DonateMeCard/>
//     </div>
//     </>
//   );
// };

// export default SupportSection;







import React from "react";
import { useSupportGroups } from "../../hooks/useSupportGroups"; 
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { DonateMeCard } from "./components/card";
import TextField from "@mui/material/TextField";

const SupportSection = () => {
  const { filteredGroups, searchTerm, setSearchTerm, isLoading, error } = useSupportGroups();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        
        {/* Top Section with Donate Card */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Support</h2>
          <p className="text-lg opacity-80 mb-5">Support groups for my works.</p>
          
          {/* Search & Donate Card Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <TextField
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search support groups"
              sx={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: 20,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 20,
                  "& fieldset": {
                    borderRadius: 20,
                  },
                },
              }}
            />
            <DonateMeCard className="shadow-lg" />
          </div>
        </div>

        {/* Support Groups Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group, index) => (
            <Card key={index} className="transition-shadow">
              <CardActionArea component="a" href={group.link} target="_blank">
                <CardContent className="flex flex-col items-center text-center">
                  <GroupsOutlinedIcon fontSize="large" />
                  <Typography variant="h5" className="font-bold">
                    {group.name}
                  </Typography>
                  <Typography variant="body2" className="mt-2">
                    {group.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SupportSection;
