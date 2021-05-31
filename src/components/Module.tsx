import { Card, makeStyles, Tooltip, Typography } from "@material-ui/core";
import classNames from "classnames";
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    // borderRadius: 0,
    boxSizing: "content-box",
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
  header: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: 600,
    color: theme.palette.text.secondary,
    transition: "0.3s",
  },
  grabbable: {
    cursor: "grab",
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  body: {
    // display: "flex",
    // flexGrow: 1,
    width: "100%",
    height: `calc(100% - ${theme.typography.h6.lineHeight}rem - ${theme.spacing(
      3
    )}px)`,
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

  return (
    <Card
      className={classNames(classes.container, {
        [classes.isEditing]: isEditable,
      })}
      elevation={3}
      // variant='outlined'
    >
      <div className={classes.header}>
        <Tooltip
          title={`To edit, go to "Manage Dashboards", find this dashboard, and click "Edit"`}
          disableFocusListener={isEditable}
          disableHoverListener={isEditable}
          disableTouchListener={isEditable}
        >
          <Typography
            className={classNames(classes.title, "ModuleDragHandle", {
              [classes.grabbable]: isEditable,
            })}
            // className={`${classes.title} ModuleDragHandle`}
            variant="h6"
          >
            {title}
          </Typography>
        </Tooltip>
      </div>
      <div className={classes.body}>{children}</div>
    </Card>
  );
}
