-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 13 2022 г., 12:42
-- Версия сервера: 5.6.51
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `lf2_php`
--

-- --------------------------------------------------------

--
-- Структура таблицы `entity_bullets`
--

CREATE TABLE `entity_bullets` (
  `id` int(11) NOT NULL,
  `uuid` varchar(13) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessions_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `direction` int(11) NOT NULL,
  `damage` int(11) NOT NULL DEFAULT '5',
  `speed` int(11) NOT NULL DEFAULT '10'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `entity_bullets`
--

INSERT INTO `entity_bullets` (`id`, `uuid`, `sessions_id`, `users_id`, `x`, `y`, `direction`, `damage`, `speed`) VALUES
(77, '61dff35561610', 1, 14, 18, -26, 540, 5, 5),
(78, '61dff35666404', 1, 14, -74, -26, 171, 5, 5),
(79, '61dff3570a981', 1, 14, -122, -26, 171, 5, 5),
(80, '61dff367e1b8f', 1, 14, -218, 98, 173, 5, 5);

-- --------------------------------------------------------

--
-- Структура таблицы `entity_users`
--

CREATE TABLE `entity_users` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `sessions_id` int(11) NOT NULL,
  `x` int(11) NOT NULL DEFAULT '0',
  `y` int(11) NOT NULL DEFAULT '0',
  `health` int(11) NOT NULL DEFAULT '100',
  `rotation` int(11) NOT NULL DEFAULT '0',
  `last_request` int(11) NOT NULL DEFAULT '0',
  `shot_cooldown` int(11) NOT NULL DEFAULT '0',
  `deaths` int(11) NOT NULL DEFAULT '0',
  `kills` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `max_players` int(11) NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hello_message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`id`, `max_players`, `name`, `hello_message`, `last_update`) VALUES
(1, 10, 'beta-room', 'hi kek', 0),
(2, 10, 'session_shit', 't', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rating` int(11) NOT NULL DEFAULT '1000'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `token`, `rating`) VALUES
(14, 'admin', 'e80120b0d4c7824f211789831edbbbbb', '7c5b89a8305f19be8c33c10581dcb95b', 1000);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `entity_bullets`
--
ALTER TABLE `entity_bullets`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `entity_users`
--
ALTER TABLE `entity_users`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `entity_bullets`
--
ALTER TABLE `entity_bullets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT для таблицы `entity_users`
--
ALTER TABLE `entity_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
