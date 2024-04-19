import {useLocation} from "react-router-dom";

function SearchPage() {
    const location = useLocation();
    const query = location.state?.query;

    return (
        <div>
            <p>{query}</p>
        </div>
    );
}

export default SearchPage;
