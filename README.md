# setup

### setup database
1. create 
table name is **histories**

    set **histories** table like this 

        Name |Type      | extra         |
        -----|----------|---------------
        id   | int(11)  |auto_increament|
        value| text     |               |
        order| text     |               |
        size |int(11)   |               |
        win  | text     |               |


2. create your .env file 

    2.1 create file name ".env" in folder server
    2.2 this file view store your personal mysql setting like host ,password ,user and database name which is look like this
    ```js
    //in file  .env
    MYSQL_HOST ='your host'
    MYSQL_USER ='your user'
    MYSQL_PASSWORD ='your password'
    MYSQL_DATABASE ='your database'
    ```

3. start mysql 
4. start server

    4.1 open terminal 

    4.2 go to **server** folder 

    4.3 run command 'node index.js' file
    ```js
     // in terrimal 
     cd server
     node index.js
    ```

### open website

1. open another terminal
2. stay in **tic-tac-toe** floder
3. run command 'npm run dev'

```js
npm run dev
```
