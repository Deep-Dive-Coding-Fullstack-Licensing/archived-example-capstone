-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: ddctwitter
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1
​
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
​
--
-- Table structure for table `image`
--
​
DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `image` (
	`imageId` binary(16) NOT NULL,
	`imageTweetId` binary(16) NOT NULL,
	`imageCloudinaryToken` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
	`imageUrl` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
	PRIMARY KEY (`imageId`),
	KEY `imageId` (`imageId`),
	KEY `imageTweetId` (`imageTweetId`),
	CONSTRAINT `image_ibfk_1` FOREIGN KEY (`imageTweetId`) REFERENCES `tweet` (`tweetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
​
--
-- Dumping data for table `image`
--
​
LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;
​
--
-- Table structure for table `like`
--
​
DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
	`likeTweetId` binary(16) NOT NULL,
	`likeProfileId` binary(16) NOT NULL,
	`likeDate` datetime(6) NOT NULL,
	PRIMARY KEY (`likeProfileId`,`likeTweetId`),
	KEY `likeProfileId` (`likeProfileId`),
	KEY `likeTweetId` (`likeTweetId`),
	CONSTRAINT `like_ibfk_1` FOREIGN KEY (`likeTweetId`) REFERENCES `tweet` (`tweetId`),
	CONSTRAINT `like_ibfk_2` FOREIGN KEY (`likeProfileId`) REFERENCES `profile` (`profileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
​
--
-- Dumping data for table `like`
--
​
LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (0x8472DFB5283E467F8E69F34560947297,0x3B171AC67FB445069664AE52499E5F39,'2019-06-25 21:47:50.915182'),(0xA89DB7001E41465E891744F4BB8FFB0D,0x3B171AC67FB445069664AE52499E5F39,'2019-06-25 21:47:50.914426'),(0xB9C44D8FC7E644D8B65DAD17BA974A4C,0x3B171AC67FB445069664AE52499E5F39,'2019-06-25 21:47:50.936259'),(0xEAE4CDDCB1414E8782CF93565B73CB84,0x3B171AC67FB445069664AE52499E5F39,'2019-06-25 21:47:50.915802'),(0x5C3DA285B0F940D48F7F4BC8935F97B5,0x72E118D3BABB4F63A1FDD05512C74505,'2019-06-25 21:47:50.933935'),(0xA89DB7001E41465E891744F4BB8FFB0D,0x72E118D3BABB4F63A1FDD05512C74505,'2019-06-25 21:47:50.934897'),(0x8BE59DEBC3F54224950406AAD660336E,0xAEB51BCC2CA74D9FA043BC135AA12B53,'2019-06-25 21:47:50.924959'),(0xB9C44D8FC7E644D8B65DAD17BA974A4C,0xAEB51BCC2CA74D9FA043BC135AA12B53,'2019-06-25 21:47:50.935636'),(0xFA22B382073B4975B10C83601AC1CC2B,0xAEB51BCC2CA74D9FA043BC135AA12B53,'2019-06-25 21:47:50.925890');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;
​
--
-- Table structure for table `profile`
--
​
DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
	`profileId` binary(16) NOT NULL,
	`profileActivationToken` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
	`profileAtHandle` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
	`profileAvatarUrl` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
	`profileEmail` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
	`profileHash` char(97) COLLATE utf8_unicode_ci NOT NULL,
	`profilePhone` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
	PRIMARY KEY (`profileId`),
	UNIQUE KEY `profileAtHandle` (`profileAtHandle`),
	UNIQUE KEY `profileEmail` (`profileEmail`),
	UNIQUE KEY `profileAtHandle_2` (`profileAtHandle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
​
--
-- Dumping data for table `profile`
--
​
LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (0x3B171AC67FB445069664AE52499E5F39,NULL,'bonacciSequence','https://www.fillmurray.com/128/128','mbonacci@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-404-5678'),(0x47F7A23FC1644AEA9EF31653E8EF518C,NULL,'janeNope','https://www.fillmurray.com/128/128','janeNope@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-877-3456'),(0x72E118D3BABB4F63A1FDD05512C74505,NULL,'BKie','https://www.fillmurray.com/128/128','bkie@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-866-5309'),(0xAEB51BCC2CA74D9FA043BC135AA12B53,NULL,'pschulzetenbe','https://www.fillmurray.com/128/128','pschulzetenber@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-888-5454');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;
​
--
-- Table structure for table `tweet`
--
​
DROP TABLE IF EXISTS `tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tweet` (
	`tweetId` binary(16) NOT NULL,
	`tweetProfileId` binary(16) NOT NULL,
	`tweetContent` varchar(140) COLLATE utf8_unicode_ci NOT NULL,
	`tweetDate` datetime(6) NOT NULL,
	PRIMARY KEY (`tweetId`),
	KEY `tweetProfileId` (`tweetProfileId`),
	CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`tweetProfileId`) REFERENCES `profile` (`profileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
​
--
-- Dumping data for table `tweet`
--
​
LOCK TABLES `tweet` WRITE;
/*!40000 ALTER TABLE `tweet` DISABLE KEYS */;
INSERT INTO `tweet` VALUES (0x24C215D862BB4700B4A0352BD838A3B4,0xAEB51BCC2CA74D9FA043BC135AA12B53,'Drupal > Wordpress','2019-06-25 21:47:50.909964'),(0x411409D773844A5D9D3A6ED75A47494B,0x3B171AC67FB445069664AE52499E5F39,'I Like Big breakfast burritos and I cannot lie','2019-06-25 21:47:50.907673'),(0x579A2DEF773A4584963C01C0F67D47AF,0x3B171AC67FB445069664AE52499E5F39,'IAgreeWeShouldUseCamelCase','2019-06-25 21:47:50.905087'),(0x5C3DA285B0F940D48F7F4BC8935F97B5,0x3B171AC67FB445069664AE52499E5F39,'I try to hack react','2019-06-25 21:47:50.907033'),(0x8472DFB5283E467F8E69F34560947297,0xAEB51BCC2CA74D9FA043BC135AA12B53,'Catan is great but I prefer Forbidden Island','2019-06-25 21:47:50.910580'),(0x8BE59DEBC3F54224950406AAD660336E,0x3B171AC67FB445069664AE52499E5F39,'I make custom Snow Boards','2019-06-25 21:47:50.906288'),(0xA89DB7001E41465E891744F4BB8FFB0D,0xAEB51BCC2CA74D9FA043BC135AA12B53,'Go Gophers','2019-06-25 21:47:50.908247'),(0xB9C44D8FC7E644D8B65DAD17BA974A4C,0x72E118D3BABB4F63A1FDD05512C74505,'I think Marty Got lost again','2019-06-25 21:47:50.913306'),(0xEAE4CDDCB1414E8782CF93565B73CB84,0x72E118D3BABB4F63A1FDD05512C74505,'Hardcore musician Full Time Developer','2019-06-25 21:47:50.911206'),(0xEB2CBE21EE984754AC3DCABF2E88CCF1,0xAEB51BCC2CA74D9FA043BC135AA12B53,'Minnesota is very cold this time of year.','2019-06-25 21:47:50.909215'),(0xFA22B382073B4975B10C83601AC1CC2B,0x72E118D3BABB4F63A1FDD05512C74505,'DnB is where it\'s at','2019-06-25 21:47:50.911890'),(0xFAE6AC40D3664F37A8F70B0F54CE53B2,0x72E118D3BABB4F63A1FDD05512C74505,'Past times include long bike rides','2019-06-25 21:47:50.912508');
/*!40000 ALTER TABLE `tweet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
​
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
​
-- Dump completed on 2019-07-31 16:13:26