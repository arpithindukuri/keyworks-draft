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
  countActiveControls,
  countCompliantControls,
  selectFrameworkById,
  selectFrameworks,
} from "../../redux/frameworkSlice";
import { useAppSelector } from "../../redux/hooks";
import Module from "../Module";
import FrameworkSummary from "../pages/Framework/FrameworkSummary";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function FrameworkCompliance() {
  const classes = useStyles();

  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>("");

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedFrameworkId(event.target.value as string);
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
    setSelectedFrameworkId(frameworks[0].id);
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
          />
        ) : (
          <Typography>Select a framework</Typography>
        )}
      </Box>
    </Module>
  );
}
