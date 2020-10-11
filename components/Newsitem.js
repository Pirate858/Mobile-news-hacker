import React from 'react';
import * as timeago from 'timeago.js';
import { StyleSheet, Text, View } from 'react-native';
import { Caption, Subheading } from 'react-native-paper';

const Newsitem = ({ item }) => {
  const getHostnameFromRegex = (url) => {
    const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
    return matches && matches[1];
  };

  const timeSince = (time) => timeago.format(time);

  return (
    <View style={styles.item}>
      <View style={{ flexDirection: 'row' }}>
        <Subheading style={{ flex: 1 }}>{item.title}</Subheading>
        {item.url && <Caption>{getHostnameFromRegex(item.url)}</Caption>}
      </View>
      <Caption>
        {item.points} points by {item.author} {timeSince(item.created_at)}| {item.num_comments} comments
      </Caption>
    </View>
  );
};

export default Newsitem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    elevation: 2,
    backgroundColor: '#fff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
