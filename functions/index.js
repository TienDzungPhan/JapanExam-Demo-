const admin = require('firebase-admin') // Firebase admin instace to interact with firestore
admin.initializeApp()

exports.answers = require('./groups/answers')
