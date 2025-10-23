import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../../hooks/useTheme';
import {ThemedText} from '../../../ui/ThemedText';

interface InfoItemProps {
  // Define your props here
  label: string;
  value: string;
  icon: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({label, value, icon}) => {
  const {theme, radius, spacing} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: spacing[4], gap: spacing[4]},
      ]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: theme.background.secondary,
            borderRadius: radius.sm,
          },
        ]}>
        {icon}
      </View>
      <View>
        <ThemedText weight="semiBold">{label}</ThemedText>
        <ThemedText variant="caption" color="tertiary" weight="regular">{value}</ThemedText>
      </View>
    </View>
  );
};

export default InfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
