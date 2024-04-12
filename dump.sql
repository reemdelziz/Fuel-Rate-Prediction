CREATE DATABASE  IF NOT EXISTS `fuelpredictor` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `fuelpredictor`;
-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: fuelpredictor.mysql.database.azure.com    Database: fuelpredictor
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profile` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `fullName` varchar(50) DEFAULT NULL,
  `address1` varchar(100) DEFAULT NULL,
  `address2` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `zipcode` varchar(9) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `prevClient` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`my_row_id`),
  KEY `fk_username` (`username`),
  CONSTRAINT `fk_username` FOREIGN KEY (`username`) REFERENCES `userauth` (`username`),
  CONSTRAINT `zipcode_length_check` CHECK ((char_length(`zipcode`) >= 5))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` (`my_row_id`, `fullName`, `address1`, `address2`, `city`, `state`, `zipcode`, `username`, `prevClient`) VALUES (7,'Full Name','Address Line 1','Address Line 2','City','ST','Zipcode','devin@gmail.com',0),(8,'Miguek Garcia','26262 nickel canyon dr','tesitng','Houston','KY','77583','testing@gmail.com',0),(9,'working fine','1233 happy dr','blank','Houston','FL','77583','working@gmail.com',0),(10,'gummy medrano','1632 barrab dr','test','Houston','TX','77049','gum@gmail.com',0),(11,'joseline gonz','163232 brown dr','test','Housotn','AL','77053','jos@gmail.com',0),(12,'Working2 testing','dadsad layla','23 testing','Rosharon','CA','77049','example2@gmail.com',0);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotes`
--

DROP TABLE IF EXISTS `quotes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotes` (
  `quoteid` int NOT NULL AUTO_INCREMENT,
  `location` varchar(100) DEFAULT NULL,
  `gallons` int NOT NULL,
  `price_per_gallon` decimal(10,2) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `profit_margin` decimal(10,2) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`quoteid`),
  KEY `username` (`username`),
  CONSTRAINT `quotes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `userauth` (`username`),
  CONSTRAINT `quotes_chk_1` CHECK ((`gallons` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotes`
--

LOCK TABLES `quotes` WRITE;
/*!40000 ALTER TABLE `quotes` DISABLE KEYS */;
INSERT INTO `quotes` VALUES (1,'123 test drive ',2,2.00,'2024-04-20',20.20,0.15,'testing@gmail.com'),(2,'1632 barrab dr, Houston, TX 77049',20,NULL,NULL,NULL,0.10,'gum@gmail.com'),(3,'1632 barrab dr, Houston, TX 77049',20,NULL,NULL,NULL,0.10,'gum@gmail.com'),(4,'1632 barrab dr, Houston, TX 77049',22,NULL,NULL,NULL,0.10,'gum@gmail.com'),(5,'1632 barrab dr, Houston, TX 77049',22,2.75,NULL,NULL,0.10,'gum@gmail.com'),(6,'1632 barrab dr, Houston, TX 77049',22,2.75,'2024-04-26',NULL,0.10,'gum@gmail.com'),(7,'1632 barrab dr, Houston, TX 77049',12,2.75,'2024-04-13',NULL,0.10,'gum@gmail.com'),(8,'1632 barrab dr, Houston, TX 77049',12,2.75,'2024-04-13',NULL,0.10,'gum@gmail.com'),(9,'1632 barrab dr, Houston, TX 77049',12,2.75,'2024-04-13',NULL,0.10,'gum@gmail.com'),(10,'1632 barrab dr, Houston, TX 77049',12,2.75,'2024-04-13',NULL,0.15,'gum@gmail.com'),(11,'1632 barrab dr, Houston, TX 77049',20,2.75,'2024-04-13',55.15,0.15,'gum@gmail.com'),(12,'26262 nickel canyon dr, Houston, KY 77583',21,3.05,'2024-04-22',64.05,0.07,'testing@gmail.com');
/*!40000 ALTER TABLE `quotes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state` varchar(2) NOT NULL,
  `price_per_gallon` decimal(10,2) DEFAULT NULL,
  `instate` tinyint(1) DEFAULT NULL,
  `profit_margin` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES ('AK',3.42,0,0.12),('AL',2.87,0,0.07),('AR',2.98,0,0.06),('AZ',3.19,0,0.09),('CA',3.36,0,0.13),('CO',3.14,0,0.08),('CT',3.27,0,0.11),('DE',3.01,0,0.05),('FL',3.08,0,0.07),('GA',2.95,0,0.06),('HI',3.78,0,0.14),('IA',2.84,0,0.05),('ID',3.22,0,0.08),('IL',2.89,0,0.07),('IN',3.02,0,0.06),('KS',2.97,0,0.06),('KY',3.05,0,0.07),('LA',2.93,0,0.05),('MA',3.29,0,0.10),('MD',3.07,0,0.07),('ME',3.31,0,0.11),('MI',3.03,0,0.07),('MN',3.17,0,0.08),('MO',2.88,0,0.06),('MS',2.91,0,0.05),('MT',3.34,0,0.09),('NC',2.99,0,0.07),('ND',3.26,0,0.08),('NE',3.06,0,0.07),('NH',3.21,0,0.09),('NJ',3.18,0,0.08),('NM',3.23,0,0.09),('NV',3.39,0,0.10),('NY',3.45,0,0.12),('OH',2.94,0,0.06),('OK',2.92,0,0.05),('OR',3.37,0,0.11),('PA',3.12,0,0.08),('RI',3.33,0,0.10),('SC',2.85,0,0.05),('SD',3.16,0,0.08),('TN',3.09,0,0.07),('TX',2.75,1,0.15),('UT',3.24,0,0.09),('VA',3.00,0,0.07),('VT',3.30,0,0.10),('WA',3.48,0,0.13),('WI',3.04,0,0.07),('WV',3.13,0,0.08),('WY',3.25,0,0.09);
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userauth`
--

DROP TABLE IF EXISTS `userauth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userauth` (
  `username` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `oldUser` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`username`),
  CONSTRAINT `password_length_check` CHECK ((char_length(`password`) >= 8))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userauth`
--


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-12  1:27:23
