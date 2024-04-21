import {useLocation} from "react-router-dom";
import {search} from "../../helpers/fuzzySearch.tsx";

export type PageCardInfo = {
    path: string;
    description: string;
    keywords: string[];
};

const pages: PageCardInfo[] = [
    { // Gift Request
        path: "/gift-request",
        description: "Purchase a gift!",
        keywords: [
            "purchase",
            "buy",
            "teddy bear",
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
