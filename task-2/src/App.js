import axios from "axios";
import {useRef} from "react";
import useDebounce from "./hooks/useDebounce";
import useScroll from "./hooks/useScroll";
import SearchInput from "./ui/SearchInput";
import ListArticles from "./ui/ListArticles";
import {observer} from "mobx-react-lite";
import searchStore from "./store/store";

const DELAY = 500;
const LIMIT = 20;
const API = `/api/w/api.php?format=json&action=query&list=search&srlimit=${LIMIT}&srsearch=`;

function App() {
    const search = () => {
        const url = searchStore.continue === undefined ? `${API}${searchStore.value}` : `${API}${searchStore.value}&continue=${searchStore.continue.continue}&sroffset=${searchStore.continue.sroffset}`;

        if (searchStore.value !== "") {
            axios.get(url).then((response) => {
                searchStore.setContinue(response.data.continue);
                searchStore.setIsNone(response.data.continue === undefined);
                const query = response.data.query;
                const temp = [];
                query.search.forEach((item) => {
                    temp.push({
                        title: item.title,
                        url: `https://en.wikipedia.org/wiki/${item.title.replace(" ", "_")}`,
                    });
                });
                searchStore.setArticles([...new Map([...searchStore.articles, ...temp].map(item => [item['title'], item])).values()]);
            });
        } else {
            searchStore.setArticles([]);
            searchStore.setContinue(undefined);
        }
    };

    const parentRef = useRef();
    const childRef = useRef();
    const debounceSearch = useDebounce(search, DELAY);
    useScroll(parentRef, childRef, () => debounceSearch());

    const inputEvent = (event) => {
        if (event.target.value.startsWith(' ')) {
            event.target.value = '';
            alert('Your request cannot start with a space');
        }
        searchStore.setValue(event.target.value);
        searchStore.setArticles([]);
        searchStore.setContinue(undefined);
        searchStore.setIsNone(event.target.value === "")
    };

    return (
        <>
            <SearchInput onChange={inputEvent} value={searchStore.value}/>

            <div
                ref={parentRef}
                className="text-center m-4"
                style={{overflow: "auto", height: "80vh"}}
            >
                <ListArticles articles={searchStore.articles}/>

                <div
                    className="spinner-border mt-4 mb-4 m-auto"
                    ref={childRef}
                    style={{
                        width: "40px",
                        height: "40px",
                        display: searchStore.isNone ? "none" : "block",
                    }}
                ></div>

                <div style={{display: searchStore.value !== "" && searchStore.isNone ? "block" : "none"}}>
                    {searchStore.articles.length === 0 && "Not found"}
                </div>
            </div>
        </>
    );
}

export default observer(App);
