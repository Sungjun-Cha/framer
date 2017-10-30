statusBar = new Layer
	width: Screen.width
	height: 40
	backgroundColor: "gray"
	image: "images/statusBar.png"

menuBtn = new Layer
	size: 100
	y: statusBar.height
	image: "images/btn_menu_n@3x.png"

page = new PageComponent
	width: Screen.width - 100
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	scrollVertical: false
	clip: false
page.content.backgroundColor = ""
page.content.draggable.overdrag = false
page.contentInset =
	right: -100

cards = []
for i in [0...7]
	card = new Layer
		width: 650
		height: Screen.height - statusBar.height
		x: i * 650 
		parent: page.content
		backgroundColor: Utils.randomColor()
		clip: true
		name: "card#{i + 1}"
	cards.push card
	
cards[0].backgroundColor = "#d8d8d8"
cards[1].backgroundColor = "#522D37"
cards[2].backgroundColor = "#74cec5"
cards[3].backgroundColor = "#fa7654"
cards[4].backgroundColor = "#935e96"
branch1 = new Layer
	width: 458
	height: 283
	x: 192
	y: -133
	parent: cards[2]
	image: "images/branch1.png"
	scale: 0.5
	originX: 1
	originY: 1

branch2 = new Layer
	width: 395
	height: 107
	parent: branch1
	x: 32
	y: 213
	originX: 1
	originY: .5
	image: "images/branch2.png"

branch34 = new Layer
	width: 1125
	height: 661
	parent: cards[2]
	scale: 0.5
	y: 1
	x: -465
	backgroundColor: ""
	originY: 0.3
	originX: 1

branch3 = new Layer
	width: 848
	height: 497
	parent: branch34
	y: 164
	image: "images/branch3.png"

branch4 = new Layer
	width: 954
	height: 253
	parent: branch34
	x: 171
	image: "images/branch4.png"

branch5 = new Layer
	width: 962
	height: 468
	parent: cards[2]
	image: "images/branch5.png"
	scale: 0.5
	x: -308
	y: 233
	originX: 1
	originY: 0

branch6 = new Layer
	width: 365
	height: 419
	x: 373
	y: 46
	image: "images/branch6.png"
	parent: branch5

numbers = []
msgs = []
boxs = []
flowers = []
flowers_3s = []
for i in [0...16]
	box = new Layer
		size: 300
		x: Utils.randomNumber(0, i * 38)
		y: Utils.randomNumber(0, i * 80)
# 		backgroundColor: Utils.randomColor()
		scale: 0
# 		opacity: 0
		borderRadius: 100
		blur: 16 - ((i + 1) * 1) 
		parent: cards[0]
		image: "images/flower_0.png"
	boxs.push box
	box.xPos = box.x
	box.yPos = box.y
	box.xBlur = box.blur

	flower = new Layer
		size: 300
		x: Utils.randomNumber(0, i * 36)
		y: Utils.randomNumber(0, i * 80)
# 		backgroundColor: Utils.randomColor()
		scale: 0
# 		opacity: 0
		borderRadius: 100
		blur: 16 - ((i + 1) * 1) 
		parent: cards[1]
		image: "images/flower.png"
	flowers.push flower
	
	flower3 = new Layer
		width: 960
		height: 978
		x: Utils.randomNumber(0, i * 36) - 900
		y: Utils.randomNumber(-100, i * 80)
# 		backgroundColor: Utils.randomColor()
		scale: Utils.randomNumber(.2, .6)
# 		opacity: 0
		blur: 16 - ((i + 1) * 1)
		parent: cards[3]
		image: "images/flower_3.png"
	flower3.xPos = flower3.x
	flower3.xScale = flower3.scale
	flower3.xBlur = flower3.blur
	flower3.animationOptions =
		curve: "spring(300,30,10)"
	flowers_3s.push flower3

for i in [0...7]
	message = ["2017 설<br>스마트 카달로그에서<br>신세계 백화점<br>인기 선물을<br>확인하세요!", "올 겨울, 가장<br>핫한 감각을<br>실속 있게!<br>지금 시즌오프를<br>누려보세요.", "합리적으로<br>스타일리하게!<br>올해의 마지막<br>세일을<br>놓치지 마세요.", "하나에 하나 더!<br>쇼핑에 행복을<br>더한 1석 2조의<br>더블 혜택을<br>누리세요.", "양은 플러스,<br>가격은 마이너스!<br>
특별하게 고르고<br>푸짐하게 준비한<br>쇼핑을 즐기세요.", "겨울 코디를<br>완성하는 잇템!<br>다양한 아우터의<br>실속만점 제안을<br>만나보세요.", "추위를 이기는<br>핫한 스타일링!<br>픙성한 패딩과<br>트렌디 부츠면<br>겨울 준비 끝!"]

	number = new Layer
		parent: cards[i]
		x: 60
		y: 258
		width: 41
		height: 56
		backgroundColor: ""
		html: "0#{i + 1}."
		style:
			fontSize: "24pt"
			color: "white"
			fontFamily: "Adobe Garamond Pro"
# 			fontWeight: "bold"
	numbers.push number
	number.idx = i + 1
	
	msg = new Layer
		parent: cards[i]
		x: 60
		y: 348
		z: 200
		width: 500
		height: 500
		backgroundColor: ""
		html: "#{message[i]}"
		style: 
			fontSize: "40pt"
# 			fontFamily: "Sandoll MyeongjoNeo1"
			fontFamily: "Jeju Myeongjo"
			fontWeight: "500"
			lineHeight: "1.4"
# 			textShadow: "2px 2px 2px #555555"
			color: "#1a1a1a"
	msgs.push msg
	msg.idx = i + 1
sale = new Layer
	size: 630
	x: 60
	y: Screen.height - 186
	image: "images/sale_6.png"
	shadowX: 16
	shadowY: 24
	shadowBlur: 60
	shadowColor: "#1a1a1a"
numbers[0].style =
	color: "#1a1a1a"
numbers[2].style =
	color: "#1a1a1a"
numbers[3].style =
	color: "#1a1a1a"
msgs[1].style =
	color: "white"
msgs[4].style =
	color: "white"

menuBtn.bringToFront()
# page.snapToPage(cards[3], false)


splash_bg = new Layer
	width: 1181
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	x: 0
	image: "images/splash_model.jpg"

splash_title = new Layer
	width: Screen.width
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	image: "images/splash_title_new.png"

dimLoad = new Layer
	width: Screen.width
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	backgroundColor: "black"
	opacity: 0

logoFrame = new Layer
	width: 510
	height: 478
	backgroundColor: ""
	scale: .2
	y: 622
	midX: Screen.midX

leaves = []
leaf_1 = new Layer
	parent: logoFrame
	width: 120
	height: 211
	image: "images/leaf_1.png"
	x: 196
leaves.push leaf_1

leaf_2 = new Layer
	parent: logoFrame
	width: 183
	height: 124
	image: "images/leaf_2.png"
	x: 292
	y: 102
leaves.push leaf_2

leaf_3 = new Layer
	parent: logoFrame
	width: 203
	height: 104
	image: "images/leaf_3.png"
	x: 307
	y: 230
leaves.push leaf_3

leaf_4 = new Layer
	parent: logoFrame
	width: 137
	height: 179
	image: "images/leaf_4.png"
	x: 262
	y: 296
leaves.push leaf_4

leaf_5 = new Layer
	parent: logoFrame
	width: 132
	height: 182
	image: "images/leaf_5.png"
	x: 119
	y: 296
leaves.push leaf_5

leaf_6 = new Layer
	parent: logoFrame
	width: 208
	height: 111
	image: "images/leaf_6.png"
	x: 0
	y: 229
leaves.push leaf_6

leaf_7 = new Layer
	parent: logoFrame
	width: 164
	height: 147
	image: "images/leaf_7.png"
	x: 59
	y: 81
leaves.push leaf_7



##states##

splash_bg.states =
	trans:
		opacity: 0
	out:
		ignoreEvents: true

splash_title.states =
	trans:
		opacity: 0
	out:
		ignoreEvents: true

dimLoad.states =
	active:
		opacity: .7

leaf_1.states =
	out:
		x: 199
		y: -211
		opacity: 0
	
	disapp:
		opacity: 0
		
leaf_1.stateSwitch("out")

leaf_2.states =
	out:
		x: 580
		y: 4
		opacity: 0
	disapp:
		opacity: 0
		
leaf_2.stateSwitch("out")

leaf_3.states =
	out:
		x: 510
		y: 280
		opacity: 0
	disapp:
		opacity: 0
leaf_3.stateSwitch("out")

leaf_4.states =
	out:
		x: 385
		y: 475
		opacity: 0
	disapp:
		opacity: 0
leaf_4.stateSwitch("out")

leaf_5.states =
	out:
		x: 20
		y: 478
		opacity: 0
	disapp:
		opacity: 0
leaf_5.stateSwitch("out")

leaf_6.states =
	out:
		x: -111
		y: 242
		opacity: 0
	disapp:
		opacity: 0
leaf_6.stateSwitch("out")

leaf_7.states =
	out:
		x: -105
		y: -56
		opacity: 0
	disapp:
		opacity: 0
leaf_7.stateSwitch("out")



animationA = new Animation branch1,
	rotation: 1
	options:
		time: 2
animationB = new Animation branch1,
	rotation: -1
animationC = new Animation branch34,
	rotation: 1
	options:
		time: 2
animationD = new Animation branch34,
	rotation: - 1
	options:
		time: 2
animationE = new Animation branch5,
	rotation: 1
	options:
		time: 2
animationF = new Animation branch5,
	rotation: -1
	options:
		time: 2



deleteObjects = (layer, array) ->
	pos = array.indexOf(layer)
	array.splice(pos, 1)
	layer.destroy()

cherries = []
cherryAni = ->
	for i in [0...4]
		cherry = new Layer
			width: 115
			height: 110
			image: "images/cherry.png"
			x: Utils.randomNumber(680, 780 + i * 5)
			y: Utils.randomNumber(0, 160 + i * 8)
			z: 100
			parent: cards[2]
			scale: Utils.randomNumber(.2, .3)
			originX: 0
			originY: .5
			blur: Utils.randomNumber(6, 24)
		cherries.push cherry
		cherry.sendToBack()
		
		rotaY = new Animation cherry,
			rotationY: 360
			options:
				time: Utils.randomNumber(3, 10)
				repeat: 12

		fallin = new Animation cherry,
			y: Screen.height + 100
			x: Utils.randomNumber(-600, -200)
			options:
				time: Utils.randomNumber(20, 30)
				delay: Utils.randomNumber(0,6)
		
		fallin.start()
		rotaY.start()

		cherry.on "change:y", ->
			deleteObjects(@, cherries) if @maxX < 0
			doAgain() if cherries.length is 2

		doAgain = Utils.throttle 1, -> cherryAni() if page.horizontalPageIndex(page.currentPage) is 2

splash_bg.animate
	properties:
		x: -431
	time: 16
	curve: "linear"

dimLoad.onClick ->
	dimLoad.animate
		properties:
			opacity: .7
		time: 1
		
	leaves.forEach (item, index) ->
			item.animationOptions =
					curve: "spring-dho(800, 200, 10, .01)"
			Utils.delay 1, ->
			timeFactor = .1
			Utils.delay index * timeFactor, ->
				item.stateCycle("default")
			Utils.delay (index + 9) * (timeFactor * 1.2), ->
				item.stateCycle("disapp")
			item.stateSwitch("out")
			Utils.delay (index + 19) * (timeFactor), ->
				dimLoad.animate
					properties:
						opacity: 0
				splash_bg.stateSwitch("trans")
				splash_title.stateSwitch("trans")
				splash_title.stateSwitch("out")
				dimLoad.ignoreEvents = true
			Utils.delay 1, ->
				for i in [0...16]
					boxs[i].animate
						properties:
							scale: Utils.randomNumber(1.6,2.2)
							opacity: 1
							rotation: Utils.randomNumber(-45, 45)
						time: (i / 4) * .01
						delay: i * .08
						curve: "spring(30,60,10)"
				
				


page.on "change:currentPage", ->
	pageIdx = this.horizontalPageIndex(this.currentPage)
	if pageIdx is 0
		for i in [0...16]
			if boxs[i].scale > 0
# 				for i in [0...16]
	# 				boxs[i].animate
	# 					properties:
	# 						scale: Utils.randomNumber(1.6,2.2)
	# 						opacity: 1
	# 						rotation: Utils.randomNumber(-45, 45)
	# 					time: (i / 2) * .08
	# 					delay: i * .1
	# 					curve: "spring(40,60,10)"
					boxs[i].animate
						properties:
	# 						scale: Utils.randomNumber(1.6,2.2)
	# 						opacity: 1
							rotation: Utils.randomNumber(-45, 45)
						time: (i / 2) * .8
						delay: i * .1
	# 					curve: "spring(60,60,30)"
						curve: "linear"
	else if pageIdx is 1
		for i in [0...16]
			if flowers[i].scale is 0
				flowers[i].animate
					properties:
						scale: Utils.randomNumber(1.6,2.2)
						opacity: 1
						rotation: Utils.randomNumber(-45, 45)
					time: (i / 2) * .04
					delay: i * .1
					curve: "spring(60,60,30)"
			else if flowers[i].scale > 0
				flowers[i].animate
					properties:
# 						scale: Utils.randomNumber(1.6,2.2)
# 						opacity: 1
						rotation: Utils.randomNumber(-45, 45)
					time: (i / 2) * .5
					delay: i * .1
# 					curve: "spring(60,60,30)"
					curve: "linear"
		animationA.start()
		animationA.on Events.AnimationEnd, animationB.start
		animationA.on Events.AnimationEnd, animationC.start
		animationB.on Events.AnimationEnd, animationA.start
		animationB.on Events.AnimationEnd, animationD.start
		animationA.on Events.AnimationEnd, animationE.start
		animationE.on Events.AnimationEnd, animationF.start
		
	else if pageIdx is 2
		cherryAni()

	else if pageIdx is 3
		for i in [0...16]
			flowers_3s[i].animate
				properties:
					rotation: Utils.randomNumber(-45, 45)
				time: (i / 2) * .5
				delay: i * .1
				curve: "linear"

page.content.on "change:x", ->
	for i in [0...16]
		boxs[i].x = Utils.modulate(page.content.x, [0, -650], [boxs[i].xPos, boxs[i].xPos + 400], true)
		boxs[i].blur = Utils.modulate(page.content.x, [0, -650], [boxs[i].xBlur, 10], true)
		flowers[i].x = Utils.modulate(page.content.x, [-650, -1300], [boxs[i].xPos, boxs[i].xPos + 400], true)
		flowers[i].blur = Utils.modulate(page.content.x, [-650, -1300], [boxs[i].xBlur, 10], true)
		flowers_3s[i].x = Utils.modulate(page.content.x, [-1300, -2600], [flowers_3s[i].xPos, flowers_3s[i].xPos + 1200], true)
# 		flowers_3s[i].blur = Utils.modulate(page.content.x, [-1300, -1950], [flowers_3s[i].xBlur + 20, flowers_3s[i].xBlur], true)
		flowers_3s[i].blur = Utils.modulate(page.content.x, [-1950, -2600], [flowers_3s[i].xBlur, flowers_3s[i].xBlur + 10], true)
