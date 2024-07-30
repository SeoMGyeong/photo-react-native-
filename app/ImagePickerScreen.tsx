import HeaderRight from '@/components/HeaderRight';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

const ImagePickerScreen = () => {
  const navigation = useNavigation();
  const [status, requestPermission] = MediaLibrary.usePermissions();
  const width = useWindowDimensions().width / 3;
  const [photos, setPhotos] = useState([]); // 배열 형식으로 받을것임
  const [listInfo, setListInfo] = useState({
    endCursor: '',
    hasNextPage: true,
  });

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermission(); // 결과값 받음

      if (!granted) {
        // 승인하지않았다면
        Alert.alert('사진 접근 권한', '사진 접근 권한이 필요합니다.', [
          {
            text: '확인', // 버튼 이름
            onPress: () => {
              navigation.canGoBack() && navigation.goBack(); // canGoBack() 뒤로가기 가능? goBack() 뒤로가기
            },
          },
        ]);
      }
    })();
  }, [navigation, requestPermission]);

  useLayoutEffect(() => {
    navigation.setOptions({
      HeaderRight: () => <HeaderRight onPress={() => {}} />,
    });
  }, [navigation]);

  console.log(status);

  const getPhotos = async () => {
    const options = { first: 30, sortBy: [MediaLibrary.SortBy.creationTime] }; // 시간순 정렬

    if (listInfo.hasNextPage) {
      const { assets, endCursor, hasNextPage } =
        await MediaLibrary.getAssetsAsync(options);
      setPhotos((prev) => [...prev, ...assets]);
      setListInfo({ endCursor, hasNextPage });
    }

    const res = await MediaLibrary.getAssetsAsync(options);
    console.log(res.assets);
    console.log(res.endCursor, res.hasNextPage, res.totalCount);
  };

  useEffect(() => {
    if (status?.granted) {
      getPhotos();
    }
  }, [status?.granted]); // 권한있는지 확인 후 실행

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={photos}
        renderItem={({ item }) => (
          <Pressable style={{ width, height: width }}>
            <Image source={{ uri: item.uri }} style={styles.photo} />
          </Pressable>
        )} //renderItem 받은 자료 어떻게 보여줄것인가?
        numColumns={3} // 이 3은 useWindowDimensions().width / 3 과 관련이 있다~
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePickerScreen;
