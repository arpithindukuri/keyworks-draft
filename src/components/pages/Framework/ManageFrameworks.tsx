import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  createStyles,
  Divider,
  Grid,
  GridSize,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useState } from "react";
import { Framework, selectFrameworks } from "../../../redux/frameworkSlice";
import { useAppSelector } from "../../../redux/hooks";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1.5),
      margin: 0,
      width: "100%",
    },
    frameworkSummary: {
      display: "flex",
      minHeight: "50px",
      padding: theme.spacing(2),
    },
  })
);

export default function ManageFrameworks() {
  const classes = useStyles();

  const frameworks = useAppSelector(selectFrameworks);

  return (
    <Grid className={classes.container} container spacing={3}>
      {frameworks.map((frame) => (
        <FrameworkSummary
          key={`framework-summary-${frame.id}`}
          framework={frame}
        />
      ))}
    </Grid>
  );
}

function FrameworkSummary({ framework }: { framework: Framework }) {
  return (
    <Grid item xs={12} md={12}>
      <Card>
        <CardHeader
          title={framework.name}
          titleTypographyProps={{ variant: "h4" }}
          action={
            <IconButton>
              <MoreVert />
            </IconButton>
          }
        />
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <FrameworkSummaryItem title="INPUTS">inputs</FrameworkSummaryItem>
            <Divider variant="middle" />
            <FrameworkSummaryItem
              title="DOCUMENTS"
              action={
                <ButtonGroup>
                  <Button>asd</Button>
                  <Button>asd</Button>
                  <Button>asd</Button>
                </ButtonGroup>
              }
            >
              docs
            </FrameworkSummaryItem>
            <Divider variant="middle" />
            <FrameworkSummaryItem title="PROCESSES">procs</FrameworkSummaryItem>
            <Divider variant="middle" />
            <FrameworkSummaryItem title="CONTROLS">
              controls
            </FrameworkSummaryItem>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

function FrameworkSummaryItem({
  title,
  action,
  children,
  xs,
}: {
  title: string;
  action?: JSX.Element;
  children: any;
  xs?: GridSize;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Grid item xs={xs || true} container spacing={4}>
      <Grid item xs={2}>
        <Typography color="textSecondary" variant="body1" align="right">
          {title}
        </Typography>
      </Grid>
      <Grid item xs container alignContent="center">
        <Grid container direction="column" spacing={1}>
          <Grid item>{action}</Grid>
          <Grid item>
            <Collapse in={open}>{children}</Collapse>
          </Grid>
          <Grid item>
            <Button fullWidth onClick={() => setOpen((prev) => !prev)}>
              Show More
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
