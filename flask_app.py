import os, shutil, errno
from flask import Flask, render_template, request

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR = os.path.join(BASE_DIR, "upload/")

@app.route('/')
def hello_world():
    return render_template("app.html")

@app.route('/fetch', methods=['GET', 'POST'])
def fetch():
    # Clear the folder first
    for dir_file in os.listdir(UPLOAD_DIR):
        file_path = os.path.join(UPLOAD_DIR, dir_file)
        if os.path.isfile(file_path):
            os.unlink(file_path)
        elif os.path.isdir(file_path): shutil.rmtree(file_path)

    # Then upload new files
    files = request.files.to_dict()
    for key, file in files.items():
        filename = os.path.join(UPLOAD_DIR, file.name)
        if not os.path.exists(os.path.dirname(filename)):
            #try:
            os.makedirs(os.path.dirname(filename))
            #except OSError as exc: # Guard against race condition
                #if exc.errno != errno.EEXIST:
                    #raise
        file.save(filename)
    #return render_template("fetch_confirm.html")
    return "Upload was successful!"

#@app.route('/upload', methods=['GET', 'POST'])
#def upload():
#    return "Upload was successful!"

