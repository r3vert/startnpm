const auth = firebase.auth();
const whenSignedIn = document.getElementById("whenSignedIn")
const whenSignedOut = document.getElementById("whenSignedOut")
const listforthings = document.getElementById("listforthings")
const db = firebase.firestore();
let thingsRef;
let unsubscribe; 
const signInBtn = document.getElementById("signInBtn")
const signOutBtn = document.getElementById("signOutBtn")
const createThing = document.getElementById("createThing")
const thingsList = document.getElementById("thingslist")
const userdetails = document.getElementById("UserDetails")
const provider = new firebase.auth.GoogleAuthProvider();

signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut()
auth.onAuthStateChanged(user =>{
  if(user){
    whenSignedIn.hidden = false
    whenSignedOut.hidden = true
    listforthings.hidden = false
    thingsRef = db.collection("things")

    createThing.onclick = () => {
      thingsRef.add({
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: Date.now()
      });
    }
  }
  else{
    whenSignedIn.hidden = true
    whenSignedOut.hidden = false
    listforthings.hidden = true
  }
  unsubscribe = thingsRef
    .where('uid', '==', user.uid)
    .onSnapshot(querySnaphot =>{

     const items = querySnaphot.docs.map(doc => {
       return `<li>${doc.data().name }</li>`
     })
     thingsList.innerHTML = items.join(''); 
    })
});
