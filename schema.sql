DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS users_interests;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users_articles;
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    interest_desc VARCHAR(255),
    user_sex INT
);
CREATE TABLE IF NOT EXISTS interests(
    interest_id SERIAL PRIMARY KEY,
    interest_desc VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS users_interests(
    user_id INT,
    interest_id INT
);
CREATE TABLE IF NOT EXISTS articles(
     article_id SERIAL PRIMARY KEY,
     title VARCHAR(255),
    author VARCHAR(255),
    img VARCHAR(255),
    url VARCHAR(255),
    source VARCHAR(255),
    conten VARCHAR(255)
);
CREATE TABLE IF NOT EXISTS users_articles(
        user_id INT,
    article_id INT
);

INSERT INTO users (user_name,user_pass,user_sex) VALUES('shela','123','1');
INSERT INTO interests (interest_desc) VALUES('space');
INSERT INTO interests (interest_desc) VALUES('cars');
INSERT INTO interests (interest_desc) VALUES('sport');
INSERT INTO interests (interest_desc) VALUES('food');
INSERT INTO interests (interest_desc) VALUES('cooking');
INSERT INTO interests (interest_desc) VALUES('animals');
INSERT INTO interests (interest_desc) VALUES('ants');
INSERT INTO interests (interest_desc) VALUES('history');
INSERT INTO interests (interest_desc) VALUES('movies');
INSERT INTO interests (interest_desc) VALUES('technology');
INSERT INTO users_interests (user_id,interest_id) VALUES(1,1);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,2);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,3);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,4);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,5);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,6);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,7);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,8);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,9);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,10);
