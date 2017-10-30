cylinder = new Layer
	size: Screen.size
	originZ: 0
	z: 300
	rotationX: -20
# 	flat: true
	backgroundColor: ""
	
shadow = new Layer
	parent: cylinder
	backgroundColor: "olive"
	blur: 30
	width: 300
	height: 100
	opacity: .5
	rotationX: 90
	midX: Screen.midX
	y: 1/2 * Screen.height + 360
	
page = new PageComponent
	size: Screen.size
	scrollVertical: false
page.style.background = "linear-gradient(to bottom, #22bb9f 0%,#59d86e 100%)"

for v in [0...4]
	view = new Layer
		size: Screen.size
		x: v * Screen.width
		parent: page.content
		backgroundColor: ""
	shoulderR = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationY: v * 90
		x: 180
		y: 700
		backgroundColor: "white"
	armR = new Layer
		parent: cylinder
		width: 25
		height: 160
		originZ: -10
		z: 10
		rotationY: v * 90
		x: 190
		y: 740
		backgroundColor: "#fff359"
	handR = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationY: v * 90
		x: 180
		y: 860
		backgroundColor: "#fff359"
	shoulderL = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationY: v * 90
		x: 520
		y: 700
		backgroundColor: "white"
	armL = new Layer
		parent: cylinder
		width: 25
		height: 200
		originZ: -10
		z: 10
		rotationY: v * 90
		x: 530
		y: 700
		backgroundColor: "#fff359"
	handR = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationY: v * 90
		x: 520
		y: 860
		backgroundColor: "#fff359"
	legR = new Layer
		parent: cylinder
		width: 25
		height: 100
		originZ: -10
		z: 10
		rotationY: v * 90
		x: 300
		y: 860
		backgroundColor: "#fff359"
	soxR = new Layer
		parent: cylinder
		width: 25
		height: 60
		originZ: -10
		z: 10
		rotationY: v * 90
		x: 300
		y: 960
		backgroundColor: "#white"
	legL = new Layer
		parent: cylinder
		width: 25
		height: 160
		originZ: -10
		z: 10
		rotationY: v * 90
		x: 430
		y: 800
		backgroundColor: "#fff359"
	soxL = new Layer
		parent: cylinder
		width: 25
		height: 60
		originZ: -10
		z: 10
		rotationY: v * 90
		x: 430
		y: 960
		backgroundColor: "#white"
	footR = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationY: v * 90
		x: 290
		y: 1000
		backgroundColor: "black"
	toeR = new Layer
		parent: cylinder
		width: 60
		height: 60
		originZ: -30
		z: 75
		rotationY: v * 90
		x: 285
		y: 990
		backgroundColor: "black"
	footL = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationY: v * 90
		x: 420
		y: 1000
		backgroundColor: "black"
	toeL = new Layer
		parent: cylinder
		width: 60
		height: 60
		originZ: -30
		z: 75
		rotationY: v * 90
		x: 415
		y: 990
		backgroundColor: "black"
fnbs = []
pantsfnbs = []
for s in [0...2]
	fnb = new Layer
		parent: cylinder
		height: 400
		width: 300
		backgroundColor: "#fff359"
		originZ: -50
		rotationY: s * 180
		backfaceVisible: true
		clip: true
		z: 50
	fnbs.push fnb
	
	tnb = new Layer
		parent: cylinder
		width: 300
		height: 100
		backgroundColor: "#fff359"
		originZ: -200
		rotationX: (s + 1) * 90 + (s * 90)
		backfaceVisible: true
		clip: true
		z: 200
		midX: Screen.midX
		y: 618

	lnr = new Layer
		parent: cylinder
		height: 400
		width: 100
		backgroundColor: "rgba(188,223,117,1)"
		originZ: -150
		rotationY: 90 + s * 180
		backfaceVisible: true
		clip: true
		z: 150

	skin = new Layer
		parent: fnbs[0]
		width: 1600
		height: 1200
		image: "images/face.jpg"
		y: -300
		x: -844

	shoulderTnBR = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationX: (s + 1) * 90 + (s * 90)
		x: 180
		y: 700
		backgroundColor: "white"

	shoulderTnBL = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationX: (s + 1) * 90 + (s * 90)
		x: 520
		y: 700
		backgroundColor: "white"

	pantsf = new Layer
		parent: fnbs[0]
		width: 300
		height: 100
		maxY: fnb.maxY
		backgroundColor: "rgba(222,145,61,1)"
		image: "images/pants_0.png"
	pantsB = new Layer
		parent: fnb
		width: 300
		height: 100
		maxY: fnb.maxY
		backgroundColor: "rgba(222,145,61,1)"
		image: "images/pants_1.png"

	pantsfnbs.push pantsf
	pantslnr = new Layer
		parent: lnr
		width: 100
		height: 100
		backgroundColor: "rgba(149,70,21,1)"
		maxY: fnb.maxY
		image: "images/pants_side.png"
	footRTnB = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationX: (s + 1) * 90 + (s * 90)
		x: 290
		y: 1000
		backgroundColor: "black"
	toeRTnB = new Layer
		parent: cylinder
		width: 60
		height: 60
		originZ: -30
		z: 75
		rotationX: (s + 1) * 90 + (s * 90)
		x: 285
		y: 990
		backgroundColor: "black"
	footLTnB = new Layer
		parent: cylinder
		width: 50
		height: 50
		originZ: -25
		z: 25
		rotationX: (s + 1) * 90 + (s * 90)
		x: 420
		y: 1000
		backgroundColor: "black"
	toeLTnB = new Layer
		parent: cylinder
		width: 60
		height: 60
		originZ: -30
		z: 75
		rotationX: (s + 1) * 90 + (s * 90)
		x: 415
		y: 990
		backgroundColor: "black"
	fnb.center()
	lnr.center()

page.content.on "change:x", ->
	cylinder.rotationY = Utils.modulate(page.content.x, [0, -2250], [0, -270])

