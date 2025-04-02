import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { styled } from "@mui/material/styles";

import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";

import { useMeConfig } from "../../../hooks/useFetchMeConfig";


export const DonateMeCard = () => {
  const { data, error, isLoading } = useMeConfig();

  if (isLoading) {
    return (
      <div className="flex justify-center ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div className="text-center">{error}</div>;
  }

  return (
    <Card  >
      <CardActionArea href={data?.donate_card?.payment_link} target="_blank"   rel="noopener noreferrer">
      <CardContent sx={{ display: "flex", alignItems:'center', gap:1 }}>
        <FreeBreakfastOutlinedIcon sx={{color:'text.secondary'}} />
        <Typography color="text.secondary" noWrap>
          {data?.donate_card?.description}
        </Typography>{" "}
       
      </CardContent></CardActionArea>
    </Card>
  );
};
