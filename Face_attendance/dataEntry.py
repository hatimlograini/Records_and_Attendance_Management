from datetime import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from firebase_admin import storage
import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
import os
from PIL import Image, ImageTk

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://face-attendance-41b9d-default-rtdb.europe-west1.firebasedatabase.app/',
    'storageBucket': 'face-attendance-41b9d.appspot.com'
})

ref = db.reference('Users')

imgList = []
userIds = []


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


def upload_file():
    global img, imgList, userIds

    f_types = [('Image Files', ('*.png'))]
    filename = filedialog.askopenfilename(filetypes=f_types)

    img = Image.open(filename)
    img = img.resize((100, 100))
    img = ImageTk.PhotoImage(img)
    b2 = tk.Label(image_display_frame, image=img)
    b2.grid(row=0, column=3)

    imgList.append(filename)
    userIds.append(os.path.splitext(os.path.basename(filename))[0])


def enter_data():

    id_value = id_entry.get()
    name = first_name_entry.get()
    major = major_entry.get()
    year = int(year_entry.get())
    standing = standing_combobox.get()
    starting_year = int(starting_year_entry.get())
    last_attendance_time = last_attendance_time_entry.get()
    total_attendance = int(total_attendance_spinbox.get())

    data = {
        id_value: {
            "name": name,
            "position": major,
            "starting_year": starting_year,
            "total_attendance": total_attendance,
            "Department": standing,
            "year": year,
            "last_attendance_time": last_attendance_time
        }
    }

    ref.update(data)

    if imgList:
        index = len(imgList) - 1
        user_id = id_value
        img_filename = f'Images/{user_id}.png'

        pil_image = Image.open(imgList[index])

        pil_image.save(img_filename)

        bucket = storage.bucket()
        blob = bucket.blob(img_filename)
        blob.upload_from_filename(img_filename)

        print("Image uploaded successfully.")

    id_entry.delete(0, tk.END)
    first_name_entry.delete(0, tk.END)
    major_entry.delete(0, tk.END)
    year_entry.delete(0, tk.END)
    standing_combobox.set("")  # Clear combobox selection
    starting_year_entry.delete(0, tk.END)
    last_attendance_time_entry.delete(0, tk.END)
    total_attendance_spinbox.delete(0, tk.END)

    print("Data entered successfully!")


root = tk.Tk()

root.title("System attendance")

big_frame = ttk.Frame(root, padding=5)
big_frame.pack(fill="both", expand=True)
root.tk.call("source", "Azure/azure.tcl")
root.tk.call("set_theme", "light")

user_info_frame = ttk.LabelFrame(big_frame, text="Ajouter un employeé", padding=(5, 5))
user_info_frame.grid(row=2, column=0, padx=(10, 10), pady=(20, 10), sticky="nsew", columnspan=2)


id_label = tk.Label(user_info_frame, text="ID")
id_entry = ttk.Entry(user_info_frame)
id_label.grid(row=0, column=0, padx=5, pady=10)
id_entry.grid(row=1, column=0, padx=5, pady=10)
id_entry.configure(width=30)

first_name_label = tk.Label(user_info_frame, text="Nom Complet")
first_name_entry = ttk.Entry(user_info_frame)
first_name_label.grid(row=0, column=1, padx=5, pady=10)
first_name_entry.grid(row=1, column=1, padx=5, pady=10)
first_name_entry.configure(width=30)

major_label = tk.Label(user_info_frame, text="Position ")
major_entry = ttk.Entry(user_info_frame)
major_label.grid(row=0, column=2, padx=5, pady=10)
major_entry.grid(row=1, column=2, padx=5, pady=10)
major_entry.configure(width=30)

starting_year_label = tk.Label(user_info_frame, text="Année de début")
starting_year_entry = ttk.Entry(user_info_frame)
starting_year_label.grid(row=0, column=3, padx=5, pady=10)
starting_year_entry.grid(row=1, column=3, padx=5, pady=10)
starting_year_entry.configure(width=30)

total_attendance_label = tk.Label(user_info_frame, text="Présence totale")
total_attendance_spinbox = ttk.Spinbox(user_info_frame, from_=0, to=100000)
total_attendance_label.grid(row=2, column=0, padx=5, pady=10)
total_attendance_spinbox.grid(row=3, column=0, padx=5, pady=10)
total_attendance_spinbox.configure(width=30)

standing_label = tk.Label(user_info_frame, text="Département")
standing_combobox = ttk.Combobox(user_info_frame, values=["Dép. Investissements", "Dép. Exploitation eau et Assainissement", "Dép. Exploitation Electricité", "Dép. Clientèle & Marketing", "Dép. Système d'information", "Dép. Achat et logistique", "Dép. RH et Affaires administratives", "Dép. Financier et Comptable"])
standing_label.grid(row=2, column=1, padx=5, pady=10)
standing_combobox.grid(row=3, column=1, padx=5, pady=10)
standing_combobox.configure(width=30)

year_label = tk.Label(user_info_frame, text="Année")
year_entry = ttk.Entry(user_info_frame)
year_label.grid(row=2, column=2, padx=5, pady=10)
year_entry.grid(row=3, column=2, padx=5, pady=10)
year_entry.configure(width=30)

last_attendance_time_label = tk.Label(user_info_frame, text="Dernière heure de présence")
last_attendance_time_entry = ttk.Entry(user_info_frame)
last_attendance_time_label.grid(row=2, column=3, padx=5, pady=10)
last_attendance_time_entry.grid(row=3, column=3, padx=5, pady=10)
last_attendance_time_entry.configure(width=30)


image_display_frame = ttk.Frame(user_info_frame)
image_display_frame.grid(row=1, column=4, rowspan=4, padx=10)
 

image_path_label = tk.Label(user_info_frame, text="Image")
image_path_entry = ttk.Button(user_info_frame, text='Sélectionner une image', command=upload_file)
image_path_label.grid(row=4, column=0)
image_path_entry.grid(row=5, column=0, columnspan=1, sticky="ew", padx=5, pady=10)

img_button = tk.Label(image_display_frame, text="Image sélectionnée", padx=5, pady=20)
img_button.grid(row=1, column=3, padx=5, pady=10)


enter_button = ttk.Button(big_frame, text="Enregistrer les données", command=enter_data, style='Accent.TButton')
enter_button.grid(row=3, column=0, padx=20, pady=10)

process_button = ttk.Button(big_frame, text="Traiter l'image", command=process_images_and_data, style='Accent.TButton')
process_button.grid(row=3, column=1, padx=20, pady=10)


# Main loop
root.mainloop()
