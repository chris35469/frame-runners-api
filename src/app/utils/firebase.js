// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { firebaseConfig } from './fb-config';

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
//const dbRef = ref(getDatabase(fb));
const database = getDatabase(fb);

export const getData = async (path) => {
    const dbRef = ref(getDatabase());
    let res = await get(child(dbRef, path)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val()
        } else {
            console.log("No data available");
            return null
        }
    }).catch((error) => {
        console.error(error);
    });
    return res
}

export const setData = (path, payload) => {
    let db = getDatabase();
    set(ref(db, path), payload);
}

//export const analytics = getAnalytics(app);