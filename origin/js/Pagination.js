
// 创建一个类
/* 
    @dom 容器元素 由用户传递 用户决定显示在哪里
    @dataArr 数据数组  由用户传递 用户决定显示什么
    @currentPage 当前页 由用户传递 显示第几个页的数据 默认为0
    @dataNumber  每一页显示的数据条数 
 */
function Pagination(dom, dataArr, currentPage = 0, dataNumber = 10) {
    this.dom = dom;
    this.dataArr = dataArr;
    this.currentPage = currentPage;
    this.dataNumber = dataNumber;
    // total 这个属性属于 可定可不定 的属性 之所以定义出来 是为了使用方便
    this.total = Math.ceil(this.dataArr.length / this.dataNumber);


    // 展示区域
    // 1 首页按钮属性
    this.firstBtn = document.createElement("button");
    // 2 上一页按钮
    this.prevBtn = document.createElement("button");
    // 3 数字区域
    this.numberArea = document.createElement("div");
    // 4 下一页按钮
    this.nextBtn = document.createElement("button");
    // 5 尾页按钮
    this.lastBtn = document.createElement("button");
    // 6 输入框
    this.input = document.createElement("input");
    // 7 跳转
    this.redirectBtn = document.createElement('button');
    // 8 上面的操作区域
    this.operateArea = document.createElement("div");
    // 9 下面的展示区域
    this.displayArea = document.createElement("div");


    this.init();

}


// init方法
Pagination.prototype = {
    constructor: Pagination,
    // init
    init() {
        this.render();
        this.renderNumberArea();
        this.bindEvent();
    },
    render() {
        // 用来渲染分页结构
        this.dom.appendChild(this.operateArea);
        this.operateArea.style.display = "flex";
        this.operateArea.style.height = "10%";
        this.firstBtn.innerHTML = "首页";
        this.firstBtn.style.flex = "1"
        this.prevBtn.innerHTML = "上一页";
        this.prevBtn.style.flex = "1";
        this.numberArea.style.flex = "8"
        this.nextBtn.innerHTML = "下一页";
        this.nextBtn.style.flex = "1";
        this.lastBtn.innerHTML = "尾页";
        this.lastBtn.style.flex = "1";
        this.input.style.width = "0";
        this.input.style.flex = "1";
        this.redirectBtn.innerHTML = "跳转";
        this.redirectBtn.style.flex = "1";
        this.operateArea.appendChild(this.firstBtn);
        this.operateArea.appendChild(this.prevBtn);
        this.operateArea.appendChild(this.numberArea);
        this.operateArea.appendChild(this.nextBtn);
        this.operateArea.appendChild(this.lastBtn);
        this.operateArea.appendChild(this.input);
        this.operateArea.appendChild(this.redirectBtn);
        this.numberArea.style.display = "flex";
        this.numberArea.style.alignItems = "center";
        this.numberArea.style.textAlign = "center";

        this.dom.appendChild(this.displayArea);
        this.displayArea.style.height = "90%";
    },
    renderNumberArea() {
        // 根据当前页是第几页决定如何展示
        //   如果页数大于10
        //         当当前页是前4页时  1 2 3 4 5 ... end-1 end
        //         当当前页是第5页时  1 2 3 4 5 6 7 ... end-1 end
        //         当当前页大于5时    1 2 ... current-2 current-1 current current+1 current+2 ... end-1 end
        //         当当前页为后4页时  1 2 ...  end-4 end-3 end-2 end-1 end
        //         当当前页为end-4时  1 2 ...  end-6 end-5 end-4 end-3 end-2 end-1 end
        //   如果页数小于等于10 则全部展示
        // 1 根据总页数是否大于10 决定是全部显示还是带省略号的显示方式
        var str = "";
        if (this.total > 10) {
            // 根据当前页属性去判断
            if (this.currentPage < 4) {
                // 循环前四个 
                for (var i = 0; i < 5; i++) {
                    str += "<span style='flex:1; " + (i === this.currentPage ? "color: red" : "") + "'  >" + (i + 1) + "</span>"
                    // if (i != this.currentPage) {
                    //     str += "<span style='flex:1;' " + (i + 1) + "  </span>"
                    // } else {
                    //     str += "<span style='flex:1;color:red' " + (i + 1) + "  </span>"
                    // }
                }
                // 加上中间的...
                str += "<span style='flex:1'>...</span>";
                // 加上后面的两个
                str += "<span style='flex: 1'>" + (this.total - 1) + "</span>"
                str += "<span style='flex: 1'>" + this.total + "</span>"
            } else if (this.currentPage === 4) {
                // 循环前四个 
                for (var i = 0; i < 7; i++) {
                    str += "<span style='flex:1; " + (i === this.currentPage ? "color: red" : "") + "'  >" + (i + 1) + "</span>"
                }
                // 加上中间的...
                str += "<span style='flex:1'>...</span>";
                // 加上后面的两个
                str += "<span style='flex: 1'>" + (this.total - 1) + "</span>"
                str += "<span style='flex: 1'>" + this.total + "</span>"
            } else if (this.currentPage === this.total - 5) {
                // 第一页
                str += "<span style='flex: 1'>" + 1 + "</span>"
                // 第二页
                str += "<span style='flex: 1'>" + 2 + "</span>"
                // 加上中间的...
                str += "<span style='flex:1'>...</span>";
                // 循环后七个
                for (var i = this.total - 7; i < this.total; i++) {
                    str += "<span style='flex:1; " + (i === this.currentPage ? "color: red" : "") + "'  >" + (i + 1) + "</span>"
                }
            } else if (this.currentPage > this.total - 5) {
                // 第一页
                str += "<span style='flex: 1'>" + 1 + "</span>"
                // 第二页
                str += "<span style='flex: 1'>" + 2 + "</span>"
                // 加上中间的...
                str += "<span style='flex:1'>...</span>";
                // 循环后七个
                for (var i = this.total - 5; i < this.total; i++) {
                    str += "<span style='flex:1; " + (i === this.currentPage ? "color: red" : "") + "'  >" + (i + 1) + "</span>"
                }
            } else {
                // 第一页
                str += "<span style='flex: 1'>" + 1 + "</span>"
                // 第二页
                str += "<span style='flex: 1'>" + 2 + "</span>"
                // 加上中间的...
                str += "<span style='flex:1'>...</span>";
                // 循环中间的5个
                for (var i = this.currentPage - 2; i <= this.currentPage + 2; i++) {
                    str += "<span style='flex:1; " + (i === this.currentPage ? "color: red" : "") + "'  >" + (i + 1) + "</span>"
                }
                // 加上中间的...
                str += "<span style='flex:1'>...</span>";
                // 加上后面的两个
                str += "<span style='flex: 1'>" + (this.total - 1) + "</span>"
                str += "<span style='flex: 1'>" + this.total + "</span>"
            }
        } else {
            for (var i = 0; i < this.total; i++) {
                str += "<span style='flex:1; " + (i === this.currentPage ? "color: red" : "") + "'  >" + (i + 1) + "</span>"
            }
        }
        // 上面渲染完结构了 一起上树
        this.numberArea.innerHTML = str;
    },
    display(fun) {
        // 接收这个用户传递进来的函数
        this.construct = fun;
        // 将数据传递进去 
        // 获取当页的数据
        var arr = this.dataArr.slice(this.currentPage * this.dataNumber, this.currentPage * this.dataNumber + this.dataNumber);
        // 这个函数是外部传递进来的 我们应该给它提供数据 让它生成html结构 我们要这个结构就行了
        var html = fun(arr);
        // html就是我们得到的最终的html结构字符串
        // 放入display区域
        this.displayArea.innerHTML = html;
    },
    // 绑定事件
    bindEvent() {
        // 首页
        this.firstBtn.onclick = () => {
            // 1 this.currentPage改为0
            this.currentPage = 0;
            this.renderNumberArea();
            this.display(this.construct);
        }
        // 上一页
        this.prevBtn.onclick = () => {
            if (!this.currentPage) {
                alert("已经是第一页了")
                return;
            }
            this.currentPage--;
            this.renderNumberArea();
            this.display(this.construct);
        }
        // 数字区域  因为数字区域它里面的内容会经常被替换 所以推荐使用委托模式
        this.numberArea.onclick = (e) => {
            // 判定触发事件的元素是谁
            if (e.target.innerHTML != "...") {
                this.currentPage = +e.target.innerHTML - 1;
                this.renderNumberArea();
                this.display(this.construct);
            }
        }
        // 下一页
        this.nextBtn.onclick = () => {
            if (this.currentPage === this.total - 1) {
                alert("已经是最后一页了")
                return;
            }
            this.currentPage++;
            this.renderNumberArea();
            this.display(this.construct);
        }
        // 尾页
        this.lastBtn.onclick = () => {
            this.currentPage = this.total - 1;
            this.renderNumberArea();
            this.display(this.construct);
        }
        // 跳转
        this.redirectBtn.onclick = () => {
            // 获取用户输入的内容
            var val = +this.input.value;
            var isNumber = !isNaN(val);
            if (isNumber && val > 0 && val <= this.total) {
                this.currentPage = val - 1;
                this.renderNumberArea();
                this.display(this.construct);
            } else {
                alert("请输入1~" + (this.total) + "之间的数字")
            }
        }
    }

}

