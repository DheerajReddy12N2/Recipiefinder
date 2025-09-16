// src/screens/Auth/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, setCurrentUser } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // <-- Defensive selector: if state.auth is undefined, we fall back to empty array
  const users = useSelector((state: RootState) => state.auth?.users ?? []);

  const handleRegister = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // safe: users is always an array now
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
      Alert.alert('Error', 'Username already taken');
      return;
    }

    const newUser = { username, email, password };
    dispatch(addUser(newUser));
    dispatch(setCurrentUser(newUser));

    Alert.alert('Success', 'Registration successful!');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Username" placeholderTextColor={"black"} value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" placeholderTextColor={"black"} value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" placeholderTextColor={"black"}value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
      <Text style={styles.switchText} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  switchText: { color: 'blue', marginTop: 15, textAlign: 'center' },
});

export default RegisterScreen;
