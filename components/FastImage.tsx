import { useEffect, useState } from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';

const FastImage = ({
  source,
  style,
  ...props
}: {
  source: { uri: string };
  style?: object;
}) => {
  const [uri, setUri] = useState(source.uri);

  useEffect(() => {
    (async () => {
      try {
        const hashed = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256, // 알고리즘 형식 , 기종에 따라 지원하는 형식이 다름, SHA256이 그나마 많은 형식 지원함
          source.uri
        );
        const fileSystemUri = `${FileSystem.cacheDirectory}${hashed}`; // 폴더명 , uri주소값(이미지 이름?)

        const metaData = await FileSystem.getInfoAsync(fileSystemUri);

        console.log(metaData);
        console.log(source.uri);
        console.log(fileSystemUri);

        if (!metaData.exists) {
          // 만약 데이터가 없다면 해당 주소에 이미지를 다운로드해서 저장
          await FileSystem.downloadAsync(source.uri, fileSystemUri);
        }
        setUri(fileSystemUri);
      } catch (e) {
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
