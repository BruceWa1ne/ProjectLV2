        // 注册功能
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
                // 发送ajax查询用户名
                $.ajax({
                        url: "/php/checkusername.php",
                        type: "GET",
                        data: {
                            username: $username.val()
                        },
                        dataType: "json"
                    })
                    .then(function (data) {
                        console.log(data);
                        if (!data.error) {
                            console.log(data.msg);
                            user_lock = true;
                        } else {
                            throw new Error(data.msg);
                        }
                    })
                    .catch(function (err) {
                        console.log(err);
                        user_lock = false;
                    })
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
                console.log(user_lock, pwd_lock);
                if (!(user_lock && pwd_lock)) {
                    return;
                }
                // 发送ajax
                $.ajax({
                        url: "/php/register.php",
                        type: "POST",
                        data: {
                            username: $username.val(),
                            password: $password.val()
                        },
                        dataType: "json"
                    })
                    .then(function (data) {
                        if (!data.error) {
                            alert(data.msg);
                            // 成功跳转至登录页面
                            location.href = "./login.html";
                        } else {
                            throw new Error(data.msg);
                        }
                    })
                    .catch(function (e) {
                        alert("注册失败!");
                    })
            });
        })