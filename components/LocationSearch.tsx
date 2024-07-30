import { GRAY, PRIMARY } from '@/constants/Colors';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MAP_KEY } from '@/env';
import { forwardRef } from 'react';
import isLoading from 'expo-router';

type Props = {
  styles: { container?: object; icon?: object }; // 그냥 obejct만 적으면 styles?.contaienr에 형식이 없다고 뜸, container가 적힐수도 있고 안적힐수도 있기 때문에 ? 입력. 필수 아니면 다 ? 적으면 됨
  onPress: () => void;
  isLoading?: boolean;
  isSelected?: boolean;
  iconVisible: boolean;
};

const LocationSearch = forwardRef(
  ({ styles, onPress, isLoading, isSelected, iconVisible }: Props, ref) => {
    return (
      <View style={[defaultStyles.container, styles?.container]}>
        <GooglePlacesAutocomplete
          ref={ref}
          fetchDetails={true}
          styles={{
            container: { flex: 0 },
            textInput: { paddingLeft: iconVisible ? 30 : 10 },
          }} //flex 0이란 자기 내용만 감싸는것
          placeholder="위치검색"
          onPress={onPress}
          onFail={(e) => console.log('자동완성실패 :', e)}
          query={{ key: MAP_KEY, language: 'ko' }}
          debounce={400} // 검색 주기
          enablePoweredByContainer={false}
          textInputProps={{ editable: !isLoading }}
        />
        {iconVisible && (
          <View style={[defaultStyles.icon, styles?.icon]}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={isSelected ? PRIMARY.DEFAULT : GRAY.LIGHT}
            />
          </View>
        )}
      </View>
    );
  }
);

LocationSearch.propTypes = {
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isSelected: PropTypes.bool,
  iconVisible: PropTypes.bool,
};

//defaultStyles는... 외부로 나가는 스타일? 뭐라고 하셨는지 제대로 못들음
const defaultStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomWidth: 0.5, // 선 굵기
    borderBottomColor: GRAY.LIGHT,
  },
  icon: {
    position: 'absolute',
    left: 20, //쌤 25
    top: 15, // 쌤 13
  },
});

export default LocationSearch;
