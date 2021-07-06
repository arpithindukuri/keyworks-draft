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

export default function FrameworkAlerts() {
  const classes = useStyles();

  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>("");

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedFrameworkId(event.target.value as string);
  };

  const selectedFramework = useAppSelector(
    selectFrameworkById(selectedFrameworkId)
  );

  const frameworks = useAppSelector(selectFrameworks);

  useEffect(() => {
    setSelectedFrameworkId(frameworks.length > 0 ? frameworks[0].id : "");
  }, [frameworks]);

  return (
    <Module
      title="ALERTS"
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
            margin="dense"
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
            <Typography>No Frameworks</Typography>
          </Box>
        )}
      </Box>
    </Module>
  );
}
