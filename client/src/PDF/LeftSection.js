import { View, Text, Image } from '@react-pdf/renderer'
import styles from '../styles'

const LeftSection = ({ profile }) => {
  return (
    <View style={styles.section_left}>
      <View style={styles.profile_container}>
        <Text style={styles.profession_text}>{profile.profession}</Text>
        <View style={styles.profile_line} />
      </View>
    </View>
  )
}

export default LeftSection
