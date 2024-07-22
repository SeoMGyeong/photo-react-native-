import Button from '@/components/Button';
import Input, { InputTypes, ReturnKeyTypes } from '@/components/Input';
import SafeInputView from '@/components/SafeInputView';
import { Link } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeInputView>
      <View style={styles.container}>
        <Text>Sign In</Text>
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputType={InputTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          styles={inputStyles}
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputType={InputTypes.PASSWORD}
          returnKeyType={ReturnKeyTypes.DONE}
          styles={inputStyles}
        />

        <Button
          title="Sign In"
          onPress={() => {}}
          styles={{ button: { borderRadius: 8 } }}
        />

        <Link
          href="SignUpScreen"
          style={{ paddingHorizontal: 20, marginTop: 20 }}
        >
          회원가입
        </Link>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default SignInScreen;
