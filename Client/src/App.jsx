import { useState } from 'react'
import './App.css'
import Select from 'react-select'
import obj from './ChipherList'
// console.log(obj)

function App() {
  const [UserChoice, setChoice] = useState('')

  return (
    <div class="App">
      <form id="UploadForm" action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button class="file-upload-button" type="submit">Upload</button>
      </form>
      <Select options={obj} className="react-select-container" classNamePrefix="react-select" onChange={(choice)=>setChoice(choice.value)}/>
      {console.log(UserChoice)}
      <form class="form-container" action="http://localhost:3000/encrypt" method="GET">
        <button class="button" type="encrypt">Encrypt</button>
      </form>
      <form class="form-container" action="http://localhost:3000/decrypt" method="GET">
        <button class="button" type="decrypt">Decrypt</button>
      </form>
    </div>
  )
}

export default App
