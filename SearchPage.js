import React ,{useState,useEffect} from 'react';
import './SearchPage.css';
import axios from "axios";
import Section from './sections';
import Header from './Header';
import { useLocation } from "react-router-dom";
import {getFirestore,collection,addDoc,query,where,getDocs} from"firebase/firestore";
import CloseIcon from '@mui/icons-material/Close';
import Footer from './footer';

function SearchPage()
{
  const [searchResults,setSearchResults]=useState([]);
  const [visibleClose,setVisibleClose]=useState(false);
  const location = useLocation();
  const {data,sDate,eDate,duration,userId}=location.state;
  const db=getFirestore();
  const colRef=collection(db,userId);

const options = {
  method: 'GET',
  url: 'https://hotels-com-provider.p.rapidapi.com/v1/destinations/search',
  params: {query: `${data}`, currency: 'USD', locale: 'en_US'},
  headers: {
    'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
    'x-rapidapi-key': 'b72a9df778msha642cdd78f21662p1f2cd9jsn400df83d5da6'
  }
};
useEffect(()=>{
  async function fetchData(){
     axios.request(options).then(function (response) {
    	const destID=response.data.suggestions[0].entities[0].destinationId;
        const hotels = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/search',
        params: {
          checkin_date: '2022-03-26',
          checkout_date: '2022-03-27',
          sort_order: 'STAR_RATING_HIGHEST_FIRST',
          destination_id: `${destID}`,
          adults_number: '1',
          locale: 'en_US',
          currency: 'USD',
          children_ages: '4,0,15',
          price_min: '10',
          star_rating_ids: '3,4,5',
          accommodation_ids: '20,8,15,5,1',
          price_max: '500',
          page_number: '1',
          theme_ids: '14,27,25',
          amenity_ids: '527,2063',
          guest_rating_min: '4'
        },
        headers: {
          'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
          'x-rapidapi-key': 'b72a9df778msha642cdd78f21662p1f2cd9jsn400df83d5da6'
        }
      };
      axios.request(hotels).then(function (response) {
      	setSearchResults(response.data.searchResults.results);
      }).catch(function (error) {
      	console.log(error);
      });
    }).catch(function (error) {
    	console.log(error);
    });


  }

  fetchData();


},[]);


const list=document.querySelector(".list");
const handleViewBookings=()=>{
 console.log("Hello");
  getDocs(colRef).then((snapshot)=>{
    snapshot.docs.forEach((doc)=>{
      let li1=document.createElement("li");
      let li2=document.createElement("li");
      let li3=document.createElement("li");
      let li4=document.createElement("li");
      let li5=document.createElement("li");
      let li6=document.createElement("li");
      let break_=document.createElement("br");
      let name=document.createElement("span");
      let mobile=document.createElement("span");
      let from=document.createElement("span");
      let to=document.createElement("span");
      let payment=document.createElement("span");
      let hotel=document.createElement("span");

      name.textContent=doc.data().Name;
      mobile.textContent=doc.data().Mobile;
      hotel.textContent=doc.data().HotelName;
      from.textContent=doc.data().From;
      to.textContent=doc.data().To;
      payment.textContent=doc.data().Total;

      li1.appendChild(name);
      list.appendChild(li1);

      li2.appendChild(mobile);
      list.appendChild(li2);

      li6.appendChild(hotel);
      list.appendChild(li6);
      li3.appendChild(from);
      list.appendChild(li3);

      li4.appendChild(to);
      list.appendChild(li4);

      li5.appendChild(payment);
      list.appendChild(li5);
      list.appendChild(break_);
     console.log(list.childNodes.length);

    });


  });
setVisibleClose(true);
}

const handleclose=()=>{
  const N=list.childNodes.length;
  for(var i=0;i<N;i++)
  {
    list.childNodes[0].remove();
  }
setVisibleClose(false);
list.setAtrribute("style","opacity:0;");

}
  return(

    <div className="searchPage">
      <Header/>
      <br/>
      <br/>
      <br/>

      <button class="viewBookings" onClick={()=>{handleViewBookings();}}>My Bookings</button>


      {visibleClose && (<CloseIcon className="closeIcon"onClick={()=>{handleclose();}}/>)}

       <ul class="list"></ul>



      <div className="results">
       {
         searchResults.map((res)=>
           (<Section Info={res} startDate={sDate} endDate={eDate} days={duration} userID={userId}/>))
       }
      </div>
    <Footer/>

    </div>
  );
}

export default SearchPage;
