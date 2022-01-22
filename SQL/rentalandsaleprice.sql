select *
FROM rand_zip;
select *
FROM home_prices_df;
select *
FROM rental_data;

ALTER TABLE rand_zip ADD PRIMARY KEY(zipcode);
ALTER TABLE home_prices_df ADD PRIMARY KEY(zipcode);
ALTER TABLE rental_data ADD PRIMARY KEY(zipcode);
----------random zip file + rental data file-------------
CREATE VIEW random_and_rental AS
SELECT rand_zip.zipcode
     , rand_zip.city
     , rand_zip.county
    , rand_zip.population
	, rental_data.avgprice
    , rental_data.totalrentals
FROM rand_zip
JOIN rental_data
ON rand_zip.zipcode = rental_data.zipcode
GROUP BY rand_zip.zipcode 
     , rand_zip.city
     , rand_zip.county
    , rand_zip.population
     , rental_data.avgprice
    , rental_data.totalrentals
;
SELECT *
FROM random_and_rental

----------random zip file + home sale data file-------------
CREATE VIEW random_and_sales AS
SELECT rand_zip.zipcode
    , rand_zip.city
    , rand_zip.county
    , rand_zip.population
    , home_prices_df.medianprice
    , home_prices_df.activelistingcount
FROM rand_zip
JOIN home_prices_df
ON rand_zip.zipcode = home_prices_df.zipcode
GROUP BY rand_zip.zipcode
    , rand_zip.city, rand_zip.county
    , rand_zip.population
    , home_prices_df.medianprice
    , home_prices_df.activelistingcount
;
SELECT *
FROM random_and_sales;
----------JOIN of random_and_sales and random_and_rental-------------
CREATE VIEW sales_and_rental AS
SELECT random_and_sales.zipcode
    , random_and_sales.city
    , random_and_sales.county 
    , random_and_sales.population 
    , random_and_sales.medianprice 
    , random_and_sales.activelistingcount
    , random_and_rental.avgprice
    , random_and_rental.totalrentals
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
;

SELECT *
FROM sales_and_rental;

---price to rent ratio-----
CREATE VIEW pricetorentratio AS
SELECT zipcode
    , sales_and_rental.medianprice/(sales_and_rental.avgprice*12) as ratio
    , avgprice
    , medianprice
FROM sales_and_rental;
CREATE VIEW pricetorent_rounded AS
select  zipcode
    , cast(ratio as decimal(10,2))
    , avgprice
    , medianprice
FROM pricetorentratio;
select *
FROM pricetorent_rounded

---combining sales_and_rental and pricetorent_rounded----
CREATE VIEW main_view AS
SELECT sales_and_rental.zipcode
    , sales_and_rental.city
    , sales_and_rental.county 
    , sales_and_rental.population 
    , sales_and_rental.medianprice 
    , sales_and_rental.activelistingcount
	, sales_and_rental.avgprice
	, sales_and_rental.totalrentals
    , pricetorent_rounded.ratio
FROM sales_and_rental
JOIN pricetorent_rounded
ON sales_and_rental.zipcode = pricetorent_rounded.zipcode
GROUP BY sales_and_rental.zipcode
    , sales_and_rental.city
    , sales_and_rental.county 
    , sales_and_rental.population 
    , sales_and_rental.medianprice 
	, sales_and_rental.avgprice
    , sales_and_rental.activelistingcount
	, sales_and_rental.totalrentals
    , pricetorent_rounded.ratio
;

select *
from main_view;

select *
INTO main_view2
FROM main_view

select *
from main_view2