## This is a simple Next.js with firebase db and auth starting template

Built with

- firebase
- next.js
- tailwind csss
- user auth is handled with the context api
- google and email/password providers

steps for starting

1. run npm install
2. Create a .env.local file and add your firebase keys in there
3. Create firebase app, enable authorization and firestore.
4. Be sure to enable the auth providers you want in authorization in signInMethods in the authorization section.
5. in firestore, I faced issues with adding users into firestore at first but learned there was things to do with the rules. So what I did was go to cloud firestore tab, rules and change the allow read to - allow read, write: if request.auth != null;

## utils

in firebase.js

- we get the dependencies from firebase and import the firebase config. It is recommended for production to put each config item inside a .env file and called to prevent people from seeing your sensitive keys.
- initialize firebase app
- we will export out the things we need such as auth, db, now, storage, or any provider (google is the provider I used but is easy to call any provider starting with new firebase.auth(--provider name---)

## created a hooks folder and added useAuth.js

- creates our context api which will be used to wrap our entire app so it has access to the user instance.
- You can use Redux or any other state manager you want, but for simplicity sake we are using context api.
- wrote login, signUp, createUser (this stores the user inside firestore, so if you want your users to have more than just userId and email associated with the user, you can also include that.), handleAuthStateChanged for when refreshing or leaving the page the user instance remainds without having to login over and over again from every signUp.
