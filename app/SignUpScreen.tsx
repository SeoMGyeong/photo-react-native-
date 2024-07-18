// 회원가입 화면
// Link href="/"라고 하면 첫화면으로 돌아감
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const SignUpScreen = () => {
  return (
    <View>
      <Text>회원가입 화면</Text>
      <Link href="/">홈화면</Link>
    </View>
  );
};

export default SignUpScreen;
