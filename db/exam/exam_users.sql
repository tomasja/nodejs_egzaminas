-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: exam
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(45) COLLATE utf8_general_mysql500_ci NOT NULL,
  `email` text COLLATE utf8_general_mysql500_ci NOT NULL,
  `password` text COLLATE utf8_general_mysql500_ci NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_general_mysql500_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Eimantas Kaminskas','eimantas23@gmail.com','$2b$10$WlUUqW1nmcpH2j36xo.BhuD6.ZPQM7UokcSATX1NmoqL1p2FHrAk2','2022-07-13 18:47:40'),(2,'Ernesta Milytė','ernesta44@smilte.net','$2b$10$FNO3Zll9kRzjaCCYgFfQKOMefcNjxF0j1HnqAah7cAouTY6CRKg.G','2022-07-13 19:28:05'),(3,'Enrika Kužmarskytė','erika@yahoo.com','$2b$10$6g4OYqnvHwE6y..4RzLSaOq27dGNXimwAMvVaw6maxFXOyXv9cO3i','2022-07-14 16:01:27'),(4,'Orestas Radvilavičius','Orestas@yahoo.com','$2b$10$6gkhMsQyQcQppUv.VUn6Z.KEu/L5X6R7oueadvYTbTOnDcAwmNr9W','2022-07-14 16:02:56'),(5,'Laurynas Linkevičius','laurynas@hotmail.com','$2b$10$rDec96d7pO25W/s08.215.SpE6nI5uDezNW/Tzjy9KIZR0.DI9zqq','2022-07-14 16:46:39');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-17 20:07:31
