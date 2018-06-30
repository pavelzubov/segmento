# Тестовое задание в копанию Segmento

## Задание

Создать страницу с таблицей расходов-доходов в соответствии с макетом.
Страница состоит из двух блоков:
Header, Content.
В Content н еобходимо реализовать таблицу из 3х колонок.
1. Id: число уникальное в рамках таблицы, должно присваиваться автоматически для
новых записей. Чем более поздняя запись - тем больше число. Не редактируется.
2. Количество средств: отрицательное число - это расход, положительное - доход.
Поле может принимать значения от -1000 до 1000.00. значение 0 запрещено.
3. Комментарий: текстовое поле до 512 символов. разрешены буквы, цифры,
пробелы и знаки препинания.

Необходимо дать возможность добавления и редактирования записей таблицы.
Формы добавления и редактирования одинаковые. Вызываются при клике на кнопку
«Добавить» или при клике на id записи.

Чтобы таблица при открытии страницы не была пустой, требуется добавить несколько
начальных записей.
В Header н еобходимо добавить блок с итоговым количеством средств.
Будет плюсом:
1. Реализованная возможность сортировки по полям "Id" и "Количество средств"
2. Сохранение состояния сортировки в url. Для возможности обмена ссылкой с
заданной сортировкой
3. Добавление pagination если количество записей в таблице превышает 10
4. Кроссбраузерность и адаптивность

Реализовать с использованием Angular2. Результат с комментариями прислать в виде
ссылки на github (либо архива) и опубликовать на сайте https://getforge.com/, или
https://pages.github.com/, или любом другом, с возможностью посмотреть страничку в
работе

## Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
