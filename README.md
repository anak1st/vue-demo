# vue navie-ui admin template
- vue3
- vue-router
- pinia
- naive-ui

## 前端页面启动

安装依赖
```sh
pnpm install
```

测试环境
```sh
pnpm dev
```

编译，生成dist
```sh
pnpm build
```

## 后端
如果需要测试前端的后端依赖部分，需要先启动后端服务

依赖：
- python3.10+
- postgresql
- redis
- influxdb
- ...

### python 环境依赖完整与启动项目
```sh
pip install -r ./requirements.txt
python ./src-server/main.py
```

### influxdb 安装
使用 [docker/influxdb2.sh](docker/influxdb2.sh) 脚本安装
- 记得修改脚本中账号密码
- 安装完成后在 web 端登录，创建 bucket