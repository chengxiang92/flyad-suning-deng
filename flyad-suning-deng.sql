/*
Navicat MySQL Data Transfer

Source Server         : LOCALHOST
Source Server Version : 50548
Source Host           : localhost:3306
Source Database       : flyad-suning-deng

Target Server Type    : MYSQL
Target Server Version : 50548
File Encoding         : 65001

Date: 2017-02-17 10:37:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `t_config`
-- ----------------------------
DROP TABLE IF EXISTS `t_config`;
CREATE TABLE `t_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(500) DEFAULT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `img` varchar(1000) DEFAULT NULL,
  `rule` varchar(5000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_config
-- ----------------------------
INSERT INTO `t_config` VALUES ('1', '猜灯谜庆元宵，开门见礼福利到', '苏宁手机全国门店狂撒1亿福利，最高可领350元券~', 'bde5163c057f4c72af29e31202aab008', '活动说明：\n1、元宵佳节庆元宵，只要参与活动并答对3题，就有机会获得苏宁手机套券一份，套券包含50元、100元、200元优惠券各一张。\n2、答错了？不会答？别着急，赶紧寻求小伙伴帮助~~\n3、活动时间：2017.2.5-2017.2.14\n\n奖项设置：\n350元苏宁手机套券一份，每个用户限领1份，该券仅限苏宁门店使用。\n\n用券时间：\n2017.2.10-2017.2.14\n\n适用机型：\n荣耀8、荣耀V8、荣耀6X、小米5S、华为Nova高配、华为麦芒5、华为P9高配、三星S7-edge、魅族pro6S、三星C9Pro、C7Pro、华硕zenfone3\n');
