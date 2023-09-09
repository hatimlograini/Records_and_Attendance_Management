import cv2
import face_recognition
import pickle
import os
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://face-attendance-41b9d-default-rtdb.europe-west1.firebasedatabase.app/',
    'storageBucket': 'face-attendance-41b9d.appspot.com'
})

folderPath = 'Images'
PathList = os.listdir(folderPath)
imgList = []
userIds = []
for path in PathList:
    imgList.append(cv2.imread(os.path.join(folderPath, path)))
    userIds.append(os.path.splitext(path)[0])

    filename = f'{folderPath}/{path}'
    Bucket = storage.bucket()
    blob = Bucket.blob(filename)
    blob.upload_from_filename(filename)



print(userIds)

def findEncodings(imagesList):
    encodeList = []
    for img in imagesList:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)

    return encodeList
print("encode started ...")

encodeListknown = findEncodings(imgList)
encodeListknownWithids = [encodeListknown, userIds]
print("encode Complete")

file = open('EncodeFile.p', 'wb')
pickle.dump(encodeListknownWithids,file)
file.close()

print("file saved")


