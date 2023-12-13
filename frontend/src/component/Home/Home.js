import React, { Fragment, useEffect } from 'react'
import { gMouse } from "react-icons/all";
import ".Home.css";
import Products from "./Product.js"
import Metadata from "./component/layout/Metadata.js";
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js"
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(
        (state) => state.products
    );

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title="ECommerce" />
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
                        {products && products.map(product => (
                            <Products product={product} />
                        ))}
                    </div>

                </Fragment>
            )}
        </Fragment>
    )
}

export default Home