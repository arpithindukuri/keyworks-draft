import { Card, makeStyles, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import Module from "../Module";
import PieChartRating from "./PieChartRating";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    overflowX: "auto",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
  ratingCard: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: theme.spacing(1),
    minWidth: "130px",
    maxHeight: "100%",
    marginLeft: `${theme.spacing(3)}px`,
    "&:first-child": {
      marginLeft: 0,
    },
  },
  ratingCardTitle: {
    // color: "white",
  },
  ratingCardNumber: {
    color: "grey",
    fontWeight: 600,
  },
  responsive: {
    marginTop: theme.spacing(1),
  },
}));

export function RatingCard({
  title,
  percent,
}: {
  title: string;
  percent: number;
}) {
  const classes = useStyles();

  return (
    <Card
      className={classes.ratingCard}
      // elevation={5}
      variant="outlined"
    >
      <Typography className={classes.ratingCardTitle} variant="h6">
        {title}
      </Typography>
      <PieChartRating percent={percent} />
    </Card>
  );
}

export default function Ratings() {
  const classes = useStyles();

  const [risk, setRisk] = useState<number>(0.17);
  const [compliance, setCompliance] = useState<number>(0.55);
  const [threats, setThreats] = useState<number>(0.11);

  function getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => {
    const timerId1 = setInterval(() => {
      const newNum1 = getRandomArbitrary(-0.05, 0.05);
      setRisk((prev) =>
        prev + newNum1 > 0 && prev + newNum1 < 1 ? prev + newNum1 : prev
      );
    }, getRandomArbitrary(1000, 3000));
    const timerId2 = setInterval(() => {
      const newNum2 = getRandomArbitrary(-0.05, 0.05);
      setCompliance((prev) =>
        prev + newNum2 > 0 && prev + newNum2 < 1 ? prev + newNum2 : prev
      );
    }, getRandomArbitrary(1000, 3000));
    const timerId3 = setInterval(() => {
      const newNum3 = getRandomArbitrary(-0.05, 0.05);
      setThreats((prev) =>
        prev + newNum3 > 0 && prev + newNum3 < 1 ? prev + newNum3 : prev
      );
    }, getRandomArbitrary(1000, 3000));
    return () => {
      clearInterval(timerId1);
      clearInterval(timerId2);
      clearInterval(timerId3);
    };
  }, []);

  return (
    <Module title="RATINGS">
      <div className={classes.body}>
        <RatingCard title="Risk" percent={risk} />
        <RatingCard title="Compliance" percent={compliance} />
        <RatingCard title="Threats" percent={threats} />
      </div>
    </Module>
  );
}
