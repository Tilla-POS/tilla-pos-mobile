import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {ThemedView} from '../components/ui/ThemedView';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedInput} from '../components/ui/ThemedInput';
import {ThemedButton} from '../components/ui/ThemedButton';
import {useTheme} from '../hooks/useTheme';
import {ThemedSelect} from '../components/ui/ThemedSelect';
import {useBusinessTypeOptions} from '../hooks/useBusinessType';
import {OTP_SCREEN} from './OTPScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../navigation/AuthStack';
import {useAuth} from '../hooks/useAuth';

export const CREATE_BUSINESS_SCREEN = 'CreateBusiness'; // For navigation reference

type CreateBusinessScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof CREATE_BUSINESS_SCREEN
>;

const CreateBusinessScreen: React.FC<CreateBusinessScreenProps> = ({
  navigation,
  route,
}) => {
  const {theme} = useTheme();
  // Receive state navigation params
  const {shopkeeperId, email} = route.params;
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>('');
  const [logoType, setLogoType] = useState<string>('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('');
  const [errors, setErrors] = useState<any>({});
  const {data: businessTypes, isLoading: isLoadingBusinessTypes} =
    useBusinessTypeOptions();
  const {createBusiness, createBusinessLoading} = useAuth();

  const pickLogo = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1000,
        maxHeight: 1000,
        includeBase64: false,
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
        } else if (response.errorCode) {
          Alert.alert('Error', 'Failed to pick image. Please try again.');
        } else if (response.assets && response.assets.length > 0) {
          const asset: Asset = response.assets[0];
          if (asset.uri) {
            setLogoUri(asset.uri);
            setLogoName(asset.fileName || 'logo.jpg');
            setLogoType(asset.type || 'image/jpeg');
          }
        }
      },
    );
  };

  const validate = () => {
    const next: any = {};
    if (!name.trim()) {
      next.name = 'Business name is required';
    }
    if (!type.trim()) {
      next.type = 'Business type is required';
    }
    if (!phone.trim()) {
      next.phone = 'Phone number is required';
    }
    // simple phone validation
    const phoneRe = /^\+?[0-9]{7,15}$/;
    if (phone && !phoneRe.test(phone)) {
      next.phone = 'Invalid phone number';
    }
    if (!currency.trim()) {
      next.currency = 'Currency is required';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleCreate = async () => {
    if (!validate()) {
      return;
    }
    try {
      console.log(`${CREATE_BUSINESS_SCREEN}.handleCreate: Creating business for ${email} | Shopkeeper ID: ${shopkeeperId}`);
      await createBusiness({
        shopkeeperId,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        businessTypeId: type,
        currency,
        email,
        logo: {
          uri: logoUri || '',
          name: logoName || 'logo.jpg',
          type: logoType || 'image/jpeg',
        },
      });

      // In a real flow you'd save the business and navigate to the appropriate screen
      navigation.navigate(OTP_SCREEN, {email});
    } catch (err) {
      console.error(`${CREATE_BUSINESS_SCREEN}.handleCreate: Creation error:`, err);
      Alert.alert('Error', 'Failed to create business');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.logoContainer,
              {backgroundColor: theme.primary.main + '10'},
            ]}
            onPress={pickLogo}
            activeOpacity={0.8}>
            {logoUri ? (
              <Image source={{uri: logoUri}} style={styles.logo} />
            ) : (
              <ThemedText color="secondary" style={styles.logoPlaceholder}>
                Tap to add logo
              </ThemedText>
            )}
          </TouchableOpacity>

          <ThemedText variant="h2" style={styles.title}>
            Create Business
          </ThemedText>
          <ThemedText color="secondary" style={styles.subtitle}>
            Enter your business details
          </ThemedText>
        </View>

        <View style={styles.form}>
          <ThemedInput
            placeholder="Business name"
            value={name}
            onChangeText={text => {
              setName(text);
              setErrors({...errors, name: undefined});
            }}
            error={errors.name}
          />

          <ThemedSelect
            placeholder="Select business type..."
            value={type}
            onValueChange={val => {
              setType(val);
              setErrors({...errors, type: undefined});
            }}
            error={errors.type}
            options={isLoadingBusinessTypes ? [] : businessTypes || []}
          />

          <ThemedInput
            value={phone}
            placeholder="Phone number"
            onChangeText={text => {
              setPhone(text);
              setErrors({...errors, phone: undefined});
            }}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <ThemedSelect
            placeholder="Select currency..."
            value={currency}
            onValueChange={val => {
              setCurrency(val);
              setErrors({...errors, currency: undefined});
            }}
            error={errors.currency}
            options={[
              {label: 'US Dollar (USD) - $', value: 'USD'},
              {label: 'Euro (EUR) - €', value: 'EUR'},
              {label: 'British Pound (GBP) - £', value: 'GBP'},
              {label: 'Nigerian Naira (NGN) - ₦', value: 'NGN'},
              {label: 'Kenyan Shilling (KES) - KSh', value: 'KES'},
              {label: 'South African Rand (ZAR) - R', value: 'ZAR'},
              {label: 'Ugandan Shilling (UGX) - USh', value: 'UGX'},
            ]}
          />

          <ThemedButton
            title="Create Business"
            onPress={handleCreate}
            loading={createBusinessLoading}
            fullWidth
            style={styles.createButton}
          />
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1, justifyContent: 'center', paddingHorizontal: 24},
  header: {alignItems: 'center', marginBottom: 24},
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  logo: {width: '100%', height: '100%', resizeMode: 'cover'},
  logoPlaceholder: {textAlign: 'center', fontSize: 12},
  title: {marginBottom: 6},
  subtitle: {marginBottom: 12},
  form: {width: '100%'},
  createButton: {marginTop: 8},
});

export default CreateBusinessScreen;
