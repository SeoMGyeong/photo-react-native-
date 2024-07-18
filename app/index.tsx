//홈화면, _layout.tsx 파일에 있는 페이지 명들 index에서 보여주고 싶으면 Link 태그 통해서 보여주기(link거는 용도인듯) 참고로 Link 컴퍼넌트는 expo-router로 해주기
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const Index = () => {
  return (
    // link href는 _layout.tsx의 stack.screen name 적어주면 됨
    <View style={styles.container}>
      <Text>로그인화면</Text>
      <Link href="SignUpScreen">회원가입</Link>
      <Link href="(tabs)">탭화면</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // 상위 3개 가운데정렬
  },
});

export default Index;
