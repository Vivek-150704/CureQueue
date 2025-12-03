import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
    return (
        // Using a fragment since the child components already manage their own layout and spacing.
        <>
            <Header />
            <SpecialityMenu />
            <TopDoctors />
            <Banner />
        </>
    )
}

export default Home