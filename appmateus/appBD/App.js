import React, {useEffect} from "react";
import Routes from './src/routes';
import FlashMessage from "react-native-flash-message";

import AppLoading from 'expo-app-loading';


import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';


export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  });


  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
    <Routes />
    <FlashMessage icon="auto" duration={5500} style={{ marginTop: 0 }} />
    </>
  );

}
