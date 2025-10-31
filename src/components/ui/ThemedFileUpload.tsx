import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import {Upload, X, Camera, Image as ImageIcon} from 'lucide-react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';
import {ThemedIcon} from './ThemedIcon';

export interface UploadedFile {
  uri: string;
  type?: string;
  name?: string;
  fileSize?: number;
}

interface ThemedFileUploadProps {
  onFileSelect?: (file: UploadedFile | null) => void;
  onError?: (error: string) => void;
  value?: UploadedFile | null;
  disabled?: boolean;
  multiple?: boolean;
  maxSizeInMB?: number;
  accept?: 'image' | 'all';
  showPreview?: boolean;
  placeholder?: string;
  variant?: 'default' | 'compact' | 'avatar';
  size?: 'sm' | 'md' | 'lg';
}

export const ThemedFileUpload: React.FC<ThemedFileUploadProps> = ({
  onFileSelect,
  onError,
  value,
  disabled = false,
  multiple = false,
  maxSizeInMB = 10,
  accept = 'image',
  showPreview = true,
  placeholder = 'Upload file',
  variant = 'default',
  size = 'md',
}) => {
  const {theme, spacing, radius, shadows} = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(
    value || null,
  );

  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

  const validateFile = (asset: Asset): boolean => {
    if (asset.fileSize && asset.fileSize > maxSizeInBytes) {
      const error = `File size exceeds ${maxSizeInMB}MB limit`;
      onError?.(error);
      Alert.alert('Error', error);
      return false;
    }
    return true;
  };

  const handleImagePickerResponse = (response: ImagePickerResponse) => {
    setLoading(false);

    if (response.didCancel) {
      return;
    }

    if (response.errorCode) {
      const error = response.errorMessage || 'Failed to pick image';
      onError?.(error);
      Alert.alert('Error', error);
      return;
    }

    if (response.assets && response.assets.length > 0) {
      const asset = response.assets[0];

      if (!validateFile(asset)) {
        return;
      }

      const file: UploadedFile = {
        uri: asset.uri || '',
        type: asset.type,
        name: asset.fileName,
        fileSize: asset.fileSize,
      };

      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  const handleSelectSource = () => {
    Alert.alert('Select Source', 'Choose how to upload your file', [
      {
        text: 'Camera',
        onPress: handleCamera,
      },
      {
        text: 'Gallery',
        onPress: handleGallery,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const handleCamera = async () => {
    setLoading(true);
    launchCamera(
      {
        mediaType: accept === 'image' ? 'photo' : 'mixed',
        quality: 0.8,
        maxWidth: 1920,
        maxHeight: 1920,
      },
      handleImagePickerResponse,
    );
  };

  const handleGallery = async () => {
    setLoading(true);
    launchImageLibrary(
      {
        mediaType: accept === 'image' ? 'photo' : 'mixed',
        quality: 0.8,
        selectionLimit: multiple ? 0 : 1,
        maxWidth: 1920,
        maxHeight: 1920,
      },
      handleImagePickerResponse,
    );
  };

  const handleRemove = () => {
    setSelectedFile(null);
    onFileSelect?.(null);
  };

  const sizeStyles = {
    sm: {
      height: 80,
      iconSize: 16,
    },
    md: {
      height: 120,
      iconSize: 24,
    },
    lg: {
      height: 160,
      iconSize: 32,
    },
  };

  const currentSize = sizeStyles[size];

  // Avatar variant
  if (variant === 'avatar') {
    const avatarSize = size === 'sm' ? 80 : size === 'lg' ? 120 : 100;
    return (
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          style={[
            styles.avatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
              backgroundColor: theme.input.background,
              borderColor: theme.border.primary,
            },
            shadows.sm,
          ]}
          onPress={handleSelectSource}
          disabled={disabled || loading}>
          {loading ? (
            <ActivityIndicator color={theme.primary.main} />
          ) : selectedFile?.uri ? (
            <Image
              source={{uri: selectedFile.uri}}
              style={[
                styles.avatarImage,
                {width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2},
              ]}
            />
          ) : (
            <ThemedIcon name="User" customSize={currentSize.iconSize} color="secondary" />
          )}
        </TouchableOpacity>
        {selectedFile && !disabled && (
          <TouchableOpacity
            style={[
              styles.avatarRemoveButton,
              {
                backgroundColor: theme.error.main,
                borderColor: theme.surface.primary,
              },
            ]}
            onPress={handleRemove}>
            <X size={16} color={theme.primary.contrast} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Compact variant
  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <TouchableOpacity
          style={[
            styles.compactButton,
            {
              paddingVertical: spacing[2],
              paddingHorizontal: spacing[3],
              backgroundColor: theme.button.secondary.background,
              borderColor: theme.button.secondary.border,
              borderRadius: radius.sm,
            },
          ]}
          onPress={handleSelectSource}
          disabled={disabled || loading}>
          {loading ? (
            <ActivityIndicator color={theme.primary.main} size="small" />
          ) : (
            <>
              <Upload size={20} color={theme.icon.primary} />
              <ThemedText variant="body" color="primary">
                {selectedFile ? selectedFile.name || 'File selected' : placeholder}
              </ThemedText>
            </>
          )}
        </TouchableOpacity>
        {selectedFile && !disabled && (
          <TouchableOpacity
            style={[
              styles.compactRemoveButton,
              {
                padding: spacing[2],
                backgroundColor: theme.error.light,
                borderRadius: radius.sm,
              },
            ]}
            onPress={handleRemove}>
            <X size={20} color={theme.error.main} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // Default variant
  return (
    <View style={styles.container}>
      {selectedFile && showPreview ? (
        <View
          style={[
            styles.preview,
            {
              borderRadius: radius.md,
              backgroundColor: theme.surface.secondary,
            },
          ]}>
          <Image
            source={{uri: selectedFile.uri}}
            style={[
              styles.previewImage,
              {borderRadius: radius.md, height: currentSize.height},
            ]}
            resizeMode="cover"
          />
          {!disabled && (
            <TouchableOpacity
              style={[
                styles.removeButton,
                {
                  backgroundColor: theme.error.main,
                  borderColor: theme.surface.primary,
                },
                shadows.md,
              ]}
              onPress={handleRemove}>
              <X size={20} color={theme.primary.contrast} />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.uploadArea,
            {
              // height: currentSize.height,
              backgroundColor: theme.input.background,
              borderColor: theme.border.primary,
              borderRadius: radius.md,
              padding: spacing[4],
            },
            disabled && styles.disabled,
          ]}
          onPress={handleSelectSource}
          disabled={disabled || loading}
          activeOpacity={0.7}>
          {loading ? (
            <ActivityIndicator color={theme.primary.main} size="large" />
          ) : (
            <>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: theme.primary.light + '20',
                    borderRadius: radius.xl,
                    padding: spacing[3],
                  },
                ]}>
                <Upload size={currentSize.iconSize} color={theme.primary.main} />
              </View>
              <ThemedText variant="body" color="primary" weight="medium">
                {placeholder}
              </ThemedText>
              <ThemedText variant="caption" color="secondary">
                Click to browse or drag and drop
              </ThemedText>
              <View style={[styles.optionsRow, {gap: spacing[2]}]}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    {
                      paddingVertical: spacing[1],
                      paddingHorizontal: spacing[2],
                      backgroundColor: theme.surface.tertiary,
                      borderRadius: radius.sm,
                    },
                  ]}
                  onPress={handleCamera}>
                  <Camera size={16} color={theme.icon.secondary} />
                  <ThemedText variant="caption" color="secondary">
                    Camera
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    {
                      paddingVertical: spacing[1],
                      paddingHorizontal: spacing[2],
                      backgroundColor: theme.surface.tertiary,
                      borderRadius: radius.sm,
                    },
                  ]}
                  onPress={handleGallery}>
                  <ImageIcon size={16} color={theme.icon.secondary} />
                  <ThemedText variant="caption" color="secondary">
                    Gallery
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  uploadArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    gap: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  iconContainer: {
    marginBottom: 8,
  },
  preview: {
    width: '100%',
    position: 'relative',
  },
  previewImage: {
    width: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  avatarContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarRemoveButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  compactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
  },
  compactRemoveButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
