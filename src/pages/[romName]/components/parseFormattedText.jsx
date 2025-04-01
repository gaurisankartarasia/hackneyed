
// import Typography from "@mui/material/Typography";
// import Alert from "@mui/material/Alert";
// import MuiLink from "@mui/material/Link";
// import Box from "@mui/material/Box";
// import DoneIcon from "@mui/icons-material/Done";
// import CodeBlock from "./CodeBlock"; 

// const regex = /\[warning](.*?)\[\/warning]|\[info](.*?)\[\/info]|\[link]\((.*?)\)\((.*?)\)\[\/link]|\[command](.*?)\[\/command]|\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[highlight](.*?)\[\/highlight]|\[color]\((.*?)\)\s*\((.*?)\)\[\/color]/g;

// export const parseFormattedText = (text) => {
//   if (!text) return null;

//   const components = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = regex.exec(text)) !== null) {
//     if (match.index > lastIndex) {
//       components.push(
//         <Typography key={lastIndex} component="span">
//           {text.substring(lastIndex, match.index)}
//         </Typography>
//       );
//     }

//     if (match[1]) {
//       components.push(
//         <Alert key={match.index} severity="warning" sx={{ mb: 1, fontSize: "1rem" }}>
//           {match[1]}
//         </Alert>
//       );
//     } else if (match[2]) {
//       components.push(
//         <Alert key={match.index} icon={<DoneIcon />} severity="success" sx={{ mb: 1, fontSize: "1rem" }}>
//           {match[2]}
//         </Alert>
//       );
//     } else if (match[3] && match[4]) {
//       let url = match[4].startsWith("http") ? match[4] : `https://${match[4]}`;
//       components.push(
//         <MuiLink
//           key={match.index}
//           color="#3B82F6"
//           fontWeight="400"
//           href={url}
//           target="_blank"
//           rel="noopener noreferrer"
//           underline="hover"
//         >
//           {match[3]}
//         </MuiLink>
//       );
//     } else if (match[5]) {
//       // [command] case - Full Width
//       components.push(<CodeBlock key={match.index} text={match[5]} />);
//     } else if (match[6]) {
//       components.push(<b key={match.index}>{match[6]}</b>);
//     } else if (match[7]) {
//       components.push(
//         <Typography key={match.index} component="em">
//           {match[7]}
//         </Typography>
//       );
//     } else if (match[8]) {
//       // `code` case - Fit to content
//       components.push(<CodeBlock key={match.index} text={match[8]} inline />);
//     } else if (match[9]) {
//       components.push(
//         <Box
//           key={match.index}
//           component="span"
//           sx={{
//             backgroundColor: "rgba(255, 255, 0, 0.4)",
//             padding: "2px 4px",
//             borderRadius: "4px",
//           }}
//         >
//           {match[9]}
//         </Box>
//       );
//     } else if (match[10] && match[11]) {
//       components.push(
//         <Typography key={match.index} component="span" sx={{ color: match[10] }}>
//           {match[11]}
//         </Typography>
//       );
//     }

//     lastIndex = regex.lastIndex;
//   }

//   if (lastIndex < text.length) {
//     components.push(
//       <Typography key={lastIndex} component="span">
//         {text.substring(lastIndex)}
//       </Typography>
//     );
//   }

//   return components;
// };






import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import MuiLink from "@mui/material/Link";
import Box from "@mui/material/Box";
import DoneIcon from "@mui/icons-material/Done";
import CodeBlock from "./CodeBlock"; 

const regex = /\[warning](.*?)\[\/warning]|\[info](.*?)\[\/info]|\[link]\((.*?)\)\((.*?)\)\[\/link]|\[command](.*?)\[\/command]|\[code](.*?)\[\/code]|\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[highlight](.*?)\[\/highlight]|\[color]\((.*?)\)\s*\((.*?)\)\[\/color]/g;

export const parseFormattedText = (text) => {
  if (!text) return null;

  const components = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      components.push(
        <Typography key={lastIndex} component="span">
          {text.substring(lastIndex, match.index)}
        </Typography>
      );
    }

    if (match[1]) {
      components.push(
        <Alert key={match.index} severity="warning" sx={{ mb: 1, fontSize: "1rem" }}>
          {match[1]}
        </Alert>
      );
    } else if (match[2]) {
      components.push(
        <Alert key={match.index} icon={<DoneIcon />} severity="success" sx={{ mb: 1, fontSize: "1rem" }}>
          {match[2]}
        </Alert>
      );
    } else if (match[3] && match[4]) {
      let url = match[4].startsWith("http") ? match[4] : `https://${match[4]}`;
      components.push(
        <MuiLink
          key={match.index}
          color="#3B82F6"
          fontWeight="400"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
        >
          {match[3]}
        </MuiLink>
      );
    } else if (match[5]) {
      // [command] case - Full Width
      components.push(<CodeBlock key={match.index} text={match[5]} />);
    } else if (match[6]) {
      // [code] case - Full Width with line breaks
      components.push(<CodeBlock key={match.index} text={match[6]} multiline />);
    } else if (match[7]) {
      components.push(<b key={match.index}>{match[7]}</b>);
    } else if (match[8]) {
      components.push(
        <Typography key={match.index} component="em">
          {match[8]}
        </Typography>
      );
    } else if (match[9]) {
      // `code` case - Fit to content
      components.push(<CodeBlock key={match.index} text={match[9]} inline />);
    } else if (match[10]) {
      components.push(
        <Box
          key={match.index}
          component="span"
          sx={{
            backgroundColor: "rgba(255, 255, 0, 0.4)",
            padding: "2px 4px",
            borderRadius: "4px",
          }}
        >
          {match[10]}
        </Box>
      );
    } else if (match[11] && match[12]) {
      components.push(
        <Typography key={match.index} component="span" sx={{ color: match[11] }}>
          {match[12]}
        </Typography>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    components.push(
      <Typography key={lastIndex} component="span">
        {text.substring(lastIndex)}
      </Typography>
    );
  }

  return components;
};