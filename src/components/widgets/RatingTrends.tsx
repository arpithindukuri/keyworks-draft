import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Module from "../Module";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    paddingTop: 0,
    boxSizing: "border-box",
  },
}));

const oldData = [
  {
    name: "March",
    Compliance: 0,
    Risk: 0,
  },
  {
    name: "April",
    Compliance: 0,
    Risk: 0,
  },
  {
    name: "May",
    Compliance: 0,
    Risk: 0,
  },
  {
    name: "June",
    Compliance: 0,
    Risk: 0,
  },
  {
    name: "July",
    Compliance: 0,
    Risk: 0,
  },
  {
    name: "August",
    Compliance: 0,
    Risk: 0,
  },
  {
    name: "September",
    Compliance: 0,
    Risk: 0,
  },
];

const newData = [
  {
    name: "March",
    Compliance: 40,
    Risk: 24,
  },
  {
    name: "April",
    Compliance: 30,
    Risk: 13,
  },
  {
    name: "May",
    Compliance: 20,
    Risk: 88,
  },
  {
    name: "June",
    Compliance: 27,
    Risk: 39,
  },
  {
    name: "July",
    Compliance: 18,
    Risk: 48,
  },
  {
    name: "August",
    Compliance: 23,
    Risk: 38,
  },
  {
    name: "September",
    Compliance: 34,
    Risk: 43,
  },
];

export default function RatingTrends() {
  const classes = useStyles();

  const [data, setData] = useState(oldData);

  useEffect(() => {
    setTimeout(() => {
      setData(newData);
    }, 1000);
  }, []);

  return (
    <Module title="RATING TRENDS">
      <div className={classes.body}>
        <ResponsiveContainer
          height="99%"
          width="99%"
          minHeight="0px"
          minWidth="0px"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line
              strokeWidth={2}
              type="natural"
              dataKey="Compliance"
              stroke="#82ca9d"
            />
            <Line
              strokeWidth={2}
              type="natural"
              dataKey="Risk"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Module>
  );
}
