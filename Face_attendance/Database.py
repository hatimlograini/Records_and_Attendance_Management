import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://face-attendance-41b9d-default-rtdb.europe-west1.firebasedatabase.app/'
})

ref = db.reference('Users')
data = {
    "133444":
        {
            "name": "Hatim Lograini",
            "Position": "informatique",
            "starting_year": 2017,
            "total_attendance": 6,
            "Department": "Dép. Investissements",
            "year": 4,
            "last_attendance_time": "2022-12-11 00:54:34"
        },
    "123456":
            {
                "name": "Obama",
                "Position": "president",
                "starting_year": 2017,
                "total_attendance": 6,
                "Department": "Dép. Investissements",
                "year": 4,
                "last_attendance_time": "2022-12-11 00:54:34"
            },
    "852741":
            {
                "name": "Emly Blunt",
                "Position": "informatique",
                "starting_year": 2018,
                "total_attendance": 12,
                "Department": "Dép. Investissements",
                "year": 1,
                "last_attendance_time": "2022-12-11 00:54:34"
            },
    "963852":
            {
                "name": "Elon Musk",
                "Position": "Physics",
                "starting_year": 2020,
                "total_attendance": 7,
                "Department": "Dép. Investissements",
                "year": 2,
                "last_attendance_time": "2022-12-11 00:54:34"
            },
    "155621":
            {
                "name": "Dua lipa",
                "Position": "singer",
                "starting_year": 2021,
                "total_attendance": 8,
                "Department": "Dép. Investissements",
                "year": 2,
                "last_attendance_time": "2022-12-11 00:54:34"
            },
}

for key, value in data.items():
    ref.child(key).set(value)

