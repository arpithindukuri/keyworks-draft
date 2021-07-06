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

    if (frameworks.length > 0) {
      let overallLow = 0;
      let overallMedium = 0;
      let overallHigh = 0;
      let overallComplete = 0;
      for (let index = 0; index < frameworks.length; index++) {
        const num = index % values.length;
        overallLow += values[num].Low;
        overallMedium += values[num].Medium;
        overallHigh += values[num].High;
        overallComplete += values[num].Complete;
      }
      overallLow /= frameworks.length;
      overallMedium /= frameworks.length;
      overallHigh /= frameworks.length;
      overallComplete /= frameworks.length;

      newData.push({
        name: "Overall",
        Low: overallLow,
        Medium: overallMedium,
        High: overallHigh,
        Complete: overallComplete,
      });
    }

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
                fill={fade(theme.palette.success.light, 0.6)}
                stroke={fade(theme.palette.success.main, 0.6)}
              />
              <Bar
                animationDuration={1000}
                dataKey="Medium"
                stackId="a"
                fill={fade(theme.palette.warning.light, 0.6)}
                stroke={fade(theme.palette.warning.main, 0.6)}
              />
              <Bar
                animationDuration={1000}
                dataKey="High"
                stackId="a"
                fill={fade(theme.palette.error.light, 0.6)}
                stroke={fade(theme.palette.error.main, 0.6)}
              />
              <Bar
                animationDuration={1000}
                dataKey="Complete"
                stackId="a"
                fill={fade(theme.palette.info.light, 0.6)}
                stroke={fade(theme.palette.info.main, 0.6)}
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
