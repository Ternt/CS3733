import { ReactNode, useState } from "react";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

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
          width: "8vw",
          height: "90vh",
        }}
      >
        <Box
          sx={{
            position:'fixed',
            width:'8vw'
          }}
        >
          {props.tabs.map((t, i) => {
            return (
              <Button
                key={i}
                sx={{
                  width: "100%",
                  height:'5rem',
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
                {i === selectedTab ? (
                  <motion.div style={{
                    backgroundColor: "#00000010",
                    width:'100%',
                    height:'100%',
                    position:'absolute',
                  }} layoutId="underline" />
                ) : null}
              </Button>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
