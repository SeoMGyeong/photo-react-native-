import {
  getAuth,
  signInWithEmailAndPassword,
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  signOut as signOutFirebase,
  updateProfile,
} from 'firebase/auth';

const PHOTO_URL = '.../o/profile.png?alt=media';
// firebase 이미지 storage에 있는 이미지 클릭하면 나오는 링크 부분만
// ...은 전개표현식. 프로젝트 안에 있는...

// 에러메세지 출력
export const getAuthErrorMessages = (errorCode: string): string => {
  switch (errorCode) {
    case AuthErrorCodes.USER_DELETED:
      return '계정을 찾을 수 없습니다.';
    case AuthErrorCodes.INVALID_EMAIL:
      return '유효하지 않은 이메일 주소입니다.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return '잘못된 비밀번호입니다.';
    case AuthErrorCodes.EMAIL_EXISTS:
      return '이미 가입된 이메일입니다.';
    case AuthErrorCodes.WEAK_PASSWORD:
      return '비밀번호는 영문자포함 최소 6자리 입니다.';
    default:
      return '로그인에 실패했습니다.';
  }
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { user } = await signInWithEmailAndPassword(getAuth(), email, password);
  return user;
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { user } = await createUserWithEmailAndPassword(
    getAuth(),
    email,
    password
  );

  await updateUserInfo({
    displayName: email.split('@')[0].slice(0, 10), // @을 기준으로 이메일을 분해하는데 왼쪽부분의 id를 가져올것이며[0](앞쪽부분) 첫번째위치에서부터 10자리까지 가져올거임
    photoURL: PHOTO_URL, //
  });
  return user;
};

// 비동기함수 async await
export const signOut = async () => {
  return await signOutFirebase(getAuth()); // 얘가 실제 함수
};

export const updateUserInfo = async (userInfo: object) => {
  try {
    await updateProfile(getAuth(), currentUser, userInfo); // currentUser:현재 사용자 정보, userInfo : 새롭게 입력한것
  } catch (e) {
    throw new Error('사용자 정보 수정에 실패했습니다.');
  }
};
