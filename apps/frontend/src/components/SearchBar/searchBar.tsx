import * as React from "react";
import {useState} from "react";
import {styled, alpha} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {useNavigate} from "react-router-dom";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

type searchBarProps = {
    border?: string;
    borderColor?: string;
    borderRadius?: string;
}

const Search = styled("div")(({theme}) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#012d5a",
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

function SearchBar(props: searchBarProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            setSearchQuery("");
            navigate('/search', {state: {query: searchQuery}});
        }
    };

    return (
        <Search
            sx={{
                height: "6vh",
                color: "white",
                bgcolor: "white",
                border: (props ? props.border : "none"),
                borderColor: (props ? props.borderColor : "none"),
                borderRadius: (props ? props.borderRadius : "none"),
                display: "flex",
                alignItems: "center",
            }}
        >
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder={TranslateTo("Searchbar")}
                inputProps={{"aria-label": "search"}}
                sx={{
                    height: "6vh",
                }}
                onChange={(event) => setSearchQuery(event.target.value)}
                onKeyDown={handleKeyDown}
                value={searchQuery}
            />
        </Search>
    );
}

export default SearchBar;
