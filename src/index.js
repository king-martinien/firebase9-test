import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    addDoc
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA9f9mR9gmcjByjcA5fnbvRHRyxVGsp1Ko",
    authDomain: "fir-9-1a222.firebaseapp.com",
    projectId: "fir-9-1a222",
    storageBucket: "fir-9-1a222.appspot.com",
    messagingSenderId: "1010224367965",
    appId: "1:1010224367965:web:b1ca5b3fcc35599c6980b4"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Init Services
const db = getFirestore(app);

// Collection Ref
const collectionRef = collection(db, 'students');

// Get Collection Data
getDocs(collectionRef)
    .then(snapshot => {
        // console.log(snapshot.docs);
        snapshot.forEach(doc => {
            // console.log(doc.data());
            // console.log(doc.id);
            console.log(
                {
                    id: doc.id,
                    ...doc.data()
                }
            );
        })
    })
    .catch(err => {
        console.log("There is an ERROR : ", err.message);
    })


// Adding a Sudent
const addStudentForm = document.querySelector('.add-student-form');
const btnForm = addStudentForm.querySelector('.btn');

addStudentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // console.log(addStudentForm);
    const span = document.createElement('span');
    span.classList.add('loading');
    btnForm.appendChild(span);

    const firstname = addStudentForm['firstname'].value;
    const lastname = addStudentForm['lastname'].value;
    const email = addStudentForm['email'].value;
    const phone = addStudentForm['phone'].value;

    if (firstname && lastname && email && phone) {

        addDoc(collectionRef, {
            firstname,
            lastname,
            email,
            phone
        }).then(() => {
            console.log("Student Added Successfully");
            addStudentForm.reset();
            btnForm.removeChild(span);
        })

    } else {
        console.log("All fields are required");
    }

})