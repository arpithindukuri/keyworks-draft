import { createMuiTheme } from "@material-ui/core";
import { ThemeOptions } from "@material-ui/core/styles";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { grey } from "@material-ui/core/colors";

declare module "@material-ui/core/styles/createMuiTheme" {
  interface Theme {
    gradients: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    gradients?: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
  }
}

function createMyTheme(options: ThemeOptions) {
  return createMuiTheme({
    // gradients: {},
    ...options,
  });
}

export const defaultBorderRadius = 10;

export const defaultPrimary = {
  light: "#ab87ff",
  main: "#7559e9",
  dark: "#3c2eb6",
  contrastText: "#fff",
};

export const defaultSecondary = {
  light: "#756f7f",
  main: "#494453",
  dark: "#211d2a",
  contrastText: "#000",
};

export const defaultSpacing = (num: number) => num * 8;

const getTheme = (paletteType: "dark" | "light") =>
  createMyTheme({
    shape: {
      borderRadius: defaultBorderRadius,
    },
    palette: {
      type: paletteType,
      primary: defaultPrimary,
      secondary: defaultSecondary,
      background: {
        default: paletteType === "light" ? grey[100] : grey[900],
      },
    },
    spacing: defaultSpacing(1),
    gradients: {
      success:
        "linear-gradient(to left top, #4caf50, #41ac56, #35a95b, #29a560, #1ba265, #119f6a, #069b6e, #009871, #009474, #009177, #008d79, #00897b)",
      warning:
        "linear-gradient(to left top, #ff9800, #f29a00, #e59b00, #d99c00, #cd9d00, #c29d00, #b79d00, #ac9d00, #a09d00, #939c00, #869c00, #789b00)",
      error:
        "linear-gradient(to left top, #f44336, #f23c42, #ef374e, #eb3458, #e53262, #df326a, #d83472, #d13679, #c83a80, #be3d86, #b4418b, #a9458f)",
      info: "linear-gradient(to left top, #2196f3, #3693f0, #448fec, #508ce8, #5988e4, #6085e0, #6781dc, #6d7ed8, #737bd3, #7877cf, #7c74ca, #8071c5)",
    },
    overrides: {
      MuiList: {
        padding: {
          padding: defaultSpacing(1),
        },
      },
      MuiListItem: {
        root: {
          borderRadius: defaultBorderRadius,
          marginTop: defaultSpacing(0.5),
          marginBottom: defaultSpacing(0.5),
          backgroundColor: "transparent",
          position: "relative",
          transition: "0.15s !important",
          // "&:last-child": {
          // 	marginBottom: 0,
          // },
          "&$selected": {
            backgroundColor: "transparent",
            // background: `linear-gradient(143deg, ${defaultPrimary.light} 0%, ${defaultPrimary.main} 100%)`,
            color: defaultPrimary.main,
            "& .MuiIcon-root": {
              color: defaultPrimary.main,
            },
            "& .MuiSvgIcon-root": {
              color: defaultPrimary.main,
            },
            paddingLeft: defaultSpacing(1.5),
            "&::after": {
              transform: "scaleX(1)",
            },
          },
          "&::after": {
            transform: "scale(0)",
            transformOrigin: "left",
            transition: "0.15s",
            content: '" "',
            position: "absolute",
            height: `calc(100% - ${defaultSpacing(2)}px)`,
            width: 3,
            top: defaultSpacing(1),
            left: 0,
            backgroundColor: defaultPrimary.main,
            borderRadius: defaultBorderRadius,
          },
        },
        gutters: {
          paddingLeft: defaultSpacing(1),
          paddingRight: defaultSpacing(1),
        },
      },
      MuiListItemIcon: {
        root: {
          minWidth: 0,
        },
      },
      MuiListItemText: {
        root: {
          marginLeft: defaultSpacing(1),
        },
      },
      MuiCardContent: {
        root: {
          "&:last-child": {
            paddingBottom: defaultSpacing(2),
          },
        },
      },
      MuiChip: {
        label: {
          fontWeight: 500,
        },
      },
      MuiButton: {
        root: {
          borderRadius: defaultBorderRadius / 2,
        },
      },
      MuiInputBase: {
        root: {
          borderRadius: defaultBorderRadius / 2,
        },
      },
      MuiOutlinedInput: {
        root: {
          borderRadius: defaultBorderRadius / 2,
        },
      },
    },
    typography: {
      fontFamily: ["Poppins"].join(","),
      fontSize: 13,
      h5: {
        fontWeight: 500,
      },
    },
  });

export default getTheme;
