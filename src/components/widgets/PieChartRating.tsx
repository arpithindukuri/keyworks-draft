import { createStyles, fade, makeStyles, useTheme } from "@material-ui/core";
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import { v4 } from "uuid";
import { getColor } from "../../util";

const useStyles = makeStyles((theme) =>
  createStyles({
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
        transform: "translateY(2rem) scale(0.95)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
    fadeIn: {
      animation: "$fadeIn 1.5s ease backwards 1s",
      transformOrigin: "center",
    },
  })
);

export default function PieChartRating({
  percent,
  inverse = false,
  variant = "normal",
}: {
  percent: number;
  inverse?: boolean;
  variant?: "normal" | "small" | "tiny";
}) {
  // const [num, setNum] = useState(0);

  const data = [
    {
      name: "Group A",
      value: Math.round(percent * 100),
    },
    {
      name: "Group B",
      value: Math.round((1 - percent) * 100),
    },
  ];

  const classes = useStyles();
  const theme = useTheme();
  const color = getColor(percent, inverse);

  if (variant === "normal")
    return (
      <ResponsiveContainer minHeight={150}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
            innerRadius="85%"
            outerRadius="100%"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`${v4()}-${entry.name}`}
                fill={index === 0 ? color : fade(color, 0.2)}
              />
            ))}
            <Label
              className={classes.fadeIn}
              value={`${Math.round(percent * 100)}%`}
              position="center"
              dominantBaseline="center"
              fontSize={theme.typography.h4.fontSize}
              fontWeight={600}
              fill={color}
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );

  if (variant === "tiny" || variant === "small")
    return (
      <PieChart
        margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
        height={variant === "tiny" ? 24 : 32}
        width={variant === "tiny" ? 24 : 32}
      >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          startAngle={90}
          endAngle={-270}
          paddingAngle={0}
          innerRadius="60%"
          outerRadius="100%"
          animationDuration={800}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell
              key={`${v4()}-${entry.name}`}
              fill={index === 0 ? color : fade(color, 0.2)}
            />
          ))}
          {color === "#f1462f" && (
            <Label
              value="!"
              position="center"
              dominantBaseline="center"
              fontSize={theme.typography.h6.fontSize}
              fontWeight={800}
              fill={color}
            />
          )}
        </Pie>
      </PieChart>
    );

  return <></>;
}
