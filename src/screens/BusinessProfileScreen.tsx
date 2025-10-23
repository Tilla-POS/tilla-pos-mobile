import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ThemedView} from '../components/ui/ThemedView';
import {ThemedIconButton} from '../components/ui/ThemedIconButton';
import Header from '../components/common/Header';
import {spacing} from '../theme';
import {ThemedAvatar} from '../components/ui/ThemedAvatar';
import {ThemedText} from '../components/ui/ThemedText';
import MenuGroup from '../components/common/MenuGropu';
import {ThemedIcon} from '../components/ui/ThemedIcon';
import InfoItem from '../components/common/InfoItem';
import {useBusiness} from '../hooks/useBusiness';
import CommonError from '../components/common/CommonError';

export const BUSINESS_PROFILE_SCREEN = 'BusinessProfileScreen'; // For navigation reference

const BusinessProfileScreen = () => {
  const {
    myBusiness,
    myBusinessLoading,
    myBusinessFetching,
    myBusinessError,
    refetchMyBusiness,
  } = useBusiness();
  let content = null;
  if (myBusinessLoading) {
    content = (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (myBusinessError) {
    content = (
      <CommonError
        title="Failed to load business data"
        refetch={refetchMyBusiness}
      />
    );
  } else if (!myBusiness) {
    content = (
      <CommonError
        title="No business data available."
        subTitle="Please check your internet connection and try again."
        refetch={refetchMyBusiness}
      />
    );
  } else {
    content = (
      <SafeAreaView style={styles.container}>
        <Header
          title="Business Profile"
          isCanGoBack={true}
          actionComp={<ThemedIconButton name="SquarePen" />}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={myBusinessFetching}
              onRefresh={refetchMyBusiness}
            />
          }>
          <View style={styles.header}>
            <ThemedAvatar source={{uri: myBusiness.image}} size={112} />
            <View style={styles.businessInfo}>
              <ThemedText variant="header" weight="bold">
                {myBusiness.name}
              </ThemedText>
              <ThemedText variant="caption" color="secondary">
                {myBusiness.businessType.name}
              </ThemedText>
            </View>
          </View>
          <View style={{gap: spacing[4]}}>
            <MenuGroup title="Contact Information">
              <InfoItem
                label="Email Address"
                value={myBusiness.shopkeeper.email || 'N/A'}
                icon={<ThemedIcon name="Mail" />}
              />
              <InfoItem
                label="Phone Number"
                value={myBusiness.shopkeeper.phone || 'N/A'}
                icon={<ThemedIcon name="Phone" />}
              />
              <InfoItem
                label="Address"
                value={'N/A'}
                icon={<ThemedIcon name="MapPinCheckInside" />}
              />
            </MenuGroup>
            <MenuGroup title="Business Detail">
              <InfoItem
                label="Business Type"
                value={myBusiness.businessType.name}
                icon={<ThemedIcon name="Store" />}
              />
              <InfoItem
                label="Currency"
                value={myBusiness.currency || 'N/A'}
                icon={<ThemedIcon name="DollarSign" />}
              />
            </MenuGroup>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <ThemedView background="primary" style={styles.container}>
      {content}
    </ThemedView>
  );
};

export default BusinessProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {alignItems: 'center', gap: spacing[4], marginVertical: spacing[4]},
  businessInfo: {alignItems: 'center'},
});
