import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { Appbar, Headline } from 'react-native-paper';
import { AppLoading } from 'expo';
import newsApi from './api/newsApi';
import NewsItem from './components/Newsitem';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [newsItems, setNewsItems] = useState([]);
  const [page, setPage] = useState(1);

  const getItems = async () => {
    try {
      const response = await newsApi.get('/', {
        params: {
          page,
        },
      });
      setNewsItems(response.data.hits);
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item }) => {
    if (item.title) {
      return <NewsItem item={item} />;
    } else {
      return null;
    }
  };

  const handleRightClick = () => {
    console.log(page);
    setPage((prevPage) => prevPage + 1);
    setLoading(true);
  };

  const handleLeftClick = () => {
    console.log(page);
    setPage((prevPage) => prevPage - 1);
    setLoading(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Appbar style={{ paddingTop: 10, justifyContent: 'space-between' }}>
        {page <= 1 ? (
          <AntDesign name="leftcircleo" size={24} color="white" />
        ) : (
          <AntDesign name="caretleft" size={24} color="white" onPress={handleLeftClick} />
        )}
        <Headline style={{ color: '#fff', fontWeight: 'bold' }}>NewsHacker</Headline>
        <AntDesign name="caretright" size={24} color="white" onPress={handleRightClick} />
      </Appbar>
      {loading === true ? (
        <AppLoading startAsync={getItems} onFinish={() => setLoading(false)} />
      ) : (
        <FlatList data={newsItems} renderItem={renderItem} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
