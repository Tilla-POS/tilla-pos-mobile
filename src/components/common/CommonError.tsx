import {StyleSheet, View} from 'react-native';
import {ThemedText} from '../ui/ThemedText';
import {ThemedIconButton} from '../ui/ThemedIconButton';

type CommonErrorProps = {
  title: string;
  subTitle?: string | null;
  refetch?: () => void;
};

const CommonError: React.FC<CommonErrorProps> = ({
  title,
  subTitle = null,
  refetch = null,
}) => {
  return (
    <View style={styles.container}>
      <ThemedText variant="header" color="primary">
        {title}
      </ThemedText>
      {subTitle && (
        <ThemedText variant="body" color="tertiary">
          {subTitle}
        </ThemedText>
      )}
      {refetch && (
        <ThemedIconButton name="RefreshCcw" onPress={() => refetch()} />
      )}
    </View>
  );
};

export default CommonError;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
