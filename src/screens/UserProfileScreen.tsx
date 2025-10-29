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
import {ThemedIconButton} from '../components/ui/ThemedIconButton';
import {ThemedText} from '../components/ui/ThemedText';
import {ThemedAvatar} from '../components/ui/ThemedAvatar';
import {spacing} from '../theme';
import MenuGroup from '../components/common/MenuGropu';
import InfoItem from '../components/common/InfoItem';
import {ThemedIcon} from '../components/ui/ThemedIcon';
import {useUser} from '../hooks/useUser';
import CommonError from '../components/common/CommonError';

export const USER_PROFILE_SCREEN = 'UserProfile'; // For navigation reference

const UserProfileScreen = () => {
  const {
    currentUser,
    currentUserLoading,
    currentUserFetching,
    currentUserError,
    refetchCurrentUser,
  } = useUser();

  let content = null;

  if (currentUserLoading) {
    content = (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else if (currentUserError) {
    content = (
      <CommonError
        title="Failed to load use data"
        refetch={refetchCurrentUser}
      />
    );
  } else if (!currentUser) {
    content = (
      <CommonError
        title="No user data available."
        subTitle="Please check your internet connection and try again."
        refetch={refetchCurrentUser}
      />
    );
  } else {
    content = (
      <SafeAreaView style={styles.container}>
        <Header
          title="Profile"
          isCanGoBack={true}
          actionComp={<ThemedIconButton name="SquarePen" />}
        />
        {/* User profile content goes here */}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={currentUserFetching}
              onRefresh={refetchCurrentUser}
            />
          }>
          <View>
            <View style={styles.header}>
              <ThemedAvatar size={112} />
              <View style={styles.userInfo}>
                <ThemedText variant="header" weight="bold">
                  {currentUser.username || 'N/A'}
                </ThemedText>
                <ThemedText variant="caption" color="secondary">
                  Business Owner
                </ThemedText>
              </View>
            </View>
            <View style={{gap: spacing[4]}}>
              <MenuGroup title="Profile Information">
                <InfoItem
                  title="User Name"
                  subtitle={currentUser.username || 'N/A'}
                  icon={<ThemedIcon name="User" />}
                />
                <InfoItem
                  title="Email Address"
                  subtitle={currentUser.email || 'N/A'}
                  icon={<ThemedIcon name="Mail" />}
                />
                <InfoItem
                  title="Phone Number"
                  subtitle={currentUser.phone || 'N/A'}
                  icon={<ThemedIcon name="Phone" />}
                />
              </MenuGroup>
              <MenuGroup title="Business Information">
                <InfoItem
                  title="Business Name"
                  subtitle={currentUser.business?.name || 'N/A'}
                  icon={<ThemedIcon name="BriefcaseBusiness" />}
                />
                <InfoItem
                  title="Business Address"
                  subtitle={currentUser.business?.slug || 'N/A'}
                  icon={<ThemedIcon name="MapPinCheckInside" />}
                />
              </MenuGroup>
            </View>
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

export default UserProfileScreen;

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
  userInfo: {alignItems: 'center'},
  avatar: {width: '100%', height: '100%', resizeMode: 'cover'},
  avatarPlaceHolder: {textAlign: 'center', fontSize: 12},
});
