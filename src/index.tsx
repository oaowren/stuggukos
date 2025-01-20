import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { FirebaseDatabaseProvider } from "@react-firebase/database";
import firebase from "firebase";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import "./index.css";

const link = createHttpLink({
  uri: "https://api.entur.io/journey-planner/v3/graphql",
  headers: {
    "ET-Client-Name": "Odd_Andre_Owren-departureboard",
  },
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const firebaseConfig = {
  apiKey: "AIzaSyAJs3CfaIbuTDPt4ZpeKqU6v3vT_WV6iwI",
  authDomain: "stuggukos.firebaseapp.com",
  databaseURL:
    "https://stuggukos-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "stuggukos",
  storageBucket: "stuggukos.appspot.com",
  messagingSenderId: "312324516618",
  appId: "1:312324516618:web:c721867f0630cd62d6a8f3",
};

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FirebaseDatabaseProvider firebase={firebase} {...firebaseConfig}>
        <App />
      </FirebaseDatabaseProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
