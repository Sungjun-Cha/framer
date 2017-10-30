# Project Info
# This info is presented in a widget when you share.
# http://framerjs.com/docs/#info.info

Framer.Info =
	title: ""
	author: "Sungjun Cha"
	twitter: ""
	description: ""



## default settings ##
{TextLayer} = require 'TextLayer'
Screen.backgroundColor = "black"

Framer.Defaults.Animation =
	curve: "spring"
	curveOptions: 
		tension: 300
		friction: 30
		velocity: 5
		tolerance: 0.1

statusBar = new Layer
	width: Screen.width
	height: 40
	image: "images/statusBar.png"

view = new Layer
	width: Screen.width + 590
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	backgroundColor: ""
	x: -590

home = new PageComponent
	width: Screen.width - 100
	height: Screen.height - statusBar.height
	x: 590
	scrollVertical: false
# 	directionLock: true
	clip: false
	parent: view
home.content.draggable.overdrag = false
home.contentInset =
	right: -100

numbers = []
msgs = []
cards = []
for i in [0...10]
	card = new Layer
		width: 650
		height: Screen.height - statusBar.height
		x: i * 650
		parent: home.content
		backgroundColor: Utils.randomColor()
# 		image: "images/img_home_bg_x3_#{i + 1}.jpg"
	cards.push card
	for card in cards
		if cards.indexOf(card) > 0
			card.image = "images/img_home_bg_x3_#{cards.indexOf(card) + 1}.jpg"
	cards[0].backgroundColor = "#d8d8d8"
	message = ["2017 설<br>스마트 카달로그에서<br>신세계 백화점<br>인기 선물을<br>확인하세요!", "올 겨울, 가장<br>핫한 감각을<br>실속 있게!<br>지금 시즌오프를<br>누려보세요.", "합리적으로<br>스타일리하게!<br>올해의 마지막<br>세일을<br>놓치지 마세요.", "하나에 하나 더!<br>쇼핑에 행복을<br>더한 1석 2조의<br>더블 혜택을<br>누리세요.", "양은 플러스,<br>가격은 마이너스!<br>
특별하게 고르고<br>푸짐하게 준비한<br>쇼핑을 즐기세요.", "겨울 코디를<br>완성하는 잇템!<br>다양한 아우터의<br>실속만점 제안을<br>만나보세요.", "추위를 이기는<br>핫한 스타일링!<br>픙성한 패딩과<br>트렌디 부츠면<br>겨울 준비 끝!", "올 겨울엔<br>퍼에 주목하세요.<br>우아한 코트,<br>퍼 포인트 슈즈로<br>스타일 UP!", "남자의 겨울에<br>감각을 더할 시간<br>클래식 코트로,<br>캐주얼 재킷으로<br>겨울을 코디하세요.", "나른한<br>오후입니다.<br>라운지에서<br>따뜻한 라떼 한잔<br>어떠세요?" ]

	number = new Layer
		parent: card
		x: 60
		y: 258
		width: 41
		height: 56
		backgroundColor: ""
		html: "0#{i + 1}."
		style:
			fontSize: "24pt"
			fontFamily: "Adobe Garamond Pro"
# 			fontWeight: "bold"
	numbers.push number
	number.idx = i + 1
	
	msg = new Layer
		parent: card
		x: 60
		y: 348
		width: 500
		height: 500
		backgroundColor: ""
		html: "#{message[i]}"
		style: 
			fontSize: "40pt"
# 			fontFamily: "Sandoll MyeongjoNeo1"
			fontFamily: "Apple Myungjo"
			fontWeight: "bold"
			lineHeight: "1.4"
# 			color: "#1a1a1a"
	msgs.push msg
	msg.idx = i + 1
	number.states =
		numRight:
			x: 650
	msg.states = 
		msgRight:
			x: 650
	
	for msg in msgs
		if msg.idx == 1
			msg.style =
				color: "#1a1a1a"
		if msg.idx == 3
			msg.style =
				color: "#1a1a1a"
		if msg.idx == 5
			msg.style =
				color: "#1a1a1a"
		if msg.idx == 8
			msg.style =
				color: "#1a1a1a"
	
	for number in numbers
		if number.idx == 1
			number.style =
				color: "#1a1a1a"
		if number.idx == 3
			number.style =
				color: "#1a1a1a"
		if number.idx == 5
			number.style =
				color: "#1a1a1a"
		if number.idx == 8
			number.style =
				color: "#1a1a1a"
# 	msg.onClick (event, layer) ->
# 		print this.idx

# flowers = []
# for i in [0...32]
# 	flower = new Layer 
# 		width: 300
# 		height: 300
# 		image: "images/flower_0.png"
# 		scale: Utils.randomNumber(.8,1.8)
# 		rotation: Utils.randomNumber(0, 45) 
# 		x: Utils.randomNumber(-100 , i * 20)
# 		y: Utils.randomNumber(-100, i * 40)
# 		blur: 32 - ((i + 1) * 1)
# 		parent: cards[0]
# 	flower.xPos = flower.x
# 	flower.scale = flower.xScale
# 	flowers.push flower
# # for flower in flowers
# # 	flower.states.noScale = 
# # 		scale: 0
# # 	flower.stateSwitch("noScale")
# for msg in msgs
# 	msg.placeBefore(flower)
# for number in numbers
# 	number.placeBefore(flower)


## 쇼핑 정보 / 특가 / 쿠폰 ##
news = new ScrollComponent
	width: Screen.width
	height: Screen.height 
# 	y: statusBar.maxY
	x: 590
	backgroundColor: ""
# 	opacity: 0.3
	scrollHorizontal: false
	parent: view

# news.contentInset = bottom: 180


likeIt = ["false", "false", "false", "false", "false", "false"]
shops = []
sales = []
frames = []
shopDims = []
btnFrames = []
likeBtns = []
likeds = []
scrollBgs = []
shopScrolls = []
closeBtns = []
for v in [0...6]
	scrollBg = new Layer
		width: Screen.width
		height: Screen.height
		backgroundColor: "white"
		y:1294
		parent: news
	scrollBgs.push scrollBg
	
	shop = new Layer
		parent: news.content
		width: news.width - 120
		height: 1010
		backgroundColor: "white"
		x: 60
		y: 60 + v * 1100
		shadowX: 25
		shadowY: 42
		shadowBlur: 48
		shadowColor: "rgba(0, 0, 0, 0.3)"
		originX: .5
		originY: 0
	shops.push shop
# 	shop.x = shop.xPos
# 	shop.y = shop.yPos

	
	myCSSStyle =
		color: "white"
		fontSize: "22pt"
# 		lineHeight: "2.5"
		paddingLeft: "6pt"
		paddingRight: "6pt"
		paddingTop: "4pt"
	
	
	tag1 = new Layer
		parent: shop
		html: "쇼핑뉴스"
		style: myCSSStyle
		x: 40
		y: 630 + 50
		backgroundColor: "#1a1a1a"
		height: 37
		width: 118
	
	tag2 = new Layer
		parent: shop
		html: "본점"
		style: myCSSStyle
		x: tag1.maxX
		y: 630 + 50
		backgroundColor: "#999999"
		height: 37
		width: 68
		
	subject = ["1석 2조의 맛있는 패키지!<br>Gourmet Free Pass","SEASON OFF 30%","SALE 30 ~ 10%","CCM 인증기업<br>특별 기획전","노스페이스&<br>노스페이스 화이트라벨 대전","[존 루이스]<br>16년 F/W 시즌오프"]
	
	title = new Layer
		parent: shop
		html: "#{subject[v]}"
		backgroundColor: ""
		style: 
			fontSize: "30pt"
			color: "#1a1a1a"
			lineHeight: "1.2"
		width: 500
		height: 100
		x: 40
		y: tag1.maxY + 14
		
	date = new Layer
		parent: shop
		html: "2016.12.01 (목) - 2016.12.11 (일)"
		backgroundColor: ""
		style: 
			fontSize: "20pt"
			color: "#999999"
		y: title.maxY + 18
		x: 40
		width: 500
		
		
	frame = new Layer
		parent: shop
		width: shop.width
		height: shop.width
		clip: true
		backgroundColor: ""
	frame.bringToFront()
	frames.push frame
	
	sale = new Layer
		parent: frame
		width: 630
		height: 630
		image: "images/sale_#{v + 1}.png"
	sales.push sale
	sale.idx = v + 1
	
	sale.states =
		zoom:
			scale: 1.2
			blur: 5
	sale.stateSwitch("zoom")
	
	shopDim = new Layer
		parent: frame
		width: frame.width
		height: frame.width
		backgroundColor: "black"
		opacity: 0.7
	shopDims.push shopDim
	
	shopDim.states =
		hiddenDim:
			opacity: 0
	shopDim.stateSwitch("hiddenDim")
	
	btnFrame = new Layer
		parent: shop
		width: 90
		height: 90
		x: shop.width - 90
		y: 0
		backgroundColor: ""
	btnFrames.push btnFrame
	
	likeBtn = new Layer
		parent: btnFrame
		width: 50
		height: 50
		x: 20
		y: 20
		image: "images/btn_like_n@3x.png"
	likeBtns.push likeBtn
	
	liked = new Layer
		parent: frame
		width: 144
		height: 144
		midX: frame.midX
		y: frame.minY - 144
		image: "images/btn_like_s@3x.png"
		scale: .3
	likeds.push liked

	shopScroll = new ScrollComponent
		width: Screen.width
		height: Screen.height
		y: 1294
# 		opacity: 0
		scrollHorizontal: false
		backgroundColor: ""
		parent: news
	shopScrolls.push shopScroll
	
	closeBtn = new Layer
		width: 84
		height: 84
		y: 20
		x: 20
		backgroundColor: ""
		parent: news
	closeBtns.push closeBtn
	closeBtn.states =
		out:
			y: - 140
	closeBtn.stateSwitch("out")
	x = new Layer
		parent: closeBtn
		image: "images/btn_pop_close_n.png"
		width: 54
		height: 54
	x.center()
	saleInfo = new Layer
		parent: shopScroll.content
		width: 750
		height: 968
		image: "images/detail_info.png"
		y: 750

forShadow = new Layer
	parent: news.content
	backgroundColor: ""
	size: 180
	y: shops[5].maxY

dim = new Layer
	width: view.width
	height: Screen.height - statusBar.height
	backgroundColor: "black"
	opacity: 0.5
	parent: view
	
side = new Layer
	backgroundColor: ""
	width: 690
	height: Screen.height - statusBar.height
	parent: view



# home.draggable.enabled = true
# home.draggable.constraints = 
# 	height: Screen.height - statusBar.height
# 	y: statusBar.maxY	
# home.draggable.overdrag = false
# home.placeBefore(bg)


menuBtn = new Layer
	width: 100
	height: 100
	x: 590
	image: "images/btn_menu_n@3x.png"
	parent: side


################ 사이드 메뉴 ###################
menu = new ScrollComponent
	width: 590
	height: Screen.height - statusBar.height
	backgroundColor: "white"
	parent: side
	scrollHorizontal: false

# menu.contentInset =
# 	bottom: 90

bottomBar = new Layer
	parent: menu
	width: menu.width
	height: 90
	maxY: menu.maxY
	image: "images/sideBottomBar.png"

sideMenu = new Layer
	parent: menu.content
# 	image: "images/sideMenu.png"
	backgroundColor: "white"
	width: menu.width
	height: 1706

sideLable = new Layer
	parent: sideMenu
	width: sideMenu.width
	height: 210
	backgroundColor: ""
	
searchBtn = new Layer
	parent: sideLable
	size: 64
	image: "images/btn_search1_n.png"
	x: sideMenu.width - 64 - 40
	y: 60
	
greetings = new Layer
	parent: sideLable
	width: - 60 + sideMenu.width - 64 - 40
	height: 64
	backgroundColor: ""
	x: 60
	y: 60

welcome = new Layer
	parent: greetings
	html: "WELCOME"
	width: greetings.width
	height: greetings.height / 2
	backgroundColor: ""
	style: 
		fontFamily: "Adobe Garamond Pro"
		fontSize: "20pt"
		color: "#1a1a1a"
		paddingTop: "4pt"

hello = new Layer
	parent: greetings
	html: "안녕하세요 차성준 고객님"
	width: greetings.width
	backgroundColor: ""
	height: greetings.height / 2
	y: welcome.maxY
	style: 
		fontFamily: "Adobe Garamond Pro"
		fontSize: "20pt"
		color: "#1a1a1a"
		paddingTop: "4pt"

pointTitle = new Layer
	parent: sideMenu
	width: 200
	height: 36
	x: 60
	y: sideLable.height + 24
	html: "Shinsegae Point >"
	backgroundColor: ""
	style: 
		fontFamily: "Adobe Garamond Pro"
		fontSize: "18pt"
		color: "#1a1a1a"
		paddingTop: "5pt"

pointNum = new Layer
	parent: sideMenu
	width: 200
	height: 70
	x: 60
	y: sideLable.height + 24 + pointTitle.height + 18
	backgroundColor: ""
	html: "7"
	style: 
		fontFamily: "Amiri"
		fontSize: "76pt"
		color: "#1a1a1a"
		paddingTop: "20pt"
	
divider = new Layer
	parent: sideMenu
	x: 60
	y: pointNum.maxY + 24
	width: 470
	height: 2
	backgroundColor: "#f0f0f0"

rows = 2
cols = 3
myInfos = []
menuListSub = ["쇼핑정보", "플로어가이드", "점포안내", "주차", "MY신세계", "아카데미", "아트&컬처", "신세계 고객서비스", "SSG.COM", "SSG PAY", "공지사항", "환경설정"]
[0...rows].map (rows) ->
	[0...cols].map (cols) ->
		myInfo = new Layer
			parent: sideMenu
			backgroundColor: ""
			width: 140
			height: 50
			x: 60 + cols * 140
			y: divider.maxY + 26 + rows * 50
			clip: true
		myInfos.push myInfo
		
myInfos[0].html = "쿠폰"
myInfos[0].style =
	fontFamily: "Apple SD Gothic Neo"
	fontSize: "20pt"
	color: "#1a1a1a"
	paddingTop: "10pt"
myInfos[1].html = "찜목록"
myInfos[1].style =
	fontFamily: "Apple SD Gothic Neo"
	fontSize: "20pt"
	color: "#1a1a1a"
	paddingTop: "10pt"
myInfos[2].html = "알림"
myInfos[2].style =
	fontFamily: "Apple SD Gothic Neo"
	fontSize: "20pt"
	color: "#1a1a1a"
	paddingTop: "10pt"
myInfos[3].html = "2"
myInfos[3].style =
	fontFamily: "Amiri"
	fontSize: "46pt"
	color: "#1a1a1a"
	paddingTop: "10pt"
myInfos[4].html = "3"
myInfos[4].style =
	fontFamily: "Amiri"
	fontSize: "46pt"
	color: "#1a1a1a"
	paddingTop: "10pt"

menuLists = []
for i in [0...12]
	menuList = new Layer
		parent: sideMenu
		width: side.width - 60
		height: 62
		x: 60
		y: (myInfos[5].maxY + 51) + i * (62 + 12)
		html: "#{menuListSub[i]}"
		backgroundColor: ""
		style: 
			fontFamily: "Apple SD Gothic Neo"
			fontSize: "26pt"
			color: "#1a1a1a"
			paddingTop: "14pt"
	menuLists.push menuList

callLink = new Layer
	parent: sideMenu
	width: 420
	height: 62
	x: 60
	y: sideMenu.height - 62 - 80 - 90
	backgroundColor: ""
	html: "대표 상담 전화"
	style: 
		fontFamily: "Apple SD Gothic Neo"
		fontSize: "20pt"
		color: "#1a1a1a"
		paddingTop: "14pt"
	
# infoBtn = new Layer
# 	parent: menu.content
# 	y: 545
# 	height: 92
# 	width: sideMenu.width
# 	opacity: 0

setBtn = new Layer
	parent: menu.content
	y: 1414
	height: 92
	width: sideMenu.width
	opacity: 0

## 사이드 메뉴 ###################



## main view related states ##############

view.states =
	open:
		x: 0

dim.states = 
	hidden:
		opacity: 0

dim.stateSwitch("hidden")

news.states =
	bottom:
		y: Screen.height - 286
		scrollVertical: false

news.stateSwitch("bottom")


statusBar.bringToFront()


for liked in likeds
	liked.states =
		place:
			width: 50
			height: 50
			x: shop.width - 70
			y: 20

	liked.states.hidden =
		x: 750

## main view related states ##############


## like btn animation ################################################################
btnFrames.forEach (item, index) ->
	item.onClick ->
		likeIt[index] = "true"
		likeBtns[index].opacity = 0 
		shopDims[index].animate("default")
		likeds[index].animate
			properties:
				midX: frames[index].midX
				midY: frames[index].midY
				scale: 1
			curve: "spring(300, 30, 30)"
			time: 0.3
# 		likeds[index].on Events.AnimationEnd, ->
		Utils.delay 1, ->
			likeds[index].animate("place")
			shopDims[index].animate("hiddenDim")
# 		print likeIt

menuBtn.onClick (event, layer) ->
	view.animate("open")
	dim.animate("default")
	menuBtn.on Events.Click, ->
		view.animate("default")
		dim.animate("hidden")


news.onClick (event, layer) ->
	if this.y == Screen.height - 286
		sales[0].scale = 1
		sales[0].blur = 0
		news.animate("default")
		for msg in msgs
			msg.animate("msgRight")
		for number in numbers
			number.animate("numRight")


news.content.on "change:y", ->
# 	if news.y == statusBar.maxY
# 	if news.direction == "down"
	sales.forEach (item, index) ->
		if index > 0
			item.scale =
				Utils.modulate(news.content.y, [ -1100 * (index - 1), -1100 * index + 400 ],[1.2, 1], true)

			item.blur =
				Utils.modulate(news.content.y, [ -1100 * (index - 1), (-1100 * index) + 600 ],[5, 0], true)
	shops.forEach (item, index) ->
		item.blur =
			Utils.modulate(news.content.y, [ -1100 * (index) - 600, (-1100 * index) - 1200 ],[0, 5], true)


news.content.on Events.DragMove, ->
	if this.y >= 42
# 		news.content.draggable.enabled = false
		news.animate("bottom")
		sales[0].animate("zoom")
# 		sales[0].stateSwitch("zoom")
		for msg in msgs
			msg.animate("default")
		for number in numbers
			number.animate("default")

data = []
frames.forEach (item, index) ->
	sales[index].scale = sales[index].preScale
	sales[index].blur = sales[index].preblur
	item.on Events.Click, ->
# 		print sales[index].scale, sales[index].blur
		data.push sales[index].scale
		data.push sales[index].blur
		if news.y == 0 and index == 0 
			if likeIt[index] is "false"
				shops[index].animate
					properties:
						width: Screen.width
						x: 0
						y: Math.abs(news.content.y) # 스크롤해서 올린만큼 절대값으로 내려줌
						backgroundColor:"black"
					curve: "bezier-curve"
					time: 0.1
				this.blur = 0
	# 			this.placeBefore(shops[index - 1])
				this.placeBefore(shops[index + 1])
				scrollBgs[index].animate
					properties:
						y: 750
				
				item.animate
					properties:
						width: Screen.width
						height: Screen.width
	# 					x: - 60
	# 					y: - 60
						originX: .5
						originY: 0
					curve: "bezier-curve"
					time: 0.2
				
				sales[index].originX = .5
				sales[index].originY = 0
				sales[index].animate
					properties:
						width: Screen.width
						height: Screen.width
				sales[index].blur = 0
				
				sales[index].scale = 1
				menuBtn.animate
					properties:
						x: -100
				closeBtns[index].animate("default")
					
				shopScrolls[index].content.on "change:y", ->
	# 				print this.y
					frames[index].scale = Utils.modulate(this.y,[0, 100], [1,1.2], true)
					sales[index].scale = Utils.modulate(this.y,[0, 100], [1,1.2], true)
					
				shopScrolls[index].animate
					properties:
						y: 0
				btnFrames[index].x = 750

			else if likeIt[index] is "true"
				shops[index].animate
					properties:
						width: Screen.width
						x: 0
						y: Math.abs(news.content.y) # 스크롤해서 올린만큼 절대값으로 내려줌
						backgroundColor:"black"
					curve: "bezier-curve"
					time: 0.1
				this.blur = 0
	# 			this.placeBefore(shops[index - 1])
				this.placeBefore(shops[index + 1])
				scrollBgs[index].animate
					properties:
						y: 750
				
				item.animate
					properties:
						width: Screen.width
						height: Screen.width
	# 					x: - 60
	# 					y: - 60
						originX: .5
						originY: 0
					curve: "bezier-curve"
					time: 0.2
				
				sales[index].originX = .5
				sales[index].originY = 0
				sales[index].animate
					properties:
						width: Screen.width
						height: Screen.width
				sales[index].blur = 0
				
				sales[index].scale = 1
				menuBtn.animate
					properties:
						x: -100
				closeBtns[index].animate("default")
				
			shopScrolls[index].content.on "change:y", ->
# 				print this.y
				frames[index].scale = Utils.modulate(this.y,[0, 100], [1,1.2], true)
				sales[index].scale = Utils.modulate(this.y,[0, 100], [1,1.2], true)
				
			shopScrolls[index].animate
				properties:
					y: 0

			likeds[index].stateSwitch("hidden")

		else if index > 0
			shops[index].animate
				properties:
					width: Screen.width
					x: 0
					y: Math.abs(news.content.y) # 스크롤해서 올린만큼 절대값으로 내려줌
					backgroundColor:"black"
				curve: "bezier-curve"
				time: 0.1
			this.blur = 0
			this.placeBefore(shops[index - 1])
			this.placeBefore(shops[index + 1])
			scrollBgs[index].animate
				properties:
					y: 750
			
			item.animate
				properties:
					width: Screen.width
					height: Screen.width
# 					x: - 60
# 					y: - 60
					originX: .5
					originY: .5
				curve: "bezier-curve"
				time: 0.2
			
			sales[index].originX = .5
			sales[index].originY = .5
			sales[index].animate
				properties:
					width: Screen.width
					height: Screen.width
			sales[index].blur = 0
			
			sales[index].scale = 1
			menuBtn.animate
				properties:
					x: -100
			closeBtns[index].animate("default")
				
			shopScrolls[index].content.on "change:y", ->
# 				print this.y
				frames[index].scale = Utils.modulate(this.y,[0, 100], [1,1.2], true)
				sales[index].scale = Utils.modulate(this.y,[0, 100], [1,1.2], true)
			
			shopScrolls[index].animate
				properties:
					y: 0
			btnFrames[index].x = 750


closeBtns.forEach (item, index) ->
	item.on Events.Click, ->
		item.opacity = 0
		if index is 0 
			if likeIt[index] is "false"
				shops[index].animate
					backgroundColor: "white"
					width: 630
					x: 60
					y: index * 1100 + 60
				scrollBgs[index].animate
					properties:
						y: 1334
				frames[index].animate
					properties:
						width: 630
						height: 630
				sales[index].animate
					width: 630
				sales[index].animate("default")
				data.length = null
				menuBtn.animate
					properties:
						x: 590
				closeBtns[index].animate("out")
				shopScrolls[index].animate
					properties:
						y: 1334
				Utils.delay 0.5, ->
					shops[index].placeBehind(shops[index + 1])
				btnFrames[index].x = 540
		
			else if likeIt[index] is "true"
				shops[index].animate
					backgroundColor: "white"
					width: 630
					x: 60
					y: index * 1100 + 60
				scrollBgs[index].animate
					properties:
						y: 1334
				frames[index].animate
					properties:
						width: 630
						height: 630
				sales[index].animate
					width: 630
				sales[index].animate("default")
				data.length = null
				menuBtn.animate
					properties:
						x: 590
				closeBtns[index].animate("out")
				shopScrolls[index].animate
					properties:
						y: 1334
	# 			shops[0].placeBehind(shops[index - 1])
				Utils.delay 0.5, ->
					shops[index].placeBehind(shops[index + 1])
				likeds[index].x = 560

		
		else if index >= 1 && index < 5 
			if likeIt[index] is "false"
				shops[index].animate
					backgroundColor: "white"
					width: 630
					x: 60
					y: index * 1100 + 60
					
				scrollBgs[index].animate
					properties:
						y: 1334
				frames[index].animate
					properties:
						width: 630
						height: 630
				sales[index].animate
					width: 630
				sales[index].animate("default")
				sales[index].scale = data[0]
				sales[index].blur = data[1]
				data.length = null
				menuBtn.animate
					properties:
						x: 590
				closeBtns[index].animate("out")
				shopScrolls[index].animate
					properties:
						y: 1334
				
				btnFrames[index].x = 540
	
				Utils.delay 0.5, ->
					shops[index].placeBehind(shops[index - 1])
					shops[index].placeBehind(shops[index + 1])
		
			else if likeIt[index] is "true"
				shops[index].animate
					backgroundColor: "white"
					width: 630
					x: 60
	# 				y: news.content.y + ( index  * 1100 ) + 60 + Math.abs(news.content.y)
					y: index * 1100 + 60
				
				scrollBgs[index].animate
					properties:
						y: 1334
				frames[index].animate
					properties:
						width: 630
						height: 630
				sales[index].animate
					width: 630
				sales[index].animate("default")
				sales[index].scale = data[0]
				sales[index].blur = data[1]
				data.length = null
				menuBtn.animate
					properties:
						x: 590
				closeBtns[index].animate("out")
				shopScrolls[index].animate
					properties:
						y: 1334
				
				Utils.delay 0.5, ->
					shops[index].placeBehind(shops[index - 1])
					shops[index].placeBehind(shops[index + 1])
				likeds[index].x = 540
			
		else if index == 5 
			if likeIt[index] is "false"
				shops[index].animate
					backgroundColor: "white"
					width: 630
					x: 60
					y: index * 1100 + 60
					
				scrollBgs[index].animate
					properties:
						y: 1334
				frames[index].animate
					properties:
						width: 630
						height: 630
				sales[index].animate
					width: 630
				sales[index].animate("default")
				sales[index].scale = data[0]
				sales[index].blur = data[1]
				data.length = null
				menuBtn.animate
					properties:
						x: 590
				closeBtns[index].animate("out")
				shopScrolls[index].animate
					properties:
						y: 1334
				btnFrames[index].x = 540
			
			else if likeIt[index] is "true"
				shops[index].animate
					backgroundColor: "white"
					width: 630
					x: 60
					y: index * 1100 + 60
					
				scrollBgs[index].animate
					properties:
						y: 1334
					
				frames[index].animate
					properties:
						width: 630
						height: 630
					
				sales[index].animate
					width: 630
				sales[index].animate("default")
				sales[index].scale = data[0]
				sales[index].blur = data[1]
				data.length = null
				menuBtn.animate
					properties:
						x: 590
				
				closeBtns[index].animate("out")
				shopScrolls[index].animate
					properties:
						y: 1334
				
				likeds[index].x = 540
				Utils.delay 0.5, ->
					shops[index].placeBehind(shops[index - 1])



################### 쇼핑 정보 #####################
# shopInfo = new Layer
# 	width: Screen.width
# 	height: Screen.height - statusBar.height
# 	y: statusBar.maxY
# 	backgroundColor: "white"
# 	directionLock: true

infoPage = new PageComponent
# 	parent: shopInfo
	width: Screen.width
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	scrollVertical: false
	directionLock: true
	backgroundColor: "white"

# infoScroll = new ScrollComponent
# 	parent: infoPage.content
# 	width: Screen.width
# 	height: Screen.height - statusBar.height
# 	scrollHorizontal: false
# # 		directionLock: true
# 	propagateEvents: false
# infoScroll.contentInset =
# 	bottom: 140

items = []
views = []
infoScrolls = []
for p in [0...4]
	tabView = new Layer
		parent: infoPage.content
		width: Screen.width
		height: Screen.height - statusBar.height
		x: p * 750
		name: "tabView#{p + 1}"
		backgroundColor: "white"
	views.push tabView

	infoScroll = new ScrollComponent
		parent: tabView
		width: Screen.width
		height: Screen.height - statusBar.height
		scrollHorizontal: false
		directionLock: true
# 		propagateEvents: false
	infoScroll.idx = p + 1
	infoScrolls.push infoScroll
	infoScroll.contentInset =
		bottom: 140
	for infoScroll in infoScrolls
		if infoScroll.idx is 4
			infoScroll.destroy()
	for s in [0...8]
		item = new Layer
			parent: infoScroll.content
			y: 360 + s * 680
			width: Screen.width
			height: 680
	# 		backgroundColor: Utils.randomColor()
			backgroundColor: ""
		items.push item
		item.idx = s + 1
		itemImg = new Layer
			parent: item
			x: 40
			width: 710
			height: 355
			image: "images/info_#{s + 1}.png"
		
		tag3 = new Layer
			parent: item
			html: "쇼핑뉴스"
			style:
				fontSize: "18pt"
				textAlign: "center"
				padding: "2px"
			x: 40
			y: itemImg.height + 24
			backgroundColor: "#1a1a1a"
			height: 30
			width: 96
		
		tag4 = new Layer
			parent: item
			html: "본점"
			style:
				fontSize: "19pt"
				textAlign: "center"
				padding: "2px"
			x: tag3.maxX
			y: itemImg.height + 24
			backgroundColor: "#999999"
			height: 30
			width: 54
		
		like = new Layer
			parent: item
			width: 50
			height: 50
			x: item.maxX - 90
			y: itemImg.height + 24
			image: "images/btn_like_n.png"
			backgroundColor: ""
		infoSubject = ["여성커리어<br>패션전","매드고트<br>캐시미어 팝업스토어","팀버랜드<br>팝업스토어","버버리<br>마크다운 스페셜","쿠에른<br>팝업스토어","스코노 인기상품전", "BNX 겨울<br>인기상품 특집", "비이커 팝업스토어"]
		
		infoTitle = new Layer
			parent: item
			html: "#{infoSubject[s]}"
			backgroundColor: ""
			style: 
				fontSize: "30pt"
				color: "#1a1a1a"
				lineHeight: "1.2"
			width: 500
			x: 40
			y: tag3.maxY + 14
		
		infoPeriod = ["2016.11.28 (월) - 2016.11.30 (수) ㅣ 신관 5F 이벤트홀", "2016.11.24 (목) - 2016.11.30 (수) ㅣ 본관 1F 행사장", "2016.11.17 (목) 부터 ㅣ 신관 4F 행사장", "2016.11.17 (목) - 2017.01.31 (화) ㅣ 신관 2F 본매장", "2016.11.24 (목) - 2016.12.04 (일) ㅣ 신관 3F 행사장", "2016.11.24 (목) - 2016.11.30 (수) ㅣ 신관 4F E/C옆", "2016.11.24 (목) - 2016.11.30 (수) ㅣ 신관 4F E/C옆", "2016.11.24 (목) - 2016.12.07 (수) ㅣ 신관 3F 본매장"]
		period = new Layer
			parent: item
			html: "#{infoPeriod[s]}"
			backgroundColor: ""
			style: 
				fontSize: "19pt"
				color: "#999999"
			x: 40
			y: itemImg.height + 24 + tag3.height + 14 + 112
			width: item.width - 80


theme = new ScrollComponent
	parent: views[3]
	width: Screen.width
	height: Screen.height - statusBar.height
	scrollHorizontal: false
	directionLock: true
infoScrolls.push theme
theme.contentInset =
	bottom: 140

refreshBG = new Layer
	parent: theme.content
	width: Screen.width
	height: 320
	backgroundColor: "#1a1a1a"
	image: "images/landscape.jpg"

foreground = new Layer
	parent: refreshBG
	width: Screen.width
	height: 320
	backgroundColor: ""
	image: "images/foreground.png"
	y: 50

msg_1 = new Layer
	parent: refreshBG
	width: 324
	height: 42
	midX: refreshBG.midX
	y: 92
	image: "images/msg_1.png"
msg_2 = new Layer
	parent: refreshBG
	width: 324
	height: 68
	midX: refreshBG.midX
	y: msg_1.maxY + 13
	image: "images/msg_2.png"
msg_3 = new Layer
	parent: refreshBG
	width: 324
	height: 40
	midX: refreshBG.midX
	y: msg_2.maxY + 14
	image: "images/msg_3.png"

msg_1.states =
	hidden:
		y: 102
		opacity: 0
msg_1.stateSwitch("hidden")

msg_2.states =
	hidden:
		y: msg_1.maxY + 33
		opacity: 0
msg_2.stateSwitch("hidden")

msg_3.states =
	hidden:
		y: msg_2.maxY + 34
		opacity: 0
msg_3.stateSwitch("hidden")



themeItems = []
themeImgs = []
giftImgs = []
detailTitles = []
themeLocations = []
themePrices = []
giftTitles = ["사카이","시버거 by 쏘솔트","더캐시미어","메종마르지엘라","알렉산더왕","MSGM by 슈컬렉션","아메모이 by 마이분"]
locations = ["옐로우 니트 탑(본관 4층)","레드 페도라(본관 1층)", "장갑(신관 3층)", "세줄 반지(신관 3층)", "미니백(신관 3층)", "러플 장식 구두(본관 2층)", "블루 토트백(신관 3층)"]
prices = ["1,030,000원", "198,000원","95,000원","490,000원", "693,000원", "850,000원", "1,190,000원"]

for s in [0...4]
	item = new Layer
		parent: theme.content
		y: 360 + s * 680
		width: Screen.width
		height: 692
# 		backgroundColor: Utils.randomColor()
		backgroundColor: ""
	themeItems.push item
	item.idx = s + 1
	
	itemFrame = new Layer
		parent: item
		x: 40
		width: 710
		height: 355
		clip: true
		
	themeImg = new Layer
			parent: itemFrame
			y: - 180
			width: 750
			height: 750
			image: "images/theme_#{s + 1}.png"
# 			scale: 0.8
	themeImgs.push themeImg
	
	tag3 = new Layer
		parent: item
		html: "테마"
		style:
			fontSize: "18pt"
			textAlign: "center"
			padding: "2px"
		x: 40
		y: itemFrame.height + 24
		backgroundColor: "#1a1a1a"
		height: 30
		width: 54
	
	tag4 = new Layer
		parent: item
		html: "본점"
		style:
			fontSize: "19pt"
			textAlign: "center"
			padding: "2px"
		x: tag3.maxX
		y: itemFrame.height + 24
		backgroundColor: "#999999"
		height: 30
		width: 54
	
	like = new Layer
		parent: item
		width: 50
		height: 50
		x: item.maxX - 90
		y: itemFrame.height + 24
		image: "images/btn_like_n.png"
		backgroundColor: ""
		
	infoSubject = ["GIFT FOR<br>WOMEN","GIFT FOR<br>MEN","GIFT FOR<br>KIDS","FOOD FOR<br>PARTY"]
	
	infoTitle = new Layer
		parent: item
		html: "#{infoSubject[s]}"
		backgroundColor: ""
		style: 
			fontSize: "30pt"
			color: "#1a1a1a"
			lineHeight: "1.2"
		width: 500
		x: 40
		y: tag3.maxY + 14
	
	infoPeriod = ["2016.12.15 (목) - 2016.12.31 (토) ㅣ 본관/신관 각층 본매장", "2016.12.15 (목) - 2016.12.31 (토) ㅣ 본관/신관 각층 본매장", "2016.12.15 (목) - 2016.12.31 (토) ㅣ 신관 각 층 본매장", "2016.12.15 (목) - 2016.12.31 (토) ㅣ 신관 B1F 각 본매장"]
	period = new Layer
		parent: item
		html: "#{infoPeriod[s]}"
		backgroundColor: ""
		style: 
			fontSize: "19pt"
			color: "#999999"
		x: 40
		y: itemFrame.height + 24 + tag3.height + 14 + 112
		width: item.width - 80
	themeImg.states =
		topItem:
			y: - 120
			
themeImgs[0].stateSwitch("topItem")

theme.content.on "change:y", ->
# 	print theme.content
	foreground.y  = Utils.modulate(theme.content.y,[40, 320],[50, 4], true)
	themeImgs.forEach (item, index) ->
		item.y = Utils.modulate(theme.content.y,[-680 * (index - 1), (-680 * index) - 680], [-180, - 60], true)
	
	theme.content.on Events.DragEnd, ->
		if theme.content.y >= 310
			this.animate 
				properties: 
					y: 300
				curve: "spring(600,50,0)"
			msg_1.animate("default")
			msg_1.animationOptions =
				curve:"ease"
				time: 1
				delay: .6
			msg_2.animate("default")
			msg_2.animationOptions =
				curve:"ease"
				time: 1
				delay: 1
			msg_3.animate("default")
			msg_3.animationOptions =
				curve:"ease"
				time: 1
				delay: 1.4
	# 			msg_3.on Events.AnimationEnd, ->
			Utils.delay 2.6, ->
				theme.content.animate 
					properties: 
						y: 0
					curve:"ease"
					time: 0.1
	# 					delay: 1
	# 				theme.content.on Events.ScrollAnimationDidEnd, ->
				msg_1.stateSwitch("hidden",{instant:true})
				msg_1.animationOptions =
					curve:"ease"
					delay: 0
				msg_2.stateSwitch("hidden",{instant:true})
				msg_2.animationOptions =
					curve:"ease"
					delay: 0
				msg_3.stateSwitch("hidden",{instant:true})
				msg_3.animationOptions =
					curve:"ease"
					delay: 0
		else if theme.content.y < 310 && theme.content.y >= 0
			theme.content.animate 
				properties: 
					y: 0
				curve:"ease"
				time: 0.3
	# 					delay: 1
	# 				theme.content.on Events.ScrollAnimationDidEnd, ->
# 			msg_1.stateSwitch("hidden")
# 			msg_2.stateSwitch("hidden")
# 			msg_3.stateSwitch("hidden")
# for item in themeItems
# 	item.on Events.Click, ->
# 		print this.y
# for themeImg in themeImgs
# 	themeImg.on Events.Click, ->
# 		print this.y




label = new Layer
	parent: infoPage
	width: Screen.width
	height: 360
	backgroundColor: "white"
	
shopTitle = new Layer
	parent: label
	x: 40
	y: 61
	width: 249
	height: 68
	image: "images/shop_info_title.jpg"
	backgroundColor: ""
# 	html: "쇼핑정보"
# 	style: 
# 		fontSize: "50pt"
# 		weight: "900"
# 		color: "#1a1a1a"
# 		fontFamily: "Sandoll MyeongjoNeo1"
tabs = []
tabTitle = ["쇼핑뉴스", "특가/쿠폰", "이벤트", "테마" ]
tabBar = new Layer
	parent: label
	width: Screen.width
	height: 106
	y: 254
	backgroundColor: "white"
	opacity: 0.95

for t in [0...4]
# 	tab = new TextLayer
# 		parent: tabBar
# 	# 	setup: true
# 		autoSize: true
# 		text: tabTitle[t]
# 		fontSize: 32
# 		fontWeight: 600
# 		color: "#999999"
# 		fontStyle: "bold"
# 		y: 32
	tab = new Layer
		parent: tabBar
		html: "#{tabTitle[t]}"
		width: 120
		height: 40
		backgroundColor: ""
		style:
			fontSize: "24pt"
			fontWeight: "bold"
			color: "#999999"
		y: 36
	tabs.push tab
	
	tabs.forEach (item, index) ->
		if index is 0
			item.x = 40
		else if index > 0 
# 			item.x = tabs[index - 1].x + tabs[index - 1].width + 51
			item.x = tabs[index - 1].maxX + 51
	
currentBar = new Layer
	parent: tabBar
	width: tabs[0].width
	x: 40
	y: tabBar.height - 4
	height: 4
	backgroundColor: "#E30031"

for tab in tabs
	tab.states = 
		currentView:
			color: "#1a1a1a"
		otherView:
			color: "#999999"
tabs[0].stateSwitch("currentView")


bottomNavi = new Layer
	parent: infoPage
	width: Screen.width
	height: 100
	backgroundColor: "#555555"
	y: 1194

infoBack = new Layer
	parent: bottomNavi
	width: 98
	height: 100
	x: 10
	backgroundColor: ""
	image: "images/bottom_navi_back.png"
	
floorBtn = new Layer
	parent: infoPage
	size: 100
	x: infoPage.maxX - 140
	y: infoPage.height - bottomNavi.height - 140
	borderRadius: 50
	backgroundColor: ""
	image: "images/btn_sorting_n.png"

###### 쇼핑 정보  > 테마 > 상세 화면 레이어 #####
giftDetail = new ScrollComponent
	width: Screen.width
	height: Screen.height
	scrollHorizontal: false
	backgroundColor: "white"
giftDetail.contentInset =
	bottom: 100
	
mainPic = new Layer
	parent: giftDetail.content
	size: 750
	image: "images/theme_1.png"
	y: 40
	
giftInfo = new Layer
	parent: giftDetail.content
	width: Screen.width
	height: 382
	image: "images/giftInfo.png"
	y: mainPic.maxY
	
detailNavi = new Layer
	parent: giftDetail
	width: giftDetail.width
	height: 100
	y: 1234
	image: "images/detail_navi.png"

detailBack = new Layer
	parent: detailNavi
	width: 98
	height: 100
	x: 10
	backgroundColor: ""
	
for g in [0...7]
	gift = new Layer
		parent: giftDetail.content
		width: Screen.width - 40
		height: 768
		x: 40
		y: mainPic.height + giftInfo.height + g * 768
		backgroundColor: "white"
		
	giftPic = new Layer
		parent: gift
		width: gift.width
		height: 469
		image: "images/#{g + 1}.png"
		
# 	half = new Layer
# 		parent: gift
# 		width: gift.width / 2
# 		height: gift.height - giftPic.height
# 		y: giftPic.maxY
# 		backgroundColor: "grey"
# 		opacity: 0.1
		
	detailTitle = new TextLayer
		parent: gift
# 		setup: true
		autoSizeHeight: true
		text: giftTitles[g]
		width: 400
		fontSize: 30
		fontWeight: 600
		color: "#1a1a1a"
		fontStyle: "bold"
		midX: gift.width / 2
		y: giftPic.height + 40
		textAlign: "center"
	detailTitles.push detailTitle
		
	location = new TextLayer
		parent: gift
# 		setup: true
		autoSizeHeight: true
		text: locations[g]
		width: 400
		fontSize: 30
# 		fontWeight: 600
		color: "#1a1a1a"
# 		fontStyle: "bold"
		midX: gift.width / 2
		y: detailTitle.maxY + 16
		textAlign: "center"
	themeLocations.push location
		
	price = new TextLayer
		parent: gift
# 		setup: true
		autoSizeHeight: true
		text: prices[g]
		width: 400
		fontSize: 30
		fontWeight: 900
		color: "#1a1a1a"
		fontStyle: "italic"
		midX: gift.width / 2
		y: location.maxY + 20
		textAlign: "center"
	themePrices.push price
###### 쇼핑 정보  > 테마 > 상세 화면 레이어 #####


###### 쇼핑 정보  > 테마 > 상세 화면 states #####

giftDetail.states =
	hidden:
		x: 750
		
detailTitle.states =
	ready:
		midX: gift.width / 2 + gift.width / 2 / 2
location.states =
	ready:
		midX: gift.width / 2 + gift.width / 2 / 2
price.states =
	ready:
		midX: gift.width / 2 + gift.width / 2 / 2
		
giftDetail.stateSwitch("hidden")
###### 쇼핑 정보  > 테마 > 상세 화면 states #####


###### 쇼핑 정보  > 테마 > 상세 화면 Events #####
themeItems[0].on Events.Click, ->
	giftDetail.stateCycle("default")
detailBack.on Events.Click, ->
	giftDetail.stateCycle("hidden")


###### 쇼핑 정보  > 테마 > 상세 화면 Events #####

##환경설정##
# settings = new ScrollComponent
# 	width: Screen.width
# 	height: Screen.height - statusBar.height
# 	y: statusBar.maxY
# 	scrollHorizontal: false
# # 	backgroundColor: Utils.randomColor()
# 
# label_s = new Layer
# 	parent: settings.content
# 	width: settings.width
# 	backgroundColor: "white"
# 
# setList = new Layer
# 	parent: settings.content
# 	width: settings.width
# 	y: label_s.maxY
# 
# setNavi = new Layer
# 	parent: settings
# 	width: settings.width
# 	y: settings.height - 100


infoPage.states =
	hiddenInfo:
		x: 750
	pushLeft:
		x: -200
	pushRight:
		x: 0

# infoBtn.states =
# 	prsd:
# 		opacity: 0.5
for menuList in menuLists
	menuList.states =
		prsd:
			backgroundColor: "rgba(218,33,40,.1)"

setBtn.states =
	prsd:
		opacity: 0.5

infoPage.stateSwitch("hiddenInfo")

menuLists.forEach (item, index) ->
	item.on Events.TouchStart, ->
		item.stateSwitch("prsd")
	item.on Events.TouchEnd, ->
		item.stateSwitch("default")
		if index is 0
			infoPage.animate("default")
			view.animate("default")

# menuLists[0].onTouchEnd (event, layer) ->
# 	menuList.stateCycle()
# 	infoPage.animate("default")
# 	view.animate("default")

setBtn.onTouchStart (event, layer) ->
	setBtn.stateCycle()
	


setBtn.onTouchEnd (event, layer) ->
	setBtn.stateCycle()
infoBack.on Events.Click, ->
	infoPage.animate("hiddenInfo")
	view.animate("open")
	menuList.animate("default")
	view.animate("open")

infoDetail = new ScrollComponent
	width: Screen.width
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	scrollHorizontal: false
	backgroundColor: "white"

infoDetail.contentInset =
	bottom: 100
detailFrame = new Layer
	width: Screen.width
	height: Screen.width
	parent: infoDetail.content
		
detailImg = new Layer
	parent: detailFrame
	width: infoDetail.width
	height: infoDetail.width
	image: "images/detail.png"
detailImg.scale = 1.1

detailInfo = new Layer
	parent: infoDetail.content
	y: detailImg.maxY
	width: infoDetail.width
	height: 968
	image: "images/detail_info.png"

detailNavi = new Layer
	parent: infoDetail
	width: infoDetail.width
	height: 100
	y: 1194
	image: "images/detail_navi.png"

detailBack = new Layer
	parent: detailNavi
	width: 98
	height: 100
	x: 10
	backgroundColor: ""

infoDetail.states = 
	right:
		x:750
	left:
		x:0
infoDetail.stateSwitch("right")

for item in items
	if item.idx == 1
		item.on Events.Click, ->
# 			print this.idx
			infoPage.animate("pushLeft")
			infoDetail.animate("left")
	detailBack.on Events.Click, ->
		infoDetail.animate("right")
		infoPage.animate("pushRight")


########### splash layers ############
splash_bg = new Layer
	width: 1181
	height: Screen.height - statusBar.height
	y: statusBar.maxY
	x: 0
	image: "images/splash_model.jpg"
	scale: 1
	
# splash_tree = new Layer
# 	width: Screen.width
# 	height: Screen.height - statusBar.height
# 	y: statusBar.maxY
# 	image: "images/splash_tree.png"
# 	
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

# logo = new Layer
# 	width: 510
# 	height: 478
# 	image: "images/leaves_all.png"
# 	scale: 0.3
# logo.center()

logoFrame = new Layer
	width: 510
	height: 478
# 	image: "images/leaves_all.png" 
	backgroundColor: ""
	scale: 0.2
	y: 622
	midX: Screen.midX
# logoFrame.center()	
leaves = []

leaf_1 = new Layer
	parent: logoFrame
	width:120
	height:211
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

########### splash layers ############

### snowing events ###
# deleteObjects = (layer, array) ->
# 		pos = array.indexOf(layer)
# 		array.splice(pos, 1)
# 		layer.destroy()
# 
# circles = []
# snow = do ->
# 	animateBgCircles = ->
# 		for rowIndex in [0...3]
# 			for colIndex in [0...5]
# 				circle = new Layer 
# 					width: 100
# 					height: 100
# 					borderRadius: 50
# 					backgroundColor: "white"
# 					scale: Utils.randomNumber(.2,1) 
# 					x: colIndex * (200 + Screen.width / 5 - 200) + Screen.width / 5 - 200
# 					y: -150
# 					brightness: 150,
# 					blur: Utils.randomNumber(10, 40)
# 					opacity: Utils.randomNumber(.3, .8)
# 					parent: splash_title
# 					clip: false
# 				circles.push circle
# 				circle.animate 
# 					curve: "linear"
# 					time: Utils.randomNumber(5, 20)
# 					delay: Utils.randomNumber(.1, 20)
# 					properties: 
# 						y: Screen.height + 200
# 				circle.on "change:y", ->
# 					if @y > Screen.height
# 						deleteObjects(@, circles) if @y > Screen.height
# # 						doAgain() if circles.length is 10
# # 
# # 		doAgain = Utils.throttle 1, -> animateBgCircles()
# snow()


########### splash states ############
splash_bg.states =
	trans:
		opacity: 0
	out:
		y: - 1334
# splash_tree.states =
# 	trans:
# 		opacity: 0
# 	out:
# 		x: - 750
splash_title.states =
	trans:
		opacity: 0
	out:
		x: 750
dimLoad.states =
	active:
		opacity: 0.7

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
########### splash states ############

splash_bg.animate
	properties:
		x: -431
	time: 15
	curve: "linear"

dimLoad.onClick ->
	Utils.delay 1, ->
	dimLoad.stateSwitch("active")
	
	leaves.forEach (item, index) ->
		item.animationOptions =
			curve: "spring-dho(800, 200, 10, 0.01)"
		Utils.delay 1, ->
		timeFactor = 0.1
		Utils.delay index * timeFactor, -> 
			item.stateCycle("default")
	# 	Utils.delay 8, ->
		Utils.delay (index + 9) * (timeFactor*1.2), -> 
			item.stateCycle("disapp")
		item.stateSwitch("out")
		Utils.delay (index + 19) * (timeFactor), -> 
			dimLoad.animate
				properties:
					opacity: 0
			splash_bg.stateSwitch("trans")
# 			splash_tree.stateSwitch("trans")
			splash_title.stateSwitch("trans")
			splash_title.stateSwitch("out", false)
		Utils.delay (index + 22) * (timeFactor), -> 
			dimLoad.animate
				properties:
					y: - 1334
			
			splash_bg.stateCycle("out")
# 			splash_tree.stateCycle("out")


		
# 			flowers.forEach (item, index) ->
# 				splash_bg.on Events.AnimationEnd, ->
# 					item.animate
# 						properties:
# 							y: card.height + 300
# 						curve: "linear"
# 						time: 10
# 						delay: index * .1
# 						item.on Events.AnimationEnd, ->
# 							item.animate("default")
# 							item.animationOptions =
# 								time: index * .5
	

# 	circles.forEach (item)->
# 		item.animateStop()
# 		item.destroy()



# accXraw = 0
# accYraw = 0
# 
# accXsmooth = 0
# accYsmooth = 0
# factor = 0.7
# 
# window.addEventListener ("devicemotion"), (event) ->
# 	# raw accelerometer data
# 	accXraw = event.accelerationIncludingGravity.x
# 	accYraw = event.accelerationIncludingGravity.y * -1
# 
# 	accXsmooth = factor * accXsmooth + (1 - factor) * accXraw
# 	accYsmooth = factor * accYsmooth + (1 - factor) * accYraw
# 
# 	detailImg.x = accXsmooth * -8 + 10
# 	detailImg.y = accYsmooth * -6 + 20
# 	splash_bg.x = accXsmooth * -8 + 10
# 	splash_bg.y = accYsmooth * -6 + 20
# 	splash_tree.x = accXsmooth * -8 + 10
# 	splash_tree.y = accYsmooth * -6 + 100

statusBar.bringToFront()
# 	splash_title.x = accXraw * 5;
# 	splash_title.y = accYraw * 5;


# Events
# 스크롤 끝난 시점 이벤트 
# 페이징 시점에 하이라이트 바 움직이기
# 페이지 현재 페이지 바뀌는 시점에 아이콘, 서치바 바뀌기 

for infoScroll in infoScrolls
# 	infoScroll.content.on "change:y" , ->
# 		print this.y
	infoScroll.on Events.ScrollEnd, (event, layer) ->
# 		print event.velocity.y, Math.abs(event.velocity.y)
		if Math.abs(event.velocity.y) > 2
			yVelocity = event.velocity.y
			if yVelocity > 0 
				label.animate
					properties:
						y: 0
			else
				label.animate
					properties:
						y: - 257
label_loca = []
infoPage.on "change:currentPage", ->
	pageIdx = this.horizontalPageIndex(this.currentPage)
	for i in [0...tabs.length]
		if i == pageIdx
			tabs[i].stateSwitch ("currentView")
# 			menuIcons[i].stateSwitch ("on")
		else
			tabs[i].stateSwitch ("otherView")
# 			menuIcons[i].stateSwitch ("off")
# 	label_loca.push label.y
# infoScrolls.forEach (item, index)->
# 	infoScrolls[index].content.on "change:y", ->
# 		label.y = Utils.modulate(infoScrolls[index].content.y, [0,- 257], [0, -257], true)


infoPage.content.on "change:x" , ->
# 	print this.x
	xRange = [0, -2250]
	highlightBarXRange = [40, tabs[3].x]
	currentBar.x = Utils.modulate(this.x, xRange, highlightBarXRange, true)
# 	
tabs.forEach (item, index) ->
	item.on Events.Click, ->
		infoPage.snapToPage(views[index])
		



