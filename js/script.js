$(function(){
    var int=setInterval(clock, 1000);
    clearInterval(int);
    var bgm_num=0;
    var mask_height=0;
    var workTime=25;
    var restTime=5;
    var flag=true;
    var status=true;
    var time=1500;
    function clock(){
        var hours=Math.floor((time)/3600);
        if (hours<10){hours="0"+hours};
        var minutes=parseInt((time%3600)/60);
        if (minutes<10){minutes="0"+minutes};
        var seconds=parseInt(time%60);
        if (seconds<10){seconds="0"+seconds};
        lefttime=minutes+":"+seconds;
        $(".progress_time").html(lefttime);
        time--;
        if(status){
            mask_height=(1-time/(workTime*60))*300;
        }else if(!status){
            mask_height=(1-time/(restTime*60))*300;
        }
        $(".mask").css("height",mask_height);
        if (time<0){
            status=!status;
            if(status){
                time=workTime*60;
                $("#bgMusic")[0].pause();
                $("#bgMusic")[0].currentTime = 0;
                $(".progress_text").html("Work");
                $(".mask").css({
                    "height":"0px",
                    "background-color":"#99CC00"
                });
                //$(".progress_bar").css("border","4px solid #99CC00");
            } 
            else if(!status){
                time=restTime*60;
                bgm_num=parseInt(4*Math.random());
                console.log(bgm_num);
                $("#bgMusic").attr('src','audio/'+bgm_num+'.mp3');
                $("#bgMusic")[0].play();
                $(".progress_text").html("Rest");
                $(".mask").css({
                    "height":"0px",
                    "background-color":"#F71E35"
                });
                //$(".progress_bar").css("border","4px solid #F71E35");
            }
            clearInterval(int);
            int=setInterval(clock, 1000);
        }
    }
    $(".control_rest .btn_subtract").click(function(event) {  //rest-按钮功能
        restTime=$(this).next().html();
        if(restTime>1)
        restTime--;
        $(this).next().html(restTime);
        if (!status){
            $(".progress_time").html(restTime);
            time=restTime*60;
        }
    });
    $(".control_rest .btn_add").click(function(event) {   //rest+按钮功能
        restTime=$(this).prev().html();
        restTime++;
        $(this).prev().html(parseInt(restTime));
        if (!status){
            $(".progress_time").html(restTime);
            time=restTime*60;
        }
        //$(".control_rest button").attr("disabled", true);
    }); 
    $(".control_work .btn_subtract").click(function(event) {  //work-按钮功能
        workTime=$(this).next().html();
        if(workTime>1)
        workTime--;
        $(this).next().html(workTime);
        if (status){
            $(".progress_time").html(workTime);
            time=workTime*60;
        }
    });
    $(".control_work .btn_add").click(function(event) {   //work+按钮功能
        workTime=$(this).prev().html();
        workTime++;
        $(this).prev().html(parseInt(workTime));
        if (status){
            $(".progress_time").html(workTime);
            time=workTime*60;
        }
        //$(".control_rest button").attr("disabled", true);
    }); 
    $(".progress").click(function(event) {
        if (!flag){
            clearInterval(int);
            if (!status){
                $(".control_rest button").attr("disabled", false);
            }else{
                $(".control_work button").attr("disabled", false);
            }
            flag=!flag;
        }
        else{ 
            clearInterval(int);
            int=setInterval(clock, 1000);
            $(".control button").attr("disabled", true);
            flag=!flag;
        }
    });
})
