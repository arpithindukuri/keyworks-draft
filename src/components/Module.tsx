import {
  Box,
  Card,
  CardHeader,
  makeStyles,
  TypographyProps,
} from "@material-ui/core";
import classNames from "classnames";
import { CSSProperties, useState } from "react";
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
  titleTypographyProps,
  children,
  useCard = true,
  cardStyles,
  actions,
}: {
  title: string;
  titleTypographyProps?: TypographyProps;
  children?: any;
  useCard?: boolean;
  cardStyles?: CSSProperties;
  actions?: any;
}) {
  const classes = useStyles();

  const location = useLocation();
  const isEditable = location.pathname.includes("/dashboard/edit");
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
      <CardHeader
        title={title}
        titleTypographyProps={{ variant: "h6", ...titleTypographyProps }}
        style={{ paddingTop: 0, paddingBottom: 0 }}
        action={<Box marginRight={isEditable ? 5 : undefined}>{actions}</Box>}
      />
      {useCard ? (
        <Card
          className={classes.container}
          elevation={dragging ? 15 : 2}
          // variant='outlined'
          style={cardStyles}
        >
          {children}
        </Card>
      ) : (
        children
      )}
    </Box>
  );
}
