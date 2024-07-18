import { Image, Text, View } from 'react-native';
// tab의 인덱스
// 파일명이랑 똑같이 안줘도 됨. 하지만 똑같이 안주면 헷갈리겠지...
const HomeScreen = () => {
  return (
    <View>
      <Text>홈화면</Text>
      <Image
        source={require('../../assets/images/react-logo.png')}
        style={{ width: 200, height: 200 }}
      />
      <Image
        source={{
          uri: 'https://cdn.pixabay.com/photo/2024/05/31/09/37/living-room-8800183_1280.jpg',
        }}
        style={{ width: 200, height: 200 }}
      />
    </View>
  );
};

export default HomeScreen;
