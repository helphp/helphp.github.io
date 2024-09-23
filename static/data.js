import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
import { getDatabase, ref, onValue, onChildAdded, onChildChanged, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { firebaseConfig } from "./firebase.config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

signInAnonymously(auth).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});

const analytics = getAnalytics(app);
const db = getDatabase(app);
const dbRef = ref(db, 'github_messages');

function display_message(){
    if(messages.length > 0){
        if(!messagesDisplayed){
            const divText = document.getElementById('github-text')
            divText.classList.remove('github-text-off');
            divText.classList.add('github-text-on');
            messagesDisplayed = true;
        }
        document.getElementById('github-text-span').innerHTML = messages.shift();
    }
    setTimeout(display_message, 5000);
}

let messages = [];
let messagesFirst = false;
let messagesDisplayed = false;
onChildAdded(dbRef, (data) => {
    messages.push(data.val());
    if(!messagesFirst){
        messagesFirst = true;
        setTimeout(display_message, 2000);
    }
});
