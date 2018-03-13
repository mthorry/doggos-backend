DROP DATABASE IF EXISTS doggos;
CREATE DATABASE doggos;

\c doggos;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR UNIQUE,
  email VARCHAR UNIQUE,
  password_digest VARCHAR,
  bio VARCHAR,
  profile_pic VARCHAR
);

CREATE TABLE photos (
  ID SERIAL PRIMARY KEY,
  caption VARCHAR,
  url VARCHAR,
  user_id INTEGER REFERENCES users(ID),
  username VARCHAR REFERENCES users(username)
);

CREATE TABLE likes (
  ID SERIAL PRIMARY KEY,
  username VARCHAR REFERENCES users(username),
  photo_id INTEGER REFERENCES photos(ID)
);

CREATE TABLE follows (
  ID SERIAL PRIMARY KEY,
  followed_username VARCHAR REFERENCES users(username),
  follower_username VARCHAR REFERENCES users(username)
);

CREATE TABLE adoptables (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  breed VARCHAR,
  age INTEGER,
  sex VARCHAR,
  url VARCHAR
);

INSERT INTO users (username, email, password_digest, bio, profile_pic)
  VALUES ('matt', 'matt@mail.com', '123', '3 wolf moon retro authentic banh mi blog. Pug 8-bit seitan, vinyl snackwave pork belly chicharrones +1 cornhole.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('ozzy', 'ozzy@mail.com', '123', 'Keffiyeh everyday carry four dollar toast DIY, wolf knausgaard banjo pour-over actually lyft bespoke pok pok readymade sustainable.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('hannah', 'hannah@mail.com', '123', 'Salvia health goth before they sold out kale chips, taxidermy deep v vape selvage occupy glossier offal air plant.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('luke', 'luke@mail.com', '123', 'Vice etsy hell of, meggings hammock williamsburg VHS artisan meditation tofu blue bottle readymade listicle bushwick.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png'),
  ('sam', 'sam@mail.com', '123', 'Cornhole vape edison bulb cold-pressed messenger bag, cray lomo kickstarter YOLO schlitz.', 'https://res.cloudinary.com/airwotever/image/upload/v1395969197/default-profile-pic_hkmqpe.png');

INSERT INTO adoptables (name, breed, age, sex, url)
  VALUES ('Max', 'Golden Retriever', 4, 'M', 'www.thorry.io'),
  ('Mojo', 'Brittany Spaniel', 11, 'M', 'www.thorry.io');

INSERT INTO photos (caption, url, user_id, username)
  VALUES ('lovin life!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 1, 'matt'),
  ('yay!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 1, 'matt'),
  ('fun', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 1, 'matt'),
  ('lovin life more!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 1, 'matt'),
  ('lovin life!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 2, 'ozzy'),
  ('yay!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 2, 'ozzy'),
  ('fun', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 2, 'ozzy'),
  ('lovin life more!', 'https://c1.staticflickr.com/8/7339/12413787454_89113147e6_b.jpg', 2, 'ozzy');

INSERT INTO likes (username, photo_id)
  VALUES ('matt', 5), ('matt', 6), ('matt', 7), ('matt', 8), ('ozzy', 1), ('hannah', 8), ('sam', 8), ('sam', 1), ('luke', 8), ('luke', 1);

INSERT INTO follows (followed_username, follower_username)
  VALUES ('matt', 'ozzy'), ('ozzy', 'matt'), ('matt', 'hannah'), ('matt', 'luke'), ('matt', 'sam'), ('ozzy', 'hannah')