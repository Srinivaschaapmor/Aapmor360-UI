import { Box, Typography, Chip, Divider, Fab, Tooltip } from "@mui/material";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import PaletteIcon from "@mui/icons-material/Palette";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import WomanIcon from "@mui/icons-material/Woman";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import CreateIcon from "@mui/icons-material/Create";
import LocalMoviesOutlinedIcon from "@mui/icons-material/LocalMoviesOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import NewspaperOutlinedIcon from "@mui/icons-material/NewspaperOutlined";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import InsightsIcon from "@mui/icons-material/Insights";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import { useNavigate } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import Cookies from "js-cookie";

const BlogHeader = ({ category, setCategory }) => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        "& ::-webkit-scrollbar": {
          display: "none",
        },
        borderRadius: 2,
        backgroundColor: "#0047FF20",
        backdropFilter: "blur(20px)",
        zIndex: 10,
        position: "sticky",
        top: 0,
      }}
    >
      <CategoryIcon fontSize="large" color="primary" />
      <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />

      {/* Category chips */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1,
          marginBottom: 1,
        }}
      >
        <Chip
          size="small"
          icon={<AllInclusiveIcon />}
          label="All"
          variant={category === "All" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<FitnessCenterIcon />}
          label="Fitness"
          variant={category === "Fitness" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<PsychologyIcon />}
          label="Technology"
          variant={category === "Technology" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<PaletteIcon />}
          label="Arts"
          variant={category === "Arts" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SportsEsportsIcon />}
          label="Gaming"
          variant={category === "Gaming" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SportsBaseballIcon />}
          label="Sports"
          variant={category === "Sports" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<WomanIcon />}
          label="Fashion"
          variant={category === "Fashion" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<FastfoodIcon />}
          label="Food & Health"
          variant={category === "Food & Health" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />

        <Chip
          size="small"
          icon={<LocalMoviesOutlinedIcon />}
          label="Entertainment"
          variant={category === "Entertainment" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<SmartToyOutlinedIcon />}
          label="Artificial Intelligence"
          variant={
            category === "Artificial Intelligence" ? "filled" : "outlined"
          }
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<BiotechOutlinedIcon />}
          label="Science"
          variant={category === "Science" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<NewspaperOutlinedIcon />}
          label="News"
          variant={category === "News" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<GavelOutlinedIcon />}
          label="Politics"
          color="default"
          variant={category === "Politics" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<AirplanemodeActiveIcon />}
          label="International"
          color="default"
          variant={category === "International" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
        <Chip
          size="small"
          icon={<InsightsIcon />}
          label="Insights"
          color="default"
          variant={category === "Insights" ? "filled" : "outlined"}
          onClick={(e) => setCategory(e.target.innerText)}
        />
      </Box>
      <Divider orientation="vertical" flexItem sx={{ ml: 1, mr: 1 }} />

      {jwtToken && (
        <Tooltip title="Create new blog" arrow placement="top">
          <Fab
            variant="extended"
            color="primary"
            size="large"
            onClick={() => navigate("/createblog")}
            sx={{ m: 1, backgroundColor: "#0047FF", textTransform: "none" }}
          >
            <CreateIcon sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight={500}>
              Create Blog
            </Typography>
          </Fab>
        </Tooltip>
      )}
    </Box>
  );
};

export default BlogHeader;
