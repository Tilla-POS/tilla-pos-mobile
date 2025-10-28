import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ThemedView} from '../components/ui/ThemedView';
import Header from '../components/common/Header';
import {ThemedButton} from '../components/ui/ThemedButton';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedIcon} from '../components/ui/ThemedIcon';
import {useTheme} from '../hooks/useTheme';
import MenuGroup from '../components/common/MenuGropu';
import DeviceInfoItem from '../components/specifics/devices/DeviceInfoItem';
import {useDevice} from '../hooks/useDevice';
import CommonError from '../components/common/CommonError';
import {Device} from '../services/devicesService';

export const DEVICES_SCREEN = 'DevicesScreen'; // For navigation reference

const DevicesScreen = () => {
  const {spacing, radius} = useTheme();
  const {
    devices,
    isLoadingDevices,
    isFetchingDevices,
    errorDevices,
    refetchDevices,
  } = useDevice();

  let content = null;
  if (isLoadingDevices) {
    content = (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    ); // You can add a loading indicator here
  } else if (errorDevices) {
    content = (
      <CommonError title="Failed to load devices" refetch={refetchDevices} />
    ); // You can add an error component here
  } else if (!devices) {
    content = (
      <CommonError
        title="No devices found."
        subTitle="Please check your internet connection and try again."
        refetch={refetchDevices}
      />
    ); // You can add a no data component here
  } else {
    content = (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isFetchingDevices}
            onRefresh={refetchDevices}
          />
        }>
        <View style={{gap: spacing[4]}}>
          <View
            style={[
              styles.row,
              {
                gap: spacing[2],
                paddingHorizontal: spacing[4],
              },
            ]}>
            <View style={[styles.content, {gap: spacing[1]}]}>
              <ThemedText variant="caption" color="tertiary">
                Web Application
              </ThemedText>
              <ThemedText variant="body" weight="bold">
                Manage your business from anywhere.
              </ThemedText>
              <ThemedText variant="caption" color="tertiary">
                Link your web app for seamless access.
              </ThemedText>
              <ThemedButton
                title="Link Web App"
                variant="secondary"
                size="xs"
                onPress={() => {}}
                icon="QrCode"
              />
            </View>
            <ThemedView
              background="secondary"
              style={[
                styles.iconBox,
                {padding: spacing[2], borderRadius: radius.sm},
              ]}>
              <ThemedIcon name="MonitorSmartphone" customSize={48} />
            </ThemedView>
          </View>
          <MenuGroup title="Current Device">
            <DeviceInfoItem
              deviceModel={devices.currentDevice.model || 'Unknown Device'}
              location={
                `${devices.currentDevice.locations[0].city}, ${devices.currentDevice.locations[0].country}` ||
                'Unknown Location'
              }
              lastSeenAt={
                devices.currentDevice.lastActivityAt || 'Unknown Time'
              }
              icon={<ThemedIcon name="Smartphone" size="md" />}
            />
          </MenuGroup>
          <View
            style={{
              paddingHorizontal: spacing[4],
              gap: spacing[1],
            }}>
            <ThemedButton
              title="Terminate All Other Sessions"
              variant="danger"
              size="sm"
              fullWidth
              onPress={() => {}}
            />
            <ThemedText variant="caption" color="tertiary">
              Logs out all devices except for this one
            </ThemedText>
          </View>
          <MenuGroup title="Active Session Devices">
            {devices.activeDevices.map((device: Device) => (
              <DeviceInfoItem
                key={device.id}
                deviceModel={device.model || 'Unknown Device'}
                location={
                  `${device.locations[0].city}, ${device.locations[0].country}` ||
                  'Unknown Location'
                }
                lastSeenAt={device.lastActivityAt || 'Unknown Time'}
                icon={<ThemedIcon name="Smartphone" size="md" />}
              />
            ))}
          </MenuGroup>
          <MenuGroup title="Inactive Session Devices">
            {devices.inactiveDevices.map((device: Device) => (
              <DeviceInfoItem
                key={device.id}
                deviceModel={device.model || 'Unknown Device'}
                location={
                  `${device.locations[0].city}, ${device.locations[0].country}` ||
                  'Unknown Location'
                }
                lastSeenAt={device.lastActivityAt || 'Unknown Time'}
                icon={<ThemedIcon name="Smartphone" size="md" />}
              />
            ))}
          </MenuGroup>
        </View>
      </ScrollView>
    ); // Main content will be rendered below
  }

  return (
    <ThemedView background="primary" style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Header title="Devices" isCanGoBack={true} />
        {content}
      </SafeAreaView>
    </ThemedView>
  );
};

export default DevicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  iconBox: {
    width: 125,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
