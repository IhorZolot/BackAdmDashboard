# BackAdmDashboard

Цей проєкт є бекендом для веб-додатку сторінки [Dashboard](https://admin-dashboard-seven-roan.vercel.app), яка відображає інформацію про доходи, витрати та інші статистичні дані медичного магазину. Бекенд реалізований на Node.js з використанням Express.js.

### Зміст

- [Встановлення](#встановлення)
- [Запуск](#зупуск)
- [API ендпоінти](#API-ендпоінти)
- [Структура бази даних](#структура-бази-даних)
- [Використані технології](#використані-технології)

### Встановлення

- Клонування репозиторію:

  ```bash
  git clone https://github.com/IhorZolot/BackAdmDashboard.git
  ```

- Перейти у відповідну папку:

```bash
 cd BackAdmDashboard
```

- Встановити залежності використовуючи менеджер пакетів npm:

```bash
npm install
```

### Запуск

- Запуск проекту:

```bash
npm run start
```

---

### API ендпоінти

#### Аутентифікація

- POST /api/auth/signup - Реєстрація нового користувача
- POST /api/auth/login - Вхід користувача
- GET /api/auth/user-info - Отримати інформацію про користувача
- POST /api/auth/logout - Вихід користувача

#### Dashboard

- GET /api/dashboard - Отримати всі дані для Dashboard

#### Сustomers

- GET /api/customers - Отримати список клієнтів
- GET /api/customers/filtered - Отримати відфільтрованих та відсортованих клієнтів
- GET /api/customers/ - Отримати клієнта за ID

#### Оrders

- GET /api/orders - Отримати список замовлень
- GET /api/orders/filtered - Отримати відфільтровані та відсортовані замовлення
- GET /api/orders/ - Отримати замовлення за ID

#### Products

- GET /api/products - Отримати список продуктів
- GET /api/products/filtered - Отримати відфільтровані та відсортовані продукти
- GET /api/products/categories - Отримати всі категорії продуктів
- GET /api/products/ - Отримати продукт за ID
- POST /api/products/add - Додати новий продукт
- PUT /api/products/update/ - Оновити продукт за ID
- DELETE /api/products/remove/ - Видалити продукт за ID

#### Suppliers

- GET /api/suppliers - Отримати список постачальників
- GET /api/suppliers/filtered - Отримати відфільтрованих та відсортованих постачальників
- GET /api/suppliers/status - Отримати статус постачальників
- POST /api/suppliers/add - Додати нового постачальника
- PUT /api/suppliers/update/ - Оновити постачальника за ID
- DELETE /api/suppliers/remove/ - Видалити постачальника за ID

### Структура бази даних

#### Модель користувача

```javascript
const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			match: emailRegexp,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			minlength: 6,
			required: true,
		},
		token: {
			type: String,
		},
	},
	{ versionKey: false, timestamps: true }
)
```

#### Модель продукту

```javascript
const productSchema = new Schema(
	{
		photo: {
			type: String,
		},
		name: {
			type: String,
			required: true,
		},
		suppliers: {
			type: String,
			required: true,
		},
		stock: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)
```

#### Модель постачальника

```javascript
const suppliersSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		suppliers: {
			type: String,
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		amount: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
)
```

#### Модель клієнта

```javascript
const customerSchema = new Schema(
	{
		photo: {
			type: String,
		},
		image: {
			type: String,
		},
		name: {
			type: String,
		},
		email: {
			type: String,
		},
		spent: {
			type: String,
		},
		phone: {
			type: String,
		},
		address: {
			type: String,
		},
		register_date: {
			type: String,
		},
	},
	{ versionKey: false, timestamps: true }
)
```

#### Модель замовлення

```javascript
const orderSchema = new Schema({
	photo: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	products: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	order_date: {
		type: String,
		required: true,
	},
})
```

---

### Використані технології

| Технологія   | Опис                                                                                 |
| ------------ | ------------------------------------------------------------------------------------ |
| bcryptjs     | Бібліотека для хешування паролів                                                     |
| commander    | Бібліотека для створення командного рядка у Node.js                                  |
| cors         | Пакет для налаштування CORS (Cross-Origin Resource Sharing)                          |
| dotenv       | Бібліотека для завантаження змінних середовища з .env файлу                          |
| express      | Популярний веб-фреймворк для Node.js                                                 |
| joi          | Бібліотека для валідації схем JavaScript                                             |
| jsonwebtoken | Бібліотека для створення та перевірки JSON Web Tokens (JWT)                          |
| mongoose     | ORM для роботи з MongoDB у Node.js                                                   |
| morgan       | HTTP request logger middleware для Node.js                                           |
| multer       | Middleware для обробки multipart/form-data, використовується для завантаження файлів |
| nanoid       | Генератор унікальних рядків ідентифікаторів                                          |
| yargs        | Інструмент для парсингу аргументів командного рядка у Node.js                        |

- [Ihor Zolotoverkh](www.linkedin.com/in/ihor-zolotoverkh)
