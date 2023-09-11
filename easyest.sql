/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS menu;
CREATE TABLE `menu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `orderNum` int NOT NULL,
  `parentId` int DEFAULT NULL,
  `menuType` varchar(10) NOT NULL DEFAULT 'M',
  `icon` varchar(50) DEFAULT NULL,
  `component` varchar(50) DEFAULT NULL,
  `path` varchar(50) NOT NULL,
  `createBy` varchar(50) DEFAULT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `hidden` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS permission;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `message` varchar(100) DEFAULT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS role;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS role_menu_relation;
CREATE TABLE `role_menu_relation` (
  `roleId` int NOT NULL,
  `menuId` int NOT NULL,
  PRIMARY KEY (`roleId`,`menuId`),
  KEY `IDX_95c46d887acdccf42341596e37` (`roleId`),
  KEY `IDX_95093fcfe9fd3ace6f4120a953` (`menuId`),
  CONSTRAINT `FK_95093fcfe9fd3ace6f4120a9534` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_95c46d887acdccf42341596e37f` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS role_permission_relation;
CREATE TABLE `role_permission_relation` (
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `IDX_e1ca88973e6058882146e25401` (`roleId`),
  KEY `IDX_7822b319e3e15d982d49aa50cf` (`permissionId`),
  CONSTRAINT `FK_7822b319e3e15d982d49aa50cf2` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_e1ca88973e6058882146e254018` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS user;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS user_role_relation;
CREATE TABLE `user_role_relation` (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `IDX_387a09a362c32ee04b33fc4eaa` (`userId`),
  KEY `IDX_bed18db98a78c46f0bcfedfe65` (`roleId`),
  CONSTRAINT `FK_387a09a362c32ee04b33fc4eaab` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_bed18db98a78c46f0bcfedfe652` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO menu(id,name,orderNum,parentId,menuType,icon,component,path,createBy,createTime,updateTime,hidden) VALUES('1','系统管理','20',NULL,'m','tools',NULL,'system','admin','2023-08-07 16:58:11.708439','2023-08-07 17:21:21.241157',NULL),('2','菜单管理','3','1','m','menu','system/menu/index','menu','admin','2023-08-07 17:01:52.529930','2023-08-10 15:16:14.000000',NULL),('12','角色管理','4','1','M','user','system/role/index','role',NULL,'2023-08-08 18:22:24.414227','2023-08-10 15:20:31.000000','1');

INSERT INTO permission(id,name,message,createTime,updateTime) VALUES('1','create','新增权限','2023-07-11 18:01:19.606061','2023-07-12 12:00:15.258090'),('2','read','查询权限','2023-07-11 18:02:40.591687','2023-07-11 18:02:40.591687'),('3','update','修改权限','2023-07-11 18:02:53.526080','2023-07-11 18:02:53.526080'),('4','delete','删除权限','2023-07-11 18:03:08.736895','2023-07-11 18:03:08.736895');

INSERT INTO role(id,name,createTime,updateTime) VALUES('1','超级管理员','2023-07-11 18:19:42.729991','2023-07-11 18:19:42.729991'),('2','管理员','2023-07-11 18:23:41.984973','2023-07-11 18:23:41.984973'),('3','用户','2023-07-11 18:24:48.725273','2023-07-11 18:24:48.725273');

INSERT INTO role_menu_relation(roleId,menuId) VALUES('1','1'),('1','2');

INSERT INTO role_permission_relation(roleId,permissionId) VALUES('1','1'),('1','2'),('1','3'),('1','4'),('2','1'),('2','2'),('2','3'),('3','2');

INSERT INTO user(id,username,nickname,password,avatar,email,salt,create_time,update_time) VALUES('1','admin',NULL,'54b7b23448a389952cea50e8d81c6f3e9069',NULL,NULL,'hhjT9A==','2023-07-12 11:16:39','2023-07-12 11:16:39'),('2','use1',NULL,'b71df3d56f497ed99155bea96e3130f9ab0f',NULL,NULL,'kwmkpw==','2023-07-12 11:17:20','2023-07-12 11:17:20'),('3','admin1',NULL,'162484ee16bc8caaccbf4960ea5084d2068e',NULL,NULL,'hgrEVw==','2023-07-18 09:35:27','2023-07-18 09:35:27');
INSERT INTO user_role_relation(userId,roleId) VALUES('1','1'),('1','2'),('1','3'),('2','3'),('3','1'),('3','2'),('3','3');