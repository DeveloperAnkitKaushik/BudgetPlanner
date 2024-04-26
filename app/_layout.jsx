import React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';

const HomeLayout = () => {
  const [fontsLoaded] = useFonts({
    reg: require('../assets/fonts/DMSans-Regular.ttf'),
    med: require('../assets/fonts/DMSans-Medium.ttf'),
    bold: require('../assets/fonts/DMSans-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="addNewCategory"
        options={{ headerShown: true, title: 'Add Category' }}
      />
      <Stack.Screen
        name="addNewCategoryItem"
        options={{ presentation: 'modal' }}
      />
    </Stack>
  );
};

export default HomeLayout;
