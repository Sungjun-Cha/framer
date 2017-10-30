Framer.Defaults.Animation =
	time: 0.2

video = new VideoLayer
	width: 750
	height: 1334
	video: "baking_edtd_.mp4"
	scale: 1.6
video.center()
# video.player.playbackRate = .8
video.player.loop = true
video.player.play()

gradi = new Gradient
	start: "black"
	end:  "rgba(0,0,0,.1)"

dim = new Layer
	width: Screen.width
	height: Screen.height
# 	backgroundColor: "black"
	gradient: gradi
	opacity: .8

title = new TextLayer
	text: "32"
	fontFamily: "helvetica neue"
	fontWeight: 100
	color: "white"
	fontSize: 96
	x: 36
	y: 24
	opacity: .9
	
deg = new TextLayer
	text: "°"
	fontSize: 64
	fontFamily: "helvetica neue"
	fontWeight: 200
	color: "white"
	x: 144
	y: 24

sent = new TextLayer
	text: "the right moment to have \nfreshly baked bread"
	fontFamily: "helvetica neue"
	fontWeight: 300
	letterSpacing: 1
	color: "white"
	fontSize: 20
	width: 300
	x: 44
	minY: title.maxY - 12

btn = new Layer
	width: Screen.width * .84
	height: 60
	midX: Screen.midX
	maxY: Screen.height - 36
	borderRadius: 30
	borderColor: "white"
	borderWidth: 4
	opacity: .8
	backgroundColor: ""

join = new TextLayer
	text: "Seize the moment"
	fontFamily: "helvetica neue"
	fontWeight: 300
	color: "white"
	fontSize: 20
	parent: btn
	textTransform: "uppercase"
	size: btn.size
	y: 16
	textAlign: "center"
	letterSpacing: 2

btn.states.tap =
	opacity: 1
	backgroundColor: "white"

join.states.tap =
	color: "black"

btn.on Events.TouchStart, ->
	btn.stateCycle("tap")
	join.stateCycle("tap")


btn.on Events.TouchEnd, ->
	btn.stateCycle("default")
	join.stateCycle("default")


blank = new Animation deg,
	opacity: 0.1
	options:
		time: 2

blankBack = blank.reverse()

blank.on Events.AnimationEnd, blankBack.start
blankBack.on Events.AnimationEnd, blank.start
 
blank.start()


