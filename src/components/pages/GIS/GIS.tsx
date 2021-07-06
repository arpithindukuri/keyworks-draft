import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
} from "@material-ui/core";
import { ChangeEvent, useState } from "react";
import { useLocation } from "react-router-dom";

export default function GIS() {
  return (
    <Box padding={3}>
      <GISForms />
    </Box>
  );
}

function GISForms() {
  const [state, setState] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
  };

  const location = useLocation();

  return (
    <>
      <CardHeader
        title={
          location.pathname.includes("corporateGIS")
            ? "Corporate GIS"
            : "Global GIS"
        }
      />
      <Card>
        <CardContent>
          <Box display="flex">
            <Box flex={6}>
              <TextField
                id="uri-field"
                label="URI"
                variant="outlined"
                fullWidth
                defaultValue="mapbox://styles/dannywantsmaps/ckplntm0x3ncs17qp8a0ddghl"
              />
              <Box marginY={1.5}>
                <Divider />
              </Box>
              <Button variant="contained">Upload File</Button>
            </Box>
            <Box marginX={3}>
              <Divider orientation="vertical" />
            </Box>
            <Box flex={6}>
              <Box display="flex" flexDirection="column">
                <TextField
                  id="token-field"
                  label="Token"
                  variant="outlined"
                  fullWidth
                  defaultValue="pk.eyJ1************************************************************************************7vyWznQ"
                />
                <Box display="flex" marginTop={3}>
                  <TextField
                    id="username-field"
                    label="Username"
                    variant="outlined"
                    fullWidth
                  />
                  <Box marginX={3}>
                    <Divider orientation="vertical" />
                  </Box>
                  <TextField
                    id="password-field"
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined" color="primary">
            Cancel
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
