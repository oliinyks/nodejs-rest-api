# Node.js REST ARI

The REST API is designed to work with a collection of contacts.

## Technologies that were used:
- express
- morgan 
- cors
- mongoDB
- JWT
- bcrypt
- multer
- gravatar
- jimp
- jest
- sendGrid
- nanoid
- docker

## Work with a user

Registration request
```bash
@ POST /users/register

Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Verification request
```bash
GET /auth/verify/:verificationToken

Resending a email request
POST /users/verify
Content-Type: application/json
RequestBody: {
  "email": "example@example.com"
}
```

Login request
```bash
@ GET /users/login

Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
```

Logout request
```bash
@ POST /users/logout
```

Current user request
```bash
@ GET /users/current
```

Subscription renewal
```bash
@ PATCH /users/subscription
```
Subscription must have one of the following values ['starter', 'pro', 'business']

Avatar update
```bash
@ PATCH /users/avatars

Content-Type: multipart/form-data
RequestBody: {
  "avatarURL": downloaded file,
}
```

## Work with contacts

Returning an array of all contacts
```bash
@ GET /api/contacts
```

Returning a contact object
```bash
@ GET /api/contacts/:id
```

Saving a contact
```bash
@ POST /api/contacts
```
saves the contact and adds a unique identifier. You need to send the body in the format {name, email, phone} (all fields are required). The favorite field is false by default

Deleting a contact
```bash
@ DELETE /api/contacts/:id
```

Updating certain contact information
```bash
@ PUT /api/contacts/:id
```
must receive body in json format with update of any name, email and phone fields.

Updating the favorite fields
```bash
@ PATCH / api / contacts /: contactId / favorite
```

Pagination for the contact collection
```bash
@ GET /contacts?page=1&limit=20
```

Filtering contacts by the selected field
```bash
@ GET /contacts?favorite=true
```

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
