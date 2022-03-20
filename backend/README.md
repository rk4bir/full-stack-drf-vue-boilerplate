![image](.reports/coverage.svg) 
<!-- [![Test](https://github.com/<user>/<repo>/actions/workflows/test.yml/badge.svg)](https://github.com/<user>/<repo>/actions/workflows/test.yml)
[![Build](https://github.com/<user>/<repo>/actions/workflows/build.yml/badge.svg)](https://github.com/<user>/<repo>/actions/workflows/test.yml)-->

[**[Coding style report]**](.reports/flake8.txt)

# Backend
> Backend API

## Project Setup with virtualenv
**Clone the project using git**
```bash
git clone https://github.com/rk4bir/drf-vue-boilerplate.git
```
**Goto the project dir**
```bash
cd backend
```

**Create virtual environment and activate it**
```bash
virtualenv -p /usr/bin/python3 venv
source venv/bin/activate
```

**Update pip and install dependencies**
```bash
pip install -U pip
pip install -r requirements.txt
```

**Run the development server**
```bash
python manage.py runserver
```


## Project Setup with docker
```bash
docker-compose up --build
```