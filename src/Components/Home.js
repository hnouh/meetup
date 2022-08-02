import React ,{useEffect,useState} from 'react'
import "../Components/Home.css";
import pan from "../assets/wepik-2022424-3363-removebg-preview.png"
import tomato from "../assets/tomato.png"
import chalk from "../assets/20.png"
import Tabs from './Tabs'
import axios from "axios";

export default function Home() {
    const [foods,setFoods]=useState([])
    const [choice,setChoice]=useState("breakfast")
    
    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'https://tasty.p.rapidapi.com/recipes/list',
            params: {from: '0', size: '12', tags: choice},
            headers: {
              'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
            }
          }).then(function (response) {
              console.log(response.data);
              setFoods(response.data.results)
          }).catch(function (error) {
              console.error(error);
          });
    },[])

  return (
    <>
        <div id="banner">
            <div id="leftBanner">
                <h1>
                    A chef in every meal box
                </h1>
                <p>
                    get pre- potioned ingredients for gusto meal kits best recipes fdeliverd direct to you
                </p>
                <div id="buttonleftBanner">
                <button >Select</button>
                <button >View</button>
                </div>
            </div>
            <div id="rightBanner">
                <img
                src={pan}> 
                </img>
            </div>
        </div>
        <div id="Favorite">
            <div id="favoritesup">
                <img
                id="tomato"
                src={tomato}>
                </img>
                    <div id="favoritesupright">
                        <h1>Favorite meals</h1>
                        <img
                        id="chalk"
                        src={chalk}
                        ></img>
                    </div>
            </div>
            <div className="favoritesdown">
                <Tabs
                
                
                ></Tabs>
            </div>
        </div>
    </>
  )
}
