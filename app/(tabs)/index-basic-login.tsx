import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { StatusBar } from 'expo-status-bar';
import { TextInput, TouchableOpacity } from 'react-native';
import { Client, Account, ID, Models } from 'react-native-appwrite';
import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import { GoogleAuth } from '../lib/context/auth';

let client: Client;
let account: Account;

client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67193f63002da27b2ff0")
  .setPlatform('com.example.my-app');

  account = new Account(client);

export default function HomeScreen() {
  const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

    useEffect(() => {
        // Initialize Google Sign In
        GoogleAuth.init();
        
        // Check for existing session
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const currentUser = await GoogleAuth.getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error('Check User Error:', error);
        } finally {
            setLoading(false);
        }
    };

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    setLoggedInUser(await account.get());
  }

  async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    await login(email, password);
    setLoggedInUser(await account.get());
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await getUser()
        setUser(userData)
      } catch (error) {
        setUser(null)
      }
    }

    checkUser()
  }, [])

  const [user, setUser] = useState('');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <View style={styles.root}>
          <Text>
          {loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}
          </Text>
          <View>
          <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
          />
          <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
          />
          <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={(text) => setName(text)}
          />

          <TouchableOpacity
              style={styles.button}
              onPress={() => login(email, password)}
          >
              <Text>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={()=> register(email, password, name)}
          >
              <Text>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
              style={styles.button}
              onPress={async () => {
              await account.deleteSession('current');
              setLoggedInUser(null);
              }}
          >
              <Text>Logout</Text>
          </TouchableOpacity>
          </View>
      </View>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    marginTop: 40, 
    marginBottom: 40
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'gray',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
});

