import LocationSearch from '@/components/LocationSearch';
import { DANGER } from '@/constants/Colors';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MapScreen = () => {
  const { top } = useSafeAreaInsets();
  const [location, setLocation] = useState({
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location.latitude && location.longitude ? location : null}
      >
        {location.latitude && location.longitude && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.name}
          />
        )}
      </MapView>
      <LocationSearch
        styles={{
          container: { ...styles.location, paddingTop: top },
          icon: { padding: top },
        }}
        iconVisible={false} // 쌤 true로 바꿈
        onPress={(data, detail) => {
          const {
            geometry: {
              location: { lat, lng },
            },
          } = detail;
          setLocation((prev) => ({
            ...prev,
            name: data.description,
            latitude: lat,
            longitude: lng,
          }));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  location: {
    position: 'absolute',
    width: '90%',
    top: 0, // 이거 없으면 검색창 가운데에 뜸
    borderBottomWidth: 0,
  },
});

export default MapScreen;
