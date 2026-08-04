
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `product_aggregator_mvp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `product_aggregator_mvp`;
DROP TABLE IF EXISTS `affiliate_links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `affiliate_links` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `offer_id` bigint(20) unsigned NOT NULL,
  `public_code` char(36) NOT NULL,
  `affiliate_url` varchar(2000) NOT NULL,
  `program_name` varchar(160) DEFAULT NULL,
  `campaign_name` varchar(160) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `starts_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_affiliate_links_public_code` (`public_code`),
  KEY `idx_affiliate_links_offer_active` (`offer_id`,`is_active`),
  KEY `idx_affiliate_links_period` (`is_active`,`starts_at`,`expires_at`),
  CONSTRAINT `fk_affiliate_links_offer` FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `affiliate_links` WRITE;
/*!40000 ALTER TABLE `affiliate_links` DISABLE KEYS */;
INSERT INTO `affiliate_links` VALUES (1,1,'8b371199-8f6e-11f1-b869-e070ea43b6c0','https://www.nike.com.br/tenis-nike-air-max-excee-masculino-027322.html?cor=51&utm_source=share_copy&utm_medium=organic&utm_campaign=product&utm_content=cta_topo',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(2,2,'8b37124a-8f6e-11f1-b869-e070ea43b6c0','https://www.nike.com.br/tenis-nike-sb-force-58-masculino-011580.html?cor=ID&utm_source=share_copy&utm_medium=organic&utm_campaign=product&utm_content=cta_topo',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(3,3,'8b3712a5-8f6e-11f1-b869-e070ea43b6c0','https://www.lacoste.com/br/lacoste/masculino/vestuário/sueteres-moletons/3665926601846.html?color=166&utm_source=google&utm_campaign=[Monks][BR][Shopping]Geral&gad_source=4&gad_campaignid=23082444661&gclid=CjwKCAjwntHPBhAaEiwA_Xp6RiT2M-s9M8PnU-pLZ_eOuCw3La79xV1HGTAdlR7Xze-XL926WCD8CxoC8RMQAvD_BwE',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(4,4,'8b3712fe-8f6e-11f1-b869-e070ea43b6c0','https://www.lacoste.com/br/lacoste/masculino/vestuário/sueteres-moletons/SH2662-23.html?color=031',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(5,5,'8b37134e-8f6e-11f1-b869-e070ea43b6c0','https://www.adidas.com.br/calca-esportiva-firebird/KD8315.html?cm_mmc=AdieSEM_Google_PLA-_-Always_On-_-Shopping-_-KD8315-0004-_-dv:eCom-_-cn:Always_On-_-pc:Originals&cm_mmc1=BR&cm_mmc2=PLA-Multiple-Originals-Other-None-BR-LATAM-eCom-Paid_Search&cm_mmc=AdieSEM_Google_PLA-_-adidas-LAM-BR-Shopping-AllProducts-_-All+Products-_-PRODUCT_GROUP-_-&-_-ds_kid=293946777986-_-&-_-ds_agid=174050197584-_-&-_-dv:eCom&cm_mmc1=BR&cm_mmc2=&adicl_gclid=CjwKCAjwntHPBhAaEiwA_Xp6RozacGegvKTvtsFvDvUr-vUsv0Vswt8J0JYRVe',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(6,6,'8b37139c-8f6e-11f1-b869-e070ea43b6c0','https://www.adidas.com.br/tenis-lite-racer-4.0/JJ7367.html',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(7,7,'8b3713ed-8f6e-11f1-b869-e070ea43b6c0','https://www.adidas.com.br/jaqueta-jeans-adicolor-firebird-track-top/KD1517.html?cm_mmc=AdieSEM_Google_PLA-_-Always_On-_-Shopping-_-KD1517-0002-_-dv:eCom-_-cn:Always_On-_-pc:Originals&cm_mmc1=BR&cm_mmc2=PLA-Multiple-Originals-Other-None-BR-LATAM-eCom-Paid_Search&cm_mmc=AdieSEM_Google_PLA-_-adidas-LAM-BR-PMAX-AllProducts-M-_-PMAX_AllProducts_AON-_--_-&-_-ds_kid=-_-&-_-ds_agid=-_-&-_-dv:eCom&cm_mmc1=BR&cm_mmc2=&adicl_gclid=CjwKCAjwntHPBhAaEiwA_Xp6RoR5eGw2hNSJFoPp52v23j9h_HKSA3F1O55kkzD33ijQ09lt3iLv',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(8,8,'8b37143d-8f6e-11f1-b869-e070ea43b6c0','https://www.nike.com.br/jaqueta-corinthians-niketotal-90-essential-anthem-iii-masculina-061064.html?cor=ID&utm_source=share_copy&utm_medium=organic&utm_campaign=product&utm_content=cta_topo',NULL,'catalogo-inicial',1,NULL,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16');
/*!40000 ALTER TABLE `affiliate_links` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brands` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `description` text DEFAULT NULL,
  `logo_url` varchar(1000) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_brands_name` (`name`),
  UNIQUE KEY `uq_brands_slug` (`slug`),
  KEY `idx_brands_active_name` (`is_active`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (4,'Nike','nike','Produtos Nike disponíveis em lojas oficiais.',NULL,1,'2026-08-03 19:07:16','2026-08-04 18:06:57'),(5,'Adidas','adidas','Produtos Adidas disponíveis em lojas oficiais.',NULL,1,'2026-08-03 19:07:16','2026-08-04 18:06:57'),(6,'Lacoste','lacoste','Produtos Lacoste disponíveis em lojas oficiais.',NULL,1,'2026-08-03 19:07:16','2026-08-04 18:06:57');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`),
  KEY `idx_categories_parent` (`parent_id`),
  KEY `idx_categories_active_name` (`is_active`,`name`),
  CONSTRAINT `fk_categories_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,NULL,'Tênis','tenis','Tênis casuais e esportivos.',1,'2026-08-03 19:07:16','2026-08-04 18:06:57'),(6,NULL,'Jaquetas','jaquetas','Jaquetas e peças para sobreposição.',1,'2026-08-03 19:07:16','2026-08-04 18:06:57'),(7,NULL,'Calças','calcas','Calças casuais e esportivas.',1,'2026-08-03 19:07:16','2026-08-04 18:06:57'),(8,NULL,'Moletons','moletons','Moletons e peças de malha.',1,'2026-08-03 19:07:16','2026-08-04 18:06:57'),(9,NULL,'Suéteres','sueteres','Suéteres e peças de malha para diferentes ocasiões.',1,'2026-08-04 18:35:50','2026-08-04 18:35:50');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `click_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `click_events` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `affiliate_link_id` bigint(20) unsigned NOT NULL,
  `product_id` bigint(20) unsigned NOT NULL,
  `merchant_id` bigint(20) unsigned NOT NULL,
  `source` varchar(100) DEFAULT NULL,
  `medium` varchar(100) DEFAULT NULL,
  `campaign` varchar(160) DEFAULT NULL,
  `referrer_host` varchar(255) DEFAULT NULL,
  `device_type` enum('mobile','tablet','desktop','unknown') NOT NULL DEFAULT 'unknown',
  `visitor_token_hash` char(64) DEFAULT NULL,
  `clicked_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_click_events_affiliate_link` (`affiliate_link_id`),
  KEY `idx_click_events_date` (`clicked_at`),
  KEY `idx_click_events_product_date` (`product_id`,`clicked_at`),
  KEY `idx_click_events_merchant_date` (`merchant_id`,`clicked_at`),
  KEY `idx_click_events_campaign_date` (`campaign`,`clicked_at`),
  CONSTRAINT `fk_click_events_affiliate_link` FOREIGN KEY (`affiliate_link_id`) REFERENCES `affiliate_links` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_click_events_merchant` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_click_events_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `click_events` WRITE;
/*!40000 ALTER TABLE `click_events` DISABLE KEYS */;
/*!40000 ALTER TABLE `click_events` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `merchants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `merchants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `slug` varchar(170) NOT NULL,
  `website_url` varchar(1000) NOT NULL,
  `logo_url` varchar(1000) DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_merchants_name` (`name`),
  UNIQUE KEY `uq_merchants_slug` (`slug`),
  KEY `idx_merchants_active_name` (`is_active`,`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `merchants` WRITE;
/*!40000 ALTER TABLE `merchants` DISABLE KEYS */;
INSERT INTO `merchants` VALUES (4,'Nike','nike','https://www.nike.com.br/',NULL,1,1,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(5,'Adidas','adidas','https://www.adidas.com.br/',NULL,1,1,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(6,'Lacoste','lacoste','https://www.lacoste.com/br/',NULL,1,1,'2026-08-03 19:07:16','2026-08-03 19:07:16');
/*!40000 ALTER TABLE `merchants` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `merchant_id` bigint(20) unsigned NOT NULL,
  `external_product_id` varchar(255) DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `previous_price` decimal(12,2) DEFAULT NULL,
  `currency` char(3) NOT NULL DEFAULT 'BRL',
  `availability` enum('in_stock','out_of_stock','preorder','unknown') NOT NULL DEFAULT 'unknown',
  `destination_url` varchar(2000) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_checked_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_offers_product_active` (`product_id`,`is_active`),
  KEY `idx_offers_merchant_active` (`merchant_id`,`is_active`),
  KEY `idx_offers_price` (`price`),
  KEY `idx_offers_availability` (`availability`),
  CONSTRAINT `fk_offers_merchant` FOREIGN KEY (`merchant_id`) REFERENCES `merchants` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_offers_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (1,1,4,NULL,NULL,NULL,'BRL','unknown','https://www.nike.com.br/tenis-nike-air-max-excee-masculino-027322.html?cor=51&utm_source=share_copy&utm_medium=organic&utm_campaign=product&utm_content=cta_topo',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(2,2,4,NULL,NULL,NULL,'BRL','unknown','https://www.nike.com.br/tenis-nike-sb-force-58-masculino-011580.html?cor=ID&utm_source=share_copy&utm_medium=organic&utm_campaign=product&utm_content=cta_topo',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(3,3,6,NULL,NULL,NULL,'BRL','unknown','https://www.lacoste.com/br/lacoste/masculino/vestuário/sueteres-moletons/3665926601846.html?color=166&utm_source=google&utm_campaign=[Monks][BR][Shopping]Geral&gad_source=4&gad_campaignid=23082444661&gclid=CjwKCAjwntHPBhAaEiwA_Xp6RiT2M-s9M8PnU-pLZ_eOuCw3La79xV1HGTAdlR7Xze-XL926WCD8CxoC8RMQAvD_BwE',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(4,4,6,NULL,NULL,NULL,'BRL','unknown','https://www.lacoste.com/br/lacoste/masculino/vestuário/sueteres-moletons/SH2662-23.html?color=031',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(5,5,5,NULL,NULL,NULL,'BRL','unknown','https://www.adidas.com.br/calca-esportiva-firebird/KD8315.html?cm_mmc=AdieSEM_Google_PLA-_-Always_On-_-Shopping-_-KD8315-0004-_-dv:eCom-_-cn:Always_On-_-pc:Originals&cm_mmc1=BR&cm_mmc2=PLA-Multiple-Originals-Other-None-BR-LATAM-eCom-Paid_Search&cm_mmc=AdieSEM_Google_PLA-_-adidas-LAM-BR-Shopping-AllProducts-_-All+Products-_-PRODUCT_GROUP-_-&-_-ds_kid=293946777986-_-&-_-ds_agid=174050197584-_-&-_-dv:eCom&cm_mmc1=BR&cm_mmc2=&adicl_gclid=CjwKCAjwntHPBhAaEiwA_Xp6RozacGegvKTvtsFvDvUr-vUsv0Vswt8J0JYRVe',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(6,6,5,NULL,NULL,NULL,'BRL','unknown','https://www.adidas.com.br/tenis-lite-racer-4.0/JJ7367.html',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(7,7,5,NULL,NULL,NULL,'BRL','unknown','https://www.adidas.com.br/jaqueta-jeans-adicolor-firebird-track-top/KD1517.html?cm_mmc=AdieSEM_Google_PLA-_-Always_On-_-Shopping-_-KD1517-0002-_-dv:eCom-_-cn:Always_On-_-pc:Originals&cm_mmc1=BR&cm_mmc2=PLA-Multiple-Originals-Other-None-BR-LATAM-eCom-Paid_Search&cm_mmc=AdieSEM_Google_PLA-_-adidas-LAM-BR-PMAX-AllProducts-M-_-PMAX_AllProducts_AON-_--_-&-_-ds_kid=-_-&-_-ds_agid=-_-&-_-dv:eCom&cm_mmc1=BR&cm_mmc2=&adicl_gclid=CjwKCAjwntHPBhAaEiwA_Xp6RoR5eGw2hNSJFoPp52v23j9h_HKSA3F1O55kkzD33ijQ09lt3iLv',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16'),(8,8,4,NULL,NULL,NULL,'BRL','unknown','https://www.nike.com.br/jaqueta-corinthians-niketotal-90-essential-anthem-iii-masculina-061064.html?cor=ID&utm_source=share_copy&utm_medium=organic&utm_campaign=product&utm_content=cta_topo',1,NULL,'2026-08-03 19:07:16','2026-08-03 19:07:16');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_images` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint(20) unsigned NOT NULL,
  `image_url` varchar(1000) NOT NULL,
  `alt_text` varchar(255) NOT NULL,
  `display_order` smallint(5) unsigned NOT NULL DEFAULT 0,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `idx_product_images_order` (`product_id`,`display_order`),
  KEY `idx_product_images_primary` (`product_id`,`is_primary`),
  CONSTRAINT `fk_product_images_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,1,'https://imgnike-a.akamaihd.net/360x360/02732251A2.jpg','Tênis Nike Air Max Excee Masculino',1,1,'2026-08-03 19:07:16'),(2,2,'https://imgnike-a.akamaihd.net/360x360/011580IDA2.jpg','Tênis Nike SB Force 58 Masculino',1,1,'2026-08-03 19:07:16'),(3,3,'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dwd842122f/AH1957_166_20.jpg?imwidth=380&impolicy=pctp&imdensity=1','Suéter Masculino de Malha em Modelagem Regular',1,1,'2026-08-03 19:07:16'),(4,4,'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw68e6b590/SH2662_031_24.jpg?imwidth=380&impolicy=pctp&imdensity=1','Casaco Masculino de Moletom com Decote Careca e Modelagem Clássica',1,1,'2026-08-03 19:07:16'),(5,5,'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/b2a4ff6d6e6c44a39e8f80a5b8a26631_9366/Calca_Esportiva_Firebird_Preto_KD8315_25_model.jpg','Calça Esportiva Firebird',1,1,'2026-08-03 19:07:16'),(6,6,'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/79158bcae8b24765a6dce97ed8b504c7_9366/Tenis_Lite_Racer_4.0_Preto_JJ7367_01_00_standard.jpg','Tênis Lite Racer 4.0',1,1,'2026-08-03 19:07:16'),(7,7,'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/cf3deb85af984d44be1731fc748a8d8e_9366/JAQUETA_JEANS_ADICOLOR_FIREBIRD_TRACK_TOP_Azul_KD1517_HM1.jpg','JAQUETA JEANS ADICOLOR FIREBIRD TRACK TOP',1,1,'2026-08-03 19:07:16'),(8,8,'https://imgnike-a.akamaihd.net/360x360/061064IDA11.jpg','Jaqueta Corinthians Nike Total 90 Essential Anthem III Masculina',1,1,'2026-08-03 19:07:16'),(9,1,'https://imgnike-a.akamaihd.net/360x360/02732251A6.jpg','Tênis Nike Air Max Excee Masculino - imagem adicional',2,0,'2026-08-03 19:07:16'),(10,2,'https://imgnike-a.akamaihd.net/360x360/011580IDA6.jpg','Tênis Nike SB Force 58 Masculino - imagem adicional',2,0,'2026-08-03 19:07:16'),(11,3,'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dwd842122f/AH1957_166_20.jpg?imwidth=380&impolicy=pctp&imdensity=1','Suéter Masculino de Malha em Modelagem Regular - imagem adicional',2,0,'2026-08-03 19:07:16'),(12,4,'https://imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw2566cc93/SH2662_031_33.jpg?imwidth=380&impolicy=pctp&imdensity=1','Casaco Masculino de Moletom com Decote Careca e Modelagem Clássica - imagem adicional',2,0,'2026-08-03 19:07:16'),(13,5,'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/1651f914a4f0430490ed636fb21d1cf6_9366/Calca_Esportiva_Firebird_Preto_KD8315_21_model.jpg','Calça Esportiva Firebird - imagem adicional',2,0,'2026-08-03 19:07:16'),(14,6,'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/178dde1cd5774a82be5fcb94a48c97e6_9366/Tenis_Lite_Racer_4.0_Preto_JJ7367_04_standard.jpg','Tênis Lite Racer 4.0 - imagem adicional',2,0,'2026-08-03 19:07:16'),(15,7,'https://assets.adidas.com/images/h_2000,f_auto,q_auto,fl_lossy,c_fill,g_auto/7767430d5f524ae992f4155bad7eede4_9366/JAQUETA_JEANS_ADICOLOR_FIREBIRD_TRACK_TOP_Azul_KD1517_HM5.jpg','JAQUETA JEANS ADICOLOR FIREBIRD TRACK TOP - imagem adicional',2,0,'2026-08-03 19:07:16'),(16,8,'https://imgnike-a.akamaihd.net/360x360/061064IDA12.jpg','Jaqueta Corinthians Nike Total 90 Essential Anthem III Masculina - imagem adicional',2,0,'2026-08-03 19:07:16');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `brand_id` bigint(20) unsigned NOT NULL,
  `category_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(280) NOT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `description` text NOT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_products_slug` (`slug`),
  KEY `idx_products_brand` (`brand_id`),
  KEY `idx_products_category` (`category_id`),
  KEY `idx_products_status_date` (`is_active`,`published_at`),
  KEY `idx_products_featured` (`is_active`,`is_featured`),
  CONSTRAINT `fk_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,4,5,'Tênis Nike Air Max Excee Masculino','tenis-nike-air-max-excee-masculino','Entre no ritmo com o Nike Air Max Excee e os toques sutis de cores novas para um estilo que desafia o tempo. Inspirados no Nike Air Max 90, estes tênis dão um toque moderno ao ícone lendário, com linhas de design alongadas e proporções dist','Entre no ritmo com o Nike Air Max Excee e os toques sutis de cores novas para um estilo que desafia o tempo. Inspirados no Nike Air Max 90, estes tênis dão um toque moderno ao ícone lendário, com linhas de design alongadas e proporções distorcidas.',1,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-08-04 18:35:50'),(2,4,5,'Tênis Nike SB Force 58 Masculino','tenis-nike-sb-force-58-masculino','A melhor e mais recente novidade a aparecer nas ruas, o Nike SB Force 58 garante a durabilidade da forma da sola com a flexibilidade de um tênis vulcanizado. Feito de lona e suede e com acabamento perfurado, todo o look é carregado com o DN','A melhor e mais recente novidade a aparecer nas ruas, o Nike SB Force 58 garante a durabilidade da forma da sola com a flexibilidade de um tênis vulcanizado. Feito de lona e suede e com acabamento perfurado, todo o look é carregado com o DNA de herança do basquete.',1,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-08-04 18:35:50'),(3,6,9,'Suéter Masculino de Malha em Modelagem Regular','sueter-masculino-lacoste-malha-regular','Aconchegante e estilosa, a exclusiva Blusa Gola Alta Masculina de Algodão com Zíper é a peça funcional e versátil que irá te acompanhar em vários contextos, desde um passeio casual até eventos sofisticados.','Aconchegante e estilosa, a exclusiva Blusa Gola Alta Masculina de Algodão com Zíper é a peça funcional e versátil que irá te acompanhar em vários contextos, desde um passeio casual até eventos sofisticados.',1,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-08-04 18:35:50'),(4,6,8,'Casaco Masculino de Moletom com Decote Careca e Modelagem Clássica','moletom-masculino-lacoste-classico','O Moletom de Algodão Lacoste é uma peça que personifica o estilo icônico da marca, combinando elegância com conforto em tecido macio e sustentável','O Moletom de Algodão Lacoste é uma peça que personifica o estilo icônico da marca, combinando elegância com conforto em tecido macio e sustentável',0,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-05-01 14:16:55'),(5,5,7,'Calça Esportiva Firebird','calca-esportiva-adidas-firebird','A calça esportiva Firebird é uma referência ao estilo clássico da marca, reimaginado para o estilo de vida atual','A calça esportiva Firebird é uma referência ao estilo clássico da marca, reimaginado para o estilo de vida atual',0,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-08-04 18:35:50'),(6,5,5,'Tênis Lite Racer 4.0','tenis-adidas-lite-racer-4','Elegante e arrojado, este tênis adidas é ideal para o seu dia a dia. A entressola Cloudfoam proporciona conforto imediato, acompanhando você desde a caminhada matinal até o brunch com os amigos e qualquer outra atividade ao longo do dia.','Elegante e arrojado, este tênis adidas é ideal para o seu dia a dia. A entressola Cloudfoam proporciona conforto imediato, acompanhando você desde a caminhada matinal até o brunch com os amigos e qualquer outra atividade ao longo do dia.',0,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-08-04 18:35:50'),(7,5,6,'JAQUETA JEANS ADICOLOR FIREBIRD TRACK TOP','jaqueta-jeans-adidas-adicolor-firebird','A Jaqueta Jeans Adicolor Firebird é uma nova versão de um clássico, dando um toque moderno a um design atemporal.','A Jaqueta Jeans Adicolor Firebird é uma nova versão de um clássico, dando um toque moderno a um design atemporal.',0,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-08-04 18:35:50'),(8,4,6,'Jaqueta Corinthians Nike Total 90 Essential Anthem III Masculina','jaqueta-corinthians-nike-total-90','A nova coleção do Timão não só resgata um elenco inesquecível, mas uma Era: a Era Total 90. Foi com esse design icônico, cravado no peito, que a gente mostrou pro mundo mais uma vez o que era ser Total Corinthians.','A nova coleção do Timão não só resgata um elenco inesquecível, mas uma Era: a Era Total 90. Foi com esse design icônico, cravado no peito, que a gente mostrou pro mundo mais uma vez o que era ser Total Corinthians.',0,1,'2026-05-01 14:16:55','2026-05-01 14:16:55','2026-05-01 14:16:55');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
