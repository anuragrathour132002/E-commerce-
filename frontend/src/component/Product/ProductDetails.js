import React, { Fragment, useEffect } from 'react'
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { getProducDetails } from '../../actions/productAction';


const ProductDetails = ({ match }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducDetails(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {Product.images && Product.images.map((item, i) => (
                            <img className="CarousalImage" key={item.url}
                                src={item.url} alt={`${i} Slide`} />
                        ))}
                    </Carousel>
                </div>

            </div>
        </Fragment>
    )
}

export default ProductDetails