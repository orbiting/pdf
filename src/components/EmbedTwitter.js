import React from 'react'
import format from 'date-fns/format'
import deLocale from 'date-fns/locale/de'
import { View, StyleSheet, Text, Image } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'

// Temp URL
const logoUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC876PQpIQ0cswsYIJ6U9UN4TOjDuJ4D58vOl2uSG25XRWSlqT'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: 'black',
    borderBottomColor: 'black'
  },
  header: {
    position: 'relative',
    flexDirection: 'row'
  },
  body: {
    paddingTop: 15
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 8
  },
  logo: {
    height: 15,
    width: 15,
    position: 'absolute',
    right: 10,
    top: 6
  },
  tweetInfo: {
    justifyContent: 'space-around'
  },
  userName: {
    fontSize: 14,
    fontFamily: fontFamilies.sansSerifMedium
  },
  userHandle: {
    fontSize: 10,
    fontFamily: fontFamilies.sansSerifRegular
  },
  text: {
    fontSize: 12,
    lineHeight: 1.4,
    fontFamily: fontFamilies.sansSerifRegular
  },
  image: {
    marginTop: 10
  }
})

const EmbedTwitter = ({ text, image, userName, userScreenName, userProfileImageUrl, createdAt }) => {
  const date = format(createdAt, 'MMMM YYYY', { locale: deLocale })

  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.header}>
        <Image style={styles.avatar} src={userProfileImageUrl} />
        <View style={styles.tweetInfo}>
          <Text style={styles.userName}>
            {userName}
          </Text>
          <Text style={styles.userHandle}>
            {`@${userScreenName}, ${date}`}
          </Text>
        </View>
        <Image style={styles.logo} src={logoUrl} />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
        {image && <Image style={styles.image} src={image} />}
      </View>
    </View>
  )
}

export default EmbedTwitter
