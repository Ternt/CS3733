import { ReactNode, useState } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

type SidebarMenuProps = {
  value: number;
  onSelect: (index: number) => void;
  tabs: string[];
  children: ReactNode[];
};

export default function SidebarMenu(props: SidebarMenuProps) {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <>
      <Box
        sx={{
          width: "fit-content",
          height: "fill-available",
          bgcolor: "black",
        }}
      >
        <Box>
          {props.tabs.map((t, i) => {
            return (
              <Box
                key={i}
                sx={{
                  width: "100%",
                  bgcolor: i === selectedTab ? "orange" : "blue",
                  "&:hover": {
                    bgcolor: "red",
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                }}
                onClick={() => {
                  setSelectedTab(i);
                  props.onSelect(i);
                }}
              >
                {props.children[i]}
                <Typography
                  variant={"subtitle2"}
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    textWrap: "wrap",
                  }}
                >
                  {t}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
