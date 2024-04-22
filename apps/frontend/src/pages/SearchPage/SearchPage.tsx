import {useLocation} from "react-router-dom";
import {search} from "../../helpers/fuzzySearch.tsx";
import SearchPageCard from "../../components/SearchPageCard/SearchPageCard.tsx";
import {useAuth0} from "@auth0/auth0-react";
import {Box, Typography} from "@mui/material";

export type PageCardInfo = {
    title: string;
    path: string;
    description: string;
    keywords: string[];
    needsAuthentication?: boolean;
};

const pages: PageCardInfo[] = [
    {
        title: "Send a Gift",
        path: "/gift-request",
        description: "Get your loved one a customized gift that will be delivered directly to their room",
        keywords: [
            "request",
            "purchase",
            "buy",
            "gift delivery",
            "teddy bear",
            "chocolates",
            "cake",
            "succulent",
            "blanket",
            "gift basket"
        ]
    },
    {
        title: "Buy Flowers",
        path: "/flower-request",
        description: "Send flowers directly to the room of a loved one",
        keywords: [
            "request",
            "purchase",
            "buy",
            "flowers",
            "bouquets",
            "roses",
            "flower delivery",
            "send flowers",
            "florist",
            "rose",
            "daisy",
            "tulip",
            "forget-me-not",
            "forget me not",
            "carnation",
            "orcid",
            // add flowers offered in page
        ]
    },
    {
        title: "Request Medicine",
        path: "/medicine-request",
        description: "Request delivery of medicines",
        keywords: [
            "pharmacy",
            "medication",
            "drug delivery",
            "prescription",
            "order medicine",
            "request",
            "pain killers",
            "tylenol",
            "paracetamol",

        ],
        needsAuthentication: true,
    },
    {
        title: "Sanitation Services",
        path: "/sanitation",
        description: "Book sanitation services",
        keywords: [
            "request",
            "cleaning",
            "sanitary",
            "clean services",
            "disinfection",
            "sanitation help",
            "solid waste",
            "liquid spill",
            "mess",
        ],
        needsAuthentication: true,
    },
    {
        title: "Map",
        path: "/map",
        description: "Find your way with our map finder",
        keywords: [
            "location",
            "navigate",
            "directions",
            "find place",
            "service map",
            "pathfind",
            // add node longnames?
        ]
    },

    // give check for login
    {
        title: "Tables",
        path: "/tables",
        description: "View data",
        keywords: [
            "tables",
            "data tables",
            "information",
            "stats",
            "statistics",
            "view data"
        ]
    },
    {
        title: "Admin",
        path: "/admin",
        description: "Administrative portal",
        keywords: [
            "admin",
            "dashboard",
            "management",
            "admin panel",
            "control panel",
            "site management"
        ],
        needsAuthentication: true,
    },
    {
        title: "Login Page",
        path: "/login",
        description: "Log into your admin account",
        keywords: [
            "login",
            "sign in",
            "account access",
            "enter",
            "user login",
            "authenticate"
        ]
    }
];

function SearchPage() {
    const location = useLocation();
    const query = location.state?.query;
    const {isAuthenticated} = useAuth0();

    const res: PageCardInfo[] = search(query, pages).filter((d) => (d.needsAuthentication && isAuthenticated) || !d.needsAuthentication);

    console.log(res);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                overflow: "hidden",
            }}
        >
            <Typography
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 4,
                }}
                variant={"h4"}
            >
                Showing Search Results for "{query}"
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "78vh",
                    gap: 2,
                    padding: 4,
                    bgcolor: "#f1f1f2",
                    width: "67vw",
                }}
            >
                {

                    res
                        .map((d) =>
                            <SearchPageCard
                                key={d.title}
                                title={d.title}
                                path={d.path}
                                description={d.description}
                            />
                        )
                }
            </Box>
        </Box>
    );
}

export default SearchPage;
