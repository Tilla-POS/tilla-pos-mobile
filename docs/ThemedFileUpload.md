# ThemedFileUpload Component

A fully themed file upload component with support for camera and gallery image picking, preview, and multiple variants. Built with `react-native-image-picker` and integrates seamlessly with the app's theming system.

## Features

- ✅ Multiple variants (default, compact, avatar)
- ✅ Camera and gallery support
- ✅ Image preview with remove option
- ✅ File size validation
- ✅ Loading states
- ✅ Disabled state
- ✅ Theme-aware (light/dark mode)
- ✅ Customizable sizes (sm, md, lg)
- ✅ Error handling with callbacks
- ✅ TypeScript support

## Installation

The component uses `react-native-image-picker` which is already installed in the project.

### iOS Setup (if not already done)

Add to `ios/Podfile`:
```ruby
permissions_path = '../node_modules/react-native-permissions/ios'
pod 'Permission-Camera', :path => "#{permissions_path}/Camera"
pod 'Permission-PhotoLibrary', :path => "#{permissions_path}/PhotoLibrary"
```

Add to `ios/Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your camera to take photos</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>$(PRODUCT_NAME) needs access to your photo library to select photos</string>
```

### Android Setup (if not already done)

Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

## Basic Usage

```tsx
import {ThemedFileUpload, UploadedFile} from '../components/ui';

const MyScreen = () => {
  const [file, setFile] = useState<UploadedFile | null>(null);

  return (
    <ThemedFileUpload
      onFileSelect={(file) => setFile(file)}
      placeholder="Upload product image"
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFileSelect` | `(file: UploadedFile \| null) => void` | - | Callback when file is selected or removed |
| `onError` | `(error: string) => void` | - | Callback when an error occurs |
| `value` | `UploadedFile \| null` | - | Controlled value |
| `disabled` | `boolean` | `false` | Disables the upload functionality |
| `multiple` | `boolean` | `false` | Allow multiple file selection (gallery only) |
| `maxSizeInMB` | `number` | `10` | Maximum file size in megabytes |
| `accept` | `'image' \| 'all'` | `'image'` | File type to accept |
| `showPreview` | `boolean` | `true` | Show image preview after selection |
| `placeholder` | `string` | `'Upload file'` | Placeholder text |
| `variant` | `'default' \| 'compact' \| 'avatar'` | `'default'` | Component variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Component size |

## UploadedFile Type

```tsx
interface UploadedFile {
  uri: string;           // File URI
  type?: string;         // MIME type
  name?: string;         // File name
  fileSize?: number;     // File size in bytes
}
```

## Variants

### Default Variant

Full-featured upload area with preview, camera/gallery buttons, and drag-and-drop UI.

```tsx
<ThemedFileUpload
  variant="default"
  size="md"
  placeholder="Upload product image"
  onFileSelect={(file) => console.log(file)}
/>
```

**Features:**
- Large drop zone with icon
- Camera and Gallery buttons
- Image preview with remove button
- Dashed border upload area

### Compact Variant

Horizontal layout with button and file name display.

```tsx
<ThemedFileUpload
  variant="compact"
  placeholder="Choose file"
  onFileSelect={(file) => console.log(file)}
/>
```

**Features:**
- Compact horizontal layout
- Shows file name when selected
- Separate remove button
- Ideal for forms

### Avatar Variant

Circular image picker perfect for profile photos.

```tsx
<ThemedFileUpload
  variant="avatar"
  size="lg"
  onFileSelect={(file) => console.log(file)}
/>
```

**Features:**
- Circular display
- User icon placeholder
- Small remove button at bottom-right
- Perfect for profile images

## Size Options

| Size | Default Height | Avatar Size | Compact Height |
|------|---------------|-------------|----------------|
| `sm` | 80px | 80px | Auto |
| `md` | 120px | 100px | Auto |
| `lg` | 160px | 120px | Auto |

## Examples

### Product Image Upload

```tsx
const [productImage, setProductImage] = useState<UploadedFile | null>(null);

<ThemedFileUpload
  variant="default"
  size="lg"
  placeholder="Upload product image"
  maxSizeInMB={5}
  showPreview={true}
  onFileSelect={setProductImage}
  onError={(error) => Alert.alert('Error', error)}
/>
```

### Profile Avatar

```tsx
const [avatar, setAvatar] = useState<UploadedFile | null>(null);

<ThemedFileUpload
  variant="avatar"
  size="lg"
  onFileSelect={setAvatar}
/>
```

### Document Upload (Compact)

```tsx
<ThemedFileUpload
  variant="compact"
  placeholder="Upload receipt"
  accept="all"
  maxSizeInMB={20}
  onFileSelect={(file) => {
    if (file) {
      console.log('File selected:', file.name);
    }
  }}
/>
```

### Controlled Component

```tsx
const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

<ThemedFileUpload
  value={selectedFile}
  onFileSelect={setSelectedFile}
  placeholder="Upload image"
/>

{/* Reset button */}
<ThemedButton
  title="Clear"
  onPress={() => setSelectedFile(null)}
/>
```

### With Form Integration

```tsx
import {useForm, Controller} from 'react-hook-form';

const MyForm = () => {
  const {control, handleSubmit} = useForm();

  return (
    <Controller
      control={control}
      name="productImage"
      rules={{required: 'Product image is required'}}
      render={({field: {onChange, value}}) => (
        <ThemedFileUpload
          value={value}
          onFileSelect={onChange}
          placeholder="Upload product image"
        />
      )}
    />
  );
};
```

### With Size Validation

```tsx
<ThemedFileUpload
  maxSizeInMB={2}
  onFileSelect={(file) => {
    if (file) {
      console.log('File size:', file.fileSize);
    }
  }}
  onError={(error) => {
    Alert.alert('Upload Error', error);
  }}
/>
```

### Loading State

```tsx
const [uploading, setUploading] = useState(false);

<ThemedFileUpload
  disabled={uploading}
  onFileSelect={async (file) => {
    if (file) {
      setUploading(true);
      await uploadToServer(file);
      setUploading(false);
    }
  }}
/>
```

## Image Picker Options

The component automatically handles:
- **Quality**: 0.8 (80% quality)
- **Max dimensions**: 1920x1920px
- **Media type**: Photo for images, mixed for all
- **Selection limit**: Based on `multiple` prop

## Error Handling

The component handles several error scenarios:

1. **File size exceeded**
   ```tsx
   onError={(error) => Alert.alert('Error', error)}
   ```

2. **Camera/Gallery permission denied**
   - Shows native OS permission dialog
   - Error callback triggered if denied

3. **Image picker errors**
   - Network errors
   - Storage access errors
   - Generic picker errors

## Theme Integration

The component uses theme tokens:
- `theme.input.background` - Upload area background
- `theme.border.primary` - Border color
- `theme.primary.main` - Icon and accent color
- `theme.error.main` - Remove button background
- `theme.surface.*` - Card backgrounds
- `spacing[*]` - Padding and gaps
- `radius.*` - Border radius values
- `shadows.*` - Elevation shadows

## Best Practices

1. **Always provide error handling**
   ```tsx
   onError={(error) => Alert.alert('Error', error)}
   ```

2. **Set appropriate size limits**
   ```tsx
   maxSizeInMB={5} // For images
   maxSizeInMB={20} // For documents
   ```

3. **Use appropriate variant**
   - `default` - Main image uploads
   - `compact` - Forms and lists
   - `avatar` - Profile photos

4. **Validate file type on backend**
   - Client-side validation is not secure
   - Always validate on server

5. **Show loading states during upload**
   ```tsx
   disabled={isUploading}
   ```

6. **Provide meaningful placeholders**
   ```tsx
   placeholder="Upload product photo (max 5MB)"
   ```

## Accessibility

- Touchable areas have proper hit boxes
- Loading states show ActivityIndicator
- Error messages via alerts
- Disabled state properly indicated

## Notes

- Camera requires device camera hardware
- Gallery access requires storage permissions
- Image is compressed automatically (quality: 0.8)
- Max dimensions: 1920x1920 to reduce file size
- URI is local device path, not uploaded yet
- You need to implement server upload separately
