Import mojo
Import polyCommands
Import autofit

Global cutShape:Float[]
Global cutShapeComplex:List<tri> = New List<tri>
Global sliced:Bool

'This function checks shape array intersections and makes new shape (shape has been sliced)
Function sliceShape:Float[](shapeArray:Float[], solidLines:Float[], touchStartX:Float, touchStartY:Float)
	'Check intersections
	Local startPointX:Float = 0.0
	Local startPointY:Float = 0.0
	Local lastPointX:Float = 0.0
	Local lastPointY:Float = 0.0
	Local shape1Array:Float[]
	Local shape2Array:Float[]
	Local currentShape:Bool = False
	
	For Local i:Int = 0 To ((shapeArray.Length() / 2) - 1)
	
		Local pX:Float = shapeArray[(i * 2)]
		Local pY:Float = shapeArray[((i * 2) + 1)]
		
		If lastPointX <> 0.0 And lastPointY <> 0.0
			
			'Make sure this line isnt a solid line
			If solidLines.Length() >= 4
				For Local i5:Int = 0 To ((solidLines.Length() / 2) - 1)
					If lastPointX = solidLines[(i5 * 2)] And lastPointY = solidLines[((i5 * 2) + 1)]
						If ((i5 + 1) * 2) <= (solidLines.Length() - 1) And (((i5 + 1) * 2) + 1) < = (solidLines.Length() - 1)
							If pX = solidLines[((i5 + 1) * 2)] And pY = solidLines[(((i5 + 1) * 2) + 1)]
								Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), lastPointX, lastPointY, pX, pY)
								If intersect[0] <> 0.0 And intersect[1] <> 0.0
									Return shapeArray
								EndIf
							Endif
						EndIf
					Endif	
				Next
			Endif
			
			Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), lastPointX, lastPointY, pX, pY)
				
			If intersect[0] <> 0.0 And intersect[1] <> 0.0
					
				If currentShape = False
					shape1Array = shape1Array.Resize((shape1Array.Length() + 2))
					shape1Array[(shape1Array.Length() - 2)] = intersect[0]
					shape1Array[(shape1Array.Length() - 1)] = intersect[1]
						
					shape2Array = shape2Array.Resize((shape2Array.Length() + 2))
					shape2Array[(shape2Array.Length() - 2)] = intersect[0]
					shape2Array[(shape2Array.Length() - 1)] = intersect[1]
					currentShape = True
				Elseif currentShape = True
					shape2Array = shape2Array.Resize((shape2Array.Length() + 2))
					shape2Array[(shape2Array.Length() - 2)] = intersect[0]
					shape2Array[(shape2Array.Length() - 1)] = intersect[1]
						
					shape1Array = shape1Array.Resize((shape1Array.Length() + 2))
					shape1Array[(shape1Array.Length() - 2)] = intersect[0]
					shape1Array[(shape1Array.Length() - 1)] = intersect[1]
					currentShape = False
				EndIf
					
			Endif
			
		Else
		
			startPointX = pX
			startPointY = pY
			
		Endif
		
		lastPointX = pX
		lastPointY = pY
		
		
		If currentShape = False
			shape1Array = shape1Array.Resize((shape1Array.Length() + 2))
			shape1Array[(shape1Array.Length() - 2)] = pX
			shape1Array[(shape1Array.Length() - 1)] = pY
		Elseif currentShape = True
			shape2Array = shape2Array.Resize((shape2Array.Length() + 2))
			shape2Array[(shape2Array.Length() - 2)] = pX
			shape2Array[(shape2Array.Length() - 1)] = pY
		Endif
		
	Next
				
	'Check first point to last point (needed!)
	Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), startPointX, startPointY, lastPointX, lastPointY)
	If intersect[0] <> 0.0 And intersect[1] <> 0.0
		If currentShape = False
			shape1Array = shape1Array.Resize((shape1Array.Length() + 2))
			shape1Array[(shape1Array.Length() - 2)] = intersect[0]
			shape1Array[(shape1Array.Length() - 1)] = intersect[1]
					
			shape2Array = shape2Array.Resize((shape2Array.Length() + 2))
			shape2Array[(shape2Array.Length() - 2)] = intersect[0]
			shape2Array[(shape2Array.Length() - 1)] = intersect[1]
			currentShape = True
		Elseif currentShape = True
			shape2Array = shape2Array.Resize((shape2Array.Length() + 2))
			shape2Array[(shape2Array.Length() - 2)] = intersect[0]
			shape2Array[(shape2Array.Length() - 1)] = intersect[1]
					
			shape1Array = shape1Array.Resize((shape1Array.Length() + 2))
			shape1Array[(shape1Array.Length() - 2)] = intersect[0]
			shape1Array[(shape1Array.Length() - 1)] = intersect[1]
			currentShape = False
		EndIf
	Endif
	
	
	
	If shapeArea(TriangulatePoly(shape1Array)) >= shapeArea(TriangulatePoly(shape2Array))
		setSliced(True)
		cutShape = shape2Array
		cutShapeComplex = TriangulatePoly(cutShape)
		Return shape1Array
	Else
		setSliced(True)
		cutShape = shape1Array
		cutShapeComplex = TriangulatePoly(cutShape)
		Return shape2Array
	EndIf
	
End Function

'This function checks to see if solid lines have been removed
Function removeSolidLines:Float[](shapeArray:Float[], solidLines:Float[])
	'Make sure this line isnt a solid line
	For Local i:Int = 0 To ((solidLines.Length() / 2) - 1)
		Local sX:Float = solidLines[(i * 2)]
		Local sY:Float = solidLines[((i * 2) + 1)]
		Local exists:Bool = False
		For Local i2:Int = 0 To ((shapeArray.Length() / 2) - 1)
			If sX = shapeArray[(i2 * 2)] And sY = shapeArray[((i2 * 2) + 1)]
				exists = True
				Exit
			Endif
		Next
		If exists = False
			solidLines[(i * 2)] = 0.0
			solidLines[((i * 2) + 1)] = 0.0
		EndIf
	Next
End Function

'This function returns the cut (smaller) shape
Function getSlicedShape:Float[]()
	Return cutShape
End Function

'This function returns the cut (smaller) complex shape
Function getSlicedShapeComplex:List<tri>()
	Return cutShapeComplex
End Function

'This function returns the cut (smaller) shape
Function setSliced:Void(state:Bool)
	sliced = state
End Function

'This function returns whether a slice
Function getSliced:Bool()
	Return sliced
End Function

'This function draws Solid Lines
Function drawSolidLines:Void(solidLines:Float[])
	'Draw Solid Lines if necessary
	SetColor(255, 0, 0)
	Local lastPointX:Float = 0.0
	Local lastPointY:Float = 0.0
	For Local i:Int = 0 To ((solidLines.Length() / 2) - 1)
		Local pX:Float = solidLines[(i * 2)]
		Local pY:Float = solidLines[((i * 2) + 1)]
		If lastPointX <> 0.0 And lastPointY <> 0.0
			DrawLine(pX, pY, lastPointX, lastPointY)
		EndIf
		lastPointX = pX
		lastPointY = pY
	Next
	SetColor(255, 255, 255)
End Function

'This function draws an outline of a shape
Function drawShapeOutline:Void(shapeArray:Float[], r:Int, g:Int, b:Int)
	SetColor(r, g, b)
	Local startPointX:Float = 0.0
	Local startPointY:Float = 0.0
	Local lastPointX:Float = 0.0
	Local lastPointY:Float = 0.0
	For Local i:Int = 0 To ((shapeArray.Length() / 2) - 1)
		Local pX:Float = shapeArray[(i * 2)]
		Local pY:Float = shapeArray[((i * 2) + 1)]
		If lastPointX <> 0.0 And lastPointY <> 0.0
			DrawLine(pX, pY, lastPointX, lastPointY)
		Else
			startPointX = pX
			startPointY = pY
		EndIf
		lastPointX = pX
		lastPointY = pY
	Next
	DrawLine(lastPointX, lastPointY, startPointX, startPointY)
	SetColor(255, 255, 255)
End Function

'This function checks intersections and visibly draws points of intersection
Function checkIntersections:Void(shapeArray:Float[], touchStartX:Float, touchStartY:Float)
	'Check intersections
	Local startPointX:Float = 0.0
	Local startPointY:Float = 0.0
	Local lastPointX:Float = 0.0
	Local lastPointY:Float = 0.0
	For Local i:Int = 0 To ((shapeArray.Length() / 2) - 1)
		Local pX:Float = shapeArray[(i * 2)]
		Local pY:Float = shapeArray[((i * 2) + 1)]
		If lastPointX <> 0.0 And lastPointY <> 0.0
			Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), lastPointX, lastPointY, pX, pY)
			If intersect[0] <> 0.0 And intersect[1] <> 0.0
				SetColor(255, 0, 0)
				DrawOval(intersect[0] - 5, intersect[1] - 5, 10, 10)
				SetColor(255, 255, 255)
			Endif
		Else
			startPointX = pX
			startPointY = pY
		EndIf
		lastPointX = pX
		lastPointY = pY
	Next
				
	'Check first point to last point (needed!)
	Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), startPointX, startPointY, lastPointX, lastPointY)
	If intersect[0] <> 0.0 And intersect[1] <> 0.0
		SetColor(255, 0, 0)
		DrawOval(intersect[0] - 5, intersect[1] - 5, 10, 10)
		SetColor(255, 255, 255)
	Endif
	
End Function

'This function checks intersections and visibly draws points of intersection
Function getIntersections:Int(shapeArray:Float[], touchStartX:Float, touchStartY:Float)
	'Check intersections
	Local startPointX:Float = 0.0
	Local startPointY:Float = 0.0
	Local lastPointX:Float = 0.0
	Local lastPointY:Float = 0.0
	Local intersectNum:Int = 0
	For Local i:Int = 0 To ((shapeArray.Length() / 2) - 1)
		Local pX:Float = shapeArray[(i * 2)]
		Local pY:Float = shapeArray[((i * 2) + 1)]
		If lastPointX <> 0.0 And lastPointY <> 0.0
			Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), lastPointX, lastPointY, pX, pY)
			If intersect[0] <> 0.0 And intersect[1] <> 0.0
				intersectNum = intersectNum + 1
			Endif
		Else
			startPointX = pX
			startPointY = pY
		EndIf
		lastPointX = pX
		lastPointY = pY
	Next
				
	'Check first point to last point (needed!)
	Local intersect:Float[] = linesIntersect(touchStartX, touchStartY, VTouchX(), VTouchY(), startPointX, startPointY, lastPointX, lastPointY)
	If intersect[0] <> 0.0 And intersect[1] <> 0.0
		intersectNum = intersectNum + 1
	Endif
	
	Return intersectNum
	
End Function



'This function checks if 2 lines (4 points) intersect
Function linesIntersect:Float[](x1:Float,y1:Float, x2:Float,y2:Float, x3:Float,y3:Float, x4:Float,y4:Float)

	Local numeratorA:Float  = (x4-x3)*(y1-y3)-(y4-y3)*(x1-x3)
	Local numeratorB:Float  = (x2-x1)*(y1-y3)-(y2-y1)*(x1-x3)
	Local denominator:Float = (y4-y3)*(x2-x1)-(x4-x3)*(y2-y1)
	Local result:Float[2]
	
	If denominator = 0.0 Then
		result[0] = 0.0
		result[1] = 0.0
	Else
		Local Ua:Float = numeratorA/denominator
		Local Ub:Float = numeratorB/denominator
		Local range1:Int = Ua >= 0.0 And Ua <= 1.0
		Local range2:Int = Ub >= 0.0 And Ub <= 1.0
		If range1 And range2 Then
			result[0] = Floor(x1 + Ua*(x2-x1)+.5)
			result[1] = Floor(y1 + Ua*(y2-y1)+.5)
		Else
			result[0] = 0.0
			result[1] = 0.0
		EndIf
	   
	Endif
	    
	Return result
	    
End Function

'This function gets the distance between two points
Function getDistance:Float(x1:Float, y1:Float, x2:Float, y2:Float)
	Local xD:Float = ((x2 - x1) * (x2 - x1))
	Local yD:Float = ((y2 - y1) * (y2 - y1))
	Local dist:Float = Sqrt((xD + yD))
	Return dist
End Function

'This function finds the closest point on a line from another point not on line (needed for ball collision!)
Function getClosestLinePoint:Float[](x:Float, y:Float, lx1:Float, ly1:Float, lx2:Float, ly2:Float)
	Local a1:Float = ly2 - ly1
	Local b1:Float = lx1 - lx2
	Local c1:Float = (((ly2 - ly1) * lx1) + ((lx1 - lx2) * ly1))
	Local c2:Float = (((b1 * -1) * x) + (a1 * y))
	Local det:Float = ((a1 * a1) - ((b1 * -1) * b1))
	Local cx:Float = 0.0
	Local cy:Float = 0.0
	If det <> 0
		cx = Float((((a1 * c1) - (b1 * c2))/det))
		cy = Float((((a1 * c2) - ((b1 * -1) * c1))/det))
	Else
		cx = x
		cy = y
	Endif
	
	'new
	If lx1 >= lx2
		If cx >= lx1
			cx = lx1
		Elseif cx <= lx2
			cx = lx2
		EndIf
	Elseif lx1 < lx2
		If cx >= lx2
			cx = lx2
		Elseif cx <= lx1
			cx = lx1
		EndIf
	Endif
	
	If ly1 >= ly2
		If cy >= ly1
			cy = ly1
		Elseif cy <= ly2
			cy = ly2
		EndIf
	Elseif ly1 < ly2
		If cy >= ly2
			cy = ly2
		Elseif cy <= ly1
			cy = ly1
		EndIf
	Endif
		
	
	Local pointArray:Float[2]
	pointArray[0] = cx
	pointArray[1] = cy
	Return pointArray
End Function

'This function grabs the angle of a line
Function getLineAngle:Float(x1:Float, y1:Float, x2:Float, y2:Float)
	Local dx:Float = x2 - x1
	Local dy:Float = y2 - y1
	Return (ATan2(dy, dx))
End Function

'This function adds lines
Function addLines:Void(shapeArray:Float[], lineList:List<line>)
	Local startPointX:Float = 0.0
	Local startPointY:Float = 0.0
	Local lastPointX:Float = 0.0
	Local lastPointY:Float = 0.0
	For Local i:Int = 0 To ((shapeArray.Length() / 2) - 1)
		Local pX:Float = shapeArray[(i * 2)]
		Local pY:Float = shapeArray[((i * 2) + 1)]
		If lastPointX <> 0.0 And lastPointY <> 0.0
			Local l:line = New line
			l.x1 = lastPointX
			l.y1 = lastPointY
			l.x2 = pX
			l.y2 = pY
			lineList.AddLast(l)
		Else
			startPointX = pX
			startPointY = pY
			EndIf
		lastPointX = pX
		lastPointY = pY
	Next
	Local l:line = New line
	l.x1 = lastPointX
	l.y1 = lastPointY
	l.x2 = startPointX
	l.y2 = startPointY
	lineList.AddLast(l)
End Function

'This function removes all lines
Function removeLines:Void(lineList:List<line>)
	For Local l:line = Eachin lineList
		lineList.Remove(l)
		l = Null
	Next
End Function

'This function updates the ball
Function updateBall(ballList:List<ball>, lineList:List<line>)
    
    'Variables
    Local p:Float[]
    Local dist:Float
    Local collided:Bool = False
    Local prevAngle:Float
    
    'Loop through balls
    For Local ball:ball = Eachin ballList
    
	    'Move ball
		ball.Move()
		prevAngle = ball.angle
	    
	    'Check to see if ball colided with lines
	    For Local l:line = Eachin lineList
			p = getClosestLinePoint(ball.x, ball.y, l.x1, l.y1, l.x2, l.y2)
			dist = getDistance(ball.x, ball.y, p[0], p[1])
			If dist <= ball.radius
			   If collided = True
			   	   ball.angle = prevAngle + 180.0
			   Elseif collided = False
				   ball.angle = getNewAngle(ball, l)
			  	   collided = True
			   Endif
			Endif
		Next
		
		collided = False
		
	Next
    
End Function

'This function draws all the balls
Function drawBalls(ballList:List<ball>)
	For Local ball:ball = Eachin ballList
		SetColor(ball.r, ball.g, ball.b)
		DrawCircle(ball.x, ball.y, ball.radius)
		SetColor(255, 255, 255)
	Next
End Function

'This function gets the new angle for the ball
Function getNewAngle:Float(ball:ball, line:line)
	Local a1:Float = getLineAngle(line.x1, line.y1, line.x2, line.y2)
	Local a2:Float = getLineAngle(ball.x, ball.y, (ball.x + Cos(ball.angle) * ball.speed), (ball.y + Sin(ball.angle) * ball.speed))
	Local angle:Float = (2 * a1) - a2 
	Return angle
End Function

'Debug function
Function drawLineClass(lineList:List<line>)
	
	'Draw everyline in lineList class
	SetColor(255, 255, 255)
	For Local l:line = Eachin lineList
		DrawLine(l.x1, l.y1, l.x2, l.y2)
	Next
	SetColor(255, 255, 255)
	
End Function

'Debug function
Function drawClosestPoints(ballList:List<ball>, lineList:List<line>)
	'Draw Closest Points to circle
	SetColor(0, 0, 255)
	Local p:Float[]
	For Local ball:ball = Eachin ballList
	    For Local line:line = Eachin lineList
		    p = getClosestLinePoint(ball.x, ball.y, line.x1, line.y1, line.x2, line.y2)
		    DrawCircle(p[0], p[1], 5.0)
		Next
	Next
	SetColor(255, 255, 255)
End Function

'Debug function
Function drawGreenPoint(ball:ball)
	SetColor(0, 255, 0)
	DrawCircle((ball.x + Cos(ball.angle) * ball.speed), (ball.y + Sin(ball.angle) * ball.speed), 5.0)
	SetColor(255, 255, 255)
End Function

'Class line
Class line

	'Start and End points of line
	Field x1:Float
	Field y1:Float
	Field x2:Float
	Field y2:Float
	
End Class

'Class ball
Class ball

	'Fields
	Field x:Float
	Field y:Float
	Field radius:Float
	Field speed:Float
	Field angle:Float
	Field r:Int, g:Int, b:Int
	
	'This method creates a new ball
	Method New(x:Float, y:Float, radius:Float = 10.0, speed:Float = 1.5, angle:Float = 0.0, r:Int = 255, g:Int = 255, b:Int = 255)
		Self.x = x
		Self.y = y
		Self.radius = radius
		Self.speed = speed
		Self.angle = angle
		Self.r = r
		Self.g = g
		Self.b = b
	End Method
	
	Method Move()
	
		'Move ball
		Self.x = (Self.x + Cos(Self.angle) * Self.speed)
		Self.y = (Self.y + Sin(Self.angle) * Self.speed)

	End Method
	
End Class