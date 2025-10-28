import {StyleSheet, View} from 'react-native';
import {useTheme} from '../../../hooks/useTheme';
import {ThemedText} from '../../ui/ThemedText';
import {ThemedIcon} from '../../ui/ThemedIcon';

interface DeviceInfoItemProps {
  // Define your props here
  deviceModel: string;
  location: string;
  lastSeenAt: string;
  icon: React.ReactNode;
}

const formateDate = (str: string) => {
  const d = new Date(str);
  if (isNaN(d.getTime())) {
    return 'Unknown';
  }
  const sec = Math.floor((Date.now() - d.getTime()) / 1000);
  if (sec < 60) {
    return `${sec}s ago`;
  }
  const min = Math.floor(sec / 60);
  if (min < 60) {
    return `${min}m ago`;
  }
  const hr = Math.floor(min / 60);
  if (hr < 24) {
    return `${hr}h ago`;
  }
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const DeviceInfoItem: React.FC<DeviceInfoItemProps> = ({
  deviceModel,
  location,
  lastSeenAt,
  icon,
}) => {
  const {theme, radius, spacing} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: spacing[4], gap: spacing[2]},
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
        <ThemedText weight="semiBold">{deviceModel}</ThemedText>
        <View style={[styles.row, {gap: spacing[1]}]}>
          <ThemedIcon name="MapPin" size="xs" color="tertiary" />
          <ThemedText variant="caption" color="tertiary" weight="regular">
            {location}
          </ThemedText>
        </View>
        <View style={[styles.row, {gap: spacing[1]}]}>
          <ThemedIcon name="Calendar" size="xs" color="tertiary" />
          <ThemedText variant="caption" color="tertiary" weight="regular">
            Last seen at {formateDate(lastSeenAt)}
          </ThemedText>
        </View>
      </View>
    </View>
  );
};

export default DeviceInfoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
