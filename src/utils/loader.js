import { Box } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

const Loader = () => (
  <Box
    sx={{
      position: "absolute",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      top: "50%",
      left: "50%",
    }}
  >
    <CircularProgress
      variant="indeterminate"
      disableShrink
      sx={{
        color: (theme) =>
          theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
        animationDuration: "550ms",
        position: "absolute",
        left: 0,
        [`& .${circularProgressClasses.circle}`]: {
          strokeLinecap: "round",
        },
      }}
      size={40}
      thickness={4}
      // {...props}
    />
  </Box>
);
export default Loader;
