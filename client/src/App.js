import Template from './Template/Index'
import React, { useState } from 'react'
import { pdf, PDFViewer } from '@react-pdf/renderer'
import axios from 'axios'
import styles from './styles'
import './App.css'
// import data from './data.json'

const { header, input, row } = styles

export const tableHeads = ['Name', 'Relationship to head', 'Age (optional)', 'Birth Date', 'SS# (last 4 digits)', 'Student']
export const members = ['Head', 'Co-H', '3.', '4.', '5.', '6.']


function App() {
  const [blob, setBlob] = useState(null)
  const [previewPdfAtA4, setPreviewPdfAtA4] = useState(true)

  const [data, setData] = useState({
    applicantName: '',
    address: '',
    dayTimePhone: '',
    eveningPhone: '',
    BRsInCurrentUnit: '',
    rentOrOwn: '',
    CMROMP: '',
    RMRIFP: '',
    paidUtility: [],
    monthlyCostOfUtilities: '',
    requestedBedroomSize: '',
    allThatApplies: [],
    AMOTHHAHV: '',
    householdComposition: [['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','',''],['','','','','','']]
  })
 
  async function handleSubmit(e) {
    e.preventDefault()
    console.log('working')

    try {
      const blob = await pdf(<Template data={data} />).toBlob()

      const formData = new FormData()
      formData.append('pdfBlob', blob)


      try {
        const res = await fetch('http://localhost:8000/', {
          method: 'POST',
          body: formData
        })

        console.log(res)
      } catch (err) {
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

    } catch (error) {
      console.log(error)
    }
  }


  const handleChange = (name, value, type) => {
    setData({ ...data, [name]: value })
  }

  function handleMultiCheckBox(name, id, value) {
    let _data = data
    let array = _data[name]

    if (value && !array.includes(id)) {
      array.push(id)
    }
    
    if (!value && array.includes(id)) {
      array.splice(array.indexOf(id),1)
    }

    _data[name] = array
    setData(_data)
  }

  function handleTableChange(x,y,v) {
    let _householdComposition = data.householdComposition
    _householdComposition[x][y] = v

    console.log(_householdComposition)

    setData({ ...data, householdComposition: _householdComposition })
  }

  return (
    <div className='app-layout'>
      <div>
        <div></div>
        <button onClick={() => setPreviewPdfAtA4(!previewPdfAtA4)}>{previewPdfAtA4 ? 'Show web at A4 size' : 'Show rendered pdf at A4 size'}</button>
      </div>
      <div>
        <div style={previewPdfAtA4 ? {flex: '1'} : {width: '925.51992px'}}>
          <p>Applications are placed in order of date and time received. An applicant may be interviewed only after the receipt of this tenant application.</p>
          <h1 style={header}>A.GENERAL INFORMATION</h1>

          <div style={row}>
            <label>Applicant Name&#40;s&#41;: </label>
            <input type='text' name='applicantName' style={input} onChange={e => handleChange(e.target.name, e.target.value)}/>
          </div>

          <div style={row}>
            <label>Address: </label>
            <input type='text' name='address' style={input} onChange={e => handleChange(e.target.name, e.target.value)}/>
          </div>

          <div style={row}>
            <div style={{ flex: '1', display: 'flex' }}>
              <label>Daytime Phone: </label>
              <input type='text' name='dayTimePhone' style={input} onChange={e => handleChange(e.target.name, e.target.value)}/>
            </div>
            <div style={{ flex: '1', display: 'flex' }}>
              <label>Evening Phone: </label>
              <input type='text' name='eveningPhone' style={input} onChange={e => handleChange(e.target.name, e.target.value)}/>
            </div>
          </div>

          <div style={row}>
            <div style={{ flex: '1', display: 'flex' }}>
              <label>No. of BR's in Current unit: </label>
              <input type='text' name="BRsInCurrentUnit" style={input} onChange={e => handleChange(e.target.name, e.target.value, e.target.type)}/>
            </div>
            <div style={{ flex: '1', display: 'flex' }}>
              <span>Do you </span>
              <div>
                <input type="checkbox" name="rentOrOwn" id='rent'  checked={data.rentOrOwn === 'rent'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label for='rent'>RENT</label>
              </div>
              <span> or </span>
              <div>
                <input type="checkbox" name="rentOrOwn" id='own' checked={data.rentOrOwn === 'own'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label for='own'>OWN</label>
              </div>
              <span>&#40;check one&#41;</span>
            </div>
          </div>

          <div style={row}>
            <label>Amount of current monthly rental or mortgage payment: $</label>
            <input type='text' name="CMROMP" style={input} onChange={e => handleChange(e.target.name, e.target.value)}/>
          </div>

          <div style={{ ...row, justifyContent: 'space-evenly' }}>
            <span>If owned, do you receive monthly rental income from property?</span>
            <div>
                <input type="checkbox" name="RMRIFP" id="RMRIFP-yes" checked={data.RMRIFP === 'RMRIFP-yes'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor="RMRIFP-yes">YES</label>
              </div>
              <div>
                <input type="checkbox" name="RMRIFP" id="RMRIFP-no" checked={data.RMRIFP === 'RMRIFP-no'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor="RMRIFP-no">NO</label>
              </div>
              <span>&#40;check one&#41;</span>
          </div>

          <div style={{ ...row, justifyContent: 'space-evenly' }}>
            <span>Check utilities paid by you:</span>
            <div>
                <input type="checkbox" name="paidUtility" id="heat" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
                <label htmlFor="heat">Heat</label>
              </div>
              <div>
                <input type="checkbox" name="paidUtility" id="electricity" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
                <label htmlFor="electricity">Electricity</label>
              </div>
              <div>
                <input type="checkbox" name="paidUtility" id="gas" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
                <label htmlFor="gas">Gas</label>
              </div>
              <div>
                <input type="checkbox" name="paidUtility" id="other" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
                <label htmlFor="other">Other</label>
              </div>
              <span>&#40;specify&#41;</span>
          </div>

          <div style={row}>
            <label>Approximate monthly cost of utilities paid by you (excluding phone and cable TV): $</label>
            <input type='text' name="monthlyCostOfUtilities" style={input}  onChange={e => handleChange(e.target.name, e.target.value)}/>
          </div>

          <div style={{ ...row, justifyContent: 'space-evenly' }}>
            <span>Bedroom size requested:</span>
            <div>
                <input type="checkbox" name="requestedBedroomSize" id="studio"  checked={data.requestedBedroomSize === 'studio'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor='studio'>Studio</label>
              </div>
              <div>
                <input type="checkbox" name="requestedBedroomSize" id="one-br"  checked={data.requestedBedroomSize === 'one-br'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor='one-br'>One BR</label>
              </div>
              <div>
                <input type="checkbox" name="requestedBedroomSize" id="two-br"  checked={data.requestedBedroomSize === 'two-br'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor='two-br'>Two BR</label>
              </div>
              <div>
                <input type="checkbox" name="requestedBedroomSize" id="three-br"  checked={data.requestedBedroomSize === 'three-br'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor='three-br'>Three BR</label>
              </div>
              <div>
                <input type="checkbox" name="requestedBedroomSize" id="handicap"  checked={data.requestedBedroomSize === 'handicap'} onChange={e => handleChange(e.target.name, e.target.id)}/>
                <label htmlFor='handicap'>Handicap BR</label>
              </div>
          </div>

          <div style={{ ...row, justifyContent: 'space-evenly' }}>
            <span>Check all that apply: </span>
            <div>
              <input type="checkbox" name="allThatApplies" id="veteran" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
              <label>Veteran</label>
            </div>
            <div>
              <input type="checkbox" name="allThatApplies" id="mobility-impaire" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
              <label>Mobility Impaire</label>
            </div>
            <div>
              <input type="checkbox" name="allThatApplies" id="hearing-impaired" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
              <label>Hearing Impaired</label>
            </div>
            <div>
              <input type="checkbox" name="allThatApplies" id="visually-impaired" onChange={e => handleMultiCheckBox(e.target.name, e.target.id, e.target.checked)}/>
              <label>Visually Impaired</label>
            </div>
          </div>
      
          <div style={{ ...row, justifyContent: 'space-evenly' }}>
            <span>Does any member of the household hold a housing voucher?</span>
            <div>
              <input type="checkbox" name="AMOTHHAHV" id="AMOTHHAHV-yes" checked={data.AMOTHHAHV === 'AMOTHHAHV-yes'} onChange={e => handleChange(e.target.name, e.target.id)}/>
              <label htmlFor='AMOTHHAHV-yes'>YES</label>
            </div>
            <div>
              <input type="checkbox" name="AMOTHHAHV" id="AMOTHHAHV-no" checked={data.AMOTHHAHV === 'AMOTHHAHV-no'} onChange={e => handleChange(e.target.name, e.target.id)}/>
              <label htmlFor='AMOTHHAHV-no'>NO</label>
            </div>
            <span>&#40;check one&#41;</span>
          </div>
          
          <h1>B. HOUSEHOLD COMPOSITION</h1>

          <table className='table'>
            <thead>
              <tr>
                <th></th>
                {tableHeads.map((th,k) => <th colSpan={k === 0 ? 2 : null} key={k}>{th}</th>)}
              </tr>
            </thead>
            <tbody>
              {data.householdComposition.map((tr,i) => (
                <tr key={i}>
                  <td>{members[i]}</td>
                  {tr.map((td,j) => (
                    <td colSpan={j === 0 ? 2 : null} key={j}>
                      <input onChange={e => handleTableChange(i, j, e.target.value)}/>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <div style={previewPdfAtA4 ? {width: '1000px'} : {flex: '1'}}>
          <PDFViewer showToolbar={false} style={{ width: '100%', height: '100%' }}>
            <Template data={data} />
          </PDFViewer>
        </div>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        {blob ? <a href={URL.createObjectURL(blob)} download='name.pdf'>Download</a> : null}
      </div>
    </div>
  )
}

export default App

// 925.51992, 1308.91442
