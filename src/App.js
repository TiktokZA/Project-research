/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-pascal-case */
import Header from './components/Header'
import Banner_search from '../src/components/Banner_search'
import Interest from './components/Interests'
import Contacts from './components/contacts'
import Footer from './components/Footer'
import LoginUser from './components/loginUser'
import {Routes, Route} from "react-router-dom";
import Register from './components/Register'
import Profile from './components/Profile'
import User_person from './components/User_person'
import Login_Admin from './Admin/Login_Admin'
import Edit_Amin from './Admin/Edit_Amin'
import Form_forgotpass from './components/Form_forgotpass'
import PrivateComponent from './components/PrivateComponent'
import Search_searchBar from './components/Search_searchBar'
import Search_body from './components/Search_body'
import Search_bottom from './components/Search_bottom'
import DetailPage from './components/detailPage'
import Static from './components/Static'
import ProfilePage from './components/profilePage'
import { techData } from './components/TeacherData.js'
import Profile_aj from './components/Profile_aj'
import Modaltest from './components/Modaltest'
import { workData } from "./components/workData";
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Link, NavLink } from 'react-router-dom'
import ProfilePage_Edit from './components/profilePage_Edit'
import Detailresearch from './components/detailresearch';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


////
let Searchdata = 0;

function Home_Page(props){

  return <>
    <Banner_search />
    <Interest/>
    <Contacts sendTeacherIndex={(item) => props.sendTeacherIndex(item)}/>
  </>
}
  
/*ฟังก์ชันเอาหน้ามาต่อกัน */
function SearchPage(props) {
  const [searchdata, setsearchdata] = useState([]);
  const [searchdatafilter, setsearchdatafilter] = useState(null);
  const settsearchdata = (val)=>{
    // console.log('dawdwadawd55555',val)
    
    setsearchdata(val)
  }
  const settsearchdatafilter = (val)=>{
    // console.log('dawdwadawd5555555555555555',val)
    
    // setsearchdata(temp)
    setsearchdatafilter({data:val , keyword :searchdata.keyword})
  }
  props.sendsearch(searchdata);
  return (
    <>
      <Search_searchBar searchdata={(item)=>{settsearchdata(item)}}/>
      <Search_body 
        searchdata={searchdata} 
        data1={props.data1} 
        sendResearchIndex={(item)=>props.sendResearchIndex(item)}
        setsearchdata = {(item)=> settsearchdatafilter(item)}
      />
      <Search_bottom page_now={props.data1} searchdata={searchdatafilter ? searchdatafilter : searchdata}  />
    </>
  );
}
const resultsearchpage =[];
function App() {
  
  //เอาไว้รับค่าตอนกดเข้างานวิจัย
  const [workIndex, setWorkIndex] = useState(0);
  const sendWorkIndex = (val) => {
    setWorkIndex(val);
  };

//เอาไว้รับค่าตอนกดเข้าข้อมูลอาจารย์
const [teacherIndex, setTeacherIndex] = useState(0);
const sendTeacherIndex = (val) =>{
  setTeacherIndex(val);
  // console.log(val)
};


const [researchIndex, setresearxhIndex] = useState(0);
const sendResearchIndex = (val) =>{
  setresearxhIndex(val);
  // console.log("researchIndex=>",val)
};
//เอาไว้รับค่าว่าใครlogin
const [loginstatuss, setloginstatuss] = useState(0);
const settloginstatuss = (val) => {
  setloginstatuss(val);
};

const [workData, setworkData] = useState(null);
  const sendworkData = (val) => {
    setworkData(val);
    // console.log("workData=>",val)
  };
  for(let i =1 ;i< 100 ;i++){
    resultsearchpage.push(
      <Route
          path={"/search/"+i.toString()}
          element={<SearchPage data1={i.toString()}  sendResearchIndex={(item)=> {sendResearchIndex(item)}} sendsearch={sendworkData} getdata={workData}/>}
      />
      
    )
  }
  return (
      <>
        <Header loginstatus={loginstatuss}/>
        
        <div>
          <Routes> 

          <Route
          path="/search/"
          element={<SearchPage data1="1"  sendResearchIndex={(item)=> {sendResearchIndex(item)}}  sendsearch={(item)=> sendworkData(item)}/>}
        />
          {/* <Route
          path="/search/1"
          element={<SearchPage data1="1" sendWorkIndex={sendWorkIndex} />}
        />
        ; */}
        {/* <Route
          path="/search/2"
          element={<SearchPage data1="2" sendWorkIndex={sendWorkIndex} />}
        />
        ; */}
        { resultsearchpage }
        
    
        <Route
          // path={workIndex ? `/${workData.data[workIndex].name_research}/`: '/'}
          path={`/search/${workIndex.data1}/detail/`}
          element={<DetailPage getid={workIndex ? workIndex: -1} data ={workData ? workData.data : []}/>}
        />
        <Route
          path={`/search/detail/`}
          element={<DetailPage getid={workIndex ? workIndex: -1} data ={workData ? workData.data : []}/>}
        />
        <Route
          path={`/idresearch=${researchIndex}`}
          element={<Detailresearch getid={researchIndex}/>}
        />
        
        <Route
          path={`/id=${teacherIndex}`}
          element={<ProfilePage getid={teacherIndex ? teacherIndex : 0} sendResearchIndex={(item)=> {sendResearchIndex(item)}}/>}
        />
        {/* <Route
          path={`Static/id=${teacherIndex}`}
          element={<ProfilePage getid={teacherIndex ? teacherIndex : 0} sendResearchIndex={(item)=> {sendResearchIndex(item)}}
            />}
        /> */}
          <Route element={<PrivateComponent/>}/>
            <Route path="/" element={<Home_Page sendTeacherIndex={(item)=> {sendTeacherIndex(item)}}/>}/>
            <Route path="/login" element={<LoginUser loginstatus={(item)=>{settloginstatuss(item)}}/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/james" element={<Static />}/>
            <Route element={<PrivateComponent/>}>
             <Route path="/profile" element={<ProfilePage_Edit/>}/>
             </Route>
             <Route path="/profilepage" element={<ProfilePage/>}/>
             <Route path="/forgot-pass" element={<Form_forgotpass/>}/>
             <Route path="/Static" element={<Static sendTeacherIndex={(item)=> {sendTeacherIndex(item)}}/>}/>
             <Route path="/login_admin" element={<Login_Admin/>}/>
             <Route path="/edit_admin" element={<Edit_Amin/>}/>
             <Route path="/profile_aj" element={<Profile_aj getid={teacherIndex}/>}/>

          </Routes>
        </div>   
        <Footer/>

      </>
  );
}

export default App;
