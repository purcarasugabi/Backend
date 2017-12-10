SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

CREATE DATABASE `tweets` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tweets`;


CREATE TABLE IF NOT EXISTS `queryStrings`(
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(30),
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `queryResults`(
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `queryId` smallint(5), 
  `text` varchar(50),
  `retweetNumber` int(10),
  `userId` varchar(30),
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_result` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;





