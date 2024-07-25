import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

// {}에 style넣었었는데 삭제함. 근데 언제 바꾸신것? 그리고 있고 없고가 무슨 차이인지??
const FastImage = ({ source, ...props }: { source: { uri: string } }) => {
  const [uri, setUri] = useState(source.uri); // 그림 바꿀때 update
  const srcuri = uri.split('/').pop();
  // uri주소를 '/' 기준으로 잘라낼거임 -> 배열값으로 출력됨
  // 핸드폰 콘솔로 파일시스템 주소(fileSystemUri)를 확인했을때 hashed 내용이 맨 뒤에 나옴
  // 마지막 요소 가져올때 .pop 쓰면 됨

  console.log(uri.split('/'));

  useEffect(() => {
    (async () => {
      try {
        const hashed = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256, // 알고리즘 형식 , 기종에 따라 지원하는 형식이 다름, SHA256이 그나마 많은 형식 지원함 , 똑같은 값이 나오지 않도록 방지. 이 값을 통해 주소값을 만듦
          source.uri
        );
        const fileSystemUri = `${FileSystem.documentDirectory}${srcuri}`; // 폴더명 , uri주소값(이미지 이름?) , documentDirectory 물리적위치, cacheDirectory는 메모리 위치
        // {hashed} 대신에 {srcuri} 씀
        const metaData = await FileSystem.getInfoAsync(fileSystemUri);
        if (!metaData.exists) {
          // 만약 데이터가 없다면 해당 주소에 이미지를 다운로드해서 저장
          await FileSystem.downloadAsync(source.uri, fileSystemUri);
        }
        console.log(
          'hashed 값은 : ',
          hashed,
          '파일 시스템주소는 : ',
          fileSystemUri,
          '메타 데이터 내용은 : ',
          metaData
        );
        setUri(fileSystemUri);
      } catch (e) {
        console.log('소스 주소는 : ', source.uri);
        setUri(source.uri);
      }
    })();
  }, [source.uri]);

  return <Image source={{ uri }} {...props} />;
};

FastImage.propTypes = {
  source: PropTypes.object.isRequired,
};

export default FastImage;
