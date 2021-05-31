import { Typography } from "@material-ui/core";
import { useLocation } from "react-router";
import { selectFrameworkById } from "../../../redux/frameworkSlice";
import { useAppSelector } from "../../../redux/hooks";
import Framework from "./Framework";

export default function ViewFramework() {
  const location = useLocation();

  const frameworkId = location.pathname.split("/")[2];

  const framework = useAppSelector(selectFrameworkById(frameworkId));

  if (framework === undefined)
    return <Typography variant="h4">404: No such framework found</Typography>;

  return <Framework framework={framework} />;
}
