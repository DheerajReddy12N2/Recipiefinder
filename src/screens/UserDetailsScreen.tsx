import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';

const UserDetailsScreen = ({ navigation }: any) => {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace('Login');
  };

  if (!currentUser) {
    return <Text style={styles.noUser}>No user logged in</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        {/* User Logo Icon */}
        <View style={styles.userLogoContainer}>
          <Icon name="person-circle-outline" size={100} color="#007AFF" />
        </View>

        <Text style={styles.username}>{currentUser.username}</Text>
        <Text style={styles.email}>{currentUser.email}</Text>

        <View style={styles.detailsBox}>
          <Text style={styles.detailLabel}>Username:</Text>
          <Text style={styles.detailValue}>{currentUser.username}</Text>

          <Text style={styles.detailLabel}>Email:</Text>
          <Text style={styles.detailValue}>{currentUser.email}</Text>

          <Text style={styles.detailLabel}>Password:</Text>
          <Text style={styles.detailValue}>*******</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f6fc',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  userLogoContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  detailsBox: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 15,
    marginBottom: 25,
  },
  detailLabel: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  logoutButton: {
    width: '100%',
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noUser: {
    flex: 1,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#999',
  },
});
