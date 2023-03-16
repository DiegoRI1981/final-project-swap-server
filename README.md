Products routes
Base URL/products 

| HTTP Method | URI path                      | Description                   |
|-------------|-------------------------------|-------------------------------|
| GET         | /getAllProducts               | All products list             |
| GET         | /getOneProduct/:product_id    | Matching ID product details   |
| POST        | /saveProduct                  | Create new product            |
| PUT         | /editProduct/:product_id      | Matching ID product edition   |
| DELETE      | /deleteProduct/:product_id    | Matching ID productt deletion |


Auth routes
Base URL/auth

| HTTP Method | URI path  | Description       |
|-------------|-----------|-------------------|
| GET         | /verify   | Verify auth token |
| POST        | /signup   | Signup user       |    
| POST        | /login    | Login user        |

User routes
Base URL/user 

| HTTP Method | URI path  | Description       |
|-------------|-----------|-------------------|
| GET         | /profile  | User proflie      |      
| PUT         | /edit     | Edit user         |
| DELETE      | /delete   | Delete user       |