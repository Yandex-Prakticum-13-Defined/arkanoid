# Описание проекта

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Данный проект выполнен в рамках обучения в "Яндекс.Практикум" и представляет собой командную разработку игры арканоид. Написан на React и TypeScript с использованием SSR и БД PostgreSQL. Деплой производился на Яндекс-облако. Настроены github-actions автоматического деплоя, прекоммит-хуки, тесты.  На главной странице доступен выбор темы (переключатель внизу страницы).

Главная страница: https://defined-arkanoid-13.ya-praktikum.tech/

## Отчёт о производительности

![Lighthouse](https://user-images.githubusercontent.com/53473616/178588139-fd413e7b-62ef-4305-9b32-c1fd102bac3d.png)

Утечек памяти не обнаружено:

![2022-07-12_23h52_35](https://user-images.githubusercontent.com/53473616/178593239-5f4bc08c-aa9d-4266-9c59-e4e9997b0990.png)


## Описание механики игры

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;В нижней части экрана находится ракетка, которая перемещается горизонтально с помощью стрелок 🠔 🠖. В верхней части экрана расположены блоки, которые разрушаются при попадании в них мячика.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Игра начинается с того, что мячик запускается с ракетки вверх и в дальнейшем перемещается между ракеткой и блоками. Блоки постепенно генерируются, что даёт возможность бесконечной игры. За каждый разрушенный блок начисляются очки. С течением времени скорость мячика увеличивается. Если мячик трижды касается нижней части экрана (отбить ракеткой его не удалось), то игра заканчивается. Игра по умолчанию запускается в полноэкранном режиме, включение/выключение полноэкранного режима осуществляется двойным нажатием левой кн.мыши. Игру всегда можно поставить на паузу нажав "Пробел". Для любителей "погорячее"&#128293; заготовлен режим "Double Speed", который активируется нажатием "Shift" - в этом режиме скорость мяча увеличивается вдвое.

![2022-07-11_21h50_42](https://user-images.githubusercontent.com/53473616/178336929-b5896f43-c865-4cd3-b45f-a28d85e2385c.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;По окончанию игры отображается модальное окно с предложением перейти на главную страницу, сыграть еще раз или посмотреть таблицу лидеров.

## Профиль

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;На странице профиля можно поменять информацию о себе, установить аватар. Все настройки каждого пользователя (включая тему) сохраняются на сервере.
![2022-07-11_22h53_26](https://user-images.githubusercontent.com/53473616/178347007-3c6ea974-5d72-4ea0-976f-92ad3bf5d7f2.png)

## Таблица лидеров
https://defined-arkanoid-13.ya-praktikum.tech/leaderboard

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Здесь можно посмотреть результаты игры каждого участника, реализована сортировка по имени участника и кол-ву очков. Подгрузка аватарок участников происходит с использованием Intersection Observer API: сперва загружаются аватарки в видимой области экрана, при прокрутке страницы подгружаются остальные изображения видимой области:

https://user-images.githubusercontent.com/53473616/178335061-0b120929-e6b2-4207-bfd1-90c8e0091a29.mp4

## Форум
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;В приложении реализован форум с возможностью размещения комментариев на сообщения (включая смайлики). Каждый комментарий располагается на соответствующем уровне вложенности.

![2022-07-11_23h00_13](https://user-images.githubusercontent.com/53473616/178348444-28d67dba-5e77-4162-a067-bf6643539fc3.png)



