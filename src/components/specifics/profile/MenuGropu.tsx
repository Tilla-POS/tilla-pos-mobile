import {View} from 'react-native';
import {ThemedText} from '../../ui/ThemedText';
import {useTheme} from '../../../hooks/useTheme';

type MenuGroupProps = {
  title: string;
  children: React.ReactNode;
};

const MenuGroup: React.FC<MenuGroupProps> = ({title, children}) => {
  const {spacing} = useTheme();
  return (
    <View style={{gap: spacing[4]}}>
      <ThemedText
        variant="h4"
        weight="bold"
        style={{paddingHorizontal: spacing[3]}}>
        {title}
      </ThemedText>
      {children}
    </View>
  );
};

export default MenuGroup;
