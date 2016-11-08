var todo=[
    {id:1,title:"列表",color:"#ff2b6c",list:[
        {title:"卢云强一号",done:false},
        {title:"卢云强二号",done:true}

    ]}
]

var colors=["#ff2b6c","#CB70E0","#61D937","#1BACF8","#F7CB00","#FF8000","#A2845E"];
var app=angular.module("app",[]);
app.controller("iclouds",function ($scope,localStg) {
    $scope.todo=todo;
    $scope.todo=localStg.getData('todo');
    $scope.index=$scope.todo.length-1;
    $scope.flag=false;

    $scope.optflag=false;
    $scope.colors=colors;
    $scope.changeTitle=$scope.todo[$scope.index].title;
    $scope.changeColor=$scope.todo[$scope.index].color;
    $scope.select=function (i) {
        $scope.index=i;
        $scope.changeTitle=$scope.todo[i].title;
        $scope.changeColor=$scope.todo[i].color;
        $scope.optflag=false;
    }


    //添加
    $scope.addItem=function () {
        $scope.ids=$scope.todo[$scope.todo.length-1].id+1;
        $scope.index=$scope.todo.length;
        $scope.todo.push({
            id:$scope.ids,
            title:"列表"+$scope.ids,
            color:colors[$scope.todo.length%7],
            list:[]
        })
        localStg.saveData('todo',$scope.todo);
    }
    
//    已完成
    $scope.doneNums=0;
    $scope.getdoneNums=function(){
        $scope.doneNums=0;
        var list =$scope.todo[$scope.index].list;
        angular.forEach(list,function(v,i){
            if (v.done) {
                $scope.doneNums++;
            }

        })
        localStg.saveData('todo',$scope.todo)
    }
    $scope.getdoneNums();
    $scope.addlist=function(){
        $scope.todo[$scope.index].list.push({
            title:'',
            done:false
        })
        localStg.saveData('todo',$scope.todo);
    }

    $scope.clearCom=function(){
        var list=$scope.todo[$scope.index].list;
        var arr=[];
        angular.forEach(list,function (v,i) {
            if (v.done==false){
               arr.push(v);
            }

        })
        $scope.todo[$scope.index].list=arr;
        $scope.getdoneNums();
        $scope.flag=false;
        localStg.saveData('todo',$scope.todo);
    }

    $scope.set=function(o,f){
        o.done=f;
        $scope.getdoneNums();
        localStg.saveData('todo',$scope.todo);
    }
    $scope.change=function(o,text){
        o.title=text.target.innerHTML;
        console.log($scope.todo)
        localStg.saveData('todo',$scope.todo);
    }


    //options
    $scope.sColor=function (c) {
        $scope.changeColor=c;
    }
    $scope.comChange=function () {
      var o=$scope.todo[$scope.index];
        o.title=$scope.changeTitle;
        o.color=$scope.changeColor;
        $scope.optflag=false;
        localStg.saveData('todo',$scope.todo);
    }
    $scope.delList=function () {
        if ($scope.todo.length==1){
            alert("至少保留一个");
            return;
        }
        $scope.todo.splice($scope.index,1);
        $scope.index=$scope.todo.length-1;
        localStg.saveData('todo',$scope.todo)
    }



    $scope.$watch('index',function(){
        $scope.getdoneNums();
        $scope.flag = false;
    })

   //ss

    // $scope.s2=""
    // $scope.search=function(){
    //     $scope.s2=$scope.ss;
    // }


})


app.factory('localStg',function () {
    return{
        getData:function (key) {
            var d=localStorage.getItem(key);
            return d==null?[]:JSON.parse(d);
        },
        saveData:function (key,data) {
            localStorage.setItem(key,JSON.stringify(data));
        },
        delData:function (key) {
            localStorage.removeItem(key);
        }
    }
})