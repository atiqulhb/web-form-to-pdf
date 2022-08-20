import React from 'react'
import { usePDF, Document, Page, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer'
import LeftSection from './LeftSection'
import { RightSection } from './RightSection'
import styles from '../styles'


const Template = ({ profile }) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <LeftSection profile={profile} />
        <RightSection about={profile.about} />
      </Page>
    </Document>
  )
}

export default Template
