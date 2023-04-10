import { useState } from 'react'
import './App.css'
import Select from 'react-select'
import ChipherList from './Components/ChipherList'
import axios from "axios"
// console.log(obj)
// let key;
function App() {
  const [UserChoice, setChoice] = useState('');
  const [key, setKey] = useState('');
  // let key;
  return (
    <div class="App">
      <form id="UploadForm" action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button class="file-upload-button" type="submit">Upload</button>
      </form>
      <Select options={ChipherList} className="react-select-container" classNamePrefix="react-select" onChange={(choice)=>setChoice(choice.value)}/>
      {/* {UserChoice= 'http://localhost:3000/encrypt${}'} */}
      {/* <form class="form-container" action="http://localhost:3000/encrypt" method="GET"> */}
      {/* </form> */}
      {/* <textarea>{key}</textarea> */}
      <button class="button" type="encrypt" onClick={()=>{
        handleEncrypt(setKey, UserChoice)
      }}>Encrypt</button>
      {/* <form class="form-container" action="http://localhost:3000/decrypt" method="GET"> */}
        <button class="button" type="decrypt">Decrypt</button>
      {/* </form> */}
    </div>
  )
}

function handleEncrypt(setKey, UserChoice){
  axios.get(`http://localhost:3000/encrypt&algo=${UserChoice}`).then((res)=>{
    setKey(res.data.key);
    // key=res.data.key.toString('hex');
    // console.log(res)
    // console.log(key)
    // return key;
}
)
}

export default App
