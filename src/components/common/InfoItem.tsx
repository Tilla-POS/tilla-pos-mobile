import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from '../ui/ThemedText';

interface InfoItemProps {
  // Define your props here
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const InfoItem: React.FC<InfoItemProps> = ({title, subtitle, icon}) => {
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
        <ThemedText weight="semiBold">{title}</ThemedText>
        <ThemedText variant="caption" color="tertiary" weight="regular">{subtitle}</ThemedText>
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
