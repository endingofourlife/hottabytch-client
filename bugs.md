1. Telegram doesn't always send user data. When user selects a language and the response is error -> add alert(restart the app because of the tg) `LOW`
2. If the exam is not completed fully, the API doesn't return it later. `LOW`
3. if the exam is not completed fully and user tries to continue -> session in cache must return "real progress" that user has done. Now it starts from 0 `LOW`
4. Sometimes /auth doesn't work. RESTART THE APP IN THIS CASE!
5.