       // 登录功能
       $(function () {
        // 获取元素
        var $username = $("#username");
        var $password = $("#password");
        var $submitBtn = $("#submitBtn");

        // 分别定义用于验证用户名和密码的锁
        var user_lock = false;
        var pwd_lock = false;

        // 用户名失去焦点事件
        $username.blur(function (e) {
            e.preventDefault();
            console.log("用户名输入完毕");
            // 获取用户名
            var val = $username.val();
            // 定义正则
            var reg = /^[^\d]\w{5,9}$/;
            // 验证用户名输入
            if (!reg.test(val)) {
                user_lock = false;
                return;
            }
            user_lock = true;
        });

        // 密码失去焦点事件
        $password.blur(function (e) {
            e.preventDefault();
            console.log("密码输入完毕");
            // 获取密码
            var val = $password.val();
            // 定义正则
            var reg = /^[^\d]\w{5,9}$/;
            // 验证密码输入
            if (!reg.test(val)) {
                pwd_lock = false;
                return;
            }
            pwd_lock = true;
        });

        // 提交按钮
        $submitBtn.click(function (e) {
            e.preventDefault();
            // 验证两把锁
            console.log(user_lock, pwd_lock);
            if (!(user_lock && pwd_lock)) {
                return;
            }
            $.ajax({
                    url: "/php/login.php",
                    type: "POST",
                    data: {
                        username: $username.val(),
                        password: $password.val()
                    },
                    dataType: "json"
                })
                .then(function (data) {
                    if (!data.error) {
                        // 获取URL的hash部分
                        var targetURL = location.hash.slice(1) || "../index.html";
                        console.log(targetURL);
                        // 提示用户
                        alert(data.msg);
                        // 登录成功跳转页面
                        location.href = targetURL;
                    } else {
                        throw new Error(data.msg);
                    }
                })
                .catch(function (data) {
                    console.log(data);
                })
        });
    })