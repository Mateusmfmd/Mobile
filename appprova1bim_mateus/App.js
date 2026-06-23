import React, {useEffect} from "react";
import Routes from "./src/routes";
import FlashMessage from "react-native-flash-message";

export default function App() {
  

  return (
    <>
    <Routes />
    <FlashMessage icon="auto" duration={5500} style={{ marginTop: 0 }} />
    </>
  );
}

