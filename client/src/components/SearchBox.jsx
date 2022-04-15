import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const SearchBox = () => {
    const dispatch = useDispatch();

    const [keyword, setKeyword] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    };

    return (
        <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>

            <input
                onChange={e => setKeyword(e.target.value)}
                style={{ width: '400px' }}
                type="search"
                name="q"
                className="form-control mr-sm-2 text-primary"
                placeholder="Search Product"
            />
            <label>  <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} /></label>
        </form>
    );
};

export default SearchBox;
