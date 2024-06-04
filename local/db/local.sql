-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: local
-- ------------------------------------------------------
-- Server version	8.4.0

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
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `mdName` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `extname` varchar(255) DEFAULT NULL,
  `mimetype` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `md5_with_name` (`mdName`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (6,'flower2-2b2d0a04597517d73e18b76d66fad723.jpg','flower2','jpg','image/jpeg','2024-06-04 12:37:20','2024-06-04 12:48:13','24988b67-99d1-4be4-8893-e004d8024ed1');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refreshTokens`
--

DROP TABLE IF EXISTS `refreshTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refreshTokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `refreshTokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refreshTokens`
--

LOCK TABLES `refreshTokens` WRITE;
/*!40000 ALTER TABLE `refreshTokens` DISABLE KEYS */;
INSERT INTO `refreshTokens` VALUES (11,'f0aec609-21f4-4b9e-9dee-cad5d3da249b','2024-06-05 10:32:45','2024-06-04 10:32:45','2024-06-04 10:32:45','24988b67-99d1-4be4-8893-e004d8024ed1');
/*!40000 ALTER TABLE `refreshTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('24988b67-99d1-4be4-8893-e004d8024ed1','Nikita444444444','Rybak','cool.tspa@mai.ru','$2a$10$IJXlv.EC4.TwHVK7hENlQOHSzN6xmvHLWQ9l9v.7p/ngt5N12f32K','male','2024-06-04 10:04:36','2024-06-04 11:37:31'),('259692a6-b605-4e5c-b37f-df69deb91232','Nikita2222',NULL,'cool.tspa@mai.ru','$2a$10$hRKFRPt5TnrjsI.RWcVp9uds2ycqmCuXeI5qaLsdNEZCPMUeR7PRW',NULL,'2024-06-04 10:04:27','2024-06-04 10:04:27'),('3d7c54ea-ee36-451a-a300-e125f85da4aa','Nikita3',NULL,'cool.tspa@mai.ru','$2a$10$iDQvRjmdgg5onndsX8.9TO7Lx.zBLd/OD.lgbO6AmwGLUUCPTH5i.',NULL,'2024-06-04 10:04:33','2024-06-04 10:04:33'),('3ee275f3-3c6d-464e-866b-c152653fe0b5','Nikita444444',NULL,'cool.tspa@mai.ru','$2a$10$NaR/V.KyrgpTggJnDI4o1ua79uPOtn62YTl1ZjL9gvK2vFTeWBZUa',NULL,'2024-06-04 10:04:58','2024-06-04 10:04:58'),('459342b0-caa0-4e67-8e51-2cdcc54b5925','Nikita4444444',NULL,'cool.tspa@mai.ru','$2a$10$ewz0h7T3uZgbIJoYA.no3e7mL0BVghiwllBc.Ev2jXysRUFHgBKwG',NULL,'2024-06-04 10:05:00','2024-06-04 10:05:00'),('4682a2dc-8a12-46d6-9d65-516c69a6a560','Nikita4',NULL,'cool.tspa@mai.ru','$2a$10$/QXmdm7pDVCXah3TyhlyGubcj6a7k.6MXGnoYrqGiUxQbM5D.BWrq',NULL,'2024-06-04 10:04:51','2024-06-04 10:04:51'),('4ece8b37-cb3a-4cd4-a9af-2e7323f641a2','Nikita44',NULL,'cool.tspa@mai.ru','$2a$10$TK1ZX/9X.Mkm9oXj4xD5HeZLd7xKhRtG/5uo1slinATUhm22eaAPe',NULL,'2024-06-04 10:04:53','2024-06-04 10:04:53'),('56c64e85-dfe3-4c38-8a5a-de41b31de106','Nikita333333',NULL,'cool.tspa@mai.ru','$2a$10$ME71nUKm.V9GnGcMAP.1OuYLkcwTFl/IFbm6wR9uFCurrm4Oe2GH2',NULL,'2024-06-04 10:04:41','2024-06-04 10:04:41'),('5b6d6447-1044-41ab-8cfe-e8cdeb34e0a7','Nikita3333333333',NULL,'cool.tspa@mai.ru','$2a$10$9wsGxvOSdwfcLp3g16hTDeHqvjeljstskm0nRK4zJWwZKPoeScKPq',NULL,'2024-06-04 10:04:46','2024-06-04 10:04:46'),('66fd0764-0f35-4e4e-b505-982b45799ea4','Nikita2',NULL,'cool.tspa@mai.ru','$2a$10$XwQL1Wp09dGbGIhljCFFdet60IyACZE7CwUzloNQp5JfgctCERP0a',NULL,'2024-06-04 10:04:22','2024-06-04 10:04:22'),('67190e1e-ad25-4232-a9ca-12b1adddb856','Nikita22222',NULL,'cool.tspa@mai.ru','$2a$10$WRJo6g/3HbrtxOIsq1Zy4OGXYiVlI7KzJadyNaapD6hsio1whMP5.',NULL,'2024-06-04 10:04:29','2024-06-04 10:04:29'),('72e7f584-7261-4d77-94f7-a959e16f3557','Nikita33333',NULL,'cool.tspa@mai.ru','$2a$10$2gEeTmX4dHWA/tFakjcg5OijmmB3cORVcHKOutAsrk7Fk1uhy6TSa',NULL,'2024-06-04 10:04:39','2024-06-04 10:04:39'),('7a226253-af0e-490e-94b4-92929ddc9d1a','Nikita333333333',NULL,'cool.tspa@mai.ru','$2a$10$SMqnQqC37E4vExbuik2d2.kok9xQ52wE7n3IG7AWNPSkjQTtznnFS',NULL,'2024-06-04 10:04:45','2024-06-04 10:04:45'),('7d0b006a-6438-4851-b187-65c2dd8f5e66','Nikita33',NULL,'cool.tspa@mai.ru','$2a$10$qIhZpbJYbF1/aPLlSmSYF.J8P5hym.DNJ0hjUXTzOPp1n5UllCFGG',NULL,'2024-06-04 10:04:35','2024-06-04 10:04:35'),('7e806052-3830-48d9-a821-216b1ba16398','Nikita4444',NULL,'cool.tspa@mai.ru','$2a$10$YOh1H96sR0.Q7F3M6fcnE.gI2K0RKuuo8OUNCJFo43K6fALJbR1uy',NULL,'2024-06-04 10:04:56','2024-06-04 10:04:56'),('82496ee4-9ab4-4701-a9ef-4c55fba9fe7c','Nikita444',NULL,'cool.tspa@mai.ru','$2a$10$/cQPlFGBpOQl4xOih87IG.T/66kuwKrovWvDD9IR7EWvAvcdgJrCe',NULL,'2024-06-04 10:04:54','2024-06-04 10:04:54'),('8505767e-0f53-43c0-a1bc-bd9da25ffaee','Nikita44444444',NULL,'cool.tspa@mai.ru','$2a$10$7RIUH0CzZgzO7BDOHzv8sO9AMA3qx5eLmaW0/HlEU7unKcaLr0Lsm',NULL,'2024-06-04 10:05:01','2024-06-04 10:05:01'),('8898a2a6-16b7-46cd-b6c6-ef0d6c04ef3d','Nikita444444444',NULL,'cool.tspa@mai.ru','$2a$10$EgtjC5x5ZHLOiPHWFl7Zf.I5cbPdMf6jCjDo11gshy62mrm20E7vy',NULL,'2024-06-04 10:05:03','2024-06-04 10:05:03'),('8e9d9b08-346c-4566-be35-c2f21b682559','Nikita3333',NULL,'cool.tspa@mai.ru','$2a$10$vIu0U86f5NMl4JLlu4MyY.RtbjapQ3Dg4OImQjbyiPcvhl2OfOBcS',NULL,'2024-06-04 10:04:38','2024-06-04 10:04:38'),('918463be-f64e-4de2-a928-cca084be5e21','Nikita',NULL,'cool.tspa@mai.ru','$2a$10$0TT/LpMrdvmdZmMzO4ZHROdYUm.SnLz78dm73JggTZNLE0o9TXtkC',NULL,'2024-06-04 09:57:18','2024-06-04 09:57:18'),('96ee4833-a428-4425-b018-cd302760b6ad','Nikita33333333333',NULL,'cool.tspa@mai.ru','$2a$10$G3vOcEOH3vgirUb1F2clc..HJuVZDhGquuSotXdxxvleZwY.faz8u',NULL,'2024-06-04 10:04:48','2024-06-04 10:04:48'),('ac40e575-e43c-432c-ad38-4b4493778f06','Nikita44444',NULL,'cool.tspa@mai.ru','$2a$10$U5wRONQCPzUqIFeuxec4we0Uilm0cfCM.YCgBa9ljBqA3Jk4cyc16',NULL,'2024-06-04 10:04:57','2024-06-04 10:04:57'),('b96abff7-5ce6-476f-a0e1-2ad250fa2e75','Nikita3333333',NULL,'cool.tspa@mai.ru','$2a$10$4PoviYZpHneOqyYuScAruenm11QBQYi2wW3B8klpNFsLPz3NQAsHa',NULL,'2024-06-04 10:04:42','2024-06-04 10:04:42'),('c81b8cb2-60b0-4f2a-b71b-0898c9c7146d','Nikita33333333',NULL,'cool.tspa@mai.ru','$2a$10$qjuMrTOPRbu4gmfGXufZ5.IN6IooezIGf3bHR7T6BFAT2rIXS77/u',NULL,'2024-06-04 10:04:43','2024-06-04 10:04:43'),('f31571a9-8d14-42ae-86cb-6d3f8b18784a','Nikita22',NULL,'cool.tspa@mai.ru','$2a$10$R2wef6iyPPu9eIfat0mJiuv.eh4GHclyP.zPMR/HwwCS/vqQbMkHG',NULL,'2024-06-04 10:04:24','2024-06-04 10:04:24'),('fd9d3d96-2dc7-4770-b527-6b1b22d99ab5','Nikita222',NULL,'cool.tspa@mai.ru','$2a$10$x6qjxMXRvVKKO.FI0Bk7Wug/XDB6hzCzV2KCMNutFR9pbZeX8Ak.a',NULL,'2024-06-04 10:04:25','2024-06-04 10:04:25');
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

-- Dump completed on 2024-06-04 16:10:47
