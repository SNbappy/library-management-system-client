import React from 'react';
import Banner from './Banner';
import WhyChoose from './WhyChoose';
import Reviews from './Reviews';
import CategoryBooks from '../CategoryBooks/CategoryBooks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <CategoryBooks></CategoryBooks>
            <WhyChoose></WhyChoose>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;