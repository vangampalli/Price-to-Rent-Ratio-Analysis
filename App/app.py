# Dependencies
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# Database Setup
engine = create_engine('postgresql://postgres:7eUTEhM4!pRdxBG@localhost:5433/Rental and sale price')

# Reflect an existing database
Base = automap_base()

# Reflect Table
Base.prepare(engine, reflect=True)

# Save References to Tables
Home = Base.classes.home_prices_df
Rent = Base.classes.rental_data
Zip =  Base.classes.rand_zip

# Create Session
session = Session(engine)

# Flask Setup
app = Flask(__name__)

# Flask Routes

# Landing Page
@app.route("/")
def home():
    return(f"Welcome Home")



# Data Pull
@app.route("/api/v1.0/data")
def data():
    session = Session(engine)

    results = session.query(Home.zipcode, Zip.city, Zip.county, Zip.population, Home.medianprice, Home.activelistingcount, Rent.avgprice, Rent.totalrentals)

    session.close()
    
    home_and_rent = []
    for zipcode, city, county, population, medianprice, activelistingcount, avgprice, totalrentals in results:
        home_rent = {}
        home_rent["zipcode"] = zipcode
        home_rent["city"] = city
        home_rent["county"] = county
        home_rent["population"] = population
        home_rent["medianprice"] = medianprice
        home_rent["activelistingcount"] = activelistingcount
        home_rent["avgprice"] = avgprice
        home_rent["totalrentals"] = totalrentals
        home_and_rent.append(home_rent)

    return jsonify(home_and_rent)


if __name__ == '__main__':
    app.run(debug=True)