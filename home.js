import React from 'react';
import './home.css';
import Banner from './banner';
import Footer from './footer';
function Home()
{
  return (
    <div class="home">


    <Banner/>

    <div className="cards_bottom">
    <div className="card1">
    <img className="bottom_img" src="https://s3.amazonaws.com/imagescloud/images/medias/camping/camping-tente.jpg"/>
    <h3>Explore Nature</h3>
    </div>

    <div className="card1">
    <img className="bottom_img" src="https://image.khaleejtimes.com/?uuid=1c6488de-eb4d-5730-8a91-fc07ae5a1f70&function=cropresize&type=preview&source=false&q=75&crop_w=0.99314&crop_h=0.99999&x=0.00343&y=0&width=1200&height=675"/>
    <h3>Luxury Hotels</h3>
    </div>

    <div className="card1">
    <img className="bottom_img" src="https://assets.newatlas.com/dims4/default/3d94d96/2147483647/strip/true/crop/4461x2974+0+0/resize/1200x800!/quality/90/?url=http%3A%2F%2Fnewatlas-brightspot.s3.amazonaws.com%2F38%2Fcc%2Fcb4aa02c4b0ab31f1e5a126d8c9b%2F01-5563-gawthorneshut-caarch-ambercreative.jpg"/>
    <h3>Tiny Spaces</h3>
    </div>

    </div>
    <Footer/>
    </div>


  );
}

export default Home;
