# Project-3-

When running this code please make sure to run in terminal pip install pgeocode


We have created an application that can help weigh the option between buying and renting in different zip codes by comparing their price to rent ratios. In order to get the data for the application we webscraped zip codes from worldpopulationreview.com, used APIs to get rental data from Realty mole, read CSVs from Redfin for housing sales data, and imported locations in from the pgeocode library. The data was cleaned in Jupyter Notebooks using Pandas database framework. It was then placed into SQL databases using SQLAlchemy.  The data was further cleaned and merged into final tables with primary keys using SQL in pgAdmin 4. The website interactive elements were made with Leaflet and Plot.ly. Flask was used to set up the connection between the Database and the html. 
