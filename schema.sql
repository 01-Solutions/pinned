DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS interests;
DROP TABLE IF EXISTS users_interests;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS users_articles;
CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255),
    interest_desc255),
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
INSERT INTO interests (interest_desc) VALUES('sport');
INSERT INTO interests (interest_desc) VALUES('cars');
INSERT INTO interests (interest_desc) VALUES('sex');
INSERT INTO interests (interest_desc) VALUES('food');
INSERT INTO users_interests (user_id,interest_id) VALUES(1,1);
INSERT INTO users_interests (user_id,interest_id) VALUES(1,2);
INSERT INTO users_interests (user_id,interest_id) VALUES(2,1);
INSERT INTO users_interests (user_id,interest_id) VALUES(2,2);
INSERT INTO users_interests (user_id,interest_id) VALUES(3,1);
INSERT INTO users_interests (user_id,interest_id) VALUES(3,2);
