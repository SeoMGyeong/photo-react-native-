import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text>회원가입화면</Text>
      <Link href="/">로그인화면</Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default SignUpScreen;
