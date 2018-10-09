from flask import Flask, jsonify, render_template
from flask.ext.cache import Cache
import re
from os import listdir
from os.path import isfile, join, dirname

app = Flask(__name__)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

image_regex = re.compile(r'\.(jpg|png)')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/images')
def images():
    image_path = 'static/images'
    images = [f for f in listdir(join(dirname(__file__), image_path)) if isfile(join(dirname(__file__), image_path, f)) and (image_regex.search(f))]
    return jsonify({'photos': images})
