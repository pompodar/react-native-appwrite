import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Client, Account } from "appwrite";
import { Oauthlogin } from "appwrite-rn";

//import your logo
import GoogleLogo from "./assets/GoogleLogo.svg";

export default function demo() {
const client = new Client();

  const appwriteAccount = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('67193f63002da27b2ff0') // Your project ID
;

  const [loggedIn, setLoggedIn] = useState(false);
  
  useEffect(() => {
    console.log("Output ", loggedIn);
  }, [loggedIn]);

  return (
    <View>
      <Oauthlogin
        provider="google"
        appwriteAccount={appwriteAccount}
        setLoggedIn={setLoggedIn}
        Logo={GoogleLogo}
        text="Google Login"
        style={{
          backgroundColor: "white",
          borderColor: colors.primary[500],
        }}
        // textStyle={{ color: "red" }}
      />
    </View>
  );
}