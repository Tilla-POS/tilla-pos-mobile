import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

interface Option {
  label: string;
  value: string;
}

interface ThemedSelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
}

export const ThemedSelect: React.FC<ThemedSelectProps> = ({
  label,
  error,
  placeholder,
  options,
  value,
  onValueChange,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const {theme, spacing, radius, typography} = useTheme();

  const selectedLabel =
    options.find(opt => opt.value === value)?.label || placeholder;

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText variant="label" color="secondary" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <TouchableOpacity
        style={[
          styles.dropdown,
          {
            backgroundColor: theme.input.background,
            borderColor: error ? theme.border.error : theme.input.border,
            borderRadius: radius.sm,
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[3],
          },
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}>
        <ThemedText
          variant="label"
          color="secondary"
          style={{
            fontSize: typography.fontSize.base,
            color: value ? theme.input.text : theme.input.placeholder,
          }}>
          {selectedLabel}
        </ThemedText>
      </TouchableOpacity>
      {error && (
        <ThemedText
          variant="caption"
          style={[styles.error, {color: theme.error.main}]}>
          {error}
        </ThemedText>
      )}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View
            style={[
              styles.modalContent,
              {backgroundColor: theme.surface.primary},
            ]}>
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setModalVisible(false);
                  }}>
                  <ThemedText variant="body" color="primary">
                    {item.label}
                  </ThemedText>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
  },
  error: {
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    minWidth: 250,
    borderRadius: 10,
    padding: 8,
    maxHeight: 320,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
});
