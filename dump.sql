-- MySQL dump 10.13  Distrib 8.0.40, for Linux (x86_64)
--
-- Host: localhost    Database: bdyb_dev_db
-- ------------------------------------------------------
-- Server version	8.0.40-0ubuntu0.22.04.1

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
-- Table structure for table `all_courses`
--

DROP TABLE IF EXISTS `all_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `all_courses` (
  `name` varchar(120) NOT NULL,
  `courseID` varchar(120) NOT NULL,
  `semester` varchar(120) NOT NULL,
  `college` varchar(150) NOT NULL,
  `level` varchar(150) NOT NULL,
  `department` varchar(50) NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseID` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_courses`
--

LOCK TABLES `all_courses` WRITE;
/*!40000 ALTER TABLE `all_courses` DISABLE KEYS */;
INSERT INTO `all_courses` VALUES ('CHM 103','CHM103','First Semester','College of Social Science','300 Level','Electrical Engineering','04ac8417-28bb-4c45-ad8c-04ae8a4d2aed','2025-01-02 11:17:31','2025-01-02 11:17:31'),('MAT 101','MAT101','First Semester','College of Engineering','100 Level','Mechatronics Engineering','1245ad44-617b-4bbd-b40d-eacdda332eb2','2025-01-02 11:16:27','2025-01-02 11:16:27'),('PHY 101','PHY101','Second Semester','College of Arts','500 Level','Computer Science','158e60c3-952c-4cc9-bb88-6201425117f7','2025-01-02 11:17:08','2025-01-02 11:17:08'),('CHM 107','CHM107','Second Semester','College of Arts','300 Level','Electrical Engineering','2b4c1e3c-3497-4d3f-9d71-faf61cccf7a3','2025-01-02 11:31:02','2025-01-02 11:31:02'),('MAT 201','MAT201','Second Semester','College of Engineering','200 Level','Electrical Engineering','43210647-4c17-4fe1-bb7e-e22bae1e75db','2025-01-02 11:29:15','2025-01-02 11:29:15'),('CHM 303','CHM303','First Semester','College of Applied Social Science','300 Level','Mechanical Engineering','57a4754e-cffd-4821-b029-827a910553f0','2025-01-01 12:53:25','2025-01-01 12:53:25'),('MAT 301','MAT301','First Semester','College of Environmenal','400 Level','Mechanical Engineering','6547dedf-85ea-4b72-8ff4-8a4f8e809fbe','2025-01-02 11:18:10','2025-01-02 11:18:10'),('GST 203','GST203','First Semester','College of Basic Science','100 Level','Mechatronics Engineering','658b81af-2260-49a3-9fcd-b255ca719cb6','2025-01-02 11:29:53','2025-01-02 11:29:53'),('GST 103','GST103','Second Semester','College of Environmenal','300 Level','Agricultural Engineering','67cebfba-38b0-47c4-a014-779f5a7ec0b8','2025-01-02 11:33:03','2025-01-02 11:33:03'),('GST 303','GST303','Second Semester','College of Basic Science','200 Level','Civil Engineering','77c40fed-101c-4264-89d0-8682067a0e68','2025-01-02 11:16:45','2025-01-02 11:16:45'),('PHY 301','PHY301','Second Semester','College of Social Science','300 Level','Chemical Engineering','bd2e1efa-2765-416f-bada-a0423d32f89d','2025-01-02 11:18:38','2025-01-02 11:18:38'),('CHM 307','CHM307','Second Semester','College of Applied Social Science','300 Level','Banking and Finance','eb7cf5e9-5428-4b3f-a650-df6f33bd1768','2025-01-01 15:20:01','2025-01-01 15:20:01'),('CHM 203','CHM203','Second Semester','College of Social Science','200 Level','Civil Engineering','f5e42fce-3c1e-4fa2-bfef-1ab7a7976d4e','2025-01-02 11:30:29','2025-01-02 11:30:29'),('CHM 207','CHM207','First Semester','College of Basic Science','200 Level','Mechatronics Engineering','fd768c5e-7b4a-41ff-af96-6e112f9762e6','2025-01-02 11:30:10','2025-01-02 11:30:10');
/*!40000 ALTER TABLE `all_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_outline`
--

DROP TABLE IF EXISTS `course_outline`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_outline` (
  `week` varchar(20) DEFAULT NULL,
  `courseID` varchar(60) NOT NULL,
  `topic` varchar(120) DEFAULT NULL,
  `content` varchar(520) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `course_outline_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_outline`
--

LOCK TABLES `course_outline` WRITE;
/*!40000 ALTER TABLE `course_outline` DISABLE KEYS */;
INSERT INTO `course_outline` VALUES ('1','PHY101','Introduction to Physics','This week introduces the fundamental concepts of physics, including its scope, importance, and real-world applications.','04e9c6bb-c341-4ee1-a86a-17e0782cd0ce','2025-01-02 11:50:20','2025-01-02 11:50:20'),('2','CHM107','Atoms and Molecules','Structure and properties of atoms and molecules.','084761ee-0691-42e3-beeb-ebd43623af54','2025-01-02 11:54:29','2025-01-02 11:54:29'),('4','CHM103','CHM305','JKAJ','0e33278f-c70b-4b25-8b88-03f3c8db64d0','2025-01-07 16:14:19','2025-01-07 16:14:19'),('5','CHM103','intro to chemistry ','JJJJA','1078da48-edf0-4089-9a24-ab1b27c04b97','2025-01-07 16:14:59','2025-01-07 16:14:59'),('1','CHM203','Inorganic Chemistry','Study of transition metals and coordination compounds.','1948e9c1-a529-43c7-84c0-9a9e0adeda0b','2025-01-02 11:56:48','2025-01-02 11:56:48'),('1','MAT101','Algebra','Introduction to algebraic expressions, equations, and inequalities.','21649bd2-94b4-4304-a6e1-4eef9907ebb2','2025-01-02 11:52:19','2025-01-02 11:52:19'),('1','CHM203','Atomic Structure','Explore the history of atomic models, electron configurations, and periodic trends.','26eebc72-aa84-4537-bb7d-e4736b5de57c','2025-01-02 11:49:53','2025-01-02 11:49:53'),('6','CHM303','intro to chemistry ','J','27ec1cf8-d15a-440b-9beb-754875c54516','2025-01-07 16:18:36','2025-01-07 16:18:36'),('1','GST203','Communication Skills','Understand the importance of effective communication in academic and professional settings.','4f10d43f-00ea-4b64-b357-0a55aed3c079','2025-01-02 11:51:24','2025-01-02 11:51:24'),('8','CHM103','KSKSK','KSKSKS','61fb5672-f6d5-4583-8133-23eac72a2596','2025-01-07 16:19:32','2025-01-07 16:19:32'),('2','CHM203','Analytical Techniques','Spectroscopy, chromatography, and qualitative analysis.','62d64c6f-0201-4d86-88ec-c1f2ca7c510b','2025-01-02 11:57:00','2025-01-02 11:57:00'),('1','MAT201','Advanced Calculus','Functions of multiple variables and partial derivatives.','68129ec5-f9c7-4d04-bb9c-7e03d61404d2','2025-01-02 11:54:53','2025-01-02 11:54:53'),('2','CHM203','Chemical Bonding','Learn about ionic, covalent, and metallic bonding and their properties.','77b847fa-f57b-48b5-8bbd-bacd19981bf4','2025-01-02 11:50:50','2025-01-02 11:50:50'),('6','CHM103','intro to chemistry ','AJAJAJ','93eddfa1-bcd4-435d-bff3-786bbfcca0f0','2025-01-07 16:18:56','2025-01-07 16:18:56'),('2','GST203','Globalization','Impact of globalization on culture, economy, and society.','94d121bc-c231-49c4-a603-df6f3611742d','2025-01-02 11:57:36','2025-01-02 11:57:36'),('1','CHM103','Atomic Theory','Basic atomic structure and models.','9be81c58-a48d-4be5-8823-7e680fb7fd97','2025-01-02 11:53:23','2025-01-02 11:53:23'),('2','CHM103','Periodic Table','Understanding periodic trends and element properties.','9c940020-334a-4095-9d17-f20cff0cd5c1','2025-01-02 11:53:39','2025-01-02 11:53:39'),('7','CHM103','CHM305','JKJKSJK','9d282880-7b2e-49fe-a975-531463ddc14f','2025-01-07 16:19:10','2025-01-07 16:19:10'),('2','GST203','Critical Thinking','Learn how to analyze problems and make logical decisions.','b297a08b-419d-4dcc-8bc1-177cdc742e59','2025-01-02 11:51:35','2025-01-02 11:51:35'),('3','CHM103','intro to chemistry ','SJKAHHHHHKLSJKLKKKADDKKKA','c07c1e48-cafe-4317-a25a-70d5b87372f5','2025-01-07 16:13:56','2025-01-07 16:13:56'),('2','MAT101','Functions','Study of functions, domain, range, and graphing.','e7939be9-d39c-4134-aa9c-e969a2fa5fd7','2025-01-02 11:52:43','2025-01-02 11:52:43'),('2','PHY101','Measurement','Learn about the SI units of measurement, precision, accuracy, and tools for measuring physical quantities.','ecab8ea7-abe8-4bd6-aa41-3e6f95fad990','2025-01-02 11:50:11','2025-01-02 11:50:11'),('1','GST203','Critical Thinking','Development of analytical and logical reasoning skills.','ef33175e-ef56-4f74-9e6f-df39d240c6bf','2025-01-02 11:57:28','2025-01-02 11:57:28'),('1','CHM107','Matter and Measurement','Classification of matter and measurement techniques.','f05f5307-fe96-497e-828e-15733b6f4a8d','2025-01-02 11:54:14','2025-01-02 11:54:14'),('2','MAT201','Differential Equations','Introduction to first-order and higher-order differential equations.','f1677349-942e-49a3-ad67-6584bdb588c8','2025-01-02 11:55:06','2025-01-02 11:55:06');
/*!40000 ALTER TABLE `course_outline` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseID` varchar(120) DEFAULT NULL,
  `courseName` varchar(120) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `courseID` (`courseID`),
  UNIQUE KEY `courseName` (`courseName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES ('PHY301','PHY 301','1f6c30d3-164a-426c-b9ac-487583bbd8dc','2025-01-02 11:39:15','2025-01-02 11:39:15'),('MAT101','MAT 101','28ca062f-a2c7-4199-b6f3-e4adcd94cbd0','2025-01-02 11:37:37','2025-01-02 11:37:37'),('CHM303','CHM 303','34ce2ea4-f700-4b49-97fd-91f7273ce53c','2025-01-02 11:38:24','2025-01-02 11:38:24'),('MAT201','MAT 201','3fa3dafa-346a-4687-bee7-2c658de7212b','2025-01-02 11:38:13','2025-01-02 11:38:13'),('CHM203','CHM 203','4d6a4aa7-b68c-459f-9417-80bbc4728c1c','2025-01-02 11:39:38','2025-01-02 11:39:38'),('CHM307','CHM 307','76ae7475-e985-41fb-a9a7-e02f2cef2d6d','2025-01-02 11:39:27','2025-01-02 11:39:27'),('GST203','GST 203','7f9666a3-6d0e-4d8c-a6b0-4b4de41f4993','2025-01-02 11:38:49','2025-01-02 11:38:49'),('CHM207','CHM 207','83453fe4-8636-4fd3-bef6-bfbfca063f3d','2025-01-02 11:39:49','2025-01-02 11:39:49'),('PHY101','PHY 101','99c29295-a564-440b-9f55-9ee4b1fcbe42','2025-01-02 11:37:49','2025-01-02 11:37:49'),('GST303','GST 303','cee19d33-6dd2-4f36-9d1f-e075186a141a','2025-01-02 11:39:03','2025-01-02 11:39:03'),('MAT301','MAT 301','d7c3e745-f01b-4dc0-8801-8b8888ae7cda','2025-01-02 11:38:38','2025-01-02 11:38:38'),('CHM107','CHM 107','ece697c4-a7a1-4f71-9207-bcbefc6d1499','2025-01-02 11:38:01','2025-01-02 11:38:01'),('CHM103','CHM 103','fbee6220-820f-4b50-8f71-42f3921d2e09','2025-01-02 11:37:23','2025-01-02 11:37:23');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `measurements`
--

DROP TABLE IF EXISTS `measurements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `measurements` (
  `height` int DEFAULT NULL,
  `wrist` int DEFAULT NULL,
  `chest_width` int DEFAULT NULL,
  `leg` int DEFAULT NULL,
  `arms` int DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `measurements`
--

LOCK TABLES `measurements` WRITE;
/*!40000 ALTER TABLE `measurements` DISABLE KEYS */;
/*!40000 ALTER TABLE `measurements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `courseID` varchar(120) NOT NULL,
  `questionText` varchar(255) NOT NULL,
  `correctAnswer` varchar(120) NOT NULL,
  `explanation` varchar(500) NOT NULL,
  `options` json NOT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `courseID` (`courseID`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`courseID`) REFERENCES `courses` (`courseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES ('GST303','What is the theme of \'Animal Farm\'?','B','The central theme of \'Animal Farm\' is Totalitarianism.','{\"A\": \"Equality\", \"B\": \"Totalitarianism\", \"C\": \"Love\", \"D\": \"Adventure\"}','0c166b0a-6e7f-4613-b00b-ca1f35f156c6','2025-01-07 12:18:50','2025-01-07 12:18:50'),('CHM307','What is the pH of a neutral solution?','A','The pH of a neutral solution is 7.','{\"A\": \"7\", \"B\": \"1\", \"C\": \"14\", \"D\": \"0\"}','1edadc2e-85e5-4a85-adbd-bfaa2ab68d89','2025-01-07 11:49:42','2025-01-07 11:49:42'),('CHM307','What is Avogadro\'s number?','A','Avogadro\'s number is 6.022 x 10^23.','{\"A\": \"6.022 x 10^23\", \"B\": \"3.14\", \"C\": \"2.71\", \"D\": \"1.61\"}','3030849b-7272-4017-8bd7-f08698c78a1a','2025-01-07 11:50:31','2025-01-07 11:50:31'),('GST303','Which novel starts with the line \'Call me Ishmael\'?','A','\'Moby Dick\' begins with the line \'Call me Ishmael\'.','{\"A\": \"Moby Dick\", \"B\": \"Great Expectations\", \"C\": \"War and Peace\", \"D\": \"The Catcher in the Rye\"}','4267f3ef-cadb-43b2-83d1-4115fe37ac5d','2025-01-07 12:20:11','2025-01-07 12:20:11'),('CHM307','What is the chemical formula for water?','A','Water is represented by the formula H2O.','{\"A\": \"H2O\", \"B\": \"O2\", \"C\": \"H2\", \"D\": \"H2O2\"}','523ba23f-8139-4b67-a805-8e1affeb6cc0','2025-01-07 11:49:02','2025-01-07 11:49:02'),('CHM307','What type of bond is found in NaCl?','B','NaCl has an ionic bond.','{\"A\": \"Covalent\", \"B\": \"Ionic\", \"C\": \"Metallic\", \"D\": \"Hydrogen\"}','6191d81c-1a45-4253-a7b0-9df45a3bcee7','2025-01-07 11:50:21','2025-01-07 11:50:21'),('CHM307','What is the primary gas found in Earth\'s atmosphere?','B','Nitrogen is the primary gas in Earth\'s atmosphere.','{\"A\": \"Oxygen\", \"B\": \"Nitrogen\", \"C\": \"Carbon Dioxide\", \"D\": \"Hydrogen\"}','6b3ecc7c-249f-405f-9289-15c4f3c0e377','2025-01-07 11:51:00','2025-01-07 11:51:00'),('CHM307','Which element is most abundant in the Earth\'s crust?','A','Oxygen is the most abundant element in the Earth\'s crust.','{\"A\": \"Oxygen\", \"B\": \"Silicon\", \"C\": \"Aluminium\", \"D\": \"Iron\"}','8b33d4d6-cccf-461d-9045-70ac5145cdb8','2025-01-07 11:50:00','2025-01-07 11:50:00'),('CHM307','What is the atomic number of Carbon?','B','The atomic number of Carbon is 6.','{\"A\": \"12\", \"B\": \"6\", \"C\": \"8\", \"D\": \"10\"}','968717d1-834a-467f-b5c5-c4c044f26800','2025-01-07 11:48:47','2025-01-07 11:48:47'),('CHM307','What is the chemical symbol for gold?','A','The symbol for gold is Au.','{\"A\": \"Au\", \"B\": \"Ag\", \"C\": \"Pb\", \"D\": \"Hg\"}','9bee2cf1-b063-4edd-a689-429b8cac20ad','2025-01-07 11:51:39','2025-01-07 11:51:39'),('GST303','Which Shakespeare play is known as \'The Scottish Play\'?','A','Macbeth is referred to as \'The Scottish Play\'.','{\"A\": \"Macbeth\", \"B\": \"Hamlet\", \"C\": \"Othello\", \"D\": \"King Lear\"}','a9773e84-c5d2-4b90-9dfb-d41fcde3ad17','2025-01-07 12:19:19','2025-01-07 12:19:19'),('GST303','What type of novel is \'1984\' by George Orwell?','A','\'1984\' is a dystopian novel.','{\"A\": \"Dystopian\", \"B\": \"Fantasy\", \"C\": \"Romantic\", \"D\": \"Historical\"}','ab582e10-6291-48d4-8e0b-400c4f677480','2025-01-07 12:20:52','2025-01-07 12:20:52'),('GST303','Who is the author of \'Things Fall Apart\'?','A','\'Things Fall Apart\' was written by Chinua Achebe.','{\"A\": \"Chinua Achebe\", \"B\": \"Wole Soyinka\", \"C\": \"Ngũgĩ wa Thiong\'o\", \"D\": \"Chimamanda Ngozi Adichie\"}','b45d15ad-de0e-420d-9d43-b49e8da57080','2025-01-07 12:18:37','2025-01-07 12:18:37'),('GST303','Who is the protagonist of \'The Great Gatsby\'?','B','Jay Gatsby is the protagonist.','{\"A\": \"Nick Carraway\", \"B\": \"Jay Gatsby\", \"C\": \"Tom Buchanan\", \"D\": \"Daisy Buchanan\"}','be777c5b-4235-4ca6-8055-4e82431c5d5b','2025-01-07 12:20:21','2025-01-07 12:20:21'),('GST303','What is the title of J.K. Rowling\'s first Harry Potter book?','B','The first book is \'The Philosopher\'s Stone\'.','{\"A\": \"The Chamber of Secrets\", \"B\": \"The Philosopher\'s Stone\", \"C\": \"The Prisoner of Azkaban\", \"D\": \"The Goblet of Fire\"}','c86d1408-11c7-4384-866a-f5204a42ebe4','2025-01-07 12:20:41','2025-01-07 12:20:41'),('GST303','What is the main theme of \'The Road\' by Cormac McCarthy?','A','The primary theme is survival.','{\"A\": \"Survival\", \"B\": \"Revenge\", \"C\": \"Romance\", \"D\": \"Mystery\"}','c990d98c-1edd-483c-94b5-14e47b9514b1','2025-01-07 12:20:32','2025-01-07 12:20:32'),('GST303','Who wrote \'Pride and Prejudice\'?','A','\'Pride and Prejudice\' was written by Jane Austen.','{\"A\": \"Jane Austen\", \"B\": \"Charlotte Bronte\", \"C\": \"Emily Dickinson\", \"D\": \"Louisa May Alcott\"}','cdfd8961-4de3-45d0-8334-3554ee6ba62f','2025-01-07 12:19:36','2025-01-07 12:19:36'),('GST303','What is the main conflict in \'Romeo and Juliet\'?','C','\'Romeo and Juliet\' deals with Man vs Society conflict.','{\"A\": \"Man vs Nature\", \"B\": \"Man vs Man\", \"C\": \"Man vs Society\", \"D\": \"Man vs Technology\"}','f35162a8-26a5-40b8-9a4d-676401048841','2025-01-07 12:19:01','2025-01-07 12:19:01'),('CHM307','What is the molarity formula?','A','Molarity is defined as moles of solute per volume of solution.','{\"A\": \"moles/volume\", \"B\": \"volume/moles\", \"C\": \"mass/volume\", \"D\": \"moles x volume\"}','f3e20c42-475d-4cfa-823f-ab50d5ced207','2025-01-07 11:51:28','2025-01-07 11:51:28'),('CHM307','Which gas is commonly known as laughing gas?','C','Nitrous Oxide is known as laughing gas.','{\"A\": \"Nitrogen\", \"B\": \"Carbon Dioxide\", \"C\": \"Nitrous Oxide\", \"D\": \"Methane\"}','ffa38048-723b-41c8-941a-850678e79930','2025-01-07 11:50:41','2025-01-07 11:50:41');
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `fullname` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `height` int DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2025-01-18 11:44:24
