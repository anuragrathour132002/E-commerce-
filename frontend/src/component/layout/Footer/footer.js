import React from 'react';
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./footer.css"
const footer = () => {
    return (
        <footer id="footer">
            <div class="leftfooter">
                <h4>Dawnload Out App</h4>
                <p>Dawnload app for android an ios phone</p>
                <img src={playStore} alt="playstore" />
                <img src={appStore} alt="appStore" />
            </div>

            <div class="minfooter">
                <h1>Ecommerce</h1>
                <p>high Quality</p>
                <p>Copyrights 2023 &copy; Anurag</p>
            </div>


            <div class="rightfooter">
                <h4>Follow us</h4>
                <a href="instra">instragram</a>
                <a href="insrta">instragram</a>
                <a href="insrta">instragram</a>
            </div>
        </footer>

    );
};

export default footer