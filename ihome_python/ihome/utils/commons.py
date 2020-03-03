# coding:utf-8

#自定义转换器
#import functools

from werkzeug.routing import BaseConverter
from flask import session, jsonify, g
from ihome.utils.response_code import RET
import functools


class ReConverter(BaseConverter):
    def __init__(self,url_map,regex):
        super(ReConverter,self).__init__(url_map)
        self.regex = regex

# 定义的验证登录状态的装饰器
def login_required(view_func):
    # wraps函数的作用是将wrapper内层函数的属性设置为被装饰函数view_func的属性
    @functools.wraps(view_func)
    def wrapper(*args, **kwargs):
        # 判断用户的登录状态
        user_id = session.get("user_id")

        # 如果用户是登录的， 执行视图函数
        if user_id is not None:
            # 将user_id保存到g对象中，在视图函数中可以通过g对象获取保存数据
            g.user_id = user_id
            return view_func(*args, **kwargs)
        else:
            # 如果未登录，返回未登录的信息
            return jsonify(errno=RET.SESSIONERR, errmsg="用户未登录")

    return wrapper



#登录验证装饰器

# def required_login(f):
#     @functools.wraps(f)
#     def wrapper(*args,**kwargs):
#         user_id = session.get('user_id')
#         user = None
#         if user_id:
#             try:
#                 user = User.query.filter_by(id=user_id).first()
#             except Exception as e:
#                 current_app.logger.error(e)
#         g.user = user
#         return f(*args,**kwargs)
#     return wrapper
