import { Pressable, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY, WHITE } from '@/constants/Colors';

interface Props {
  title: string;
  styles?: object;
  onPress: () => void; //함수형식
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({ title, styles, onPress, disabled, isLoading }: Props) => {
  return (
    <View style={[defaultStyles.container, styles?.container]}>
      <Pressable
        onPress={() => onPress()}
        disabled={disabled || isLoading}
        style={({ pressed }) => [
          defaultStyles.button,
          styles?.button,
          {
            backgroundColor: (() => {
              switch (true) {
                case disabled || isLoading:
                  return PRIMARY.LIGHT;
                case pressed:
                  return PRIMARY.DARK;
                default:
                  return PRIMARY.DEFUALT;
              }
            })(),
          },
        ]}
      >
        <Text style={[defaultStyles.title, styles?.title]}>{title}</Text>
      </Pressable>
    </View>
  );
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  styles: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const defaultStyles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20, //글씨가 살짝 위로
  },
});

export default Button;
