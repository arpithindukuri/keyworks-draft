import {
  Button,
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
import { ExpandMore, MoreVert } from "@material-ui/icons";
import { cloneElement, useRef, useState } from "react";
import { Framework as FrameworkType } from "../../../redux/frameworkSlice";
import AlertList from "./AlertList";
import ControlList from "./ControlList";
import DocumentList from "./DocumentList";
import ProcessList from "./ProcessList";

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1.5),
      margin: 0,
      width: "100%",
    },
    frameworkItemContent: {
      maxHeight: "80vh",
      width: "100%",
      overflowX: "visible",
      overflowY: "auto",
    },
    collapseFade: {
      pointerEvents: "none",
      touchAction: "none",
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: "50px",
      backgroundColor: "rgba(0,0,0,0)",
      background: `linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0) 100%)`,
    },
    iconFlip: {
      transform: "rotate(180deg)",
    },
  })
);

export default function Framework({ framework }: { framework: FrameworkType }) {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container spacing={3}>
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
              <FrameworkItem title="ALERTS">
                <AlertList alerts={framework.alerts} />
              </FrameworkItem>
              <Divider variant="middle" />
              <FrameworkItem title="CONTROLS" passExpandToChild>
                <ControlList controls={framework.controls} />
              </FrameworkItem>
              <Divider variant="middle" />
              <Divider variant="middle" />
              {/* <FrameworkItem title="DOCUMENTS" passExpandToChild>
                <DocumentList requiredDocs={framework.requiredDocuments} />
              </FrameworkItem>
              <Divider variant="middle" />
              <FrameworkItem title="PROCESSES" passExpandToChild>
                <ProcessList requiredProcs={framework.requiredProcesses} />
              </FrameworkItem> */}
              <FrameworkItem title="INPUTS">
                <>inputs</>
              </FrameworkItem>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

function FrameworkItem({
  title,
  action,
  children,
  xs,
  passExpandToChild = false,
}: {
  title: string;
  action?: JSX.Element;
  children: JSX.Element;
  xs?: GridSize;
  passExpandToChild?: boolean;
}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <Grid item xs={xs || true} container spacing={4}>
      <Grid item xs={2}>
        <Typography ref={ref} color="textSecondary" variant="h6" align="right">
          {title}
        </Typography>
      </Grid>
      <Grid item xs container alignContent="center">
        <Grid container direction="column" spacing={1}>
          <Grid item>{action}</Grid>
          <Grid item style={{ position: "relative" }}>
            <Collapse
              className={classes.frameworkItemContent}
              collapsedHeight={175}
              in={open}
            >
              {children !== undefined &&
                cloneElement(
                  children,
                  passExpandToChild
                    ? {
                        expandParent: () => {
                          setOpen(true);
                          window.scrollTo({
                            behavior: "smooth",
                            top: (ref.current?.offsetTop || 0) - 25,
                          });
                        },
                      }
                    : undefined
                )}
            </Collapse>
            {!open && <div className={classes.collapseFade} />}
          </Grid>
          <Grid item>
            <Button
              fullWidth
              onClick={() => {
                setOpen((prev) => !prev);
                window.scrollTo({
                  behavior: "smooth",
                  top: (ref.current?.offsetTop || 0) - 25,
                });
              }}
              endIcon={
                <ExpandMore
                  className={open ? classes.iconFlip : undefined}
                  style={{ transition: "0.3s" }}
                />
              }
            >
              Show {open ? "Less" : "More"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
