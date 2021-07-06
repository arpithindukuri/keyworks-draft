import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import Module from "../Module";

const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexGrow: 1,
    width: "100%",
    height: "100%",
    padding: theme.spacing(2),
    boxSizing: "border-box",
  },
}));

const oldData = [
  {
    name: "March",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
  {
    name: "April",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
  {
    name: "May",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
  {
    name: "June",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
  {
    name: "July",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
  {
    name: "August",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
  {
    name: "September",
    Compliance: 0,
    Risk: 0,
    Threat: 0,
  },
];

const newData = [
  {
    name: "March",
    Compliance: 40,
    Risk: 24,
    Threat: 34,
  },
  {
    name: "April",
    Compliance: 30,
    Risk: 13,
    Threat: 36,
  },
  {
    name: "May",
    Compliance: 20,
    Risk: 88,
    Threat: 67,
  },
  {
    name: "June",
    Compliance: 27,
    Risk: 39,
    Threat: 38,
  },
  {
    name: "July",
    Compliance: 18,
    Risk: 48,
    Threat: 23,
  },
  {
    name: "August",
    Compliance: 23,
    Risk: 38,
    Threat: 19,
  },
  {
    name: "September",
    Compliance: 34,
    Risk: 43,
    Threat: 14,
  },
];

export default function RatingTrends() {
  const classes = useStyles();

  const [data, setData] = useState(oldData);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(newData);
    }, 1000);
    return () => {
      clearTimeout(id);
    };
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
            <XAxis dataKey="name" />
            {/* <YAxis type="number" domain={[0, 100]} /> */}
            <Tooltip />
            <Legend />
            <Line
              strokeWidth={3}
              type="natural"
              dataKey="Compliance"
              stroke={"#5c6bc0"}
              dot={false}
            />
            <Line
              strokeWidth={3}
              type="natural"
              dataKey="Risk"
              stroke={"#29b6f6"}
              dot={false}
            />
            <Line
              strokeWidth={3}
              type="natural"
              dataKey="Threat"
              stroke={"#66bb6a"}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Module>
  );
}
