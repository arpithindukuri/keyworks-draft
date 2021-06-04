import { Box, Card, CardHeader, makeStyles, Tooltip } from "@material-ui/core";
import classNames from "classnames";
import { useState } from "react";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    // height: "100%",
    // width: "100%",
    display: "flex",
    flexGrow: 1,
    // flexDirection: "column",
  },
  "@keyframes fadeIn": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "25%": {
      transform: "rotate(-1deg)",
    },
    "75%": {
      transform: "rotate(1deg)",
    },
    "100%": {
      rotate: "rotate(0deg)",
    },
  },
  isEditing: {
    border: `1px solid rgba(0, 0, 0, 0)`,
    "&:active": {
      border: `1px solid ${theme.palette.primary.light}`,
      boxShadow: theme.shadows[15],
    },
  },
  grabbable: {
    cursor: "move !important",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  isDragging: {
    boxShadow: theme.shadows[15],
  },
}));

export default function Module({
  title,
  children,
}: {
  title: string;
  children?: any;
}) {
  const classes = useStyles();
  const location = useLocation();
  const isEditable = location.pathname.includes("/dashboard/manage/edit");
  const [dragging, setDragging] = useState(false);

  return (
    <Box
      className={classNames("ModuleDragHandle", {
        [classes.grabbable]: isEditable,
      })}
      height="100%"
      width="100%"
      display="flex"
      flexDirection="column"
      onMouseDown={() => setDragging(isEditable && true)}
      onMouseUp={() => setDragging(isEditable && false)}
    >
      <Tooltip
        title={`To edit, go to "Manage Dashboards", find this dashboard, and click "Edit"`}
        disableFocusListener={isEditable}
        disableHoverListener={isEditable}
        disableTouchListener={isEditable}
      >
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: "h6" }}
          style={{ paddingTop: 0, paddingBottom: 0 }}
        />
      </Tooltip>
      <Card
        className={classes.container}
        elevation={dragging ? 15 : 3}
        // variant='outlined'
      >
        {children}
      </Card>
    </Box>
  );
}
