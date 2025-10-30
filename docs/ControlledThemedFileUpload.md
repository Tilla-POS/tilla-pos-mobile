# ControlledThemedFileUpload Component

A React Hook Form wrapper for the ThemedFileUpload component that provides seamless integration with form validation and state management.

## Features

- ✅ Full React Hook Form integration
- ✅ Automatic validation error display
- ✅ Type-safe with TypeScript generics
- ✅ All ThemedFileUpload features included
- ✅ Optional label support
- ✅ Controlled value management

## Basic Usage

```tsx
import {useForm} from 'react-hook-form';
import {ControlledThemedFileUpload} from '../components/form';
import type {UploadedFile} from '../components/ui';

interface FormData {
  productImage: UploadedFile | null;
}

const MyForm = () => {
  const {control, handleSubmit} = useForm<FormData>({
    defaultValues: {
      productImage: null,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
    if (data.productImage) {
      console.log('Image URI:', data.productImage.uri);
    }
  };

  return (
    <View>
      <ControlledThemedFileUpload
        control={control}
        name="productImage"
        label="Product Image"
        placeholder="Upload product photo"
      />
      
      <ThemedButton
        title="Submit"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `control` | `Control<T>` | ✅ | - | React Hook Form control object |
| `name` | `Path<T>` | ✅ | - | Field name in form data |
| `label` | `string` | - | - | Optional label above upload area |
| `disabled` | `boolean` | - | `false` | Disable file selection |
| `multiple` | `boolean` | - | `false` | Allow multiple file selection |
| `maxSizeInMB` | `number` | - | `10` | Maximum file size in MB |
| `accept` | `'image' \| 'all'` | - | `'image'` | File type to accept |
| `showPreview` | `boolean` | - | `true` | Show image preview |
| `placeholder` | `string` | - | `'Upload file'` | Placeholder text |
| `variant` | `'default' \| 'compact' \| 'avatar'` | - | `'default'` | Upload component variant |
| `size` | `'sm' \| 'md' \| 'lg'` | - | `'md'` | Component size |

## With Validation

### Required Field

```tsx
import {useForm} from 'react-hook-form';

interface FormData {
  profilePhoto: UploadedFile | null;
}

const {control, handleSubmit} = useForm<FormData>();

<ControlledThemedFileUpload
  control={control}
  name="profilePhoto"
  label="Profile Photo"
  variant="avatar"
  rules={{
    required: 'Profile photo is required',
  }}
/>
```

### Custom Validation

```tsx
<ControlledThemedFileUpload
  control={control}
  name="productImage"
  label="Product Image"
  maxSizeInMB={5}
  rules={{
    required: 'Product image is required',
    validate: (value: UploadedFile | null) => {
      if (!value) return 'Please upload an image';
      if (value.fileSize && value.fileSize > 5 * 1024 * 1024) {
        return 'File size must be less than 5MB';
      }
      return true;
    },
  }}
/>
```

### With Zod Schema

```tsx
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';

const uploadedFileSchema = z.object({
  uri: z.string(),
  type: z.string().optional(),
  name: z.string().optional(),
  fileSize: z.number().optional(),
}).nullable();

const schema = z.object({
  productImage: uploadedFileSchema.refine(
    (file) => file !== null,
    'Product image is required'
  ),
  categoryImage: uploadedFileSchema,
});

type FormData = z.infer<typeof schema>;

const {control, handleSubmit} = useForm<FormData>({
  resolver: zodResolver(schema),
});

<ControlledThemedFileUpload
  control={control}
  name="productImage"
  label="Product Image *"
/>
```

## Examples

### Complete Form with Multiple Uploads

```tsx
import {useForm} from 'react-hook-form';
import {ControlledThemedFileUpload, ControlledThemedInput} from '../components/form';
import {ThemedButton} from '../components/ui';

interface ProductFormData {
  name: string;
  mainImage: UploadedFile | null;
  galleryImages: UploadedFile[] | null;
  thumbnail: UploadedFile | null;
}

const ProductForm = () => {
  const {control, handleSubmit, formState: {errors}} = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      mainImage: null,
      galleryImages: null,
      thumbnail: null,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    console.log('Submitting:', data);
    // Upload files to server
    if (data.mainImage) {
      const formData = new FormData();
      formData.append('image', {
        uri: data.mainImage.uri,
        type: data.mainImage.type,
        name: data.mainImage.name,
      } as any);
      // await uploadToServer(formData);
    }
  };

  return (
    <View style={{gap: 16}}>
      <ControlledThemedInput
        control={control}
        name="name"
        label="Product Name"
        placeholder="Enter product name"
        rules={{required: 'Product name is required'}}
      />

      <ControlledThemedFileUpload
        control={control}
        name="mainImage"
        label="Main Product Image"
        placeholder="Upload main image"
        maxSizeInMB={5}
        rules={{required: 'Main image is required'}}
      />

      <ControlledThemedFileUpload
        control={control}
        name="thumbnail"
        label="Thumbnail"
        variant="compact"
        size="sm"
        maxSizeInMB={2}
      />

      <ThemedButton
        title="Submit"
        onPress={handleSubmit(onSubmit)}
        loading={isSubmitting}
      />
    </View>
  );
};
```

### Avatar Upload in Profile Form

```tsx
interface ProfileFormData {
  name: string;
  email: string;
  avatar: UploadedFile | null;
}

const ProfileForm = () => {
  const {control, handleSubmit} = useForm<ProfileFormData>();

  return (
    <View style={{gap: 16, padding: 16}}>
      <ControlledThemedFileUpload
        control={control}
        name="avatar"
        variant="avatar"
        size="lg"
      />

      <ControlledThemedInput
        control={control}
        name="name"
        label="Name"
      />

      <ControlledThemedInput
        control={control}
        name="email"
        label="Email"
      />

      <ThemedButton
        title="Save Profile"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
```

### Compact Variant in List Item

```tsx
interface DocumentFormData {
  receipt: UploadedFile | null;
}

const AddReceiptRow = () => {
  const {control, handleSubmit} = useForm<DocumentFormData>();

  return (
    <View style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
      <View style={{flex: 1}}>
        <ControlledThemedFileUpload
          control={control}
          name="receipt"
          variant="compact"
          placeholder="Upload receipt"
          maxSizeInMB={10}
          accept="all"
        />
      </View>
      <ThemedButton
        title="Save"
        size="sm"
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
```

### With Default Value

```tsx
const EditProductForm = ({product}: {product: Product}) => {
  const {control, handleSubmit} = useForm<ProductFormData>({
    defaultValues: {
      productImage: product.image 
        ? {
            uri: product.image,
            name: 'product.jpg',
            type: 'image/jpeg',
          }
        : null,
    },
  });

  return (
    <ControlledThemedFileUpload
      control={control}
      name="productImage"
      label="Product Image"
    />
  );
};
```

### Conditional Upload

```tsx
interface FormData {
  hasImage: boolean;
  image: UploadedFile | null;
}

const ConditionalUploadForm = () => {
  const {control, watch} = useForm<FormData>();
  const hasImage = watch('hasImage');

  return (
    <>
      <ControlledThemedCheckbox
        control={control}
        name="hasImage"
        label="Include image"
      />

      {hasImage && (
        <ControlledThemedFileUpload
          control={control}
          name="image"
          label="Upload Image"
          rules={{
            required: hasImage ? 'Image is required' : false,
          }}
        />
      )}
    </>
  );
};
```

## Upload to Server

### Using FormData

```tsx
const uploadFile = async (file: UploadedFile) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type || 'image/jpeg',
    name: file.name || 'upload.jpg',
  } as any);

  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.json();
};

const onSubmit = async (data: FormData) => {
  if (data.image) {
    const result = await uploadFile(data.image);
    console.log('Uploaded:', result.url);
  }
};
```

### Using Axios

```tsx
import axios from 'axios';

const uploadFile = async (file: UploadedFile) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.name,
  } as any);

  const {data} = await axios.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
```

## Error Handling

```tsx
const {control, handleSubmit, setError} = useForm<FormData>();

const onSubmit = async (data: FormData) => {
  try {
    if (data.image) {
      await uploadFile(data.image);
    }
  } catch (error) {
    setError('image', {
      type: 'manual',
      message: 'Failed to upload image',
    });
  }
};
```

## Best Practices

1. **Always validate file uploads**
   ```tsx
   rules={{
     required: 'Image is required',
     validate: (file) => file !== null || 'Please select a file'
   }}
   ```

2. **Set appropriate size limits**
   ```tsx
   maxSizeInMB={5} // For images
   maxSizeInMB={20} // For documents
   ```

3. **Use correct variant**
   - `default` - Forms with full preview
   - `compact` - Space-constrained layouts
   - `avatar` - Profile photos

4. **Handle upload errors gracefully**
   ```tsx
   onError={(error) => {
     Alert.alert('Upload Error', error);
     setError('image', {message: error});
   }}
   ```

5. **Provide clear labels**
   ```tsx
   label="Product Photo (max 5MB)"
   placeholder="Upload JPG or PNG"
   ```

## Type Safety

```tsx
// Define your form data type
interface MyFormData {
  image: UploadedFile | null;
}

// Use with control
const {control} = useForm<MyFormData>();

// TypeScript will ensure type safety
<ControlledThemedFileUpload
  control={control}
  name="image" // ✅ Type-safe
  // name="wrong" // ❌ TypeScript error
/>
```

## Notes

- Component automatically displays validation errors below the upload area
- File selection errors are shown via Alert
- The `UploadedFile` type contains local URI, not uploaded URL
- You need to implement server upload separately
- Supports both controlled and uncontrolled modes via React Hook Form
- Label is not shown for avatar variant (circular design)
