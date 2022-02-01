-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 01 2022 г., 08:15
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
(4, 27, 0, 15, 0);

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
  `last_request` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `entity_users`
--

INSERT INTO `entity_users` (`id`, `users_id`, `sessions_id`, `x`, `y`, `health`, `rotation`, `last_request`) VALUES
(30, 27, 1, -84, -32, 100, 164, 1643692517);

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

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `sessions_id`, `users_id`, `content`, `time`) VALUES
(1, 1, 27, 'heh q', 1643563393);

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
(1, 50, 'beta-room', 'hi kek', 0),
(2, 10, 'session_shit', 't', 0);

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
(4, 26, 0, 0, 17, 17, 17),
(5, 27, 0, 0, 30, 76, 38);

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
(26, 'admin', '0736bf6e934a073d14c793514c542b16', 'acc8bd1673c4ac69810937dafaf389dd', 1000),
(27, 'thecreeez', '0736bf6e934a073d14c793514c542b16', '2fc830ba9490b3facc7d8ba8c3dcc69c', 1000);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `entity_bullets`
--
ALTER TABLE `entity_bullets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4913;

--
-- AUTO_INCREMENT для таблицы `entity_users`
--
ALTER TABLE `entity_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
