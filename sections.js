import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './sections.css';
import {getFirestore,collection,addDoc,query,where,getDocs} from"firebase/firestore";
import CloseIcon from '@mui/icons-material/Close';

function Sections(props)
{  const [uRL,setURL]=useState("");
   const [name,setName]=useState("");
   const [mobile,setMobile]=useState("");
   const [guests,setGuests]=useState("");
   const [hotelName,setHotelName]=useState("");
   const [displayBooking,setDisplayBooking]=useState(false);
  const infos=props.Info;
  const sDate=props.startDate;
  const eDate=props.endDate;
  const days=props.days;
  const uid=props.userID;

  const firebaseConfig = {
    apiKey: "AIzaSyBWrPpemz3bROdTeOBYoZyp6bAYgMNr5gk",
    authDomain: "airbnb-clone-ba563.firebaseapp.com",
    projectId: "airbnb-clone-ba563",
    storageBucket: "airbnb-clone-ba563.appspot.com",
    messagingSenderId: "509125743806",
    appId: "1:509125743806:web:45c0d045ff95c74a323aef"
  };


  const db=getFirestore();
  const colRef=collection(db,uid);



  useEffect(()=>{
    async function fetchImage(){

      var options = {
                   method: 'GET',
                   url: 'https://hotels-com-provider.p.rapidapi.com/v1/hotels/photos',
                   params: {hotel_id: `${infos.id}`},
                   headers: {
                              'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com',
                              'x-rapidapi-key': 'b72a9df778msha642cdd78f21662p1f2cd9jsn400df83d5da6'
                             }
                   };

axios.request(options).then(function (response) {


  setURL(response.data[4].mainUrl);

}).catch(function (error) {
	console.error(error);
});
    }
    fetchImage();
  },[]);

  const pricePerNight=document.querySelector(".pricePerNight");
  const totalCost=document.querySelector(".Total");
 const handleBooking=(e)=>{
   setDisplayBooking(true);
   setHotelName(e);
}

 const handleSubmit=(e)=>{e.preventDefault();
   addDoc(colRef,{Name:`${name}`,Mobile:`${mobile}`,HotelName:`${hotelName}`,Guests:`${guests}`,From:`${sDate}`,To:`${eDate}`,PricePerNight:`${pricePerNight.innerHTML}`,Total:`${totalCost.innerHTML}`}).then(()=>{console.log("data inserted successfuly");});
   setDisplayBooking(false);
 }

 const handleClose=()=>{setDisplayBooking(false);}

  return(
    <div>
    <div>
     {
       displayBooking && (<form className="Booking" onSubmit={(e)=>{handleSubmit(e);}}><CloseIcon onClick={()=>{handleClose();}}/>
                            <input type="text" name="Name" placeholder="Name" required onChange={(e)=>{setName(e.target.value);}}/>
                            <input type="tel" name="Phone" placeholder="Mobile" required onChange={(e)=>{setMobile(e.target.value);}}/>
                            Guests
                            <select className="selectGuests" name="guests" onChange={(e)=>{setGuests(e.target.value);}}>
                             <option value="1">1</option>
                             <option value="2">2</option>
                             <option value="3">3</option>
                             <option value="4">4</option>
                             </select>
                             From<input type="text" name="startDate"  value={sDate} disabled/>
                             To<input type="text" name="endDate"  value={eDate} disabled/>
                             <h3 className="pricePerNight">{infos.ratePlan.price.current}/Night</h3>
                             <h3 className="Total">Total ${infos.ratePlan.price.current.substring(1)*days}</h3>
                             <input type="submit" value="submit"/>
                             </form>
                           )
                           }

    </div>


    <div className="main">

      <img src={uRL}/>
      <div className="info2">
      <h1>{infos.name}</h1>
      <h5>{infos.address.streetAddress}</h5>
      <h5>{infos.address.region}</h5>
      <h5>{infos.landmarks[0].label}</h5>
      <h5>{infos.landmarks[1].label}</h5>

      <div className="bottom">
      <div>
      <h4>{infos.starRating}⭐️</h4>
      <h4>{infos.ratePlan.price.current}/Night</h4>
      </div>
      <button className="Book" onClick={()=>{handleBooking(infos.name);}}>Book Now</button>
      </div>
      </div>

     </div>

     <hr/>
     </div>
  );
}

export default Sections;
