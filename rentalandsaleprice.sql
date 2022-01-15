select *
FROM rand_zip;

select *
FROM home_prices_df;

select *
FROM rental_data;

----------random zip file + rental data file-------------
CREATE VIEW random_and_rental AS
SELECT rand_zip.zipcode SERIAL PRIMARY KEY
	, rand_zip.city VARCHAR (30) NOT NULL
	, rand_zip.county VARCHAR (30) NOT NULL
	, rand_zip.population INT
	, rental_data.avgprice INT
	, rental_data.totalrentals INT
	, COUNT(*) AS count
FROM rand_zip
JOIN rental_data
ON rand_zip.zipcode = rental_data.zipcode
GROUP BY rand_zip.zipcode 
	, rand_zip.city
	, rand_zip.county
	, rand_zip.population
	, rental_data.avgprice
	, rental_data.totalrentals
HAVING COUNT (*) > 1
;

SELECT *
FROM random_and_rental

----------random zip file + home sale data file-------------

CREATE VIEW random_and_sales AS
SELECT rand_zip.zipcode SERIAL PRIMARY KEY
	, rand_zip.city VARCHAR (30) NOT NULL
	, rand_zip.county VARCHAR (30) NOT NULL
	, rand_zip.population INT
	, home_prices_df.medianprice INT
	, home_prices_df.activelistingcount, COUNT(*) AS count
FROM rand_zip
JOIN home_prices_df
ON rand_zip.zipcode = home_prices_df.zipcode
GROUP BY rand_zip.zipcode
	, rand_zip.city, rand_zip.county
	, rand_zip.population
	, home_prices_df.medianprice
	, home_prices_df.activelistingcount
HAVING COUNT (*) > 1
;

SELECT *
FROM random_and_sales;

----------JOIN of random_and_sales and random_and_rental-------------
-- CREATE VIEW sales_and_rental AS
SELECT random_and_sales.zipcode SERIAL PRIMARY KEY
	, random_and_sales.city VARCHAR (30) NOT NULL
	, random_and_sales.county VARCHAR (30) NOT NULL
	, random_and_sales.population INT
	, random_and_sales.medianprice INT
	, random_and_sales.activelistingcount INT
	, random_and_rental.avgprice INT
	, random_and_rental.totalrentals INT
	, COUNT(*) AS count
FROM random_and_rental
JOIN random_and_sales
ON random_and_sales.zipcode = random_and_rental.zipcode
GROUP BY random_and_sales.zipcode
	, random_and_sales.city
	, random_and_sales.county
	, random_and_sales.population
	, random_and_sales.activelistingcount
	, random_and_rental.avgprice
	, random_and_rental.totalrentals
	, random_and_sales.medianprice
HAVING COUNT (*) > 1
;

------joining rental and sales tables-----
CREATE VIEW sales_and_rental AS
select rental_data.zipcode SERIAL PRIMARY KEY
	, rental_data.avgprice INT
	, home_prices_df.medianprice INT
FROM rental_data
JOIN home_prices_df
ON home_prices_df.zipcode = rental_data.zipcode
GROUP BY rental_data.zipcode
	, rental_data.avgprice
	, home_prices_df.medianprice
	
select *
FROM sales_and_rental

----price to rent ratio = median sale/median annual rent
CREATE VIEW pricetorentratio AS
SELECT zipcode SERIAL PRIMARY KEY
	, sales_and_rental.medianprice/(sales_and_rental.avgprice*12) as ratio
	, avgprice
	, medianprice
FROM sales_and_rental;

CREATE VIEW pricetorent_rounded AS
select 	zipcode SERIAL PRIMARY KEY
	, cast(ratio as decimal(10,2)) INT
	, avgprice INT
	, medianprice INT
FROM pricetorentratio;

select *
FROM pricetorent_rounded
-- ALTER TABLE sales_and_rental
-- ADD (sales_and_rental.medianprice)/(sales_and_rental.avgprice*12) AS ratio