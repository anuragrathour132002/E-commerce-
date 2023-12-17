import React, { useState, Fragment } from 'react'
import "./Search.css";

const Search = ({ history }) => {

    const [Keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.prevantDefault();
        if (Keyword.trim()) {
            history.pushState(`/products/${ksyword}`);
        } else {
            history.pushState("/products");
        }
    };
    return (
        <Fragement>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder='Serach a Products ...' onChange={(e) => setKeyword(e.target.value)} />
                <input type='submit' value="Search" />
            </form>
        </Fragement>
    )
}

export default Search