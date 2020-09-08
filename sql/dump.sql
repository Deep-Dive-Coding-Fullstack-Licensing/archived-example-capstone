-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: gkephart
-- ------------------------------------------------------
-- Server version	8.0.20

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
INSERT INTO `like` VALUES (_binary 'õóJ\„&\Íø\ÛB¨\0',_binary '_\Û\Ò\„\"\Íø\ÛB¨\0','2020-08-20 21:14:12.000000'),(_binary 'Ñrﬂµ(>Féi\ÛE`îró',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.915182'),(_binary '®ù∑\0AF^âD\Ùªè˚\r',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.914426'),(_binary 'π\ƒMè\«\ÊDÿ∂]≠∫óJL',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.936259'),(_binary '\Í\‰\Õ‹±ANáÇœìV[sÀÑ',_binary ';\Z\∆¥EñdÆRIû_9','2019-06-25 21:47:50.915802'),(_binary '\\=¢Ö∞˘@‘èK»ì_óµ',_binary 'r\·”∫ªOc°˝\–U\«E','2019-06-25 21:47:50.933935'),(_binary '®ù∑\0AF^âD\Ùªè˚\r',_binary 'r\·”∫ªOc°˝\–U\«E','2019-06-25 21:47:50.934897'),(_binary 'ã\Âù\Î\√\ıB$ï™\÷`3n',_binary 'Æµ\Ã,ßMü†CºZ°+S','2019-06-25 21:47:50.924959'),(_binary 'π\ƒMè\«\ÊDÿ∂]≠∫óJL',_binary 'Æµ\Ã,ßMü†CºZ°+S','2019-06-25 21:47:50.935636'),(_binary '˙\"≥Ç;Iu±É`\Z¡\Ã+',_binary 'Æµ\Ã,ßMü†CºZ°+S','2019-06-25 21:47:50.925890');
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
INSERT INTO `profile` VALUES (_binary '\0\Í∞\„#\Íø\ÛB¨\0','e153dcf40f36cd868ee6f8dd34176f13','DixieCooper100','http://www.fillmurray.com/100/150','dixiecooper100@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$GKIRUP8gR2QWAwGvxx4u3A$bMZhRfcRyRUWbd3D961UNBbsygZAmdXFupOhWHVHFQ0',NULL),(_binary 'Æ≈Ç\„!\Íø\ÛB¨\0','40eca40ed0db24161ceb807705691295','dylanderaad','http://www.fillmurray.com/100/150','dyljdr@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$hwRCDCovjNtva+Zf6hZeXw$uWigwN6VLNV++Sd9rxeLuNepF2iFD27Y48N3sEm7QFk',NULL),(_binary '_\Û\Ò\„\"\Íø\ÛB¨\0',NULL,'Jtestlog','http://www.fillmurray.com/100/150','jth31690@hotmail.com','$argon2id$v=19$m=65536,t=3,p=1$2eBWDx9dSz4u855L7n8HZQ$Utw4hZvE3zy/4hT0weZNQmw/Qb9mjXFr6uCuvpUlIas',NULL),(_binary '\'1^R\„!\Íø\ÛB¨\0',NULL,'MartyCustomCult','http://www.fillmurray.com/100/150','marty@customcult.com','$argon2id$v=19$m=65536,t=3,p=1$aXRX6Ty6ZgxRFIWlTyifCA$g8s+1L6BrP8/fIIIn6EDRjU5IAHefGW7FpvadxZVxhw',NULL),(_binary '2\ÿí\„!\Íø\ÛB¨\0',NULL,'IamCalvin','http://www.fillmurray.com/100/150','shadow4446@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$guh0UnQEc2718x4/BhOblw$FYlQisRFHyuzI1AfgijGFGh91glBkG9sI4BiCYBjm24',NULL),(_binary '5\—O\ƒ\„!\Íø\ÛB¨\0',NULL,'Alice31','http://www.fillmurray.com/100/150','earflower7@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$neACy6ke4L8qjnUhiiGQbA$T7BwUJBevHy7+TKHGGfpY0It8hOtGfVOGA9YldkjXgQ',NULL),(_binary ';\Z\∆¥EñdÆRIû_9',NULL,'bonacciSequence','https://www.fillmurray.com/128/128','mbonacci@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-404-5678'),(_binary '>¨Ä\„!\Íø\ÛB¨\0',NULL,'Somebody','http://www.fillmurray.com/100/150','jjaramillo1221@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$k5hpSbsqte0bzBCNQb+yLQ$DkXCMjP7DTGusNBwClu+bC6kiFU4ZNaleDPBbpe3smY',NULL),(_binary 'G\˜¢?¡dJ\Íû\ÛS\Ë\ÔQå',NULL,'janeNope','https://www.fillmurray.com/128/128','janeNope@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-877-3456'),(_binary '\\›ø\„\Íø\ÛB¨\0','abb743025aa0c84721eeb93b18c4ec46','gegeeghjhg','http://www.fillmurray.com/100/150','shrek@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$Rpw9TRMH99HlVAhms/skmQ$aGwLrjvwSFzPW5C8rwTO/NMmsBg9BSuOG32T1v4+Ygc','4566543456'),(_binary 'r\·”∫ªOc°˝\–U\«E',NULL,'BKie','https://www.fillmurray.com/128/128','bkie@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-866-5309'),(_binary 'z≠xv\„\Í£KB¨\Z\0','59e4a1192f7ff0fab67a379352a10b68','hadne122w2','http://www.fillmurray.com/100/150','g.e.kephart@gmail.coim','$argon2id$v=19$m=65536,t=3,p=1$qHLpNbdbxW99EPuCDErIfQ$sakX8lMbTnMLEuS4rN0BXHsnhkm3KxftmOLv7oacsuU','5058888888'),(_binary 'ç#fÅ\„\Íø\ÛB¨\0',NULL,'@JamesM','http://www.fillmurray.com/100/150','jlmathieus@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$/RauDZVXHgRlt0nllif1MQ$2bZMUQBJGGc5S4kLqNK9uTGpKgouqIzRqYN3NlVb6Oo',''),(_binary 'î\ﬁF@\„!\Íø\ÛB¨\0',NULL,'AndreiDinMoldovaChisinau','http://www.fillmurray.com/100/150','hristian.andrei@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$MDgpn3F03eghx4Vbo2p3CA$rDNACBUghtDcq17JxO/nUQVfi6IteoWGgioXhBfG3t0',NULL),(_binary '•r\À|\„!\Íø\ÛB¨\0',NULL,'Joshlonger','http://www.fillmurray.com/100/150','josh.duffy30@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$DIgb6EP23zpSYC//F8nVlA$r4WzL7bJtqLfSfSomDditqBcFomHAa0WxcwSRmTDn4Q',NULL),(_binary 'Æµ\Ã,ßMü†CºZ°+S',NULL,'pschulzetenbe','https://www.fillmurray.com/128/128','pschulzetenber@cnm.edu','$argon2i$v=19$m=1024,t=384,p=2$VTg4YUpZQUw5M01CcVpONw$UPWo87ODT3lSMHveEAwlxjBogTvDAeswB8ovKvJu7RE','505-888-5454'),(_binary '\ÎZ/Ä\„ \Íø\ÛB¨\0',NULL,'JordanH','http://www.fillmurray.com/100/150','jhicks@jhicksdesign.com','$argon2id$v=19$m=65536,t=3,p=1$hPVtrSfGKguhJAy1aR+HIQ$lIGt08dpiP5dR780Vy7ycNLBgEi1vUootS/f9H4IKfY','null'),(_binary '˚öàπ\„Í®êB¨\Z\0','9c91e196f8c2280f98bfe4a58280fc02','mbonacci','http://placeholder.jpg','martybonacci@gmail.com','$argon2id$v=19$m=65536,t=3,p=1$S//Pi+iRX5H3zOAB6dc77w$f2vz9gc1n3sE9rlqnccJd7j6u3ExJAEDRfa0wxU+ZKk',''),(_binary '˝<\Á\0\„\Íø\ÛB¨\0',NULL,'handleddd','http://www.fillmurray.com/100/150','gkephart@cnm.edu','$argon2id$v=19$m=65536,t=3,p=1$5ZHZecvkE3b7t9xntql+zg$tuyaUxJaaW+26g5/2AJM0SxROlKAKN6d4XPqvB6ENP0','dddddddddd');
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
INSERT INTO `tweet` VALUES (_binary '-\‡\„\'\Íø\ÛB¨\0',_binary '>¨Ä\„!\Íø\ÛB¨\0','What&#x27;s a tweet?','2020-08-20 20:52:30.000000'),(_binary '$\¬\ÿbªG\0¥†5+\ÿ8£¥',_binary 'Æµ\Ã,ßMü†CºZ°+S','Drupal > Wordpress','2019-06-25 21:47:50.909964'),(_binary 'A	\◊sÑJ]ù:n\◊ZGIK',_binary ';\Z\∆¥EñdÆRIû_9','I Like Big breakfast burritos and I cannot lie','2019-06-25 21:47:50.907673'),(_binary 'U^∑A\„\Íø\ÛB¨\0',_binary '˚öàπ\„Í®êB¨\Z\0','test tweet','2020-08-20 19:57:10.000000'),(_binary 'Wö-\Ôw:EÑñ<¿\ˆ}GØ',_binary ';\Z\∆¥EñdÆRIû_9','IAgreeWeShouldUseCamelCase','2019-06-25 21:47:50.905087'),(_binary '[PõI\„\'\Íø\ÛB¨\0',_binary '•r\À|\„!\Íø\ÛB¨\0','im stuck','2020-08-20 20:54:36.000000'),(_binary '\\=¢Ö∞˘@‘èK»ì_óµ',_binary ';\Z\∆¥EñdÆRIû_9','I try to hack react','2019-06-25 21:47:50.907033'),(_binary 'Ñrﬂµ(>Féi\ÛE`îró',_binary 'Æµ\Ã,ßMü†CºZ°+S','Catan is great but I prefer Forbidden Island','2019-06-25 21:47:50.910580'),(_binary 'ã\Âù\Î\√\ıB$ï™\÷`3n',_binary ';\Z\∆¥EñdÆRIû_9','I make custom Snow Boards','2019-06-25 21:47:50.906288'),(_binary 'ì*\œ\√\„\Íø\ÛB¨\0',_binary '˝<\Á\0\„\Íø\ÛB¨\0','PHP &gt; Typescript','2020-08-20 19:30:16.000000'),(_binary 'óçdU\„&\Íø\ÛB¨\0',_binary '5\—O\ƒ\„!\Íø\ÛB¨\0','What&#x27;s your favorite color of poodle?','2020-08-20 20:49:07.000000'),(_binary 'ó≠\'\„&\Íø\ÛB¨\0',_binary '\0\Í∞\„#\Íø\ÛB¨\0','Hello how are you today?','2020-08-20 20:49:08.000000'),(_binary 'òó\·x\„&\Íø\ÛB¨\0',_binary '\'1^R\„!\Íø\ÛB¨\0','Buy snowboards from Custom Cult!','2020-08-20 20:49:09.000000'),(_binary 'ôf)\0\„&\Íø\ÛB¨\0',_binary '_\Û\Ò\„\"\Íø\ÛB¨\0','testin the tweets','2020-08-20 20:49:11.000000'),(_binary 'õóJ\„&\Íø\ÛB¨\0',_binary '2\ÿí\„!\Íø\ÛB¨\0','Woooooooooooooo it&#x27;s a tweet!','2020-08-20 20:49:14.000000'),(_binary 'ûñr\‡\„&\Íø\ÛB¨\0',_binary 'Æ≈Ç\„!\Íø\ÛB¨\0','buy big bulk','2020-08-20 20:49:19.000000'),(_binary 'ûµXl\„&\Íø\ÛB¨\0',_binary 'ç#fÅ\„\Íø\ÛB¨\0','Hello everyone!','2020-08-20 20:49:19.000000'),(_binary '•\›-\„&\Íø\ÛB¨\0',_binary 'î\ﬁF@\„!\Íø\ÛB¨\0','HOOORRAAAYYYYYY  IT WORKS','2020-08-20 20:49:31.000000'),(_binary '®ù∑\0AF^âD\Ùªè˚\r',_binary 'Æµ\Ã,ßMü†CºZ°+S','Go Gophers','2019-06-25 21:47:50.908247'),(_binary 'π\ƒMè\«\ÊDÿ∂]≠∫óJL',_binary 'r\·”∫ªOc°˝\–U\«E','I think Marty Got lost again','2019-06-25 21:47:50.913306'),(_binary '⁄î©\„\Íø\ÛB¨\0',_binary 'ç#fÅ\„\Íø\ÛB¨\0','&#x5C;(-_-)&#x2F;','2020-08-20 20:00:53.000000'),(_binary '\Í\‰\Õ‹±ANáÇœìV[sÀÑ',_binary 'r\·”∫ªOc°˝\–U\«E','Hardcore musician Full Time Developer','2019-06-25 21:47:50.911206'),(_binary '\Î,æ!\ÓòGT¨= ø.à\Ã\Ò',_binary 'Æµ\Ã,ßMü†CºZ°+S','Minnesota is very cold this time of year.','2019-06-25 21:47:50.909215'),(_binary '˙\"≥Ç;Iu±É`\Z¡\Ã+',_binary 'r\·”∫ªOc°˝\–U\«E','DnB is where it\'s at','2019-06-25 21:47:50.911890'),(_binary '˙\Ê¨@\”fO7®\˜T\ŒS≤',_binary 'r\·”∫ªOc°˝\–U\«E','Past times include long bike rides','2019-06-25 21:47:50.912508');
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

-- Dump completed on 2020-09-08 14:24:27
