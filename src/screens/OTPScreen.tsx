import React, {useState, useRef, useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@hooks/useTheme';
import {ThemedView} from '@components/ui/ThemedView';
import {ThemedText} from '@components/ui/ThemedText';
import {ThemedButton} from '@components/ui/ThemedButton';
import {Shield, ArrowLeft} from 'lucide-react-native';
import {authService} from '@services/authService';
import {useAuth} from '@hooks/useAuth';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/AuthStack';

export const OTP_SCREEN = 'OTP'; // For navigation reference

type OTPScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof OTP_SCREEN
>;

const OTPScreen: React.FC<OTPScreenProps> = ({navigation, route}) => {
  const {email} = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const {theme} = useTheme();
  const {verifyOtp, verifyOtpLoading} = useAuth();

  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    setError('');
    try {
      console.log(`${OTP_SCREEN}.handleVerifyOTP: Verifying OTP for ${email}`);
      await verifyOtp({code: otpCode, email});
    } catch (err: any) {
      console.error(`${OTP_SCREEN}.handleVerifyOTP: Verification error:`, err);
      setError(
        err.response?.data?.message || 'Invalid code. Please try again.',
      );
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resendOTP({
        email,
      });

      setResendTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      setError(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setIsLoading(false);
    }
  };

  const maskedContact = email?.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={verifyOtpLoading || isLoading}>
          <ArrowLeft color={theme.text.primary} size={24} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View
            style={[
              styles.iconContainer,
              {backgroundColor: theme.primary.main + '20'},
            ]}>
            <Shield color={theme.primary.main} size={48} />
          </View>

          <ThemedText variant="h2" style={styles.title}>
            Verify Your Email
          </ThemedText>
          <ThemedText color="secondary" style={styles.subtitle}>
            Enter the 6-digit code sent to
          </ThemedText>
          <ThemedText weight="semiBold" style={styles.contact}>
            {maskedContact}
          </ThemedText>
        </View>

        {/* OTP Input */}
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                {
                  backgroundColor: theme.input.background,
                  borderColor: error
                    ? theme.error.main
                    : digit
                    ? theme.primary.main
                    : theme.input.border,
                  color: theme.input.text,
                },
              ]}
              value={digit}
              onChangeText={value => handleOtpChange(value, index)}
              onKeyPress={e => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              editable={!isLoading}
            />
          ))}
        </View>

        {/* Error Message */}
        {error && (
          <ThemedText
            variant="caption"
            style={[styles.error, {color: theme.error.main}]}>
            {error}
          </ThemedText>
        )}

        {/* Verify Button */}
        <ThemedButton
          title="Verify Code"
          onPress={handleVerifyOTP}
          loading={verifyOtpLoading}
          fullWidth
          style={styles.verifyButton}
        />

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <ThemedText color="secondary" style={styles.resendText}>
            Didn't receive the code?{' '}
          </ThemedText>
          {canResend ? (
            <TouchableOpacity onPress={handleResendOTP} disabled={isLoading || verifyOtpLoading}>
              <ThemedText weight="semiBold" style={{color: theme.primary.main}}>
                Resend Code
              </ThemedText>
            </TouchableOpacity>
          ) : (
            <ThemedText color="secondary">Resend in {resendTimer}s</ThemedText>
          )}
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
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
    marginBottom: 4,
  },
  contact: {
    marginTop: 4,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 56,
    borderWidth: 2,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  error: {
    marginBottom: 16,
    textAlign: 'center',
  },
  verifyButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resendText: {
    marginRight: 4,
  },
});

export default OTPScreen;
