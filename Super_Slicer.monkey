'Enable Strict Mode
Strict

'Import Frameworks
Import mojo
Import inc.functions
Import inc.polyCommands
Import autofit
Import fps

'Apply Target Specific Config
#If TARGET = "android"
	#ANDROID_SCREEN_ORIENTATION="unspecified"
#Endif

'Main Function
Function Main:Int()
	
	'Create new 'Game' instance
	New Game()
		
	'Return 0 for compatibilty
	Return 0
		
End Function

'Game Class
Class Game Extends App

	'Fields
	Field isTouching:Bool = False
	Field touchStartX:Float
	Field touchStartY:Float
	Field wasTouching:Bool = False
	Field isSliced:Bool
	Field slicedTimerStart:Int
	Field slicedTimer:Int
	Field slicedAlpha:Float
	Field slicedAlphaTimerStart:Int
	Field slicedAlphaTimer:Int
	Field slicedShape:Float[]
	Field slicedShapeComplex:List<tri>
	Field currentLevel:Int
	Field currentShape:currentShape
	Field shape1:shape1
	Field shape2:shape2
	Field lineList:List<line> = New List<line>
	Field ballList:List<ball> = New List<ball>
	
	'This method is run when the game is created
	Method OnCreate:Int()
		
		'Set Update Rate
		SetUpdateRate(60)
		
		'Create Virtual Resoultion
		SetVirtualDisplay(480, 800)
		
		'Set Touch Modes
		isTouching = False
		wasTouching = False
		
		'Slice Timer
		isSliced = False
		slicedTimerStart = Millisecs()
		slicedTimer = 700
		slicedAlphaTimer = 5
		
		'Create currentShape
		currentShape = New currentShape
		
		'Create shape1
		shape1 = New shape1
		
		'Create shape1
		shape2 = New shape2
		
		'Set current level
		currentLevel = 2
		If currentLevel = 1
			currentShape.setShape(shape1.shapeArray, shape1.complexShapeArray, shape1.solidLines, shape1.area, shape1.r, shape1.g, shape1.b)
			removeLines(lineList)
			addLines(shape1.shapeArray, lineList)
		Elseif currentLevel = 2
			currentShape.setShape(shape2.shapeArray, shape2.complexShapeArray, shape2.solidLines, shape2.area, shape2.r, shape2.g, shape2.b)
			removeLines(lineList)
			addLines(shape2.shapeArray, lineList)
		EndIf
		
		'Create Balls
		Local angle:Float = 0.0
		For Local i:Int = 0 To 0
			Local b:ball = New ball(153.0, 448.0, 10.0, 1.5, 0.0)
			ballList.AddLast(b)
		Next
		
		'Return 0 for compatibilty
		Return 0
		
	End Method
	
	'This method is run when the game is ready to update
	Method OnUpdate:Int()
	
		'If user is touching the screen
		If TouchDown()
		
			'If user was not previously touching the screen
			If isTouching = False
				touchStartX = VTouchX()
				touchStartY = VTouchY()
				isTouching = True
			Endif
		
		'If user is not touching the screen
		Else
			
			'Set wasTouching to true so we can check slice intersections later
			If isTouching = True
				isTouching = False
				wasTouching = True
			Endif
			
		Endif
		
		'Update Balls
		updateBall(ballList, lineList)
		
		'If we were touching, check to see if we need to Slice Shape
		If wasTouching = True
			If (getIntersections(currentShape.shapeArray, touchStartX, touchStartY) Mod 2) = 0
				currentShape.shapeArray = sliceShape(currentShape.shapeArray, currentShape.solidLines, touchStartX, touchStartY)
				currentShape.complexShapeArray = TriangulatePoly(currentShape.shapeArray)
				removeSolidLines(currentShape.shapeArray, currentShape.solidLines)
				removeLines(lineList)
				addLines(currentShape.shapeArray, lineList)
			Endif
			wasTouching = False
		Endif
		
		'Check to see if need to draw sliced shape
		If getSliced() = True
			slicedTimerStart = Millisecs()
			slicedAlphaTimerStart = Millisecs()
			isSliced = True
			slicedAlpha = 0.9
			slicedShape = getSlicedShape()
			slicedShapeComplex = getSlicedShapeComplex()
			setSliced(False)
		Endif
		
		'Fade sliced shape out
		If isSliced = True
			If Millisecs() > slicedAlphaTimerStart + slicedAlphaTimer
				slicedAlpha = (slicedAlpha - 0.02)
				If slicedAlpha <= 0.0 Then slicedAlpha = 0.0
				slicedAlphaTimerStart = Millisecs()
			Endif
		Endif
	
		'Return 0 for compatibilty
		Return 0
	
	End Method
	
	'This method is run when the game is ready to render
	Method OnRender:Int()
	
		'Update Virtual Display
		UpdateVirtualDisplay()
		
		'Clear Screen
		Cls(32, 32, 32)
		
		'Draw shape
		SetColor(164, 72, 164)
		#If TARGET = "android"
			DrawPolyEx(currentShape.complexShapeArray)
		#Else
			DrawPoly(currentShape.shapeArray)
		#EndIf
		SetColor(255, 255, 255)
		
		'Draw Solid Lines
		drawSolidLines(currentShape.solidLines)
		
		'Draw cut shape if necessary
		'If Millisecs() < (slicedTimerStart + slicedTimer)
		'	SetColor(164, 72, 164)
		'	SetAlpha(slicedAlpha)
		'	#If TARGET = "android"
		'		DrawPoly(getSlicedShape())
		'	#Else
		'		DrawPoly(getSlicedShape())
		'	#Endif
		'	SetAlpha(1.0)
		'	SetColor(255, 255, 255)
		'Else
		'	isSliced = False
		'Endif
		
		'Draw Slice Line
		If isTouching = True
		
			'Draw Slice Line
			DrawLine(touchStartX, touchStartY, VTouchX(), VTouchY())
			
		Endif
		
		'Draw Ball
		drawBalls(ballList)
		
		'DEBUG
		drawLineClass(lineList)
		'drawClosestPoints(ballList, lineList)
		'drawGreenPoint(ball)
		
		'Draw Text
		DrawText("FPS: " + getFPS(), 0, 0)
		DrawText("AREA: " + Int(shapeArea(currentShape.complexShapeArray)) + "/" + currentShape.area, 0, 15)
		DrawText("PERCENT: " + Int(Float(shapeArea(currentShape.complexShapeArray)/currentShape.area) * 100) + "%", 0, 30)
		DrawText("MOUSE: " + VTouchX() + ", " + VTouchY(), 0, 45)
		
		'Return 0 for compatibilty
		Return 0
		
	End Method
	
End Class


'Class currentShape
Class currentShape

	Field shapeArray:Float[]
	Field complexShapeArray:List<tri>
	Field solidLines:Float[]
	Field area:Int
	Field r:Int, g:Int, b:Int
	
	Method setShape:Void(sArray:Float[], cArray:List<tri>, sLines:Float[], a:Int, red:Int, green:Int, blue:Int)
		'Self.shapeArray.Resize(sArray.Length())
		Self.shapeArray = sArray
		Self.complexShapeArray = cArray
		Self.solidLines = sLines
		Self.area = a
		Self.r = red
		Self.g = green
		Self.b = blue
	End Method
	
End Class

'Class shape1
Class shape1

	'Shape 1 Fields
	Field shapeArray:Float[12]
	Field complexShapeArray:List<tri>
	Field solidLines:Float[4]
	Field area:Int
	Field r:Int, g:Int, b:Int 'Shape color
	
	'This method runs when a new Shape1 is created
	Method New()
	
		'Create shape points
		Self.shapeArray[0] = 268.0
		Self.shapeArray[1] = 230.0
		Self.shapeArray[2] = 405.0
		Self.shapeArray[3] = 336.0
		Self.shapeArray[4] = 295.0
		Self.shapeArray[5] = 558.0
		Self.shapeArray[6] = 88.0
		Self.shapeArray[7] = 510.0
		Self.shapeArray[8] = 63.0
		Self.shapeArray[9] = 320.0
		Self.shapeArray[10] = 156.0
		Self.shapeArray[11] = 218.0
		
		'Create Complex shape -Android/XNA
		Self.complexShapeArray = TriangulatePoly(Self.shapeArray)
		
		'Create Solid Lines
		Self.solidLines[0] = 268.0
		Self.solidLines[1] = 230.0
		Self.solidLines[2] = 405.0
		Self.solidLines[3] = 336.0
		
		
		'Get Initial Shape Area
		Self.area = Int(shapeArea(Self.complexShapeArray))
		
		'Set Shape Color
		Self.r = 164
		Self.g = 72
		Self.b = 164
		
	End Method
	
End Class


'Class shape2
Class shape2

	'Shape 1 Fields
	Field shapeArray:Float[20]
	Field complexShapeArray:List<tri>
	Field solidLines:Float[2]
	Field area:Int
	Field r:Int, g:Int, b:Int 'Shape color
	
	'This method runs when a new Shape1 is created
	Method New()

		'Create shape points
		Self.shapeArray[0] = 70.0
		Self.shapeArray[1] = 233.0
		Self.shapeArray[2] = 55.0
		Self.shapeArray[3] = 521.0
		Self.shapeArray[4] = 158.0
		Self.shapeArray[5] = 608.0
		Self.shapeArray[6] = 361.0
		Self.shapeArray[7] = 593.0
		Self.shapeArray[8] = 430.0
		Self.shapeArray[9] = 500.0
		Self.shapeArray[10] = 418.0
		Self.shapeArray[11] = 223.0
		Self.shapeArray[12] = 293.0
		Self.shapeArray[13] = 231.0
		Self.shapeArray[14] = 301.0
		Self.shapeArray[15] = 473.0
		Self.shapeArray[16] = 166.0
		Self.shapeArray[17] = 481.0
		Self.shapeArray[18] = 153.0
		Self.shapeArray[19] = 238.0

		
		'Create Complex shape -Android/XNA
		Self.complexShapeArray = TriangulatePoly(Self.shapeArray)
		
		'Create Solid Lines
		Self.solidLines[0] = 0.0
		Self.solidLines[1] = 0.0
		
		'Get Initial Shape Area
		Self.area = Int(shapeArea(Self.complexShapeArray))
		
		'Set Shape Color
		Self.r = 164
		Self.g = 72
		Self.b = 164
		
	End Method
	
End Class