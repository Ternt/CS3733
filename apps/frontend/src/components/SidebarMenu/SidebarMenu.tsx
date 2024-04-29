import { ReactNode, useState } from "react";

import {SxProps} from "@mui/system";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";

import { motion } from "framer-motion";

type SidebarMenuProps = {
    isActive?: boolean;
    sx?: SxProps;
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
                    ...props.sx,
                    height: '90vh',
                    width: (props.isActive)?'8rem':'6rem',
                }}
            >
                {props.tabs.map((t, i) => {
                    return (
                        <Button
                            key={i}
                            sx={{
                                width: (props.isActive)?'8rem':'6rem',
                                height:'5rem',
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                p: 2,
                                transition: {xs: '0.1s', md: '0.1s'},
                            }}
                            onClick={() => {
                                setSelectedTab(i);
                                props.onSelect(i);
                            }}
                        >
                            {props.children[i]}
                            {(props.isActive)?
                                (<Typography
                                    variant={"subtitle2"}
                                    sx={{
                                        width: "100%",
                                        textAlign: "center",
                                        textWrap: "wrap",
                                    }}
                                >
                                    {t}
                                </Typography>):<></>
                            }
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
    </>
  );
}
