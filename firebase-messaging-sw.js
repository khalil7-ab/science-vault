
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCwnh4g3EJ1Sl7C_xHsaO5GfVauj_Tb8FE",
  authDomain: "scivault.firebaseapp.com",
  projectId: "scivault",
  storageBucket: "scivault.firebasestorage.app",
  messagingSenderId: "259522826550",
  appId: "1:259522826550:web:3ba74241e9d882c2736397"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title =
    payload.notification?.title || "Nouvel article sur SciVault";

  const options = {
    body:
      payload.notification?.body ||
      "Découvrez le nouvel article scientifique.",
    icon: "./favicon.ico",
    data: {
      url: "https://khalil7-ab.github.io/science-vault/"
    }
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const url =
    event.notification.data?.url ||
    "https://khalil7-ab.github.io/science-vault/";

  event.waitUntil(clients.openWindow(url));
});
