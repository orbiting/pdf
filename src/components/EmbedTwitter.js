import React from 'react'
import { timeFormatLocale } from 'd3-time-format'
import timeDefinition from 'd3-time-format/locale/de-CH'
import { View, StyleSheet, Text, Image } from '@react-pdf/renderer'
import { fontFamilies } from '../lib/fonts'
import SafeImage from './SafeImage'

const LOGO_SRC = 'https://cdn.republik.space/s3/republik-assets/assets/pdf/twitter.png'
const LOGO_SIZE = 15

const AVATAR_SIZE = 30
const AVATAR_MARGIN = 8

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 25
  },
  border: {
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  header: {
    position: 'relative'
  },
  body: {
    paddingTop: 8
  },
  avatar: {
    height: AVATAR_SIZE,
    width: AVATAR_SIZE,
    marginRight: AVATAR_MARGIN
  },
  logo: {
    height: LOGO_SIZE,
    width: LOGO_SIZE,
    position: 'absolute',
    right: 10,
    top: 6
  },
  tweetInfo: {
    position: 'absolute',
    top: 0,
    left: AVATAR_SIZE + AVATAR_MARGIN,
    right: LOGO_SIZE * 2
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
    fontSize: 10,
    lineHeight: 1.3,
    fontFamily: fontFamilies.sansSerifRegular
  },
  image: {
    marginTop: 10
  }
})

const swissTime = timeFormatLocale(timeDefinition)
const format = swissTime.format('%d.%m.%Y')

const EmbedTwitter = ({ text, image, userName, userScreenName, userProfileImageUrl, createdAt }) => {
  const date = format(new Date(createdAt))

  return (
    <View style={styles.container} wrap={!!image}>
      <View style={styles.border}>
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
          <Text style={styles.text}>{text && text.replace(/&amp;/g, '&')}</Text>
          {image && <SafeImage style={styles.image} src={image} />}
        </View>
      </View>
    </View>
  )
}

export default EmbedTwitter
