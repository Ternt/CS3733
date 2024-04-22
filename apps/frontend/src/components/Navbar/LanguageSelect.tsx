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
                            fontSize: '2.3rem'
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
                >
                    <MenuItem onClick={() => handleLanguageSelect('en')}>English</MenuItem>
                    <MenuItem onClick={() => handleLanguageSelect('sp')}>Spanish</MenuItem>
                </Popover>
            </>
        );
    };

    return <LanguageSelector onSetLanguage={props.onSetLanguage} />;
}
