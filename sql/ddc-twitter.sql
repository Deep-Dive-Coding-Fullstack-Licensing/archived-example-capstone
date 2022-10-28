-- this is a comment in SQL (yes, the space is needed!)
-- these statements will drop the tables, DELETE THE DATA and re-add the tables
-- never ever ever ever do this on live data!!!!
DROP TABLE IF EXISTS "like";
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS tweet;
DROP TABLE IF EXISTS profile;

-- create the profile entity
CREATE TABLE IF NOT EXISTS profile (
	-- this creates the attribute for the primary key
	-- UUID is the data type for keys/ids
	-- NOT NULL means the attribute is required!
	profile_id UUID NOT NULL,
	profile_activation_token CHAR(32),
	profile_at_handle VARCHAR(32) NOT NULL UNIQUE,
	profile_avatar_url  VARCHAR(255),
	-- to make sure duplicate data cannot exist, create a unique index
	profile_email VARCHAR(128) NOT NULL UNIQUE,
	-- to make something optional, exclude the not null
	profile_hash CHAR(97) NOT NULL,
	profile_phone VARCHAR(32),
	-- this officiates the primary key for the entity
	PRIMARY KEY(profile_id)
);
-- create the tweet entity
CREATE TABLE IF NOT EXISTS tweet (
	-- this is for yet another primary key...
	tweet_id UUID NOT NULL,
	-- this is for a foreign key
	tweet_profile_id UUID NOT NULL,
	tweet_content VARCHAR(140) NOT NULL,
	-- notice dates don't need a size parameter
	tweet_date timestamp WITH TIME ZONE NOT NULL,
	-- this creates the foreign key relation
	FOREIGN KEY(tweet_profile_id) REFERENCES profile(profile_id),
	-- and finally create the primary key
	PRIMARY KEY(tweet_id)
);
-- this creates an index for a foreign key
CREATE INDEX ON tweet (tweet_profile_id);

-- create the image entity
CREATE TABLE IF NOT EXISTS image (
	image_id UUID NOT NULL,
	image_tweet_id UUID NOT NULL,
	image_cloudinary_token VARCHAR(255) NOT NULL,
	image_url VARCHAR(128) NOT NULL ,
	FOREIGN KEY(image_tweet_id) REFERENCES tweet(tweet_id),
	PRIMARY KEY (image_id)
);
-- this creates an index for a foreign key
CREATE INDEX ON image (image_tweet_id);

-- create the like entity (a weak entity from an m-to-n for profile --> tweet)
CREATE TABLE IF NOT EXISTS "like" (
	like_profile_id UUID NOT NULL,
	like_tweet_id UUID NOT NULL,
	like_date timestamp WITH TIME ZONE NOT NULL,
	-- create the foreign key relations
	FOREIGN KEY(like_profile_id) REFERENCES profile(profile_id),
	FOREIGN KEY(like_tweet_id) REFERENCES tweet(tweet_id),
	-- finally, create a composite key with the two foreign keys
	PRIMARY KEY(like_profile_id, like_tweet_id)
);
-- index the foreign keys
CREATE INDEX ON "like" (like_tweet_id);
CREATE INDEX ON "like" (like_profile_id);