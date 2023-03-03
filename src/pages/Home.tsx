import React from 'react';

const Home = (props: { name: any; }) => {
   const {name} = props

    return (
        <div className='text-center'>
            <h1>{name ? 'Hi '+name : 'You are not logged!'}</h1>
        </div>
    );
};

export default Home;