import React, { useContext } from 'react'
import { Context } from '../../index'
import { Navigate } from 'react-router-dom';
import HeroSection from "./HeroSection"
import PopularCategories from "./PopularCategories"
import PopularCompanies from "./PopularCompanies"
import HowItWorks from "./HowItWorks"

function Home() {
  const {isAuthorized}=useContext(Context);
  if(!isAuthorized){
    return <Navigate to={"/login"}/>
  }
  return (
  <section class="homePage page">
  <HeroSection />
  <HowItWorks />
  <PopularCategories />
  <PopularCompanies />
  </section>
  )
}

export default Home