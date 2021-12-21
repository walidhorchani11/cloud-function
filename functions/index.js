const functions = require("firebase-functions");

const admin = require('firebase-admin');

admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// takse the test parameter passed to this http endpoint and insert it into 
// firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  try {
     // grab the test parameter
  const original = req.query.text;

  //push the new message into firestore using firebase admin sdk
  const writeResult = await admin.firestore().collection('messages').add({original: original});
   
  // send back a message that we have successfully written the message
  res.json({reuslt: `Message with ID: ${writeResult.id} added.`})
  } catch (error) {
  console.log("🚀 ~ file: index.js ~ line 29 ~ exports.addMessage=functions.https.onRequest ~ error", error)
    
  }
 
})


// listen for new message added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
  .onCreate((snap, context) => {
    //grab the current value of what was writenn to firestore
    const original = snap.data().original;

    //access the parameter `{documentId}` with context.params
    functions.logger.log('Uppercasing', context.params.documentId, original);

    const uppercase = original.toUpperCase();

    //You must return a Promise when performinf async tasks inside a functions such as writing to firestore
    // setting an uppercase field in firestore document returns a promise
    return snap.ref.set({uppercase}, {merge: true});
    

  })


  // https callable functions
  exports.saveComment = functions.https.onCall((data, context) => {
    console.log('context -----------', context);
    return admin.database().ref('comments').push({message: `hello walidos`}).then((res) => {
      console.log('res ----------------', res);
    })
  
  })