import React from 'react'
import { StyleSheet, Document, Page, View, Text, Svg, Path, Rect, Polygon } from '@react-pdf/renderer'
import styles from '../styles'
import Checkbox from './Checkbox'

const { page, topTable, header, row, input } = StyleSheet.create(styles)

export const tableHeads = ['Name', 'Relationship to head', 'Age (optional)', 'Birth Date', 'SS# (last 4 digits)', 'Student']
export const members = ['Head', 'Co-H', '3.', '4.', '5.', '6.']

export default function Template({ data }) {

  const { paidUtility } = data
  console.log(paidUtility.includes('heat'))
  
  return (
    <Document>
      <Page size='A4' style={page}>
        <View>
          <View style={topTable}>
            <View>
              <Text>Property Name: The Arbor at Locust Manor</Text>
            </View>
          </View>
          <Text style={header}>A. GENERAL INFORMATION</Text>
          <View style={row}>
            <Text style={{paddingRight: '5px'}}>Applicant Name&#40;s&#41;: </Text>
            <Text style={input}>{data.applicantName}</Text>
          </View>
          <View style={row}>
            <Text style={{paddingRight: '5px'}}>Address: </Text>
            <Text style={input}>{data.address}</Text>
          </View>
          <View style={row}>
            <View style={[row, { flex: '1', margin: '0'}]}>
              <Text style={{paddingRight: '5px'}}>Daytime Phone: </Text>
              <Text style={input}>{data.dayTimePhone}</Text>
            </View>
            <View style={[row, { flex: '1', margin: '0'}]}>
              <Text style={{paddingRight: '5px'}}>Evening Phone: </Text>
              <Text style={input}>{data.eveningPhone}</Text>
            </View>
          </View>

          <View style={row}>
            <View style={[row, {flex: '1', margin: '0' }]}>
              <Text style={{paddingRight: '5px', width: '80px'}}>No. of BR's in Current unit: </Text>
              <Text style={input}>{data.BRsInCurrentUnit}</Text>
            </View>
            <View style={[row,{ flex: '1', margin: '0'}]}>
              <Text style={{paddingRight: '5px'}}>Do you </Text>
              <View style={[row, {flex: '1', margin: '0', justifyContent: 'space-around' }]}>
                <Checkbox label='RENT' checked={data.rentOrOwn === 'rent'}/>
                <Checkbox label='OWN' checked={data.rentOrOwn === 'own'}/>
                <Text>&#40;check one&#41;</Text>
              </View>
            </View>
          </View>

          <View style={row}>
            <Text>Amount of current monthly rental or mortgage payment: $</Text>
            <Text style={input}>{data.CMROMP}</Text>
          </View>

          <View style={row}>
            <Text style={{paddingRight: '5px'}}>If owned, do you receive monthly rental income from property?</Text>
            <View style={[row, {flex: '1', margin: '0', justifyContent: 'space-around' }]}>
              <Checkbox label='YES' checked={data.RMRIFP === 'RMRIFP-yes'}/>
              <Checkbox label='NO' checked={data.RMRIFP === 'RMRIFP-no'}/>
              <Text>&#40;check one&#41;</Text>
            </View>
          </View>
          
          <View style={row}>
            <Text style={{paddingRight: '5px'}}>Check utilities paid by you: </Text>
            <View style={[row, {flex: '1', margin: '0', justifyContent: 'space-around' }]}>
              <Checkbox label='Heat' checked={data.paidUtility.includes('heat')}/>
              <Checkbox label='Electricity' checked={data.paidUtility.includes('electricity')}/>
              <Checkbox label='Gas' checked={data.paidUtility.includes('gas')}/>
              <Checkbox label='Other' checked={data.paidUtility.includes('other')}/>
              <Text>&#40;specify&#41;</Text>
            </View>
          </View>

          <View style={row}>
            <Text>Approximate monthly cost of utilities paid by you (excluding phone and cable TV): $</Text>
            <Text style={input}>{data.monthlyCostOfUtilities}</Text>
          </View>

          <View style={row}>
            <Text style={{paddingRight: '5px'}}>Bedroom size requested: </Text>
            <View style={[row, {flex: '1', margin: '0', justifyContent: 'space-around' }]}>
              <Checkbox label='Studeo' checked={data.requestedBedroomSize === 'studio'}/>
              <Checkbox label='One BR' checked={data.requestedBedroomSize === 'one-br'}/>
              <Checkbox label='Two BR' checked={data.requestedBedroomSize === 'two-br'}/>
              <Checkbox label='Three BR' checked={data.requestedBedroomSize === 'three-br'}/>
              <Checkbox label='Handicap BR' checked={data.requestedBedroomSize === 'handicap'}/>
            </View>
          </View>

          <View style={row}>
            <Text style={{paddingRight: '5px'}}>Check all that apply: </Text>
            <View style={[row, {flex: '1', margin: '0', justifyContent: 'space-around' }]}>
              <Checkbox label='Veteran' checked={data.allThatApplies.includes('veteran')}/>
              <Checkbox label='Mobility Impaire' checked={data.allThatApplies.includes('mobility-impaire')}/>
              <Checkbox label='Hearing Impaired' checked={data.allThatApplies.includes('hearing-impaired')}/>
              <Checkbox label='Visually Impaired' checked={data.allThatApplies.includes('visually-impaired')}/>
            </View>
          </View>

          <View style={row}>
            <Text style={{paddingRight: '5px'}}>Does any member of the household hold a housing voucher?</Text>
            <View style={[row, {flex: '1', margin: '0', justifyContent: 'space-around' }]}>
              <Checkbox label='YES' checked={data.AMOTHHAHV === 'AMOTHHAHV-yes'}/>
              <Checkbox label='NO' checked={data.AMOTHHAHV === 'AMOTHHAHV-no'}/>
              <Text>&#40;check one&#41;</Text>
            </View>
          </View>

          <Text style={header}>B. HOUSEHOLD COMPOSITION</Text>
          <View style={{ borderTop: '1px solid black', borderLeft: '1px solid black' }}>
            <View style={[row, { margin: '0', justifyContent: 'space-evenly', borderBottom: '1px solid black'} ]}>
              <Text style={{ flex: '1', borderRight: '1px solid black', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}></Text>
              {tableHeads.map((th,k) => <Text style={{ flex: '1', borderRight: '1px solid black', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}} key={k}>{th}</Text>)}
            </View>
            {data.householdComposition.map((tr,i) => (
              <View style={[row, { margin: '0', justifyContent: 'space-evenly', borderBottom: '1px solid black',}]}>
                <Text style={{ flex: '1', borderRight: '1px solid black', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>{members[i]}</Text>
                {tr.map((td,j) => <Text style={{ flex: '1', borderRight: '1px solid black', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center'}} key={j}>{td}</Text>)}
              </View>
            ))}
          </View>

        </View>
      </Page>
    </Document>
  )
}