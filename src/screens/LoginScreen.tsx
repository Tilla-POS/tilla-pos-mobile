import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useTheme} from '../hooks/useTheme';
import {ThemedView} from '../components/ui/ThemedView';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedInput} from '../components/ui/ThemedInput';
import {ThemedButton} from '../components/ui/ThemedButton';
import {LogIn} from 'lucide-react-native';
import { REGISTER_SCREEN } from './RegisterScreen';

export const LOGIN_SCREEN = 'Login'; // For navigation reference

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const {login, loginLoading} = useAuth();
  const {theme} = useTheme();

  const handleLogin = async () => {
    setErrors({});

    if (!email || !password) {
      setErrors({
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
      });
      return;
    }

    try {
      await login({email, password});
    } catch (error: any) {
      console.error('Login error:', error);
      setErrors({
        general: error.response?.data?.message || 'Invalid credentials',
      });
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: theme.primary.main + '20'},
            ]}>
            <LogIn color={theme.primary.main} size={48} />
          </View>

          <ThemedText variant="h2" style={styles.title}>
            Welcome Back
          </ThemedText>
          <ThemedText color="secondary" style={styles.subtitle}>
            Sign in to continue
          </ThemedText>
        </View>

        <View style={styles.form}>
          <ThemedInput
            label="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrors({...errors, email: undefined});
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loginLoading}
            error={errors.email}
          />

          <ThemedInput
            label="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors({...errors, password: undefined});
            }}
            secureTextEntry
            editable={!loginLoading}
            error={errors.password}
          />

          {errors.general && (
            <ThemedText
              variant="caption"
              style={[styles.error, {color: theme.error.main}]}>
              {errors.general}
            </ThemedText>
          )}

          <ThemedButton
            title="Login"
            onPress={handleLogin}
            loading={loginLoading}
            fullWidth
            style={styles.loginButton}
          />

          <ThemedButton
            title="Don't have an account? Register"
            variant="ghost"
            onPress={() => navigation.navigate(REGISTER_SCREEN)}
            disabled={loginLoading}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  form: {
    width: '100%',
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export default LoginScreen;
