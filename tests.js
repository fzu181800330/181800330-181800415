var json = [];//json数组
function setJson()
{   
   
    var data = localStorage.getItem("str");
    var teaCnt = 0;
    var teacherIndex = new Array();//获得教师位置下标
    var teacherPatt = /导师：/g;
    var block = new Array();//块数组
    
    while(teacherPatt.test(data) == true){
       teacherIndex[teaCnt++] = teacherPatt.lastIndex - 3; 
    }

    //将data数据按导师划分成不同块
    //若只有一块这默认放置block[0]
    if(teacherIndex.length < 1){
        block[0] = data;
    }else{
        for(var i = 0; i < teacherIndex.length; i++){
            block[i] = '';
            var last = i + 1 == teacherIndex.length? data.length : teacherIndex[i + 1];
            for(var j = teacherIndex[i]; j < last; j++){
                block[i] += data[j];
            }
        }
    }

   
    
    for(var k = 0; k < block.length; k++){
        //导师节点
        json[k] = {};
        json[k].name = block[k].match(/(?<=导师：).*/) + '';//name属性
       // console.log(json[k].name);
        json[k].code = json[k].name;
        json[k].icon = "icon-th";
        json[k].child = [];
        var count = 0;//确定子节点
        //分不同类学生节点

        //博士生
        if(/级博士生/.test(data)){
            //博士生节点
            var doc = {};
            doc.name = "博士生";
            doc.code =json[k].code + doc.name;
            doc.icon = "icon-minus-sign";
            doc.parentCode = json[k].code;
            doc.child = [];
            var docArray = block[k].match(/\d{4}级博士生\：.*/g);
           // console.log(docArray);

            //分不同级博士生
            for(var i = 0; i < docArray.length; i++){
                
                var year = {};
                year.name = docArray[i].match(/\d{4}/) + '';
               // console.log(year.name);
                year.code = doc.code + year.name;
                year.icon = "icon-minus-sign";
                year.parentCode = doc.code;
                year.child = [];

                //学生名节点
                var stuName = docArray[i].match(/(?<=级博士生：).*/) + '';
                console.log(stuName);
                var stuNameArray = stuName.split("、");
                console.log(stuNameArray);

                //同级不同学生
                for(var j = 0; j < stuNameArray.length; j++){
                    var stu = {};
                    stu.name = stuNameArray[j];
                    stu.code = year.code + stu.name;
                    stu.icon = "";
                    stu.parentCode = year.code;
                    stu.child = [];
                    
                    var reg=new RegExp(("(?<="+stu.name+"：).*"));
                    var skill=data.match(reg)+'';
                    if(skill!='null'){
                        var skillArray=skill.split("、");
                        for(var p=0;p<skillArray.length;p++){
                            var newskill={};
                            newskill.name=skillArray[p];
                            newskill.code=stu.code+newskill.name;
                            newskill.icon="";
                            newskill.parentCode=stu.code;
                            newskill.child=[];
                            stu.child[p]=newskill;
                        }
                       
                    }
                    console.log(skill);
                    console.log(skillArray);
                    year.child[j] = stu;
                  //  console.log(stu.name);
                    
                }

                doc.child[i] = year;
            }
            json[k].child[count++] = doc;
        }


        //硕士生
        if(/级硕士生/.test(data)){
            //博士生节点
            var doc = {};
            doc.name = "硕士生";
            doc.code = json[k].code + doc.name;
            doc.icon = "icon-minus-sign";
            doc.parentCode = json[k].code;
            doc.child = [];
            var docArray = block[k].match(/\d{4}级硕士生\：.*/g);
          //  console.log(docArray);
//
            //分不同级博士生
            for(var i = 0; i < docArray.length; i++){
                
                var year = {};
                year.name = docArray[i].match(/\d{4}/) + '';
               // console.log(year.name);
                year.code = doc.code + year.name;
                year.icon = "icon-minus-sign";
                year.parentCode = doc.code;
                year.child = [];

                //学生名节点
                var stuName = docArray[i].match(/(?<=级硕士生：).*/) + '';
                //console.log(stuName);
                var stuNameArray = stuName.split("、");
                //console.log(stuNameArray);

                //同级不同学生
                for(var j = 0; j < stuNameArray.length; j++){
                    var stu = {};
                    stu.name = stuNameArray[j];
                    stu.code = year.code + stu.name;
                    stu.icon = "";
                    stu.parentCode = year.code;
                    stu.child = [];
                    var reg=new RegExp(("(?<="+stu.name+"：).*"));
                    var skill=data.match(reg)+'';
                    if(skill!='null'){
                        var skillArray=skill.split("、");
                        for(var p=0;p<skillArray.length;p++){
                            var newskill={};
                            newskill.name=skillArray[p];
                            newskill.code=stu.code+newskill.name;
                            newskill.icon="";
                            newskill.parentCode=stu.code;
                            newskill.child=[];
                            stu.child[p]=newskill;
                        }
                       
                    }
                    console.log(skill);
                    console.log(skillArray);
                    year.child[j] = stu;
                //    console.log(stu.name);
                    
                }

                doc.child[i] = year;
            }
            json[k].child[count++] = doc;
        }

        //本科生
        if(/级本科生/.test(data)){
            //博士生节点
            var doc = {};
            doc.name = "本科生";
            doc.code = json[k].name + doc.name;
            doc.icon = "icon-minus-sign";
            doc.parentCode = json[k].code;
            doc.child = [];
            var docArray = block[k].match(/\d{4}级本科生\：.*/g);
          //  console.log(docArray);

            //分不同级博士生
            for(var i = 0; i < docArray.length; i++){
                
                var year = {};
                year.name = docArray[i].match(/\d{4}/) + '';
               // console.log(year.name);
                year.code = doc.code + year.name;
                year.icon = "icon-minus-sign";
                year.parentCode = doc.code;
                year.child = [];

                //学生名节点
                var stuName = docArray[i].match(/(?<=级本科生：).*/) + '';
              //  console.log(stuName);
                var stuNameArray = stuName.split("、");
               // console.log(stuNameArray);

                //同级不同学生
                for(var j = 0; j < stuNameArray.length; j++){
                    var stu = {};
                    stu.name = stuNameArray[j];
                    stu.code =year.code + stu.name;
                    stu.icon = "";
                    stu.parentCode = year.code;
                    stu.child = [];
                    var reg=new RegExp(("(?<="+stu.name+"：).*"));
                    var skill=data.match(reg)+'';
                    if(skill!='null'){
                        var skillArray=skill.split("、");
                        for(var p=0;p<skillArray.length;p++){
                            var newskill={};
                            newskill.name=skillArray[p];
                            newskill.code=stu.code+newskill.name;
                            newskill.icon="";
                            newskill.parentCode=stu.code;
                            newskill.child=[];
                            stu.child[p]=newskill;
                        }
                       
                    }
                    console.log(skill);
                    console.log(skillArray);
                    year.child[j] = stu;
                  //  console.log(stu.name);
                    
                }

                doc.child[i] = year;
            }
            json[k].child[count++] = doc;
        }
        //console.log(json[k]);
   }
   
}



QUnit.test( "test", function(assert) {
    var obj1 = "导师：张三\n2016级博士生：天一、王二、吴五\n2015级硕士生：李四、王五、许六\n2016级硕士生：刘一、李二、李三\n2017级本科生：刘六、琪七、司四";
    var temp = [{"name":"张三","code":"张三","icon":"icon-th","child":[{"name":"博士生","code":"张三博士生","icon":"icon-minus-sign","parentCode":"张三","child":[{"name":"2016","code":"张三博士生2016","icon":"icon-minus-sign","parentCode":"张三博士生","child":[{"name":"天一","code":"张三博士生2016天一","icon":"","parentCode":"张三博士生2016","child":[]},{"name":"王二","code":"张三博士生2016王二","icon":"","parentCode":"张三博士生2016","child":[]},{"name":"吴五","code":"张三博士生2016吴五","icon":"","parentCode":"张三博士生2016","child":[]}]}]},{"name":"硕士生","code":"张三硕士生","icon":"icon-minus-sign","parentCode":"张三","child":[{"name":"2015","code":"张三硕士生2015","icon":"icon-minus-sign","parentCode":"张三硕士生","child":[{"name":"李四","code":"张三硕士生2015李四","icon":"","parentCode":"张三硕士生2015","child":[]},{"name":"王五","code":"张三硕士生2015王五","icon":"","parentCode":"张三硕士生2015","child":[]},{"name":"许六","code":"张三硕士生2015许六","icon":"","parentCode":"张三硕士生2015","child":[]}]},{"name":"2016","code":"张三硕士生2016","icon":"icon-minus-sign","parentCode":"张三硕士生","child":[{"name":"刘一","code":"张三硕士生2016刘一","icon":"","parentCode":"张三硕士生2016","child":[]},{"name":"李二","code":"张三硕士生2016李二","icon":"","parentCode":"张三硕士生2016","child":[]},{"name":"李三","code":"张三硕士生2016李三","icon":"","parentCode":"张三硕士生2016","child":[]}]}]},{"name":"本科生","code":"张三本科生","icon":"icon-minus-sign","parentCode":"张三","child":[{"name":"2017","code":"张三本科生2017","icon":"icon-minus-sign","parentCode":"张三本科生","child":[{"name":"刘六","code":"张三本科生2017刘六","icon":"","parentCode":"张三本科生2017","child":[]},{"name":"琪七","code":"张三本科生2017琪七","icon":"","parentCode":"张三本科生2017","child":[]},{"name":"司四","code":"张三本科生2017司四","icon":"","parentCode":"张三本科生2017","child":[]}]}]}]}];
    setJson(obj1);
    assert.deepEqual(json ,temp, "Two objects can be the same in value" );
  });