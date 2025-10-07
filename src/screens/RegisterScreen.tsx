import React, {useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import {useTheme} from '../hooks/useTheme';
import {ThemedView} from '../components/ui/ThemedView';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedInput} from '../components/ui/ThemedInput';
import {ThemedButton} from '../components/ui/ThemedButton';
import {UserPlus} from 'lucide-react-native';

const RegisterScreen = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<any>({});
  const {register, registerLoading} = useAuth();
  const {theme} = useTheme();

  const handleRegister = async () => {
    setErrors({});

    if (!name || !email || !password || !confirmPassword) {
      setErrors({
        name: !name ? 'Name is required' : undefined,
        email: !email ? 'Email is required' : undefined,
        password: !password ? 'Password is required' : undefined,
        confirmPassword: !confirmPassword
          ? 'Confirm password is required'
          : undefined,
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({confirmPassword: 'Passwords do not match'});
      return;
    }

    if (password.length < 6) {
      setErrors({password: 'Password must be at least 6 characters'});
      return;
    }

    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      setErrors({phone: 'Invalid phone number format'});
      return;
    }

    try {
      await register({name, email, password, phone});
    } catch (error: any) {
      setErrors({
        general:
          error.response?.data?.message ||
          'Registration failed. Please try again.',
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
            <UserPlus color={theme.primary.main} size={48} />
          </View>

          <ThemedText variant="h2" style={styles.title}>
            Create Account
          </ThemedText>
          <ThemedText color="secondary" style={styles.subtitle}>
            Sign up to get started
          </ThemedText>
        </View>

        <View style={styles.form}>
          <ThemedInput
            placeholder="Full Name"
            value={name}
            onChangeText={text => {
              setName(text);
              setErrors({...errors, name: undefined});
            }}
            editable={!registerLoading}
            error={errors.name}
          />

          <ThemedInput
            placeholder="Email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              setErrors({...errors, email: undefined});
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            editable={!registerLoading}
            error={errors.email}
          />

          <ThemedInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={text => {
              setPhone(text);
              setErrors({...errors, phone: undefined});
            }}
            keyboardType="phone-pad"
            editable={!registerLoading}
            error={errors.phone}
          />

          <ThemedInput
            placeholder="Password"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors({...errors, password: undefined});
            }}
            secureTextEntry
            editable={!registerLoading}
            error={errors.password}
          />

          <ThemedInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={text => {
              setConfirmPassword(text);
              setErrors({...errors, confirmPassword: undefined});
            }}
            secureTextEntry
            editable={!registerLoading}
            error={errors.confirmPassword}
          />

          {errors.general && (
            <ThemedText
              variant="caption"
              style={[styles.error, {color: theme.error.main}]}>
              {errors.general}
            </ThemedText>
          )}

          <ThemedButton
            title="Register"
            onPress={handleRegister}
            loading={registerLoading}
            fullWidth
            style={styles.registerButton}
          />

          <ThemedButton
            title="Already have an account? Login"
            variant="ghost"
            onPress={() => navigation.navigate('Login')}
            disabled={registerLoading}
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
  registerButton: {
    marginTop: 8,
    marginBottom: 16,
  },
});

export default RegisterScreen;
