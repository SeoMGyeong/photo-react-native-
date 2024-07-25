import { useNavigation } from '@react-navigation/native';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WHITE } from '@/constants/Colors';
// tab의 인덱스
// 파일명이랑 똑같이 안줘도 됨. 하지만 똑같이 안주면 헷갈리겠지...
// p.671
const HomeScreen = () => {
  const navigation = useNavigation(); //react-native걸로 import
  const { top } = useSafeAreaInsets();
  const height = useWindowDimensions().height / 4; //화면 전체 높이값 / 4, width는 가로폭

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      {/*타이틀 */}
      <View style={styles.topContainer}>
        <Image
          source={require('../../assets/images/icon.png')}
          style={styles.icon}
        />
        <Text style={styles.title}>PlacePhotos</Text>
      </View>

      {/*타임라인 */}
      <View style={styles.buttonContainer}>
        {/*Pressable대신 Link를 사용할수도 있다는것~ */}
        <Pressable onPress={() => navigation.navigate('ListScreen')}>
          <Image
            source={require('../../assets/images/home-clock.png')}
            style={[styles.image, { height }]}
          />
          <Text style={styles.buttonTitle}>타임라인</Text>
        </Pressable>
      </View>

      {/*지도 */}
      <View style={styles.buttonContainer}>
        {/*Pressable대신 Link를 사용할수도 있다는것~ */}
        <Pressable onPress={() => navigation.navigate('MapScreen')}>
          <Image
            source={require('../../assets/images/home-map.png')}
            style={[styles.image, { height }]}
          />
          <Text style={styles.buttonTitle}>지도</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: WHITE,
    paddingHorizontal: 20, //가로 양쪽 여백
  },
  topContainer: {
    flexDirection: 'row', // 가로정렬
    alignItems: 'center', // 수직가운데정렬
    justifyContent: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginLeft: 10,
  },
  buttonContainer: {
    marginVertical: 20, // 아래위영역
  },
  image: {
    width: '100%', // 가로 꽉차게
    borderRadius: 30,
  },
  buttonTitle: {
    position: 'absolute', // 글자 화면 위로 올리기 (겹쳐짐), 위치 지정해줘야됨
    left: 30,
    bottom: 30,
    color: WHITE,
    fontSize: 40,
    fontWeight: '700',
  },
});

export default HomeScreen;
