import { GRAY, PRIMARY } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import PropTypes from 'prop-types';

type Props = {
  disabled: boolean;
  onPress: () => void;
};

const HeaderRight = ({ disabled, onPress }: Props) => {
  return (
    <Pressable hitSlop={10} disabled={disabled} onPress={onPress}>
      <MaterialCommunityIcons
        name="check"
        size={24}
        color={disabled ? GRAY.DEFAULT : PRIMARY.DEFUALT}
      />
    </Pressable>
  );
};

HeaderRight.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default HeaderRight;
