# coding:utf-8

from flask import Blueprint


# 创建蓝图对象
api = Blueprint("api_1_0", __name__)


# 导入蓝图的视图
from . import demo,verify_code, passport, profile,houses, orders, pay
#写完视图之后要导入，如demo.py和verify_code.py

#from . import demo, verify_code, passport, profile, houses, orders, pay