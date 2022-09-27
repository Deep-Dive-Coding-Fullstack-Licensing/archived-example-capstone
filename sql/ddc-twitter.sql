-- this is a comment in SQL (yes, the space is needed!)
-- these statements will drop the tables and re-add them
-- this is akin to reformatting and reinstalling Windows (OS X never needs a reinstall...) ;)
-- never ever ever ever ever ever ever ever ever ever ever ever ever ever ever ever ever ever ever ever
-- do this on live data!!!!
DROP TABLE IF EXISTS "like";
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS tweet;
DROP TABLE IF EXISTS profile;

CREATE TABLE IF NOT EXISTS profile (
	-- this creates the attribute for the primary key
	-- auto_increment tells mySQL to number them {1, 2, 3, ...}
	-- not null means the attribute is required!
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
	-- this is for a foreign key; auto_incremented is omitted by design
	tweet_profile_id UUID NOT NULL,
	tweet_content VARCHAR(140) NOT NULL,
	-- notice dates don't need a size parameter
	tweet_date timestamp WITH TIME ZONE NOT NULL,
	-- this creates the actual foreign key relation
	FOREIGN KEY(tweet_profile_id) REFERENCES profile(profile_id),
	-- and finally create the primary key
	PRIMARY KEY(tweet_id)
);
-- this creates an index for a foreign key
CREATE INDEX ON tweet (tweet_profile_id);

-- create the tweetImage entity
CREATE TABLE IF NOT EXISTS image (
	image_id UUID NOT NULL,
	image_tweet_id UUID NOT NULL,
	image_cloudinary_token VARCHAR(255) NOT NULL,
	image_url VARCHAR(128) NOT NULL ,
	FOREIGN KEY(image_tweet_id) REFERENCES tweet(tweet_id),
	PRIMARY KEY (image_id)
);
-- index the foreign keys

CREATE INDEX ON image (image_tweet_id);

-- create the like entity (a weak entity from an m-to-n for profile --> tweet)
CREATE TABLE IF NOT EXISTS "like" (
	-- these are not auto_increment because they're still foreign keys
	like_profile_id UUID NOT NULL,
	like_tweet_id UUID NOT NULL,
	like_date timestamp WITH TIME ZONE NOT NULL,
	-- create the foreign key relations
	FOREIGN KEY(like_profile_id) REFERENCES profile(profile_id),
	FOREIGN KEY(like_tweet_id) REFERENCES tweet(tweet_id),
	-- finally, create a composite foreign key with the two foreign keys
	PRIMARY KEY(like_profile_id, like_tweet_id)
);
-- index the foreign keys
CREATE INDEX ON "like" (like_tweet_id);
CREATE INDEX ON "like" (like_profile_id);