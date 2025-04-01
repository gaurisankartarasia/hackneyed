// import React from "react";
// import { supportGroups } from "./config";
// import { Card, CardContent, CardActionArea } from "@mui/material";
// import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

// const SupportSection = () => {
//   return (
//     <section className="py-12 ">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-blue-500 mb-4">Support</h2>
//           <p className="text-lg ">Support groups for my works.</p>
//         </div>

//         {/* Support Group Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {supportGroups.map((group, index) => (
//             <Card key={index}>
//               <CardActionArea>
//                 <CardContent>
//                   <a href={group.link} target="_blank" className="ml-6 ">
//                     <div className="flex-shrink-0">
//                       <div className="w-12 h-12 flex items-center justify-center ">
//                         <GroupsOutlinedIcon />
//                       </div>
//                     </div>

//                     <h3 className="text-xl font-bold text-blue-500 mb-1">
//                       {group.name}
//                     </h3>
//                     <p className="text-gray-600">{group.description}</p>
//                   </a>
//                 </CardContent>
//               </CardActionArea>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SupportSection;







import React from "react";
import { supportGroups } from "./config";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

const SupportSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold ">Support</h2>
          <p className="text-lg opacity-80">Support groups for my works.</p>
        </div>

        {/* Support Group Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportGroups.map((group, index) => (
            <Card key={index} className=" transition-shadow">
              <CardActionArea component="a" href={group.link} target="_blank">
                <CardContent className="flex flex-col items-center text-center">
                    <GroupsOutlinedIcon fontSize="large" />
                  <Typography variant="h5" className="font-bold ">
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
