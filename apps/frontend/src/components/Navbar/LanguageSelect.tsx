import { IconButton, Popover } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useState } from "react";
import {ResponsiveAppBarProps}  from "./Navbar.tsx";
import LanguageIcon from '@mui/icons-material/Language';

export function LanguageSelect(props: ResponsiveAppBarProps) {


    const LanguageSelector = ({ onSetLanguage }: { onSetLanguage: (language: string) => void }) => {
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        };

        const handleClose = () => {
            setAnchorEl(null);
        };

        const handleLanguageSelect = (language: string) => {
            onSetLanguage(language);
            handleClose();
        };

        const open = Boolean(anchorEl);
        const id = open ? 'language-selector-popover' : undefined;

        return (
            <>
                <IconButton onClick={handleClick}>
                    <LanguageIcon
                        sx={{
                            color: 'white',
                            fontSize: '2rem'
                        }}
                    />
                </IconButton>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    disableScrollLock={true}
                >
                    <MenuItem onClick={() => handleLanguageSelect('en')}>
                        <img
                            src="https://flagcdn.com/w40/us.png"
                            srcSet="https://flagcdn.com/w80/us.png 2x"
                            width="40"
                            alt="United States"/>
                        English
                    </MenuItem>
                    <MenuItem onClick={() => handleLanguageSelect('sp')}>
                        <img
                            src="https://flagcdn.com/w40/pr.png"
                            srcSet="https://flagcdn.com/w80/pr.png 2x"
                            width="40"
                            alt="Puerto Rico"/>
                        Español
                    </MenuItem>
                    <MenuItem onClick={() => handleLanguageSelect('cn')}>
                        <img
                            src="https://flagcdn.com/w40/cn.png"
                            srcSet="https://flagcdn.com/w80/cn.png 2x"
                            width="40"
                            alt="China Mainland"/>
                        简体中文
                    </MenuItem>
                </Popover>
            </>
        );
    };

    return <LanguageSelector onSetLanguage={props.onSetLanguage} />;
}
