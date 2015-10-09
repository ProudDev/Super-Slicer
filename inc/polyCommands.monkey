Import mojo

Global trigPoly:Float[]

Function DrawPolyEx:Void(complexPoly:List<tri>)
	For Local t:tri = Eachin complexPoly
		Local arr:Float[6]
		arr[0] = t.point1.x
		arr[1] = t.point1.y
		arr[2] = t.point2.x
		arr[3] = t.point2.y
		arr[4] = t.point3.x
		arr[5] = t.point3.y
		DrawPoly(arr)
	Next
End Function

Function shapeArea:Float(complexPoly:List<tri>)
	Local area:Float = 0.0
	For Local t:tri = Eachin complexPoly
		area = area + getTriangleArea(t.point1, t.point2, t.point3)
	Next
	Return area
End Function

Function TriangulatePoly:List<tri>(polyArray:Float[])

	Local triList:List<tri> = New List<tri>
	
	While polyArray.Length() >=6
		triList.AddLast(trigTri(polyArray))
		'polyArray = trigPoint(polyArray)
		polyArray = trigPoly
	Wend
	
	Return triList
End Function


Function trigTri:tri(polyArray:Float[])

	Local triangle:tri
	Local polyArrayList:List<point> = New List<point>
	For Local i:Int = 0 To ((polyArray.Length()/2) - 1)
		Local p:point = New point(polyArray[(i * 2)], polyArray[((i * 2) + 1)])
		polyArrayList.AddLast(p)
	Next

	Local earList:List<point> = getEarPoints(polyArray)
	
	Local escape:Bool = False
	Local previousPoint:point
	Local nextPoint:point
	For Local p:point = Eachin polyArrayList
		
		If (p.x = polyArrayList.First().x) And (p.y = polyArrayList.First().y)
			previousPoint = polyArrayList.Last()
			Local nx:Bool = False
			For Local p2:point = Eachin polyArrayList
					
				If nx = True
					nextPoint = p2
					nx = False
					Exit
				Endif
					
				If (p.x = p2.x) And (p.y = p2.y)
					nx = True
				Endif
						
			Next
		Elseif (p.x = polyArrayList.Last().x) And (p.y = polyArrayList.Last().y)
			nextPoint = polyArrayList.First()
			Local lp:point
			For Local p2:point = Eachin polyArrayList
					
				If (p.x = p2.x) And (p.y = p2.y)
					previousPoint = lp
					Exit
				Endif
					
				lp = p2
					
			Next
		Else
			Local nx:Bool = False
			Local lp:point
			For Local p2:point = Eachin polyArrayList
					
				If nx = True
					nextPoint = p2
					nx = False
					Exit
				Endif
					
				If (p.x = p2.x) And (p.y = p2.y)
					nx = True
					previousPoint = lp
				Endif
					
				lp = p2
					
			Next
		Endif
			
	
		For Local ep:point = Eachin earList
			If (p.x = ep.x) And (p.y = ep.y)
				Local point1:point = New point(p.x, p.y)
				Local point2:point = New point(nextPoint.x, nextPoint.y)
				Local point3:point = New point(previousPoint.x, previousPoint.y)
				Local t:tri = New tri(point1, point2, point3)
				triangle = t
						
				polyArrayList.Remove(p)
				p = Null
						
				escape = True
				Exit
						
			Endif
					
			If escape = True
				Exit
			EndIf
		Next
				
		If escape = True
			Exit
		Endif
			
	Next
	
	Local tempArray:Float[polyArrayList.Count() * 2]
	Local k:Int = 0
	For Local ppp:point = Eachin polyArrayList
		tempArray[(k * 2)] = ppp.x
		tempArray[((k * 2) + 1)] = ppp.y
		k = k + 1
	Next
	trigPoly = tempArray
		
	Return triangle
		
End Function

Function trigPoint:Float[](polyArray:Float[])
	
	Local polyArrayList:List<point> = New List<point>
	For Local i:Int = 0 To ((polyArray.Length()/2) - 1)
		Local p:point = New point(polyArray[(i * 2)], polyArray[((i * 2) + 1)])
		polyArrayList.AddLast(p)
	Next
	
	Local earList:List<point> = getEarPoints(polyArray)

	Local escape:Bool = False
	Local previousPoint:point
	Local nextPoint:point
	For Local p:point = Eachin polyArrayList
		
		If (p.x = polyArrayList.First().x) And (p.y = polyArrayList.First().y)
			previousPoint = polyArrayList.Last()
			Local nx:Bool = False
			For Local p2:point = Eachin polyArrayList
					
				If nx = True
					nextPoint = p2
					nx = False
					Exit
				Endif
					
				If (p.x = p2.x) And (p.y = p2.y)
					nx = True
				Endif
						
			Next
		Elseif (p.x = polyArrayList.Last().x) And (p.y = polyArrayList.Last().y)
			nextPoint = polyArrayList.First()
			Local lp:point
			For Local p2:point = Eachin polyArrayList
					
				If (p.x = p2.x) And (p.y = p2.y)
					previousPoint = lp
					Exit
				Endif
					
				lp = p2
					
			Next
		Else
			Local nx:Bool = False
			Local lp:point
			For Local p2:point = Eachin polyArrayList
					
				If nx = True
					nextPoint = p2
					nx = False
					Exit
				Endif
					
				If (p.x = p2.x) And (p.y = p2.y)
					nx = True
					previousPoint = lp
				Endif
					
				lp = p2
					
			Next
		Endif
			
	
		For Local ep:point = Eachin earList
			If (p.x = ep.x) And (p.y = ep.y)
				Local point1:point = New point(p.x, p.y)
				Local point2:point = New point(nextPoint.x, nextPoint.y)
				Local point3:point = New point(previousPoint.x, previousPoint.y)
				Local t:tri = New tri(point1, point2, point3)
						
				polyArrayList.Remove(p)
				p = Null
						
				escape = True
				Exit
						
			Endif
					
			If escape = True
					Exit
			EndIf
		Next
				
		If escape = True
			Exit
		Endif
			
	Next
		
	
	Local tempArray:Float[polyArrayList.Count() * 2]
	Local k:Int = 0
	For Local ppp:point = Eachin polyArrayList
		tempArray[(k * 2)] = ppp.x
		tempArray[((k * 2) + 1)] = ppp.y
		k = k + 1
	Next
	polyArray = tempArray
	
	Return polyArray
	
End Function

Function getEarPoints:List<point>(polyArray:Float[])

	Local earList:List<point> = New List<point>
	
	'Create a list containing all Convex vertices
	For Local i:Int = 0 To ((polyArray.Length()/2) - 1)
		Local pX_1:Float
		Local pY_1:Float
		Local pX:Float = polyArray[(i * 2)]
		Local pY:Float = polyArray[((i * 2) + 1)]
		Local pX1:Float
		Local pY1:Float
		If i = 0
			pX_1 = polyArray[(((polyArray.Length()/2) - 1) * 2)]
			pY_1 = polyArray[((((polyArray.Length()/2) - 1) * 2) + 1)]
			pX1 = polyArray[((i + 1) * 2)]
			pY1 = polyArray[(((i + 1) * 2) + 1)]
		Elseif i = ((polyArray.Length()/2) - 1)
			pX_1 = polyArray[((i - 1) * 2)]
			pY_1 = polyArray[(((i - 1) * 2) + 1)]
			pX1 = polyArray[(0 * 2)]
			pY1 = polyArray[((0 * 2) + 1)]
		Else
			pX_1 = polyArray[((i - 1) * 2)]
			pY_1 = polyArray[(((i - 1) * 2) + 1)]
			pX1 = polyArray[((i + 1) * 2)]
			pY1 = polyArray[(((i + 1) * 2) + 1)]
		Endif
		
		Local isEar:Bool = True
		Local point1:point = New point(pX, pY)
		Local point2:point = New point(pX_1, pY_1)
		Local point3:point = New point(pX1, pY1)
		
		Local testPoint:point = getAnglePoint(point1, point2, point3)
		If Not pointInPoly(polyArray, testPoint.x, testPoint.y)
			isEar = False
		Else
			For Local i2:Int = 0 To ((polyArray.Length()/2) - 1)
				Local tPoint:point = New point(polyArray[(i2 * 2)], polyArray[((i2 * 2) + 1)])
				If ((tPoint.x <> point1.x) And (tPoint.y <> point1.y)) And ((tPoint.x <> point2.x) And (tPoint.y <> point2.y)) And ((tPoint.x <> point3.x) And (tPoint.y <> point3.y))
					If pointInsideTriangle(tPoint, point1, point2, point3)
						isEar = False
					Endif
				Endif
			Next
		EndIf
		
		If isEar = True
			earList.AddLast(point1)
			Exit
		Endif

	Next
	
	Return earList
	
End Function

Function pointInPoly:Bool(shapeArray:Float[], x:Float, y:Float)
	Local intersections:Int = getIntersectionsPoly(shapeArray, x, y, x, (y - 500))
	If (intersections Mod 2) = 0
		Return False
	Else
		Return True
	EndIf
End Function

Function getAnglePoint:point(point1:point, point2:point, point3:point)
	
	Local midPoint:point = getMidPoint(point2, point3)
		
	Local angle:Float = getLineAngle(point1.x, point1.y, midPoint.x, midPoint.y)
	
	Local newPoint:point = New point((point1.x + Cos(angle) * 0.001), (point1.y + Sin(angle) * 0.001))
	
	Return newPoint
	
End Function

Function getMidPoint:point(point1:point, point2:point)
	Local midPointX:Float = ((point1.x + point2.x)/2.0)
	Local midPointY:Float = ((point1.y + point2.y)/2.0)
	Local midPoint:point = New point(midPointX, midPointY)
	Return midPoint	
End Function

'This function grabs the angle of a line
Function getLineAngle:Float(x1:Float, y1:Float, x2:Float, y2:Float)
	Local dx:Float = x2 - x1
	Local dy:Float = y2 - y1
	Return (ATan2(dy, dx))
End Function

'This function checks if 2 lines (4 points) intersect
Function linesIntersectPoly:Float[](x1:Float,y1:Float, x2:Float,y2:Float, x3:Float,y3:Float, x4:Float,y4:Float)

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

'This function checks intersections and visibly draws points of intersection
Function getIntersectionsPoly:Int(shapeArray:Float[], touchStartX:Float, touchStartY:Float, endX:Float, endY:Float)
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
			Local intersect:Float[] = linesIntersectPoly(touchStartX, touchStartY, endX, endY, lastPointX, lastPointY, pX, pY)
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
	Local intersect:Float[] = linesIntersectPoly(touchStartX, touchStartY, endX, endY, startPointX, startPointY, lastPointX, lastPointY)
	If intersect[0] <> 0.0 And intersect[1] <> 0.0
		intersectNum = intersectNum + 1
	Endif
	
	Return intersectNum
	
End Function

Function pointInsideTriangle:Bool(point:point, point1:point, point2:point, point3:point)
	Local b1:Bool, b2:Bool, b3:Bool
	b1 = sign(point, point1, point2) < 0.0
	b2 = sign(point, point2, point3) < 0.0
	b3 = sign(point, point3, point1) < 0.0
	Return ((b1 = b2) And (b2 = b3))
End Function

Function sign:Float(point1:point, point2:point, point3:point)
	Return (point1.x - point3.x) * (point2.y - point3.y) - (point2.x - point3.x) * (point1.y - point3.y)
End Function

Function getTriangleArea:Float(point1:point, point2:point, point3:point)
	Local dist1:Float = Sqrt((((point1.x - point2.x) * (point1.x - point2.x)) + ((point1.y - point2.y) * (point1.y - point2.y))))
	Local dist2:Float = Sqrt((((point1.x - point3.x) * (point1.x - point3.x)) + ((point1.y - point3.y) * (point1.y - point3.y))))
	Local dist3:Float = Sqrt((((point3.x - point2.x) * (point3.x - point2.x)) + ((point3.y - point2.y) * (point3.y - point2.y))))
	Local s:Float = ((dist1 + dist2 + dist3) / 2)
	Return Sqrt(s * (s - dist1) * (s - dist2) * (s - dist3))
End Function


Class point
	Field x:Float, y:Float
	
	Method New(px:Float, py:Float)
		Self.x = px
		Self.y = py
	End Method
End Class

Class tri
	Field point1:point, point2:point, point3:point
	
	Method New(p1:point, p2:point, p3:point)
		Self.point1 = p1
		Self.point2 = p2
		Self.point3 = p3
	End Method
End Class