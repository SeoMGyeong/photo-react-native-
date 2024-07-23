import { useUserState } from '@/api/UserContext';
import Button from '@/components/Button';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
  const [, setUser] = useUserState();

  return (
    <View style={styles.container}>
      <Text>마이페이지화면</Text>
      <Button title="로그아웃" onPress={() => setUser({})} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'cetner',
  },
});

export default ProfileScreen;
