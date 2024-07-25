import { signOut } from '@/api/auth';
import DangerAlert, { AlertTypes } from '@/components/DangerAlert';
import FastImage from '@/components/FastImage';
import { GRAY, WHITE } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  //  const [user, setUser] = useUserState();
  const [visible, setVisible] = useState(false); // 기본값 : 안보여지게
  const { top } = useSafeAreaInsets();
  const user = {
    email: 'me@email.com',
    password: 'a12345',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/photo-d49d0.appspot.com/o/profile.png?alt=media',
    displayName: 'test',
  };

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <DangerAlert
        visible={visible}
        onClose={() => setVisible(false)}
        alertType={AlertTypes.LOGOUT}
        onConfirm={async () => {
          await signOut();
          //  setUser({});
        }}
      />

      {/* 나가기버튼 */}
      <View style={styles.settingButton}>
        <Pressable onPress={() => setVisible(true)} hitSlop={10}>
          <MaterialCommunityIcons
            name="logout-variant"
            size={24}
            color={GRAY.DARK}
          />
        </Pressable>
      </View>

      {/* 프로파일 */}
      <View style={styles.profile}>
        <View style={[styles.photo]}>
          <FastImage source={{ uri: user.photoURL }} style={styles.photo} />
          <Pressable style={styles.editButton}>
            <MaterialCommunityIcons name="pencil" size={20} color={WHITE} />
          </Pressable>
        </View>
        <Text style={styles.nickname}>{user.displayName || 'nickname'}</Text>
      </View>
      {/* 내가올린사진목록 */}
      <View style={styles.listContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  settingButton: {
    paddingHorizontal: 20,
    alignItems: 'flex-end', // 오른쪽에 붙음 (paddingHorizontal 20줘서 20만큼은 떨어져있음) , 진행방향 수직정렬 (View들이 여러개 모여서 그런가. 아니면 이미지인가.)
  },
  profile: {
    // 가로가운데 둘거임
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5, // 테두리 굵기
    borderBottomColor: GRAY.DEFAULT,
    paddingBottom: 20, // 하단 여백
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute', // absolute 무조건 위치 지정
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GRAY.DARK,
  },
  nickname: {
    marginTop: 10, // 위쪽 그림과의 간격 띄우기
    fontSize: 24,
    fontWeight: '700',
  },
  listContainer: {
    flex: 1, // 전체 영역 채우면서 이미지가 위로 올라감
  },
});

export default ProfileScreen;
