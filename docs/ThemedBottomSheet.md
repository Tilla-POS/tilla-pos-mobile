# ThemedBottomSheet Component

A themed bottom sheet component built with `@gorhom/bottom-sheet` that integrates seamlessly with the app's theming system and appears above all navigation elements including the BottomTabNavigator.

## Features

- ✅ Portal behavior - appears above all content including bottom tabs
- ✅ Theme-aware (light/dark mode support)
- ✅ Customizable snap points
- ✅ Context-based control from anywhere in the app
- ✅ Optional header with title
- ✅ Backdrop with customizable opacity
- ✅ Pan down to close gesture
- ✅ Dynamic sizing option
- ✅ Smooth animations

## Architecture

The bottom sheet is implemented using a Context pattern:

1. **BottomSheetProvider** - Wraps the entire MainStack in `MainStack.tsx`
2. **useBottomSheet hook** - Provides methods to control the bottom sheet from any screen
3. **ThemedBottomSheet** - Rendered at the MainStack level, above all navigators

This ensures the bottom sheet appears above:
- BottomTabNavigator
- All screens
- All modals and dialogs

## Basic Usage

```tsx
import {useBottomSheet} from '../context/BottomSheetContext';
import {ThemedButton, ThemedText} from '../components/ui';

const MyScreen = () => {
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();

  const handleOpen = () => {
    const content = (
      <View>
        <ThemedText>Your content here</ThemedText>
        <ThemedButton 
          title="Close" 
          onPress={closeBottomSheet} 
        />
      </View>
    );

    openBottomSheet(
      content,           // ReactNode content
      'My Title',        // Optional title
      ['50%', '90%']     // Optional snap points
    );
  };

  return (
    <ThemedButton 
      label="Open Sheet" 
      onPress={handleOpen} 
    />
  );
};
```

## useBottomSheet Hook

```tsx
interface BottomSheetContextType {
  openBottomSheet: (
    content: ReactNode, 
    title?: string, 
    snapPoints?: (string | number)[]
  ) => void;
  closeBottomSheet: () => void;
  bottomSheetRef: React.RefObject<ThemedBottomSheetRef | null>;
  state: BottomSheetState;
}
```

### Methods

| Method | Parameters | Description |
|--------|-----------|-------------|
| `openBottomSheet` | `content`, `title?`, `snapPoints?` | Opens the bottom sheet with provided content |
| `closeBottomSheet` | - | Closes the bottom sheet |

### State

```tsx
interface BottomSheetState {
  content: ReactNode;      // Current content
  title?: string;          // Current title
  snapPoints?: (string | number)[]; // Current snap points
}
```

## Examples

### Simple Bottom Sheet

```tsx
const {openBottomSheet} = useBottomSheet();

const handleOpen = () => {
  openBottomSheet(
    <ThemedText>Hello World!</ThemedText>
  );
};
```

### With Title and Custom Snap Points

```tsx
const {openBottomSheet, closeBottomSheet} = useBottomSheet();

const handleAddItem = () => {
  const content = (
    <View style={{gap: spacing[4]}}>
      <ThemedInput placeholder="Item Name" />
      <ThemedInput placeholder="Price" />
      <ThemedButton 
        title="Save" 
        onPress={() => {
          // Save logic
          closeBottomSheet();
        }} 
      />
    </View>
  );

  openBottomSheet(content, 'Add New Item', ['60%', '90%']);
};
```

### Dynamic Content Based on Tab

```tsx
const InventoryScreen = () => {
  const {openBottomSheet} = useBottomSheet();
  const [currentTab, setCurrentTab] = useState(0);

  const handleAdd = () => {
    const titles = ['Add Item', 'Add Category', 'Add Modifier'];
    const content = getContentForTab(currentTab);
    
    openBottomSheet(content, titles[currentTab], ['70%', '95%']);
  };

  return (
    <ThemedFab name="Plus" onPress={handleAdd} />
  );
};
```

### Form with Validation

```tsx
const AddItemBottomSheet = () => {
  const {openBottomSheet, closeBottomSheet} = useBottomSheet();
  const {spacing} = useTheme();

  const openAddItemSheet = () => {
    const content = (
      <ScrollView style={{gap: spacing[4]}}>
        <ThemedInput label="Name" required />
        <ThemedInput label="Price" keyboardType="numeric" />
        <ThemedTextArea label="Description" />
        <View style={{flexDirection: 'row', gap: spacing[2]}}>
          <ThemedButton 
            title="Cancel" 
            variant="ghost"
            onPress={closeBottomSheet}
            style={{flex: 1}}
          />
          <ThemedButton 
            title="Save" 
            variant="primary"
            onPress={handleSave}
            style={{flex: 1}}
          />
        </View>
      </ScrollView>
    );

    openBottomSheet(content, 'Add Item', ['80%', '95%']);
  };

  return openAddItemSheet;
};
```

## Setup (Already Configured)

The following is already set up in the project:

### 1. App.tsx
```tsx
<GestureHandlerRootView style={styles.flex}>
  <BottomSheetModalProvider>
    <AppContent />
  </BottomSheetModalProvider>
</GestureHandlerRootView>
```

### 2. MainStack.tsx
```tsx
const MainStack = () => {
  return (
    <BottomSheetProvider>
      <MainStackWithBottomSheet />
    </BottomSheetProvider>
  );
};
```

## Theme Integration

The component automatically uses:
- `theme.surface.primary` - Background color
- `theme.border.secondary` - Handle indicator color
- `theme.border.primary` - Header border color
- `spacing[4]`, `spacing[6]` - Padding values
- `radius['2xl']` - Border radius

## Advanced Usage

### Accessing Bottom Sheet Ref Directly

```tsx
const {bottomSheetRef} = useBottomSheet();

// Use ref methods
bottomSheetRef.current?.open();
bottomSheetRef.current?.close();
bottomSheetRef.current?.snapToIndex(1);
```

### Programmatic State Updates

```tsx
const {state, openBottomSheet} = useBottomSheet();

// Current state
console.log(state.content, state.title, state.snapPoints);

// Update content dynamically
const newContent = <ThemedText>Updated content</ThemedText>;
openBottomSheet(newContent, state.title, state.snapPoints);
```

## Best Practices

1. **Always provide a close button** in your content
2. **Use meaningful titles** to help users understand context
3. **Choose appropriate snap points** based on content height
4. **Handle keyboard properly** - the sheet auto-adjusts
5. **Clean up form state** after closing
6. **Use spacing tokens** for consistent padding
7. **Test on different screen sizes** - percentages work better than pixels

## Notes

- The sheet starts closed by default
- Backdrop dismisses the sheet when tapped
- Works seamlessly with keyboard (auto-adjusts)
- Covers the BottomTabNavigator completely
- Supports both percentage and pixel-based snap points
- Content is rendered only when needed (performance optimized)
