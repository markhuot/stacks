# ************************************************************
# Sequel Pro SQL dump
# Version 3408
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: 127.0.0.1 (MySQL 5.1.58-1ubuntu1)
# Database: local_stacks
# Generation Time: 2012-02-29 22:07:26 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table contenttypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `contenttypes`;

CREATE TABLE `contenttypes` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) DEFAULT NULL,
  `slug` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `contenttypes` WRITE;
/*!40000 ALTER TABLE `contenttypes` DISABLE KEYS */;

INSERT INTO `contenttypes` (`id`, `name`, `slug`)
VALUES
	(1,'Paragraph','paragraph'),
	(2,'Heading','heading'),
	(3,'List','list'),
	(4,'Blockquote','blockquote'),
	(5,'Image','image'),
	(6,'Rule','rule');

/*!40000 ALTER TABLE `contenttypes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table entries
# ------------------------------------------------------------

DROP TABLE IF EXISTS `entries`;

CREATE TABLE `entries` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `template_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `entries` WRITE;
/*!40000 ALTER TABLE `entries` DISABLE KEYS */;

INSERT INTO `entries` (`id`, `template_id`)
VALUES
	(1,1);

/*!40000 ALTER TABLE `entries` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fields_contenttypes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fields_contenttypes`;

CREATE TABLE `fields_contenttypes` (
  `contenttype_id` int(11) DEFAULT NULL,
  `field_id` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `fields_contenttypes` WRITE;
/*!40000 ALTER TABLE `fields_contenttypes` DISABLE KEYS */;

INSERT INTO `fields_contenttypes` (`contenttype_id`, `field_id`)
VALUES
	(1,1),
	(1,2),
	(2,2);

/*!40000 ALTER TABLE `fields_contenttypes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table fields
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fields`;

CREATE TABLE `fields` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `template_id` int(11) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `slug` varchar(32) DEFAULT NULL,
  `multiple` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `fields` WRITE;
/*!40000 ALTER TABLE `fields` DISABLE KEYS */;

INSERT INTO `fields` (`id`, `template_id`, `name`, `slug`, `multiple`)
VALUES
	(1,1,'Title','title',0),
	(2,1,'Body','body',1);

/*!40000 ALTER TABLE `fields` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stack_contents
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stack_contents`;

CREATE TABLE `stack_contents` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `stack_id` int(11) DEFAULT NULL,
  `key` varchar(32) DEFAULT NULL,
  `value` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `stack_contents` WRITE;
/*!40000 ALTER TABLE `stack_contents` DISABLE KEYS */;

INSERT INTO `stack_contents` (`id`, `stack_id`, `key`, `value`)
VALUES
	(1,1,'text','This is some of the text that belongs in here.'),
	(2,2,'text','Some more text in here.'),
	(3,3,'src','/img/test.png'),
	(4,3,'caption','This is the caption.'),
	(5,3,'credit','Mark Huot'),
	(6,6,'text','The Title');

/*!40000 ALTER TABLE `stack_contents` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table stacks
# ------------------------------------------------------------

DROP TABLE IF EXISTS `stacks`;

CREATE TABLE `stacks` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int(11) DEFAULT NULL,
  `field_id` int(11) DEFAULT NULL,
  `stack_group` int(11) DEFAULT '1',
  `stack_order` int(11) DEFAULT '1',
  `type` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `stacks` WRITE;
/*!40000 ALTER TABLE `stacks` DISABLE KEYS */;

INSERT INTO `stacks` (`id`, `entry_id`, `field_id`, `stack_group`, `stack_order`, `type`)
VALUES
	(1,1,2,1,1,'paragraph'),
	(2,1,2,1,2,'paragraph'),
	(3,1,2,1,3,'image'),
	(6,1,1,1,1,'paragraph');

/*!40000 ALTER TABLE `stacks` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table templates
# ------------------------------------------------------------

DROP TABLE IF EXISTS `templates`;

CREATE TABLE `templates` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(32) DEFAULT NULL,
  `slug` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

LOCK TABLES `templates` WRITE;
/*!40000 ALTER TABLE `templates` DISABLE KEYS */;

INSERT INTO `templates` (`id`, `title`, `slug`)
VALUES
	(1,'Article','article');

/*!40000 ALTER TABLE `templates` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
