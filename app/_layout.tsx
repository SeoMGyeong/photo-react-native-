import { Stack } from 'expo-router';
// 루트의 레이아웃

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="SignInScreen" />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="ImagePickerScreen" /> {/*  name은 파일명이 된다 */}
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="notfound" />
      <Stack.Screen name="updateProfileScreen" />
    </Stack>
  );
};

// 화면단위 페이지, 페이지 보여줄거는 여기다가 파일명 적어주기
// tabs는 폴더 이름 뜻함
//headerShown:false -> 헤더부분 사라짐
// Stack과 Tab의 차이 알아두기
// Stack은 하나씩 쌓아가는 구조
// Main Stack -> (tabs)
// Auth Stack -> index
// 로그인이 정상적으로 되어야 uid가 생김
export default RootLayout;
