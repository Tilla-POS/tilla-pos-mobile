import React from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as z from 'zod';
import {useAuth} from '../hooks/useAuth';
import {useTheme} from '../hooks/useTheme';
import {ThemedView} from '../components/ui/ThemedView';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedButton} from '../components/ui/ThemedButton';
import {ControlledThemedInput} from '../components/form/ControlledThemedInput';
import {LogIn} from 'lucide-react-native';
import {REGISTER_SCREEN} from './RegisterScreen';
import {OTP_SCREEN} from './OTPScreen';

export const LOGIN_SCREEN = 'Login';

// Validation schema
const loginSchema = z.object({
  email: z.email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = ({navigation}: any) => {
  const {login, loginLoading} = useAuth();
  const {theme} = useTheme();
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const {control, handleSubmit} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setGeneralError(null);

    try {
      const res = await login(data);
      if (res.data && 'needsOtp' in res.data && res.data.needsOtp) {
        navigation.navigate(OTP_SCREEN, {email: data.email});
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setGeneralError(error.response?.data?.message || 'Invalid credentials');
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
          <ControlledThemedInput
            control={control}
            name="email"
            label="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!loginLoading}
          />

          <ControlledThemedInput
            control={control}
            name="password"
            label="Password"
            secureTextEntry
            editable={!loginLoading}
          />

          {generalError && (
            <ThemedText
              variant="caption"
              style={[styles.error, {color: theme.error.main}]}>
              {generalError}
            </ThemedText>
          )}

          <ThemedButton
            title="Login"
            onPress={handleSubmit(onSubmit)}
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
