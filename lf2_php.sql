-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 07 2022 г., 15:01
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
-- Структура таблицы `cooldowns_users`
--

CREATE TABLE `cooldowns_users` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `shot_cooldown` int(11) NOT NULL,
  `max_shot_cooldown` int(11) NOT NULL DEFAULT '5',
  `respawn_cooldown` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `cooldowns_users`
--

INSERT INTO `cooldowns_users` (`id`, `users_id`, `shot_cooldown`, `max_shot_cooldown`, `respawn_cooldown`) VALUES
(4, 27, 0, 5, 100),
(6, 27, 0, 5, 100),
(7, 26, 0, 5, 83);

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
(3947, '620109dd60841', 1, 27, -351, -172, 196, 50, 400);

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
  `state` varchar(12) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEAD',
  `last_request` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `entity_users`
--

INSERT INTO `entity_users` (`id`, `users_id`, `sessions_id`, `x`, `y`, `health`, `rotation`, `state`, `last_request`) VALUES
(6, 27, 1, 208, 0, 100, 218, 'ALIVE', 1644235231),
(7, 26, 1, -36, 0, 0, 323, 'DEAD', 1644235227);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sessions_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `max_players` int(11) NOT NULL,
  `type` varchar(24) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DEATHMATCH',
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `hello_message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_update` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessions`
--

INSERT INTO `sessions` (`id`, `max_players`, `type`, `name`, `hello_message`, `last_update`) VALUES
(1, 15, 'DEATHMATCH', 'beta-room', 'hi kek', 1644235231924),
(2, 10, 'DEATHMATCH', 'session_shit', 't', 0),
(3, 12, 'DEATHMATCH', 'fsdfd', 'fsfd', 0),
(17, 1, 'DEATHMATCH', 'testName', '', 1644234968859);

-- --------------------------------------------------------

--
-- Структура таблицы `sessions_owners`
--

CREATE TABLE `sessions_owners` (
  `id` int(11) NOT NULL,
  `sessions_id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sessions_owners`
--

INSERT INTO `sessions_owners` (`id`, `sessions_id`, `users_id`) VALUES
(6, 17, 27);

-- --------------------------------------------------------

--
-- Структура таблицы `stats_users`
--

CREATE TABLE `stats_users` (
  `id` int(11) NOT NULL,
  `users_id` int(11) NOT NULL,
  `kills` int(11) NOT NULL,
  `deaths` int(11) NOT NULL,
  `sessions_played` int(11) NOT NULL,
  `global_kills` int(11) NOT NULL,
  `global_deaths` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stats_users`
--

INSERT INTO `stats_users` (`id`, `users_id`, `kills`, `deaths`, `sessions_played`, `global_kills`, `global_deaths`) VALUES
(4, 26, 4, 2, 0, 0, 0),
(5, 27, 2, 4, 0, 0, 0);

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
(26, 'admin', '0736bf6e934a073d14c793514c542b16', '674393452c08d2d946fdedd98a1ed8ae', 1000),
(27, 'thecreeez', '0736bf6e934a073d14c793514c542b16', '81125f0ab168091cecc05449be3552ed', 1000);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cooldowns_users`
--
ALTER TABLE `cooldowns_users`
  ADD PRIMARY KEY (`id`);

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
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `sessions_owners`
--
ALTER TABLE `sessions_owners`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `stats_users`
--
ALTER TABLE `stats_users`
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
-- AUTO_INCREMENT для таблицы `cooldowns_users`
--
ALTER TABLE `cooldowns_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `entity_bullets`
--
ALTER TABLE `entity_bullets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3950;

--
-- AUTO_INCREMENT для таблицы `entity_users`
--
ALTER TABLE `entity_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `sessions_owners`
--
ALTER TABLE `sessions_owners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `stats_users`
--
ALTER TABLE `stats_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
