import {useLocation} from "react-router-dom";
import {search} from "../../helpers/fuzzySearch.tsx";

export type PageCardInfo = {
    path: string;
    description: string;
    keywords: string[];
};

const pages: PageCardInfo[] = [
    {
        path: "/gift-request",
        description: "Purchase a gift!",
        keywords: [
            "purchase",
            "buy",
            "teddy bear",
            "gift delivery",
            // add gifts offered in page
        ]
    },
    {
        path: "/flower-request",
        description: "Order flowers for your loved one!",
        keywords: [
            "purchase",
            "buy",
            "flowers",
            "bouquets",
            "roses",
            "flower delivery",
            "send flowers",
            "florist",
            // add flowers offered in page
        ]
    },
    {
        path: "/medicine-request",
        description: "Request delivery of medicines",
        keywords: [
            "medicine",
            "pharmacy",
            "medication",
            "drug delivery",
            "prescription",
            "order medicine",
            // add medicine offered in page
        ]
    },
    {
        path: "/sanitation",
        description: "Book sanitation services",
        keywords: [
            "cleaning",
            "sanitary",
            "clean services",
            "disinfection",
            "sanitation help"
        ]
    },
    {
        path: "/map",
        description: "Explore our services via the map",
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
        path: "/tables",
        description: "View tabular data on our platform",
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
        path: "/admin",
        description: "Administrative portal",
        keywords: [
            "admin",
            "dashboard",
            "management",
            "admin panel",
            "control panel",
            "site management"
        ]
    },
    {
        path: "/login",
        description: "Log into your account",
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

    const res: PageCardInfo[] = search(query, pages);

    return (
        <div>
            <p>{res.map((d) => d.path)}</p>
        </div>
    );
}

export default SearchPage;
