// import { useState } from 'react'
import './App.css'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <form id="UploadForm" action="http://localhost:3000/upload" method="POST" enctype="multipart/form-data">
        <input type="file" name="file" />
        <button class="file-upload-button" type="submit">Upload</button>
      </form>
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
