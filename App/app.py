# Dependencies
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

# Database Setup
engine = create_engine('postgresql://postgres:{password}@localhost:5433/Rental and sale price')

# Reflect an existing database
Base = automap_base()

# Reflect Table
Base.prepare(engine, reflect=True)

# Save References to Tables
View = Base.classes.main_view2

# Create Session
session = Session(engine)

# Flask Setup
app = Flask(__name__)

# Flask Routes

# Landing Page
@app.route("/")
def home():
    return render_template("index.html")



# Data Pull
@app.route("/data")
def data():
    session = Session(engine)

    results = session.query(View.zipcode, View.city, View.county, View.population, View.medianprice, View.activelistingcount, View.avgprice, View.totalrentals, View.ratio)

    session.close()


    
    home_and_rent = []
    for zipcode, city, county, population, medianprice, activelistingcount, avgprice, totalrentals, ratio in results:
        home_rent = {}
        home_rent["zipcode"] = zipcode
        home_rent["city"] = city
        home_rent["county"] = county
        home_rent["population"] = population
        home_rent["medianprice"] = medianprice
        home_rent["activelistingcount"] = activelistingcount
        home_rent["avgprice"] = avgprice
        home_rent["totalrentals"] = totalrentals
        home_rent["ratio"] = ratio
        home_and_rent.append(home_rent)

    return jsonify(home_and_rent)


if __name__ == '__main__':
    app.run(debug=True)