import { fade, makeStyles, Typography, useTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { selectFrameworks } from "../../redux/frameworkSlice";
import { useAppSelector } from "../../redux/hooks";
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

type dataType = {
  name: string;
  Low: number;
  Medium: number;
  High: number;
  Complete: number;
};

const oldData: dataType[] = [
  {
    name: "PCI",
    Low: 0,
    Medium: 0,
    High: 0,
    Complete: 0,
  },
  {
    name: "ISO",
    Low: 0,
    Medium: 0,
    High: 0,
    Complete: 0,
  },
  {
    name: "NIST",
    Low: 0,
    Medium: 0,
    High: 0,
    Complete: 0,
  },
  {
    name: "Overall",
    Low: 0,
    Medium: 0,
    High: 0,
    Complete: 0,
  },
];

const newData: dataType[] = [
  {
    name: "PCI",
    Low: 40,
    Medium: 24,
    High: 26,
    Complete: 10,
  },
  {
    name: "ISO",
    Low: 30,
    Medium: 13,
    High: 27,
    Complete: 30,
  },
  {
    name: "NIST",
    Low: 20,
    Medium: 28,
    High: 12,
    Complete: 40,
  },
  {
    name: "Overall",
    Low: 18,
    Medium: 42,
    High: 20,
    Complete: 20,
  },
];

const values = [
  {
    Low: 40,
    Medium: 24,
    High: 26,
    Complete: 10,
  },
  {
    Low: 30,
    Medium: 13,
    High: 27,
    Complete: 30,
  },
  {
    Low: 20,
    Medium: 28,
    High: 12,
    Complete: 40,
  },
  {
    Low: 18,
    Medium: 42,
    High: 20,
    Complete: 20,
  },
];

export default function RegulatoryCompliance() {
  const classes = useStyles();
  const theme = useTheme();
  const frameworks = useAppSelector(selectFrameworks);

  const [data, setData] = useState<dataType[]>([]);

  useEffect(() => {
    const newData = frameworks.map((item, index) => {
      const valNum = index % values.length;
      return valNum < values.length
        ? {
            name: item.name,
            Low: values[valNum].Low,
            Medium: values[valNum].Medium,
            High: values[valNum].High,
            Complete: values[valNum].Complete,
          }
        : {
            name: item.name,
            Low: 0,
            Medium: 0,
            High: 0,
            Complete: 0,
          };
    });
    if (frameworks.length > 0)
      newData.push({
        name: "Overall",
        Low: 0,
        Medium: 0,
        High: 0,
        Complete: 0,
      });
    setData(newData);
  }, [frameworks]);

  return (
    <Module title="REGULATORY COMPLIANCE">
      <div className={classes.body}>
        {data.length > 0 ? (
          <ResponsiveContainer
            height="99%"
            width="99%"
            minHeight="0px"
            minWidth="0px"
          >
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Legend />
              <Bar
                animationDuration={1000}
                dataKey="Low"
                stackId="a"
                fill={theme.palette.success.light}
                stroke={theme.palette.success.main}
              />
              <Bar
                animationDuration={1000}
                dataKey="Medium"
                stackId="a"
                fill={theme.palette.warning.light}
                stroke={theme.palette.warning.main}
              />
              <Bar
                animationDuration={1000}
                dataKey="High"
                stackId="a"
                fill={theme.palette.error.light}
                stroke={theme.palette.error.main}
              />
              <Bar
                animationDuration={1000}
                dataKey="Complete"
                stackId="a"
                fill={theme.palette.info.light}
                stroke={theme.palette.info.main}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <Typography>No Frameworks</Typography>
        )}
      </div>
    </Module>
  );
}
