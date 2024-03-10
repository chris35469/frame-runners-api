// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, query, orderByChild } from "firebase/database";
import { firebaseConfig } from './fb-config';
import _ from "lodash"


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

export const getSortedData = async (path, childToOrderBy, order = "asc") => {
    const dbRef = query(ref(getDatabase(), path), orderByChild(childToOrderBy));
    let result = await get(dbRef).then((snapshot) => {
        let res = snapshot.val()
        let sorted_obj = _.orderBy(res, ["horse_place"], [order]);
        if (sorted_obj.length > 10 && (order == "asc")) sorted_obj.pop() // removed undefined element
        if (sorted_obj.length > 10 && (order == "desc")) sorted_obj.shift() // removed undefined element
        return sorted_obj
    })
    return result
}

//export const analytics = getAnalytics(app);