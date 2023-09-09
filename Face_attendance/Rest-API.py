from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from flask import Flask, jsonify
from flask_cors import CORS
from firebase_admin import storage
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://face-attendance-41b9d-default-rtdb.europe-west1.firebasedatabase.app/',
    'storageBucket': 'face-attendance-41b9d.appspot.com'
})

@app.route('/api/users', methods=['GET'])
def get_users():
    try:
        ref = db.reference('Users')
        data = ref.get()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/users/today', methods=['GET'])
def get_users_today():
    try:
        ref = db.reference('Users')
        today = datetime.now().strftime("%Y-%m-%d")
        user_list = []

        for user_id, user_data in ref.get().items():
            last_attendance_time = user_data.get("last_attendance_time")
            if last_attendance_time.startswith(today):
                user_list.append({user_id: user_data})

        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        ref = db.reference('Users')
        ref.child(user_id).delete()

        img_filename = f'Images/{user_id}.png'

        bucket = storage.bucket()
        picture_blob = bucket.blob(img_filename)
        picture_blob.delete()

        local_img_path = f'./Images/{user_id}.png'
        if os.path.exists(local_img_path):
            os.remove(local_img_path)

        process_images_and_data()

        return jsonify({'message': f'User {user_id} deleted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def process_images_and_data():
    import cv2
    import face_recognition
    import pickle
    import os
    from firebase_admin import storage
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
    pickle.dump(encodeListknownWithids, file)
    file.close()

    print("file saved")


if __name__ == '__main__':
    app.run(debug=True)
