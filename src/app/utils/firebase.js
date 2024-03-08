// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { firebaseConfig } from './fb-config';

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
//const database = getDatabase(fb);

export const getData = async () => {
    const dbRef = ref(getDatabase(fb));
    let res = await get(child(dbRef, `game-state`)).then((snapshot) => {
        if (snapshot.exists()) {
            //console.log(snapshot.val());
            return snapshot.val()
        } else {
            console.log("No data available");
            return "error"
        }
    }).catch((error) => {
        console.error(error);
    });

    return res
}

//export const analytics = getAnalytics(app);