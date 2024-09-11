-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2024 at 11:41 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `incident_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `incidents`
--

CREATE TABLE `incidents` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` enum('open','in progress','closed') DEFAULT 'open',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incidents`
--

INSERT INTO `incidents` (`id`, `userId`, `title`, `description`, `location`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Incident 1', 'Description for incident 1', 'Location 1', 'open', '2024-09-11 19:00:54', '2024-09-11 19:00:54'),
(2, 1, 'Incident 2', 'Description for incident 2', 'Location 2', 'in progress', '2024-09-11 19:00:54', '2024-09-11 19:00:54'),
(3, 1, 'Incident 3', 'Description for incident 3', 'Location 3', 'closed', '2024-09-11 19:00:54', '2024-09-11 19:00:54'),
(4, 1, 'Incident 4', 'Description for incident 4', 'Location 4', 'open', '2024-09-11 19:00:54', '2024-09-11 19:00:54'),
(5, 1, 'Incident 5', 'Description for incident 5', 'Location 5', '', '2024-09-11 19:00:54', '2024-09-11 19:00:54');

-- --------------------------------------------------------

--
-- Table structure for table `incident_log`
--

CREATE TABLE `incident_log` (
  `id` int(11) NOT NULL,
  `incidentId` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  `newStatus` enum('open','in progress','closed') NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `incident_log`
--

INSERT INTO `incident_log` (`id`, `incidentId`, `updatedBy`, `newStatus`, `updatedAt`) VALUES
(1, 1, 1, 'open', '2024-09-11 19:01:07'),
(2, 1, 1, 'in progress', '2024-09-11 19:01:07'),
(3, 2, 1, 'in progress', '2024-09-11 19:01:07'),
(4, 3, 1, 'closed', '2024-09-11 19:01:07'),
(5, 4, 1, 'open', '2024-09-11 19:01:07'),
(6, 5, 1, '', '2024-09-11 19:01:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fName` varchar(50) NOT NULL,
  `lName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fName`, `lName`, `username`, `email`, `password`, `role`, `createdAt`) VALUES
(1, 'John', 'Doe', 'johndoe', 'john@example.com', '$2b$10$tHdPYLLbJ68BmseWH5NrPuhjYu6YttEmBIIYyWD07XvtZjd4krqQy', 'user', '2024-09-09 17:29:04'),
(2, 'Admin', 'User', 'admin', 'admin@example.com', '$2b$10$Oo6NkjE/WCHTde3JFMjvoO0aR.ZZm4CdRaNsOvWrpQtPE3B2LB9My', 'admin', '2024-09-11 16:24:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incidents`
--
ALTER TABLE `incidents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `incident_log`
--
ALTER TABLE `incident_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `incidentId` (`incidentId`),
  ADD KEY `updatedBy` (`updatedBy`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `incidents`
--
ALTER TABLE `incidents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `incident_log`
--
ALTER TABLE `incident_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incidents`
--
ALTER TABLE `incidents`
  ADD CONSTRAINT `incidents_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `incident_log`
--
ALTER TABLE `incident_log`
  ADD CONSTRAINT `incident_log_ibfk_1` FOREIGN KEY (`incidentId`) REFERENCES `incidents` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `incident_log_ibfk_2` FOREIGN KEY (`updatedBy`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
