import {
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, useEffect, useState } from "react";
import {
  selectFrameworkById,
  selectFrameworks,
} from "../../redux/frameworkSlice";
import { useAppSelector } from "../../redux/hooks";
import Module from "../Module";
import AlertList from "../pages/Framework/AlertList";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FrameworkAlerts({ thisId }: { thisId: string }) {
  const selectedFramework = useAppSelector(selectFrameworkById(thisId));

  return (
    <Module title="ALERTS">
      <Box padding={2} maxHeight="60vh" overflow="auto">
        {selectedFramework ? (
          <AlertList framework={selectedFramework} />
        ) : (
          <Box
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <Typography>No Framework with ID {thisId}</Typography>
          </Box>
        )}
      </Box>
    </Module>
  );
}
