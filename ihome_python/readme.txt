1．使用python2,解决图片验证码;
2.使用python manage.py runserver运行，解决云通信没有模板的问题
3.开启redis: sudo redis-server /etc/redis/redis.conf
4.阅读到视频14,图像显示有问题，上传到七牛云也有问题．
5.使用的环境是flaskprojects
6.已经注册好的帐号：（一开始通过取消短信验证功能注册的）
房东：13411111113 密码：123456
租客：13411111111 密码：123456

7.个人主页中的＂我的房源＂　template error和houses-list-tmpl
原因在于myhouse.js怎么解决？(20200229)
答：原来是测试域名被回收了，ak和sk也复制粘贴错了，草．

8.详情页面加载不出来？
答：原来是model.py文件修改了，需要迁移数据库，更新数据库
第一次：（-m后面的是注释）
python manage.py db init
python manage.py db migrate -m 'init tables'
python manage.py db upgrade
第二次：
python manage.py db migrate -m "add trade_no"
python manage.py db upgrade

9.迁移数据库时出现File "/home/tarena/.virtualenv/flaskproject/local/lib/python2.7/site-packages/alipay/compat.py", line 8, in <module>
    from urllib.parse import quote_plus
ImportError: No module named parse
答：原来是python-alipay-sdk的版本太新了，换成了1.10.1版本就好了

10.复现出来又怎么样呢？还需要理解代码，自己什么水平，只有自己清楚，不要自己骗自己！


**************************************************************************************
11.容联云通讯发送短信验证码，需要改的参数：（长期不登录，容联云账号会冻结）
主账号，token，appid

12.七牛云中要改的参数：
access_key，secret_key，测试域名（30天自动回收）

13.pay.py:
alipay = AliPay(
   debug=False #沙箱True和上线False时不同
)
电脑网站支付alipay.trade.page.pay()
手机网站支付alipay.trade.wap.pay()

# 构建让用户跳转的支付连接地址
pay_url = constants.ALIPAY_URL_PREFIX + order_string

# 支付宝的网关地址（支付地址域名）
ALIPAY_URL_PREFIX = "https://openapi.alipaydev.com/gateway.do?" #沙箱
ALIPAY_URL_PREFIX = "https://openapi.alipay.com/gateway.do?" #线上

14.js中的一个注释：
var alipayData = document.location.search.substr(1):# 或取网站地址上的数据，以第1个字符开始
，去掉第一个问号。

15.html中使用了/static/js/template.js，则可以在js文件中整一个模块，
$("#houses-list").html(template("houses-list-tmpl", {houses:[]}));
然后就可以在html文件中使用{{}}遍历了．
{{each houses as house}}
{{/each}}


