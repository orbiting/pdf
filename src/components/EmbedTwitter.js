import React from 'react'
import { timeFormatLocale } from 'd3-time-format'
import timeDefinition from 'd3-time-format/locale/de-CH'
import { View, StyleSheet, Text, Image } from '@react-pdf/core'
import { fontFamilies } from '../lib/fonts'
import SafeImage from './SafeImage'

const LOGO_SRC = 'https://cdn.republik.space/s3/republik-assets/assets/pdf/twitter.png'

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

const swissTime = timeFormatLocale(timeDefinition)
const format = swissTime.format('%B %Y')

const EmbedTwitter = ({ text, image, userName, userScreenName, userProfileImageUrl, createdAt }) => {
  const date = format(new Date(createdAt))

  return (
    <View style={styles.container} wrap={false}>
      <View style={styles.header}>
        <SafeImage style={styles.avatar} src={userProfileImageUrl} />
        <View style={styles.tweetInfo}>
          <Text style={styles.userName}>
            {userName}
          </Text>
          <Text style={styles.userHandle}>
            {`@${userScreenName}, ${date}`}
          </Text>
        </View>
        <Image style={styles.logo} src={LOGO_SRC} />
      </View>
      <View style={styles.body}>
        <Text style={styles.text}>{text}</Text>
        {image && <SafeImage style={styles.image} src={image} />}
      </View>
    </View>
  )
}

export default EmbedTwitter
