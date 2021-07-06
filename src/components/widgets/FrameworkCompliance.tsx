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
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const selectedFrameworks = useAppSelector(selectDashboardSlice);

  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>("");

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedFrameworkId(event.target.value as string);
    if (selectedFrameworkId.length > 0 && thisId.length > 0)
      dispatch(
        updateSelectedFramework({
          widgetId: thisId,
          frameworkId: selectedFrameworkId,
        })
      );
  };

  const selectedFramework = useAppSelector(
    selectFrameworkById(selectedFrameworkId)
  );

  const controls =
    selectedFramework?.controls.filter((item) => item.isActive) || [];

  const numActive = countActiveControls(controls);
  const numCompliant = countCompliantControls(controls);

  const frameworks = useAppSelector(selectFrameworks);

  useEffect(() => {
    setSelectedFrameworkId(frameworks.length > 0 ? frameworks[0].id : "");
  }, [frameworks]);

  return (
    <Module
      title="COMPLIANCE"
      actions={
        <FormControl
          variant="filled"
          className={classes.formControl}
          size="small"
          style={{ margin: 0 }}
        >
          <InputLabel id="demo-simple-select-outlined-label">
            Framework
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={selectedFrameworkId}
            onChange={handleChange}
            label="Framework"
          >
            {frameworks.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    >
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
            link={`/framework/${selectedFramework.id}`}
          />
        ) : (
          <Box
            justifyContent="center"
            alignItems="center"
            height="100%"
            width="100%"
          >
            <Typography>No Frameworks</Typography>
          </Box>
        )}
      </Box>
    </Module>
  );
}
