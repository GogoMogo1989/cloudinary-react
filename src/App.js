import React, {useState} from 'react'
import './App.css';

function App() {

  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files =e.target.files
    const data = new FormData()
    data.append("file", files[0])
    data.append("upload_preset", "swiper")
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dhsel42jc/image/upload',
      {
        method:'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }

  return (
    <div>
      <h1>Upoad Image</h1>
      <input type="file"
        name="file"
        placeholder='Upload Image'
        onChange={uploadImage}
       />
       {loading ? (
         <h3>Loading...</h3>
       ) : (
        <img src={image} style={{width: "300px"}} alt="" />
       )}
    </div>
  );
}

export default App;
