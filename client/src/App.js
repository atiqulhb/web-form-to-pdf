import Template from './PDF/Template'
import React, { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [blob, setBlob] = useState(null)

  console.log(file)
  console.log(blob)

  const [profile, setProfile] = useState({
    type: 'Profile',
    name: 'John Doe',
    profession: 'Junior Developer',
    profileImageURL: 'https://i.imgur.com/f6L6Y57.png',
    display: true,
    about: 'About...',
  })

  async function handleSubmit(e) {
    e.preventDefault()
    console.log('working')
    // pdf(<Template profile={profile}/>).toBlob().then(res => setFile(new File([res], 'pdf.pdf')))

    try {
      const blob = await pdf(<Template profile={profile}/>).toBlob()

      const formData = new FormData()
      formData.append('pdfBlob', blob)


      try {
        const res = await fetch('http://localhost:8000/', {
          method: 'POST',
          body: formData
        })

        console.log(res)
      } catch(err) {
        console.log(err)
      }

      // try {
      //   const res = await axios.post('/', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   })

      //   console.log(res)
      // } catch(err) {
      //   console.log(err)
      // }

      setBlob(blob)

    } catch(error) {
      console.log(error)
    }
  }


  const handleChange = (name, value) => {
    setProfile({ ...profile, [name]: value })
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        // display: 'flex',
      }}
    >
      <div style={{ width: '50%' }}>
        <div>
          <label>Name</label>

          <input
            name='name'
            defaultValue={profile.name}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value)
            }}
          />
        </div>
        <div>
          <label>Profession</label>
          <input
            name='profession'
            defaultValue={profile.profession}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value)
            }}
          />
        </div>
        <div>
          <label>ImageURL</label>
          <input
            name='profileImageURL'
            defaultValue={profile.profileImageURL}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value)
            }}
          />
        </div>
        <div>
          <label>About</label>
          <input
            name='about'
            defaultValue={profile.about}
            onChange={(e) => {
              handleChange(e.target.name, e.target.value)
            }}
          />
        </div>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {blob ? <a href={URL.createObjectURL(blob)} download={`${profile.name}.pdf`}>Download</a> : null}
      <form method="POST" action="http://localhost:8000/upload" encType="multipart/form-data">
        <input type='file' name="someFile"/>
        <button type='submit'>upload</button>
      </form>
    </div>
  )
}

export default App
