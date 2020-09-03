-- MySQL dump 10.13  Distrib 8.0.18, for Linux (x86_64)
--
-- Host: localhost    Database: gkephart
-- ------------------------------------------------------
-- Server version	8.0.18

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `imageId` binary(16) NOT NULL,
  `imageTweetId` binary(16) NOT NULL,
  `imageCloudinaryToken` varchar(255) NOT NULL,
  `imageUrl` varchar(128) NOT NULL,
  PRIMARY KEY (`imageId`),
  KEY `imageId` (`imageId`),
  KEY `imageTweetId` (`imageTweetId`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`imageTweetId`) REFERENCES `tweet` (`tweetId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `like` (
  `likeTweetId` binary(16) NOT NULL,
  `likeProfileId` binary(16) NOT NULL,
  `likeDate` datetime(6) NOT NULL,
  PRIMARY KEY (`likeProfileId`,`likeTweetId`),
  KEY `likeProfileId` (`likeProfileId`),
  KEY `likeTweetId` (`likeTweetId`),
  CONSTRAINT `like_ibfk_1` FOREIGN KEY (`likeTweetId`) REFERENCES `tweet` (`tweetId`),
  CONSTRAINT `like_ibfk_2` FOREIGN KEY (`likeProfileId`) REFERENCES `profile` (`profileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (_binary 'Ñrﬂµ(>Féi\ÛE`îró',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.915182'),(_binary '®ù∑\0AF^âD\Ùªè˚\r',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.914426'),(_binary 'π\ƒMè\«\ÊDÿ∂]≠∫óJL',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.936259'),(_binary '\Í\‰\Õ‹±ANáÇœìV[sÀÑ',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.915802'),(_binary '\\=¢Ö∞˘@‘èK»ì_óµ',_binary 'r\·”∫ªOc°˝\–U\«E','2019-06-25 21:47:50.933935'),(_binary '®ù∑\0AF^âD\Ùªè˚\r',_binary 'r\·”∫ªOc°˝\–U\«E','2019-06-25 21:47:50.934897'),(_binary 'ã\Âù\Î\√\ıB$ï™\÷`3n',_binary 'Æµ\Ã,ßMü†CºZ°+S','2019-06-25 21:47:50.924959'),(_binary 'π\ƒMè\«\ÊDÿ∂]≠∫óJL',_binary 'Æµ\Ã,ßMü†CºZ°+S','2019-06-25 21:47:50.935636'),(_binary '˙\"≥Ç;Iu±É`\Z¡\Ã+',_binary 'Æµ\Ã,ßMü†CºZ°+S','2019-06-25 21:47:50.925890');
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `profileId` binary(16) NOT NULL,
  `profileActivationToken` char(32) DEFAULT NULL,
  `profileAtHandle` varchar(32) NOT NULL,
  `profileAvatarUrl` varchar(255) DEFAULT NULL,
  `profileEmail` varchar(128) NOT NULL,
  `profileHash` char(97) NOT NULL,
  `profilePhone` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`profileId`),
  UNIQUE KEY `profileAtHandle` (`profileAtHandle`),
  UNIQUE KEY `profileEmail` (`profileEmail`),
  UNIQUE KEY `profileAtHandle_2` (`profileAtHandle`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (_binary ';\Z\∆¥EñdÆRIû_9',NULL,'bonacciSequence','https://www.fillmurray.com/128/128','mbonacci@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-404-5678'),(_binary 'G\˜¢?¡dJ\Íû\ÛS\Ë\ÔQå',NULL,'janeNope','https://www.fillmurray.com/128/128','janeNope@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-877-3456'),(_binary 'r\·”∫ªOc°˝\–U\«E',NULL,'BKie','https://www.fillmurray.com/128/128','bkie@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-866-5309'),(_binary 'Æµ\Ã,ßMü†CºZ°+S',NULL,'pschulzetenbe','https://www.fillmurray.com/128/128','pschulzetenber@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-888-5454');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tweet`
--

DROP TABLE IF EXISTS `tweet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tweet` (
  `tweetId` binary(16) NOT NULL,
  `tweetProfileId` binary(16) NOT NULL,
  `tweetContent` varchar(140) NOT NULL,
  `tweetDate` datetime(6) NOT NULL,
  PRIMARY KEY (`tweetId`),
  KEY `tweetProfileId` (`tweetProfileId`),
  CONSTRAINT `tweet_ibfk_1` FOREIGN KEY (`tweetProfileId`) REFERENCES `profile` (`profileId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tweet`
--

LOCK TABLES `tweet` WRITE;
/*!40000 ALTER TABLE `tweet` DISABLE KEYS */;
INSERT INTO `tweet` VALUES (_binary '$\¬\ÿbªG\0¥†5+\ÿ8£¥',_binary 'Æµ\Ã,ßMü†CºZ°+S','Drupal > Wordpress','2019-06-25 21:47:50.909964'),(_binary 'A	\◊sÑJ]ù:n\◊ZGIK',_binary ';\Z\∆¥EñdÆRIû_9','I Like Big breakfast burritos and I cannot lie','2019-06-25 21:47:50.907673'),(_binary 'Wö-\Ôw:EÑñ<¿\ˆ}GØ',_binary ';\Z\∆¥EñdÆRIû_9','IAgreeWeShouldUseCamelCase','2019-06-25 21:47:50.905087'),(_binary '\\=¢Ö∞˘@‘èK»ì_óµ',_binary ';\Z\∆¥EñdÆRIû_9','I try to hack react','2019-06-25 21:47:50.907033'),(_binary 'Ñrﬂµ(>Féi\ÛE`îró',_binary 'Æµ\Ã,ßMü†CºZ°+S','Catan is great but I prefer Forbidden Island','2019-06-25 21:47:50.910580'),(_binary 'ã\Âù\Î\√\ıB$ï™\÷`3n',_binary ';\Z\∆¥EñdÆRIû_9','I make custom Snow Boards','2019-06-25 21:47:50.906288'),(_binary '®ù∑\0AF^âD\Ùªè˚\r',_binary 'Æµ\Ã,ßMü†CºZ°+S','Go Gophers','2019-06-25 21:47:50.908247'),(_binary 'π\ƒMè\«\ÊDÿ∂]≠∫óJL',_binary 'r\·”∫ªOc°˝\–U\«E','I think Marty Got lost again','2019-06-25 21:47:50.913306'),(_binary '\Í\‰\Õ‹±ANáÇœìV[sÀÑ',_binary 'r\·”∫ªOc°˝\–U\«E','Hardcore musician Full Time Developer','2019-06-25 21:47:50.911206'),(_binary '\Î,æ!\ÓòGT¨= ø.à\Ã\Ò',_binary 'Æµ\Ã,ßMü†CºZ°+S','Minnesota is very cold this time of year.','2019-06-25 21:47:50.909215'),(_binary '˙\"≥Ç;Iu±É`\Z¡\Ã+',_binary 'r\·”∫ªOc°˝\–U\«E','DnB is where it\'s at','2019-06-25 21:47:50.911890'),(_binary '˙\Ê¨@\”fO7®\˜T\ŒS≤',_binary 'r\·”∫ªOc°˝\–U\«E','Past times include long bike rides','2019-06-25 21:47:50.912508');
/*!40000 ALTER TABLE `tweet` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-03  0:35:40
