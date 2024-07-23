import { initFirebase } from '@/api/firebase';
import { UserProvider, useUserState } from '@/api/UserContext';
import { Stack } from 'expo-router';
// 루트의 레이아웃

const RootLayout = () => {
  const app = initFirebase();
  console.log(app);
  const [user] = useUserState();
  // 화면단위 페이지, 페이지 보여줄거는 여기다가 파일명 적어주기
  // tabs는 폴더 이름 뜻함
  //headerShown:false -> 헤더부분 사라짐
  // Stack과 Tab의 차이 알아두기
  // Stack은 하나씩 쌓아가는 구조
  // Main Stack -> (tabs)
  // Auth Stack -> index
  // 로그인이 정상적으로 되어야 uid가 생김
  return (
    <UserProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {user.uid ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="index" />
        )}
        <Stack.Screen name="SignUpScreen" />
        <Stack.Screen name="notfound" />
      </Stack>
    </UserProvider>
  );
};

export default RootLayout;
