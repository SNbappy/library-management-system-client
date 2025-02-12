import React, { useEffect } from 'react';
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import Reviews from './Reviews';
import CategoryBooks from '../CategoryBooks/CategoryBooks';
import Featured from './Featured';

const Home = () => {

    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <div>
            <Banner></Banner>
            <CategoryBooks></CategoryBooks>
            <Featured></Featured>
            <WhyChoose></WhyChoose>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;