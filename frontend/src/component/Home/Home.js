import React, { Fragment } from 'react'
import { gMouse } from "react-icons/all";
import ".Home.css";
import product from "./Product.js"

const product = {
    name: "Blur shirt",
    images: [{ url: "fjf" }],
    price: "5000",
    _id: "anu",
};
const Home = () => {
    return (
        <Fragment>
            <div class="banner">
                <p>Welcome to ecommerce</p>
                <h1>Find Amazing Product</h1>

                <a href="#container">
                    <button>
                        Scroll <gMouse />
                    </button>
                </a>
            </div>
            <h2 className='homeHeading'>Featured Products</h2>
            <div className='container' id='cosntainer'>
                <Product product={product} />
            </div>

        </Fragment>
    )
}

export default Home