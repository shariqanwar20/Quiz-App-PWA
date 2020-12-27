/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js");


firebase.initializeApp({
    apiKey: "AIzaSyAgu9aY0ybeq4DSRitv1_OrYewjy37IAYc",
    authDomain: "quiz-app-messaging.firebaseapp.com",
    projectId: "quiz-app-messaging",
    storageBucket: "quiz-app-messaging.appspot.com",
    messagingSenderId: "790080562390",
    appId: "1:790080562390:web:495ed692bf36cf0bcc5577"
  });

firebase.messaging();