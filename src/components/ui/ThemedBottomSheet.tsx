import React, {
  forwardRef,
  useCallback,
  useMemo,
  useImperativeHandle,
  useRef,
} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

export interface ThemedBottomSheetRef {
  open: () => void;
  close: () => void;
  snapToIndex: (index: number) => void;
}

interface ThemedBottomSheetProps {
  children: React.ReactNode;
  title?: string;
  snapPoints?: (string | number)[];
  enablePanDownToClose?: boolean;
  enableDynamicSizing?: boolean;
  backdropOpacity?: number;
  onClose?: () => void;
  onChange?: (index: number) => void;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

export const ThemedBottomSheet = forwardRef<
  ThemedBottomSheetRef,
  ThemedBottomSheetProps
>(
  (
    {
      children,
      title,
      snapPoints: customSnapPoints,
      enablePanDownToClose = true,
      enableDynamicSizing = false,
      backdropOpacity = 0.5,
      onClose,
      onChange,
      style,
      contentContainerStyle,
    },
    ref,
  ) => {
    const {theme, radius, spacing} = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Default snap points if not provided
    const snapPoints = useMemo(
      () => customSnapPoints || ['25%', '50%', '90%'],
      [customSnapPoints],
    );

    // Expose methods to parent components
    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.snapToIndex(0),
      close: () => bottomSheetRef.current?.close(),
      snapToIndex: (index: number) =>
        bottomSheetRef.current?.snapToIndex(index),
    }));

    // Handle bottom sheet changes
    const handleSheetChanges = useCallback(
      (index: number) => {
        onChange?.(index);
        if (index === -1) {
          onClose?.();
        }
      },
      [onChange, onClose],
    );

    // Render backdrop
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={backdropOpacity}
        />
      ),
      [backdropOpacity],
    );

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose={enablePanDownToClose}
        enableDynamicSizing={enableDynamicSizing}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={[
          styles.handleIndicator,
          {
            backgroundColor: theme.border.secondary,
          },
        ]}
        backgroundStyle={{
          backgroundColor: theme.background.primary,
          borderTopLeftRadius: radius['2xl'],
          borderTopRightRadius: radius['2xl'],
        }}
        style={style}>
        <BottomSheetView
          style={[
            styles.contentContainer,
            {
              paddingHorizontal: spacing[4],
              paddingBottom: spacing[6],
            },
            contentContainerStyle,
          ]}>
          {title && (
            <View
              style={[
                styles.header,
                styles.headerBorder,
                {
                  marginBottom: spacing[4],
                  paddingBottom: spacing[3],
                  borderBottomColor: theme.border.primary,
                },
              ]}>
              <ThemedText variant="h4" color="primary">
                {title}
              </ThemedText>
            </View>
          )}
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

ThemedBottomSheet.displayName = 'ThemedBottomSheet';

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerBorder: {
    borderBottomWidth: 1,
  },
  handleIndicator: {
    width: 40,
  },
});
