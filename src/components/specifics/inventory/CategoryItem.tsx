import {ThemedText} from '@/components/ui';
import {useTheme} from '@/hooks/useTheme';
import {formatURL} from '@/utils/formatURL';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

type CategoryItemProps = {
  imageUrl: string;
  title: string;
};

const CategoryItem: React.FC<CategoryItemProps> = ({imageUrl, title}) => {
  const {spacing} = useTheme();
  console.log('Image URL:', formatURL(imageUrl));
  return (
    <View style={[style.container, {gap: spacing[2]}]}>
      <Image source={{uri: formatURL(imageUrl)}} width={40} height={40} />
      <ThemedText variant="body">{title}</ThemedText>
    </View>
  );
};

export default CategoryItem;

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
