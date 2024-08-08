var audio = document.getElementById("myAudio"); 

$(document).ready(function() {
    $("body").hide();
    $('.raffle-roller-holder').hide();
    window.addEventListener('message', function (event) {
        var item = event.data;
        if (item.show == true) {
            $("body").fadeIn();
            $('.raffle-roller-holder').show();
        }
    })
})

function playAudio() { 
    audio.play(); 
} 

function pauseAudio() { 
    audio.pause(); 
} 
function generate(ng) {
    setTimeout(function(){
        playAudio();
    },500)
    $('button').remove()
    $('.raffle-roller-holder').addClass('line')
	$('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');
	var itemChance = Math.floor(Math.random()*100) + 1;
    var level;
    if(itemChance < 35){
        level = 1;
    }else  if (35<=itemChance && itemChance<60){
        level = 2;
    }else  if(60<=itemChance && itemChance<80){
        level = 3;
    }else if(80<=itemChance && itemChance<95){
        level = 4;
    }else  if(95<itemChance){
        level = 5;
    }
    var element = startItems;
	for(var i = 0;i < 101; i++) {
		var randed = Math.floor(Math.random()*500)+1;
        
		if(randed < 35*5) {
			element += '<div class="item-common rare-level-1"><div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+itemList[1][Math.floor(Math.random() * itemList[1].length)].img+');"></div></div>';
		} else if(35*5 <= randed && randed < 60*5){
            element += '<div class="item-common rare-level-2"><div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+itemList[2][Math.floor(Math.random() * itemList[2].length)].img+');"></div></div>';
        }else if(60*5 <= randed && randed < 80*5) {
			element += '<div class="item-common rare-level-3"><div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+itemList[3][Math.floor(Math.random() * itemList[3].length)].img+');"></div></div>';
		} else if(80*5 < randed && randed <= 95*5){
            element += '<div class="item-common rare-level-4"><div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+itemList[4][Math.floor(Math.random() * itemList[4].length)].img+');"></div></div>';
        }else if(95*5 < randed){
            element += '<div class="item-common rare-level-5"><div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+itemList[5][Math.floor(Math.random() * itemList[5].length)].img+');"></div></div>';
        }
	}
    $('.raffle-roller-container').html(element)
	setTimeout(function() {
            var itemListRandom = Math.floor(Math.random() * itemList[level].length);
			goRoll(itemList[level][itemListRandom].name, itemList[level][itemListRandom].img, level, itemList[level][itemListRandom].itemid);
            // console.log(itemList[level][itemListRandom].itemid, level)
            // $.post('http://agac-karambitcase/caseResult', JSON.stringify({
            //     item: itemList[level][itemListRandom].itemid
            // })
            // );
            // location.reload();
	}, 500);
}
function goRoll(skin, skinimg, skinlvl, itemid) {
	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	$('#CardNumber31').css({
		"background-image": "url("+skinimg+")"
	});
    $('#CardNumber31').parent('div').attr('class', `item-common rare-level-${skinlvl}`)
    
	setTimeout(function() {
		$('#CardNumber31').addClass('winning-item');
		$('#rolled').html(skin);
        $('.raffle-roller-holder').fadeOut();
        $('body').fadeOut();
        $.post('http://agac-karambitcase/caseResult', JSON.stringify({
            itemid: itemid,
            itemname: skin
        })
        );
	}, 8500);
    setTimeout(function(){
        location.reload();
    }, 9000)
	$('.raffle-roller-container').css('margin-left', '-6870px');
}

document.onkeydown = function(data){
    if (data.which == 27){
        $('body').fadeOut();
        $.post('http://agac-karambitcase/CloseUIForce', JSON.stringify({}));
        setTimeout(function(){
            location.reload();
        }, 400)
    }
}
