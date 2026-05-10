-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: proyecto_final
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `amenities`
--

DROP TABLE IF EXISTS `amenities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `amenities` (
  `needs_reservation` bit(1) DEFAULT NULL,
  `amenity_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`amenity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amenities`
--

LOCK TABLES `amenities` WRITE;
/*!40000 ALTER TABLE `amenities` DISABLE KEYS */;
INSERT INTO `amenities` VALUES (_binary '',1,'Sumérgete en una experiencia de relajación absoluta. Nuestro exclusivo spa ofrece masajes personalizados, tratamientos rejuvenecedores y rituales de bienestar inspirados en técnicas ancestrales. Ideal para renovar cuerpo, mente y espíritu en un entorno de lujo total.','spa'),(_binary '\0',3,'Ambientes refinados para compartir momentos especiales. Ofrecemos una cuidada carta de vinos, licores premium y cócteles artesanales, todo en espacios con diseño exclusivo y atmósferas envolventes.','BAR'),(_binary '',4,'Explora lo mejor de la naturaleza dentro y fuera del mar. Disfruta de caminatas ecológicas, cabalgatas al atardecer, paseos en yate, tours en veleros y deportes acuáticos. Vive la aventura con el equilibrio perfecto entre emoción y paisajes espectaculares.','Aventura y naturaleza'),(_binary '\0',5,'Mantén tu estilo de vida activo con acceso a un gimnasio de última tecnología. Equipos modernos, clases dirigidas y espacios luminosos para entrenar con comodidad y vista privilegiada.','Gimnasio'),(_binary '',6,'Celebra tu gran día en un entorno de ensueño, donde cada detalle refleja elegancia y distinción. Desde ceremonias íntimas frente al mar hasta recepciones majestuosas en salones decorados con fineza, nuestro equipo experto convierte tu historia en una experiencia mágica e inolvidable.','Eventos y bodas'),(_binary '',7,'Sumérgete en la esencia del mar con experiencias diseñadas para despertar tus sentidos. Disfruta de paseos en yate, recorridos en lancha, snorkel entre aguas cristalinas o relajantes paseos en paddle board. Cada actividad combina aventura, elegancia y la serenidad del océano que rodea Lavelle Grand Resort.','Actividades acuáticas'),(_binary '\0',8,'Refresca cuerpo y alma en nuestras exclusivas piscinas, rodeadas de jardines tropicales y un ambiente de tranquilidad absoluta. Ya sea tomando el sol en una cama balinesa o disfrutando de un cóctel en el bar acuático, cada momento junto al agua se convierte en una experiencia de descanso y placer incomparable.','Piscinas'),(_binary '\0',12,'Descubre una fusión de sabores únicos en restaurantes de clase mundial. Cada plato es una obra de arte diseñada para deleitar tus sentidos.','Experiencias gastronómicas');
/*!40000 ALTER TABLE `amenities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `amenity_id` bigint DEFAULT NULL,
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `FKis3oy4ujwrpr6rfbgqhhe5fh7` (`amenity_id`),
  KEY `FKdeh4h59nedlwji0j8e57hu9mf` (`room_id`),
  CONSTRAINT `FKdeh4h59nedlwji0j8e57hu9mf` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `FKis3oy4ujwrpr6rfbgqhhe5fh7` FOREIGN KEY (`amenity_id`) REFERENCES `amenities` (`amenity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,NULL,'..\\Img_proyecto_final\\9a0c8a70-07d5-403c-8097-41257dbff283_spa_6.JPG','9cc529f9-7fa4-4cb6-badf-b718c14e34a4_spa_6.JPG'),(1,2,NULL,'..\\Img_proyecto_final\\7ae62464-0314-4897-9af1-7745d5483605_spa_8.jpg','ad1bdfbc-35bd-40c0-84c1-5f52c6007964_spa_8.jpg'),(1,3,NULL,'..\\Img_proyecto_final\\f890fb85-d77e-47b7-8a5f-ca7c3ef7dd45_spa_5.jpg','3477e6fc-c95c-425e-a9ba-a0c80c1fe52c_spa_5.jpg'),(1,4,NULL,'..\\Img_proyecto_final\\b4a945f5-e89d-4f92-8bbb-1f5d5c3e2051_spa_4.jpg','2959ddd2-cee0-47ce-8a2e-94afec85c94c_spa_4.jpg'),(1,5,NULL,'..\\Img_proyecto_final\\d8dd7ba2-ed0f-49bb-8c95-45744f9c18d3_spa_3.jpg','46cd1a92-92d0-4fac-b873-6141c7be8194_spa_3.jpg'),(1,6,NULL,'..\\Img_proyecto_final\\5da52b35-a4f4-446a-9770-0e1294879b87_spa_2.jpg','6454e0b5-2a9e-42b0-b7dc-54ca7350d6b5_spa_2.jpg'),(3,13,NULL,'..\\Img_proyecto_final\\2a007163-62e2-427a-85b9-0d3b4459936e_Bar_5.jpeg','3837f01d-3c7a-4c4e-a1b5-f24ef80b0b82_Bar_5.jpeg'),(3,14,NULL,'..\\Img_proyecto_final\\6008d6d8-8cf1-4e1c-93c0-0fc540add9f8_Bar_6.jpg','b522b2cb-9768-431b-9fb1-b0aff1892890_Bar_6.jpg'),(3,15,NULL,'..\\Img_proyecto_final\\78e7cf94-8038-4705-ae9c-36f762ec03ce_Bar_1.jpg','c07ebec8-2ffc-4715-bf4b-0f0e88e6b34e_Bar_1.jpg'),(3,16,NULL,'..\\Img_proyecto_final\\56aadabe-4584-4fa0-ae98-f3bd8fdea16d_Bar_2.JPG','c43457df-bc99-4ecf-91b3-3b5755e8467a_Bar_2.JPG'),(3,17,NULL,'..\\Img_proyecto_final\\6a989997-08ab-45a2-8680-6dc5392c223e_Bar_4.jpg','8709bb3b-b4c0-4827-85d6-6569eb73663e_Bar_4.jpg'),(3,18,NULL,'..\\Img_proyecto_final\\11467c21-2a0b-42d0-9bed-f802b99b8d47_Bar_3.jpg','815bd1ec-4b86-4f5c-84e5-98f324773f17_Bar_3.jpg'),(4,19,NULL,'..\\Img_proyecto_final\\8f0cd8e7-7b4d-44a2-a4ad-3d9dedb90a5f_an_5.JPG','8221f74d-9565-4001-a57f-a5fe036c05f1_an_5.JPG'),(4,20,NULL,'..\\Img_proyecto_final\\d2b682b6-882b-4dd1-8220-1b87f9431b43_an_4.jpg','a0b759ee-9458-45b3-b7c7-aa8d3fe26603_an_4.jpg'),(4,21,NULL,'..\\Img_proyecto_final\\b459aba7-e783-4c4b-8d5b-5d5dc668e21b_an_3.jpg','83b91662-a4f8-4316-9f1f-65f58a27092d_an_3.jpg'),(4,22,NULL,'..\\Img_proyecto_final\\e34a4110-bb20-456b-b055-1785d79da543_an_2.jpeg','7514314b-9986-46f7-891a-8160607b5a53_an_2.jpeg'),(4,23,NULL,'..\\Img_proyecto_final\\25b1c78e-c0e0-4b27-bc4e-3b94bf69001d_an_1.jpg','7a1cc1c6-d4e5-4ee6-b88a-5086d793e16e_an_1.jpg'),(4,24,NULL,'..\\Img_proyecto_final\\70133f06-cf4f-4f74-8dd4-8d1d874bae16_an_6.jpg','96f9556a-4976-4c32-b5a1-3257689d74ba_an_6.jpg'),(NULL,25,1,'..\\Img_proyecto_final\\aa661775-2d1d-48be-8fc1-bbeee7b0437f_su_6.jpeg','b8d2a405-832b-4c42-bb13-e25232176cdb_su_6.jpeg'),(NULL,26,1,'..\\Img_proyecto_final\\ddfaeae2-95eb-4d52-a38e-779085bdc274_su_4.jpeg','d68ac265-7455-4142-a525-de1ceb8a5cf7_su_4.jpeg'),(NULL,27,1,'..\\Img_proyecto_final\\0f16e692-9962-4acb-9fbd-8c22a7a07732_su_5.jpeg','652973ab-934d-4895-bf3b-f91c96652386_su_5.jpeg'),(NULL,28,1,'..\\Img_proyecto_final\\65338b8b-e423-4de7-b86e-4d583cb88d54_su_3.jpeg','d6cebe97-67f9-4186-b1ad-bb50fadb06e5_su_3.jpeg'),(NULL,29,1,'..\\Img_proyecto_final\\42d2bdf4-572b-4bd0-9bc1-3665635b1589_su_2.jpeg','201bfd75-e0a9-491e-a09c-89a7b3f4692f_su_2.jpeg'),(NULL,30,1,'..\\Img_proyecto_final\\a3be20d8-39fb-40a1-9ab4-3b09376fe900_su_1.jpeg','07e4af4f-fcb3-4948-a8c7-a9f40393fbc9_su_1.jpeg'),(5,31,NULL,'..\\Img_proyecto_final\\4dc77015-da56-465a-9766-f0308e8166f3_gym_1.jpeg','62dd5b43-bc97-47d9-aa58-680c3cf73ce1_gym_1.jpeg'),(5,32,NULL,'..\\Img_proyecto_final\\0b90a019-9724-4707-b71f-f5c1d9f2086d_gym_3.jpg','fcfe1edf-4757-4b3d-8462-279a81f21eb0_gym_3.jpg'),(5,33,NULL,'..\\Img_proyecto_final\\0e1910c9-f97c-4f03-a69b-c7fa6ad8eedc_gym_6.jpg','b1677ca8-a168-46fa-8820-f8ff76fc6728_gym_6.jpg'),(5,34,NULL,'..\\Img_proyecto_final\\faf33e15-e205-479a-b589-3865cabc610e_gym_4.jpg','47ff29bf-a82d-4e51-b05a-5a0231baddbb_gym_4.jpg'),(5,35,NULL,'..\\Img_proyecto_final\\1d755047-9bcf-4deb-a5f2-2ec9aa2e1170_gym_2.jpg','9a64b74d-285f-4a6b-9212-188f7c1ee73d_gym_2.jpg'),(5,36,NULL,'..\\Img_proyecto_final\\4f5b2a7d-b576-4cd6-8a32-a6a982368d4d_gym_5.jpg','2dc6c59b-2082-47ec-b48f-9606467e100f_gym_5.jpg'),(NULL,37,2,'..\\Img_proyecto_final\\b9bb8313-bb95-4dbc-83e6-b814ff06c382_deluxe_6.JPG','8a4b8b85-4b9b-44af-aabb-59215dd38469_deluxe_6.JPG'),(NULL,38,2,'..\\Img_proyecto_final\\7259a2c4-80c4-4787-a37c-3167faeb4096_deluxe_5.jpeg','4d77a93c-e42a-47b1-974c-5ec508f310a2_deluxe_5.jpeg'),(NULL,39,2,'..\\Img_proyecto_final\\d48e5b51-da58-474b-9d71-a11bc40298e5_deluxe_4.JPG','23e74391-6ffa-4b67-ab8e-beccf0a3d444_deluxe_4.JPG'),(NULL,40,2,'..\\Img_proyecto_final\\793d5721-82d1-4437-b419-ea8473abfef5_deluxe_3.JPG','2c875689-8b32-41fb-bfea-50f61ff04eeb_deluxe_3.JPG'),(NULL,41,2,'..\\Img_proyecto_final\\e3a0a72d-db15-432b-856d-dc05299f7cb7_deluxe_2.jpeg','9678eed2-0921-46d6-8def-a01802ae9e77_deluxe_2.jpeg'),(NULL,42,2,'..\\Img_proyecto_final\\eda237cc-3a04-4d40-94d4-8a04263eb9a4_deluxe_1.JPG','a0db5b7d-b7cc-4e21-a321-ccc8a010322c_deluxe_1.JPG'),(6,49,NULL,'..\\Img_proyecto_final\\435f711b-fef9-4b6f-970b-11c6bd5cbbfb_eb_6.jpg','e7dc0994-5114-400d-838b-0ce5efb22fbf_eb_6.jpg'),(6,50,NULL,'..\\Img_proyecto_final\\893a2b90-cbae-4870-9f70-dc7ba66a3838_eb_5.jpg','86e78227-f0fd-47bd-8461-21613e844876_eb_5.jpg'),(6,51,NULL,'..\\Img_proyecto_final\\07690e04-045a-419f-bf0c-4e4f36d99fa6_eb_4.JPG','1853b0b4-1f5e-4cd7-a655-fcaf2ecf9d47_eb_4.JPG'),(6,52,NULL,'..\\Img_proyecto_final\\3639b77b-dddc-424b-8488-a0a5dca91500_eb_3.jpg','391dff5c-fdae-47cc-893f-47a7c7c8ec76_eb_3.jpg'),(6,53,NULL,'..\\Img_proyecto_final\\de0ccd0d-7530-4a7b-988f-92958cdbb747_eb_2.JPG','c3c6654d-7c51-4c36-9aa4-8a8521955d8a_eb_2.JPG'),(6,54,NULL,'..\\Img_proyecto_final\\ae6c3558-8cd4-430a-9e59-67cd32a52a67_eb_1.jpg','a30c93cc-6d5c-4ac7-83ab-e9400411bf8e_eb_1.jpg'),(7,55,NULL,'..\\Img_proyecto_final\\2ed5afd3-9615-43de-aba3-b4fd81d706d3_acu_6.jpg','f01e98d9-d51b-437b-a027-9d611430c01b_acu_6.jpg'),(7,56,NULL,'..\\Img_proyecto_final\\f841b221-f789-4135-b70b-fc6fc1b6adea_acu_5.jpg','98c17a1d-a941-4156-96be-8c68d7e89472_acu_5.jpg'),(7,57,NULL,'..\\Img_proyecto_final\\378c3063-357d-4303-9ec6-d381e8cb6ef9_acu_4.jpg','8871f58e-5f0a-4bd7-9f4a-80f02ad59019_acu_4.jpg'),(7,58,NULL,'..\\Img_proyecto_final\\85ee4dad-653f-40f5-919c-72787544160c_acu_3.jpg','802b80e7-7dda-4df9-aa16-5493963e04c1_acu_3.jpg'),(7,59,NULL,'..\\Img_proyecto_final\\7d817227-d7f1-4273-8f2d-7e784e9cd350_acu_2.jpg','ef8910f1-1839-4fa4-b44d-11b3c62f85c3_acu_2.jpg'),(7,60,NULL,'..\\Img_proyecto_final\\234d2bf2-8996-4191-8759-707ee4514b26_acu_1.jpg','d54db2ca-bbc5-4159-8561-ce9ddd571e95_acu_1.jpg'),(8,61,NULL,'..\\Img_proyecto_final\\57a33205-202f-446c-9196-a69308d87d63_pi_6.JPG','dcdd35f3-0fc4-4919-91f3-5c550f6ce26f_pi_6.JPG'),(8,62,NULL,'..\\Img_proyecto_final\\beee8412-cc51-4cee-881f-1ec600aa3268_pi_5.jpg','a974a181-14e6-4e07-94ae-d0718f2acb9e_pi_5.jpg'),(8,63,NULL,'..\\Img_proyecto_final\\4ec64a22-d201-4c0c-be4e-9ee9189cb76c_p1_4.jpg','67f5c44b-a69e-45f4-8a57-b1d37934cca8_p1_4.jpg'),(8,64,NULL,'..\\Img_proyecto_final\\bc4aed79-7c33-4e67-b7bc-75293a81c3ff_pi_3.jpg','021caa77-c498-4e3c-83ee-43213fecba4a_pi_3.jpg'),(8,65,NULL,'..\\Img_proyecto_final\\7816b1fc-67fc-4aec-917c-53a324c0f9fc_pi_1.jpg','2ff48033-0387-4656-94e4-c3fb0303562b_pi_1.jpg'),(8,66,NULL,'..\\Img_proyecto_final\\344079a6-442c-47ad-b47c-79ba15d06139_pi_2.jpg','dd098c5b-2446-4ba1-8459-6ddc6f067d15_pi_2.jpg'),(NULL,67,4,'..\\Img_proyecto_final\\34968c0f-ef64-4958-aae7-a46bfa0bb54d_pre_6.JPG','6ef1cc4a-ffb4-4428-bc62-38de672f24ee_pre_6.JPG'),(NULL,68,4,'..\\Img_proyecto_final\\3c7b408a-07d5-4c9f-8e2a-7c451c562ad9_pre_5.jpg','3aa10c43-ea01-4787-adb1-bcf4cb012dfb_pre_5.jpg'),(NULL,69,4,'..\\Img_proyecto_final\\329bccbb-3860-446b-844a-81470dff0b26_pre_4.JPG','9e7239e9-aaeb-4c5f-bca2-d7edde8d8b94_pre_4.JPG'),(NULL,70,4,'..\\Img_proyecto_final\\17861b9f-e54f-48da-9911-479642c06ed5_pre_3.jpeg','1b40f998-98e9-424f-86ba-cc275ba453d8_pre_3.jpeg'),(NULL,71,4,'..\\Img_proyecto_final\\de85b122-8350-4073-8a73-9312119d4fc8_pre_2.jpeg','f421e0eb-df5f-4b9b-b203-bb148dffe419_pre_2.jpeg'),(NULL,72,4,'..\\Img_proyecto_final\\2289c2e4-667b-4372-bda9-e56bfebd2bee_pre_1.JPG','d02166cf-a2e9-4b88-a008-78c6e299696f_pre_1.JPG'),(12,85,NULL,'uploads\\a3c6fd8b-2fb7-4df3-b1de-084560c57115_Gastro_6.jpg','415e1c8d-606c-402f-88e7-eb992abcc96a_Gastro_6.jpg'),(12,86,NULL,'uploads\\ee086e68-c59a-491f-8606-69d31efebe86_Gastro_5.jpg','58ca954a-7dbe-421b-8cce-fd104003cf5e_Gastro_5.jpg'),(12,87,NULL,'uploads\\f1ceba3f-e032-4ae6-bf88-7bdd90abce29_Gastro_1.jpg','c9b8ba61-8180-4b63-8f4c-bb88d76247e3_Gastro_1.jpg'),(12,88,NULL,'uploads\\2de6807a-d4a8-410e-9f8a-bd48ed180757_Gastro_4.JPG','fb3c1549-fa9c-426b-8963-6d69b3e50efc_Gastro_4.JPG'),(12,89,NULL,'uploads\\4e139d08-fb8a-44ce-b94c-11efc192a0ca_Gastro_2.jpg','2e0f2803-35ee-4092-8d2b-a2aae4771240_Gastro_2.jpg'),(12,90,NULL,'uploads\\4f55163c-2532-4c94-b8b5-b9cb65e9d9c7_Gastro_3.jpg','0a8663a5-f509-4595-84e4-32200f822af5_Gastro_3.jpg'),(NULL,91,6,'uploads\\195fdf99-09a7-46a3-b31c-c91171143a2a_villa_4.jpeg','1bee4b31-f15b-4eed-ad55-dc87982f01e6_villa_4.jpeg'),(NULL,92,6,'uploads\\b2befb92-cdfb-4c89-b6aa-5d7057b26d0a_villa_3.jpeg','04dd6441-a872-46ad-a222-faeb3f0eecec_villa_3.jpeg'),(NULL,93,6,'uploads\\5092d049-155d-4f89-91d9-f01a974fa4b7_villa_2.jpeg','0b95e480-73db-484e-84d3-234ea20bbc3a_villa_2.jpeg'),(NULL,94,6,'uploads\\0dc37f67-dd5b-44a2-8c96-542e2ef99f02_villa_1.jpeg','9edd7ac0-9b70-4d36-a93d-5f73070aaeda_villa_1.jpeg'),(NULL,95,6,'uploads\\0ebf596f-d088-4d73-9625-88ca6893bb86_villa_6.jpg','97c50ac7-0d42-4d20-bae7-4d4329e2735c_villa_6.jpg'),(NULL,96,6,'uploads\\201d00c7-857f-46e5-8945-a11460ca41e2_villa_5.jpeg','52f01d7a-25ea-43d6-a437-921d2db75540_villa_5.jpeg'),(NULL,112,12,'uploads\\a5cd798b-2d1c-408e-927a-666541570e85_nathan-dumlao-zUNs99PGDg0-unsplash.jpg','14363c83-51af-4776-aae2-931295f4234f_nathan-dumlao-zUNs99PGDg0-unsplash.jpg'),(NULL,113,12,'uploads\\bf8a7c15-3d07-4439-86cd-38bf46192ed5_deborah-rainford-mfGSidToZys-unsplash.jpg','a2d66cdf-c4ad-4809-90a0-c6e76d471edf_deborah-rainford-mfGSidToZys-unsplash.jpg'),(NULL,114,12,'uploads\\980b5988-ffaf-4ec4-8fe3-68cd89122b14_pexels-asadphoto-28843914.jpg','3cf1dfac-5b7c-4e77-a873-eeea327439d9_pexels-asadphoto-28843914.jpg');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_product`
--

DROP TABLE IF EXISTS `reservation_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_product` (
  `product_id` bigint NOT NULL,
  `reservation_id` bigint NOT NULL,
  KEY `FK2u2ieq4j990g4aw10w7ieeisa` (`product_id`),
  KEY `FKdjmywbm03nm49yjcpuy5apa2t` (`reservation_id`),
  CONSTRAINT `FK2u2ieq4j990g4aw10w7ieeisa` FOREIGN KEY (`product_id`) REFERENCES `amenities` (`amenity_id`),
  CONSTRAINT `FKdjmywbm03nm49yjcpuy5apa2t` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_product`
--

LOCK TABLES `reservation_product` WRITE;
/*!40000 ALTER TABLE `reservation_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `check_in_date` date DEFAULT NULL,
  `check_out_date` date DEFAULT NULL,
  `reservation_id` bigint NOT NULL AUTO_INCREMENT,
  `room_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `FKljt6q1tp205b0h26eiegc5mx6` (`room_id`),
  KEY `FKb5g9io5h54iwl2inkno50ppln` (`user_id`),
  CONSTRAINT `FKb5g9io5h54iwl2inkno50ppln` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKljt6q1tp205b0h26eiegc5mx6` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `availability` bit(1) DEFAULT NULL,
  `cost` double DEFAULT NULL,
  `room_id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(2000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `room_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (NULL,NULL,1,'Elegancia y distinción en cada detalle. Las suites combinan diseño contemporáneo con un ambiente acogedor, ofreciendo sala de estar independiente, baño de mármol con jacuzzi y una vista impresionante al mar. Ideal para quienes desean disfrutar del lujo con un toque de intimidad y sofisticación.','Suite',NULL),(NULL,NULL,2,'Confort refinado y estilo moderno. La habitación Deluxe destaca por su amplitud, su cama king size, su decoración con acabados de alta gama y sus vistas encantadoras. Un espacio pensado para el descanso profundo y la experiencia sensorial de un alojamiento de primera clase.','Habitación Deluxe',NULL),(NULL,NULL,4,'Sencillamente elegante. La habitación Premium ofrece un equilibrio perfecto entre comodidad, diseño y funcionalidad. Con mobiliario de lujo, iluminación suave y amenities exclusivos, es el lugar ideal para disfrutar de una estancia relajante con el sello distintivo de Lavelle Grand Resort.','Habitación Premium',NULL),(NULL,NULL,6,'Vive la máxima expresión del lujo y la privacidad. Nuestras villas ofrecen un refugio exclusivo con piscina privada, acceso directo a la playa y amplios espacios diseñados para el descanso total. Cada detalle ha sido cuidadosamente pensado para brindar una experiencia única, rodeada de confort y serenidad absoluta.','Villa privada',NULL),(NULL,NULL,12,'Este producto es para testeo de la profesora. :)','Habitación Profe',NULL);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vtheboss@lavellegrandresort.com','The boss','Vivian','$2a$10$7vwMdsXNomwwR8DkZeqBIuwjjXQ1/OzlFEsIU3tzBBN84fqkzTRs6','ADMIN'),(2,'vadmin@lavellegrandresort.com','Admin','Vivs-Admin','$2a$10$ZVbZPPMuymvV0X7SfNr.yO8AL/x8u17JKLu.HtDU/3FHXWhvckPX6','ADMIN');
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

-- Dump completed on 2026-05-09 23:23:47
