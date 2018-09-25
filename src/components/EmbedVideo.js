import React from 'react'
import { View, Image, StyleSheet } from '@react-pdf/renderer'
import Alt from './Alt'
import Legend from './Legend'

const styles = StyleSheet.create({
  center: {
    textAlign: 'center'
  },
  thumbnail: {
    marginBottom: 5
  }
})

const AudioAlt = () => (
  <Alt style={styles.center}>Audio</Alt>
)

const VideoThumbnail = ({ src, legend, skip }) => {
  if (skip) {
    return (
      <Alt style={styles.center}>{legend}</Alt>
    )
  }

  return (
    <View>
      <Image style={styles.thumbnail} src={src} />
      <Legend>{legend}</Legend>
    </View>
  )
}

const EmbedVideo = ({ attributes, data, url }) => {
  if (data.forceAudio && data.src) {
    return (
      <AudioAlt />
    )
  }

  if (data.src) {
    return (
      <VideoThumbnail
        legend='Video'
        src={data.thumbnail}
        skip={data.skip}
      />
    )
  }

  return (
    <VideoThumbnail
      legend={data.title}
      src={data.thumbnail}
      skip={data.skip}
    />
  )
}

export default EmbedVideo
