import React ,{useState,useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './header.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut} from "firebase/auth";
import {getFirestore,collection,addDoc,query,where,getDocs} from"firebase/firestore";
import {Link} from 'react-router-dom';


function Header()
{ const [search,setSearch]=useState("");
  const [startDate,setStartDate]=useState(new Date());
  const [endDate,setEndDate]=useState(new Date());
  const [show,handleShow]=useState(false);
  const [account,setAccount]=useState(false);
  const [signIn,setSignIn]=useState(false);
  const [register,setRegister]=useState(false);
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [userId,setUserId]=useState("");
  const [signInForm,setSignInForm]=useState(false);

    const firebaseConfig = {
      apiKey: "AIzaSyBWrPpemz3bROdTeOBYoZyp6bAYgMNr5gk",
      authDomain: "airbnb-clone-ba563.firebaseapp.com",
      projectId: "airbnb-clone-ba563",
      storageBucket: "airbnb-clone-ba563.appspot.com",
      messagingSenderId: "509125743806",
      appId: "1:509125743806:web:45c0d045ff95c74a323aef"
    };

    const app = initializeApp(firebaseConfig);
    const auth=getAuth();
    const db=getFirestore();
    const colRef=collection(db,"users");



    useEffect(()=>{
       window.addEventListener("scroll",()=>
     {
       if(window.scrollY>100)
       {
         handleShow(true);

       }
       else
        handleShow(false);
     });
     return()=>{window.removeEventListener("scroll")};

   },[]);
  const selectionRange={
    startDate:startDate,
    endDate:endDate,
    key:'Selection'
   }
 const handleEvent=(item)=>{
   setStartDate(item.Selection.startDate);
   setEndDate(item.Selection.endDate);

 }

const handleAccount=()=>{
  if(account==true)
  setAccount(false);
  else
   setAccount(true);
}
const handleRegister=()=>{
  setRegister(true);
  setAccount(false);
}

const handleSignIn=()=>{
  setSignInForm(true);
  setAccount(false);
}


const form=document.querySelector(".register");
const form_=document.querySelector(".signIn");
const greeting=document.querySelector(".greeting");

const handleSubmit=(e)=>{e.preventDefault();
  createUserWithEmailAndPassword(auth,email,password).then((cred)=>{console.log(cred.user.uid);
    setUserId(cred.user.uid);
  setSignIn(true);
  setRegister(false);
  greeting.innerText=`hi ${name}`;
  addDoc(colRef,{Name:name,Email:email,Password:password,userID:cred.user.uid}).then(()=>{form.reset();}).catch((err)=>{console.log(err);});}).catch((err)=>{console.log(err);});
 }

 const handleSubmitSignIn=(e)=>{e.preventDefault();



 signInWithEmailAndPassword(auth,email,password).then((cred)=>{form_.reset();setSignIn(true);setSignInForm(false);
   setUserId(auth.currentUser.uid);
   const q=query(colRef,where("userID","==",`${auth.currentUser.uid}`));
 getDocs(q).then((snapshot)=>{snapshot.forEach((doc)=>{greeting.innerText=`Hi ${doc.data().Name}`;})});}).catch((err)=>{console.log(err);});
}

const handlesignOut=()=>{signOut(auth).then(()=>{console.log("user signed out"); setSignIn(false); greeting.innerText="";}).catch((err)=>{console.log(err);});}

  return(
    <div className="header">

    <div className={`section ${show && "newSection"}`}>
    <div className="row1">
    <div>
    <Link to='/'>
     <img className="logo"src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"/>
     </Link>
     </div>

     <div className="header_center">
      <input type="text" className="searchPlace"value={search} placeholder="Search Place" onChange={(e)=>{setSearch(e.target.value);}}/>
      <Link to='/search' state={{data:`${search}`,sDate:`${startDate}`,eDate:`${endDate}`,duration:`${1+((endDate.getTime()-startDate.getTime())/(1000*60*60*24))}`, userId:`${userId}`}}>
      <SearchIcon className="searchIcon"/>
      </Link>
     </div>
     <div className="header_right">
     <h1 className="greeting"></h1>

      <LanguageIcon className="languageIcon"/>


      <KeyboardArrowDownIcon className="arrowDown"/>


      <AccountCircleIcon className="accountIcon"onClick={()=>{handleAccount();}}/>

      </div>
      </div>
      <div className="row2">

       <div>
      {search && signIn &&(<div className="date-picker">
       <DateRangePicker ranges={[selectionRange]} minDate={new Date()} rangeColors={["#FD5B61"]} onChange={(item)=>{handleEvent(item);}}/>
      </div>)}
      </div>
      <div>
       {!signIn && <h9>Please Sign or Register to search</h9>}
       </div>

     <div>
      {account && (<div className="account">
      <AccountCircleIcon sx={{ fontSize: 70,color:"#FD5B61"}}/>

       <div>{!signIn && (<button className="regis" onClick={()=>{handleRegister();}}>Register</button>)}</div>
       <div>{!signIn && (<button className="Sign In" onClick={()=>{handleSignIn();}}>Sign In</button>)}</div>
       <div>{signIn && (<button className="Sign Out" onClick={()=>{handlesignOut();}}>Sign Out</button>)}</div>
       </div>
       )}
      </div>

       </div>

     </div>




    {register && (<form className="register" onSubmit={(e)=>{handleSubmit(e);}}>
                   <input type="text" name="Name" placeholder="Name" onChange={(e)=>{setName(e.target.value);}}/>
                   <input type="email" name="Email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value);}}/>
                   <input type="password" name="Password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}/>
                   <br/>
                   <input type="submit" name="Submit" className="submit"value="Register"/>
                  </form>)
     }
     {
       signInForm && (<form className="signIn" onSubmit={(e)=>{handleSubmitSignIn(e);}}>

                      <input type="email" name="Email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value);}}/>
                      <input type="password" name="Password" placeholder="password" onChange={(e)=>{setPassword(e.target.value);}}/>
                      <br/>
                      <input type="submit" name="Submit" className="submit"value="signIn"/>
                     </form>)
     }

  </div>

  );
}

export default Header;
