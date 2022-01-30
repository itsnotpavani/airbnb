import React ,{useState} from 'react';
import './banner.css';
import Header from './Header'


function Banner()

{ const [xaxis,setXaxis]=useState(0);
  const [yaxis,setYaxis]=useState(0);


  const handlemove=(e)=>{
  setXaxis((window.innerWidth/2-e.pageX)/15);
  setYaxis((window.innerHeight/2-e.pageY)/15);

  }

  const handleleave=()=>{
    setXaxis(0);
    setYaxis(0);


  }

const cardStyle={transform:`rotateX(${yaxis}deg) rotateY(${xaxis}deg)`};
const defaultStyle={transform:'translateZ(0px)'};
const newStyle={transform:'translateZ(500px)'};

  return(
    <div className="banner">
      <Header/>
    <div className="container" style={cardStyle} onMouseMove={(e)=>{handlemove(e);}} onMouseLeave={()=>{handleleave();}}>
     <div className="info">
     <div className="info-card">
     <h1>Where do you wanna go next?</h1>
     <p>Plan a different kind of getaway to uncover the hidden gems near you</p>

     <button className="explore" style={newStyle}>Explore Nearby</button>

     </div>
    </div>
    </div>
    </div>

  );
}

export default Banner;
