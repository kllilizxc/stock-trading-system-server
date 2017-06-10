B3组股票交易系统客户端

client文件夹中为前端代码，server文件夹中为后端方法

运行方式：

可以直接访问http://9htnud.natappfree.cc来查看效果，但是因为是搭建在我自己的笔记本上面的，所以不能保证一直是有效的

本地搭建：

前置要求：
1. 安装NodeJS
2. 安装买MySQL，使用server/sql里的stock.sql建立数据库
3. 请务必保证server文件夹以及client文件夹在同一目录下

编译-客户端：
1. 在client文件夹内运行命令npm i来安装依赖
2. 运行npm run build来编译，编译过的文件会自动导入server/public (务必保证前置要求3)

运行-服务器：
1. 在server文件夹内运行命令你npm i来安装依赖
2. 运行npm run start来启用服务器
3. 在浏览器中打开localhost:3000即可