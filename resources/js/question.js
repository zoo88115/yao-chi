var q = ["男生火鍋不喜歡加什麼料","女生討厭吃什麼水果","我們兩個是什麼時候認識的","剛認識時 我們兩個人的身高","兩個人因為玩什麼遊戲感情變好","女生大學主修什麼系","我們養的寵物是什麼","哪一個不是我們養的寵物的名字","阿堯在大學評比（女方朋友製表）輸幾分","我們第一次一起出國去哪裡","我們都各有幾個兄弟姊妹","我們都是哪個球隊的球迷","男生第一次寫卡片給女生，寫了?","下列寶可夢，男生偏好哪隻？","男生在哪裡當替代役","女生是不折不扣的","男生不擅長做什麼事"];
var q_s = [["肉","菜","火鍋料"],["番茄","全部喜歡","全部不喜歡"],["隔壁鄰居","國中同學","公司同事"],["161公分","162公分","163公分"],["楓之谷","新絕代雙驕","寶可夢"],["土耳其語文學系","阿拉伯語文學系","經濟學系"],["荷蘭豬","麝香豬","佩佩豬"],["蹦蹦","yoyo","冬瓜"],["2分","4分","6分"],["泰國","日本","土耳其"],["獨生子女","2個","3個"],["中信兄弟","富邦悍將","裕隆納智捷"],["你好吵","你好可愛","我想認識你"],["皮卡丘","伊布","小拉達"],["南竹派出所","蘆竹交通分隊","蘆竹分局"],["咖啡控","奶茶控","鮮肉控"],["寫程式","煮飯","跟人講話"]];
var ans = ["火鍋料","全部不喜歡","國中同學","162公分","新絕代雙驕","土耳其語文學系","荷蘭豬","冬瓜","4分","泰國","2個","富邦悍將","你好吵","伊布","南竹派出所","奶茶控","跟人講話"];
var sel_ans = [];
var bg_color = ['#FFDDAA','#FFEE99','#FFFFBB','#EEFFBB','#CCFF99','#99FF99','#BBFFEE','#AAFFEE','#CCEEFF','#CCDDFF','#CCCCFF','#CCBBFF','#E8CCFF','#F0BBFF'];

var q_index = 0;
var max_size = 10;

var countToNumber = function (element, number, suffix, duration) {
  $({count: parseInt(element.text().split("+")[0].replace(/\,/g, ''))}).animate({count: number}, {
    duration: duration ? duration : 3000,
    easing: 'swing', 
    step: function (now) {
      element.text((Math.floor(now) + suffix).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,"));
    },
    complete: function () {
      countingFromZero = false;
    }
  });
}

function randomQuestion(){
	for(var i=0;i<q.length * 3;i++){
		var si = Math.floor(Math.random()*q.length);
		var sj = Math.floor(Math.random()*q.length);
		var tmp = q[si];
		q[si] = q[sj];
		q[sj] = tmp;

		var tmp2 = q_s[si];
		q_s[si] = q_s[sj];
		q_s[sj] = tmp2;

		var tmp3 = ans[si];
		ans[si] = ans[sj];
		ans[sj] = tmp3;
	}
}

function randomQ_S(index){
	for(var i=0;i<max_size;i++){
		var si = Math.floor(Math.random()*3);
		var sj = Math.floor(Math.random()*3);
		var tmp = q_s[index][si];
		q_s[index][si] = q_s[index][sj];
		q_s[index][sj] = tmp;
	}
}

function showQuestion(){
	randomQuestion();
	$("#question_modal").modal('show');
	var str = '';
	for(var i=0;i<max_size;i++){
		randomQ_S(i);
		str += '<div class="d-flex flex-column justify-content-center" style="border-radius:30px;background-color:' + bg_color[i] + ';width:100%;height:100%;position:absolute;left:0;top:0;z-index:' + (100-i) + '">';
		str += '<div class="p-2" style="font-size:1.8rem;padding-bottom:0 !important">Q'+ (i+1) + ':</div>';
		str += '<div class="p-2" style="font-size:1.2rem;padding-top:0 !important">' + q[i] + '</div>';
		for(var j=0;j<q_s[i].length;j++){
			str += '<div class="p-2 btn btn-success" style="margin:.5rem .5rem;font-size:1rem" onclick="clickAns(this,\'' + q_s[i][j] +'\')">' + q_s[i][j] + '</div>';
		}
		str += '</div>';
	}
	str += '<div class="d-flex flex-column justify-content-center" style="border-radius:30px;background-color:' + bg_color[10] + ';width:100%;height:100%;position:absolute;left:0;top:0;z-index:' + (100-10) + '">';
	str += '<div class="p-2" style="text-align:center">分數結算</div>';
	str += '<div id="count_score" class="p-2" style="text-align:center">0</div>';
	str += '</div>';

	$('#question').html(str);
}

function clickAns(e,ans){
	sel_ans.push(ans);
	q_index+=1;
	randomQ_S(q_index);

	$(e).parent().addClass('fade-out-x-active');
	//$(e).parent().delay(990).hide(0);
	setTimeout(function(){ $(e).parent().addClass('strong-hide'); }, 900);
	//setTimeout(hideQuestion($(e).parent()),10000);
	if(q_index < max_size){

	}else{
		score();
	}
}

function score(){
	var count = 0;
	for(var i=0;i<max_size;i++){
		if(sel_ans[i] == ans[i]){
			count += 10;
		}
	}
	countToNumber($('#count_score'), count, '', 0);
}