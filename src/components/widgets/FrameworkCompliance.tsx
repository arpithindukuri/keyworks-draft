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
import { useLocation } from "react-router-dom";
import {
  selectDashboardSlice,
  updateSelectedFramework,
} from "../../redux/dashboardSlice";
import {
  countActiveControls,
  countCompliantControls,
  selectFrameworkById,
  selectFrameworks,
} from "../../redux/frameworkSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Module from "../Module";
import FrameworkSummary from "../pages/Framework/FrameworkSummary";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FrameworkCompliance({ thisId }: { thisId: string }) {
  const selectedFramework = useAppSelector(selectFrameworkById(thisId));

  const controls =
    selectedFramework?.controls.filter((item) => item.isActive) || [];

  const numActive = countActiveControls(controls);
  const numCompliant = countCompliantControls(controls);

  return (
    <Module title="COMPLIANCE">
      <Box padding={2}>
        {selectedFramework ? (
          <FrameworkSummary
            title={selectedFramework.name}
            subtitle=""
            percent={numCompliant / numActive}
            numControls={numActive}
            numControlsCompliant={numCompliant}
            numAlerts={selectedFramework.alerts.length}
            numViolations={numActive - numCompliant}
            link={`/framework/${thisId}`}
          />
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
