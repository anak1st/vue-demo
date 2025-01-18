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
如果需要测试后端，需要先启动后端服务

依赖：
- python3.10+
- postgresql
- redis
- influxdb
- ...


```sh
pip install -r ./requirements.txt
python ./server/main.py
```