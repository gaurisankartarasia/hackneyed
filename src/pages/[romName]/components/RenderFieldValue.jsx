
// src/components/c.jsx
import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import { parseFormattedText } from './parseFormattedText'; // Make sure the path is correct

// formatKeyName function remains unchanged
const formatKeyName = (key) => {
  if (!key) return '';
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/^./, (str) => str.toUpperCase());
};

const RenderFieldValue = ({ value }) => {
  if (value === null || value === undefined) {
    return <Typography variant="body2" color="text.secondary">N/A</Typography>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <Typography variant="body2" color="text.secondary">None</Typography>;
    }
    return (
      // Keep the List styling that provides the default bullet context
      <List dense sx={{ paddingLeft: 0, listStyle: 'disc', marginLeft: '20px' }}>
        {value.map((item, index) => {
          // Determine the content that will be rendered
          const primaryContent = typeof item === 'string' ? parseFormattedText(item) : JSON.stringify(item);

          // Check if the content is an Alert or starts with an Alert
          let isAlert = false;
          // Get the first element if it's an array, or the element itself if not
          const firstElement = Array.isArray(primaryContent) ? primaryContent[0] : primaryContent;

          // Check if it's a valid React element and if its type is Alert
          if (React.isValidElement(firstElement) && firstElement.type === Alert) {
             isAlert = true;
          }

          // Define the sx for the ListItem conditionally
          const listItemSx = {
            padding: '0 0 4px 0',
            // If it IS an alert, set 'listStyle: none' to explicitly hide the bullet for this item.
            // Otherwise, use 'display: list-item' to make it behave like a standard list item respecting the parent <List> style.
            ...(isAlert ? { listStyle: 'none' } : { display: 'list-item' }),
          };

          return (
            <ListItem key={index} sx={listItemSx}>
              {/* Render the primary content. disableTypography is important because parseFormattedText returns components. */}
              <ListItemText primary={primaryContent} disableTypography />
            </ListItem>
          );
        })}
      </List>
    );
  }

  if (typeof value === 'object') {
    // Render objects as before (e.g., JSON)
    return (
      <Typography component="pre" variant="body1" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace', background: '#f5f5f5', padding: '8px', borderRadius: '4px' }}>
          {JSON.stringify(value, null, 2)}
      </Typography>
    );
  }

  // For simple string values (not in an array), also use parseFormattedText
  // This ensures that [warning], [info] etc tags work outside lists too.
  // The result is wrapped in Typography for consistent styling.
  const parsedStringValue = parseFormattedText(value);
  return <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{parsedStringValue}</Typography>;
};

export { RenderFieldValue, formatKeyName };