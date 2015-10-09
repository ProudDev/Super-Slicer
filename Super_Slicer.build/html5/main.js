
//Change this to true for a stretchy canvas!
//
var RESIZEABLE_CANVAS=false;

//Start us up!
//
window.onload=function( e ){

	if( RESIZEABLE_CANVAS ){
		window.onresize=function( e ){
			var canvas=document.getElementById( "GameCanvas" );

			//This vs window.innerWidth, which apparently doesn't account for scrollbar?
			var width=document.body.clientWidth;
			
			//This vs document.body.clientHeight, which does weird things - document seems to 'grow'...perhaps canvas resize pushing page down?
			var height=window.innerHeight;			

			canvas.width=width;
			canvas.height=height;
		}
		window.onresize( null );
	}

	BBMonkeyGame.Main( document.getElementById( "GameCanvas" ) );
}

//${CONFIG_BEGIN}
CFG_BINARY_FILES="*.bin|*.dat";
CFG_BRL_GAMETARGET_IMPLEMENTED="1";
CFG_CD="";
CFG_CONFIG="debug";
CFG_HOST="winnt";
CFG_IMAGE_FILES="*.png|*.jpg";
CFG_INCDIRS="C:/Monkey/MonkeyPro69/modules/monkey/native";
CFG_LANG="js";
CFG_MODPATH=".;C:/Users/Matt/Desktop/Super Slicer;C:/Monkey/MonkeyPro69/modules;C:/Monkey/MonkeyPro69/targets/html5/modules";
CFG_MOJO_AUTO_SUSPEND_ENABLED="0";
CFG_MONKEYDIR="";
CFG_MUSIC_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_OPENGL_GLES20_ENABLED="0";
CFG_SAFEMODE="0";
CFG_SOUND_FILES="*.wav|*.ogg|*.mp3|*.m4a";
CFG_TARGET="html5";
CFG_TEXT_FILES="*.txt|*.xml|*.json";
CFG_TRANSDIR="";
//${CONFIG_END}

//${METADATA_BEGIN}
var META_DATA="[mojo_font.png];type=image/png;width=864;height=13;\n";
//${METADATA_END}

//${TRANSCODE_BEGIN}

// Javascript Monkey runtime.
//
// Placed into the public domain 24/02/2011.
// No warranty implied; use at your own risk.

//***** JavaScript Runtime *****

var D2R=0.017453292519943295;
var R2D=57.29577951308232;

var err_info="";
var err_stack=[];

var dbg_index=0;

function push_err(){
	err_stack.push( err_info );
}

function pop_err(){
	err_info=err_stack.pop();
}

function stackTrace(){
	if( !err_info.length ) return "";
	var str=err_info+"\n";
	for( var i=err_stack.length-1;i>0;--i ){
		str+=err_stack[i]+"\n";
	}
	return str;
}

function print( str ){
	var cons=document.getElementById( "GameConsole" );
	if( cons ){
		cons.value+=str+"\n";
		cons.scrollTop=cons.scrollHeight-cons.clientHeight;
	}else if( window.console!=undefined ){
		window.console.log( str );
	}
	return 0;
}

function alertError( err ){
	if( typeof(err)=="string" && err=="" ) return;
	alert( "Monkey Runtime Error : "+err.toString()+"\n\n"+stackTrace() );
}

function error( err ){
	throw err;
}

function debugLog( str ){
	print( str );
}

function debugStop(){
	error( "STOP" );
}

function dbg_object( obj ){
	if( obj ) return obj;
	error( "Null object access" );
}

function dbg_array( arr,index ){
	if( index<0 || index>=arr.length ) error( "Array index out of range" );
	dbg_index=index;
	return arr;
}

function new_bool_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=false;
	return arr;
}

function new_number_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=0;
	return arr;
}

function new_string_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]='';
	return arr;
}

function new_array_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=[];
	return arr;
}

function new_object_array( len ){
	var arr=Array( len );
	for( var i=0;i<len;++i ) arr[i]=null;
	return arr;
}

function resize_bool_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=false;
	return arr;
}

function resize_number_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=0;
	return arr;
}

function resize_string_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]="";
	return arr;
}

function resize_array_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=[];
	return arr;
}

function resize_object_array( arr,len ){
	var i=arr.length;
	arr=arr.slice(0,len);
	if( len<=i ) return arr;
	arr.length=len;
	while( i<len ) arr[i++]=null;
	return arr;
}

function string_compare( lhs,rhs ){
	var n=Math.min( lhs.length,rhs.length ),i,t;
	for( i=0;i<n;++i ){
		t=lhs.charCodeAt(i)-rhs.charCodeAt(i);
		if( t ) return t;
	}
	return lhs.length-rhs.length;
}

function string_replace( str,find,rep ){	//no unregex replace all?!?
	var i=0;
	for(;;){
		i=str.indexOf( find,i );
		if( i==-1 ) return str;
		str=str.substring( 0,i )+rep+str.substring( i+find.length );
		i+=rep.length;
	}
}

function string_trim( str ){
	var i=0,i2=str.length;
	while( i<i2 && str.charCodeAt(i)<=32 ) i+=1;
	while( i2>i && str.charCodeAt(i2-1)<=32 ) i2-=1;
	return str.slice( i,i2 );
}

function string_startswith( str,substr ){
	return substr.length<=str.length && str.slice(0,substr.length)==substr;
}

function string_endswith( str,substr ){
	return substr.length<=str.length && str.slice(str.length-substr.length,str.length)==substr;
}

function string_tochars( str ){
	var arr=new Array( str.length );
	for( var i=0;i<str.length;++i ) arr[i]=str.charCodeAt(i);
	return arr;
}

function string_fromchars( chars ){
	var str="",i;
	for( i=0;i<chars.length;++i ){
		str+=String.fromCharCode( chars[i] );
	}
	return str;
}

function object_downcast( obj,clas ){
	if( obj instanceof clas ) return obj;
	return null;
}

function object_implements( obj,iface ){
	if( obj && obj.implments && obj.implments[iface] ) return obj;
	return null;
}

function extend_class( clas ){
	var tmp=function(){};
	tmp.prototype=clas.prototype;
	return new tmp;
}

function ThrowableObject(){
}

ThrowableObject.prototype.toString=function(){ 
	return "Uncaught Monkey Exception"; 
}

function BBGameEvent(){}
BBGameEvent.KeyDown=1;
BBGameEvent.KeyUp=2;
BBGameEvent.KeyChar=3;
BBGameEvent.MouseDown=4;
BBGameEvent.MouseUp=5;
BBGameEvent.MouseMove=6;
BBGameEvent.TouchDown=7;
BBGameEvent.TouchUp=8;
BBGameEvent.TouchMove=9;
BBGameEvent.MotionAccel=10;

function BBGameDelegate(){}
BBGameDelegate.prototype.StartGame=function(){}
BBGameDelegate.prototype.SuspendGame=function(){}
BBGameDelegate.prototype.ResumeGame=function(){}
BBGameDelegate.prototype.UpdateGame=function(){}
BBGameDelegate.prototype.RenderGame=function(){}
BBGameDelegate.prototype.KeyEvent=function( ev,data ){}
BBGameDelegate.prototype.MouseEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.TouchEvent=function( ev,data,x,y ){}
BBGameDelegate.prototype.MotionEvent=function( ev,data,x,y,z ){}
BBGameDelegate.prototype.DiscardGraphics=function(){}

function BBGame(){
	BBGame._game=this;
	this._delegate=null;
	this._keyboardEnabled=false;
	this._updateRate=0;
	this._started=false;
	this._suspended=false;
	this._debugExs=(CFG_CONFIG=="debug");
	this._startms=Date.now();
}

BBGame.Game=function(){
	return BBGame._game;
}

BBGame.prototype.SetDelegate=function( delegate ){
	this._delegate=delegate;
}

BBGame.prototype.Delegate=function(){
	return this._delegate;
}

BBGame.prototype.SetUpdateRate=function( updateRate ){
	this._updateRate=updateRate;
}

BBGame.prototype.SetKeyboardEnabled=function( keyboardEnabled ){
	this._keyboardEnabled=keyboardEnabled;
}

BBGame.prototype.Started=function(){
	return this._started;
}

BBGame.prototype.Suspended=function(){
	return this._suspended;
}

BBGame.prototype.Millisecs=function(){
	return Date.now()-this._startms;
}

BBGame.prototype.GetDate=function( date ){
	var n=date.length;
	if( n>0 ){
		var t=new Date();
		date[0]=t.getFullYear();
		if( n>1 ){
			date[1]=t.getMonth()+1;
			if( n>2 ){
				date[2]=t.getDate();
				if( n>3 ){
					date[3]=t.getHours();
					if( n>4 ){
						date[4]=t.getMinutes();
						if( n>5 ){
							date[5]=t.getSeconds();
							if( n>6 ){
								date[6]=t.getMilliseconds();
							}
						}
					}
				}
			}
		}
	}
}

BBGame.prototype.SaveState=function( state ){
	localStorage.setItem( "monkeystate@"+document.URL,state );	//key can't start with dot in Chrome!
	return 1;
}

BBGame.prototype.LoadState=function(){
	var state=localStorage.getItem( "monkeystate@"+document.URL );
	if( state ) return state;
	return "";
}

BBGame.prototype.LoadString=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );
	
	xhr.send( null );
	
	if( xhr.status==200 || xhr.status==0 ) return xhr.responseText;
	
	return "";
}

BBGame.prototype.PollJoystick=function( port,joyx,joyy,joyz,buttons ){
	return false;
}

BBGame.prototype.OpenUrl=function( url ){
	window.location=url;
}

BBGame.prototype.SetMouseVisible=function( visible ){
	if( visible ){
		this._canvas.style.cursor='default';	
	}else{
		this._canvas.style.cursor="url('data:image/cur;base64,AAACAAEAICAAAAAAAACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAgBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA55ZXBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeWVxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnllcGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9////////////////////+////////f/////////8%3D'), auto";
	}
}

BBGame.prototype.PathToUrl=function( path ){
	return path;
}

BBGame.prototype.LoadData=function( path ){

	var xhr=new XMLHttpRequest();
	xhr.open( "GET",this.PathToUrl( path ),false );

	if( xhr.overrideMimeType ) xhr.overrideMimeType( "text/plain; charset=x-user-defined" );

	xhr.send( null );
	if( xhr.status!=200 && xhr.status!=0 ) return null;

	var r=xhr.responseText;
	var buf=new ArrayBuffer( r.length );
	var bytes=new Int8Array( buf );
	for( var i=0;i<r.length;++i ){
		bytes[i]=r.charCodeAt( i );
	}
	return buf;
}

//***** INTERNAL ******

BBGame.prototype.Die=function( ex ){

	this._delegate=new BBGameDelegate();
	
	if( !ex.toString() ){
		return;
	}
	
	if( this._debugExs ){
		print( "Monkey Runtime Error : "+ex.toString() );
		print( stackTrace() );
	}
	
	throw ex;
}

BBGame.prototype.StartGame=function(){

	if( this._started ) return;
	this._started=true;
	
	if( this._debugExs ){
		try{
			this._delegate.StartGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.StartGame();
	}
}

BBGame.prototype.SuspendGame=function(){

	if( !this._started || this._suspended ) return;
	this._suspended=true;
	
	if( this._debugExs ){
		try{
			this._delegate.SuspendGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.SuspendGame();
	}
}

BBGame.prototype.ResumeGame=function(){

	if( !this._started || !this._suspended ) return;
	this._suspended=false;
	
	if( this._debugExs ){
		try{
			this._delegate.ResumeGame();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.ResumeGame();
	}
}

BBGame.prototype.UpdateGame=function(){

	if( !this._started || this._suspended ) return;

	if( this._debugExs ){
		try{
			this._delegate.UpdateGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.UpdateGame();
	}
}

BBGame.prototype.RenderGame=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.RenderGame();
		}catch( ex ){
			this.Die( ex );
		}	
	}else{
		this._delegate.RenderGame();
	}
}

BBGame.prototype.KeyEvent=function( ev,data ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.KeyEvent( ev,data );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.KeyEvent( ev,data );
	}
}

BBGame.prototype.MouseEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MouseEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MouseEvent( ev,data,x,y );
	}
}

BBGame.prototype.TouchEvent=function( ev,data,x,y ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.TouchEvent( ev,data,x,y );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.TouchEvent( ev,data,x,y );
	}
}

BBGame.prototype.MotionEvent=function( ev,data,x,y,z ){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.MotionEvent( ev,data,x,y,z );
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.MotionEvent( ev,data,x,y,z );
	}
}

BBGame.prototype.DiscardGraphics=function(){

	if( !this._started ) return;
	
	if( this._debugExs ){
		try{
			this._delegate.DiscardGraphics();
		}catch( ex ){
			this.Die( ex );
		}
	}else{
		this._delegate.DiscardGraphics();
	}
}

function BBHtml5Game( canvas ){
	BBGame.call( this );
	BBHtml5Game._game=this;
	this._canvas=canvas;
	this._loading=0;
	this._timerSeq=0;
	this._gl=null;
	if( CFG_OPENGL_GLES20_ENABLED=="1" ){
		this._gl=this._canvas.getContext( "webgl" );
		if( !this._gl ) this._gl=this._canvas.getContext( "experimental-webgl" );
		if( !this._gl ) this.Die( "Can't create WebGL" );
		gl=this._gl;
	}
}

BBHtml5Game.prototype=extend_class( BBGame );

BBHtml5Game.Html5Game=function(){
	return BBHtml5Game._game;
}

BBHtml5Game.prototype.ValidateUpdateTimer=function(){

	++this._timerSeq;

	if( !this._updateRate || this._suspended ) return;
	
	var game=this;
	var updatePeriod=1000.0/this._updateRate;
	var nextUpdate=Date.now()+updatePeriod;
	var seq=game._timerSeq;
	
	function timeElapsed(){
		if( seq!=game._timerSeq ) return;

		var time;		
		var updates;
		
		for( updates=0;updates<4;++updates ){
		
			nextUpdate+=updatePeriod;
			
			game.UpdateGame();
			if( seq!=game._timerSeq ) return;
			
			if( nextUpdate-Date.now()>0 ) break;
		}
		
		game.RenderGame();
		if( seq!=game._timerSeq ) return;
		
		if( updates==4 ){
			nextUpdate=Date.now();
			setTimeout( timeElapsed,0 );
		}else{
			var delay=nextUpdate-Date.now();
			setTimeout( timeElapsed,delay>0 ? delay : 0 );
		}
	}

	setTimeout( timeElapsed,updatePeriod );
}

//***** BBGame methods *****

BBHtml5Game.prototype.SetUpdateRate=function( updateRate ){

	BBGame.prototype.SetUpdateRate.call( this,updateRate );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.GetMetaData=function( path,key ){
	if( path.indexOf( "monkey://data/" )!=0 ) return "";
	path=path.slice(14);

	var i=META_DATA.indexOf( "["+path+"]" );
	if( i==-1 ) return "";
	i+=path.length+2;

	var e=META_DATA.indexOf( "\n",i );
	if( e==-1 ) e=META_DATA.length;

	i=META_DATA.indexOf( ";"+key+"=",i )
	if( i==-1 || i>=e ) return "";
	i+=key.length+2;

	e=META_DATA.indexOf( ";",i );
	if( e==-1 ) return "";

	return META_DATA.slice( i,e );
}

BBHtml5Game.prototype.PathToUrl=function( path ){
	if( path.indexOf( "monkey:" )!=0 ){
		return path;
	}else if( path.indexOf( "monkey://data/" )==0 ) {
		return "data/"+path.slice( 14 );
	}
	return "";
}

BBHtml5Game.prototype.GetLoading=function(){
	return this._loading;
}

BBHtml5Game.prototype.IncLoading=function(){
	++this._loading;
	return this._loading;
}

BBHtml5Game.prototype.DecLoading=function(){
	--this._loading;
	return this._loading;
}

BBHtml5Game.prototype.GetCanvas=function(){
	return this._canvas;
}

BBHtml5Game.prototype.GetWebGL=function(){
	return this._gl;
}

//***** INTERNAL *****

BBHtml5Game.prototype.UpdateGame=function(){

	if( !this._loading ) BBGame.prototype.UpdateGame.call( this );
}

BBHtml5Game.prototype.SuspendGame=function(){

	BBGame.prototype.SuspendGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.ResumeGame=function(){

	BBGame.prototype.ResumeGame.call( this );
	
	this.ValidateUpdateTimer();
}

BBHtml5Game.prototype.Run=function(){

	var game=this;
	var canvas=game._canvas;
	
	var touchIds=new Array( 32 );
	for( i=0;i<32;++i ) touchIds[i]=-1;
	
	function eatEvent( e ){
		if( e.stopPropagation ){
			e.stopPropagation();
			e.preventDefault();
		}else{
			e.cancelBubble=true;
			e.returnValue=false;
		}
	}
	
	function keyToChar( key ){
		switch( key ){
		case 8:case 9:case 13:case 27:case 32:return key;
		case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 45:return key|0x10000;
		case 46:return 127;
		}
		return 0;
	}
	
	function mouseX( e ){
		var x=e.clientX+document.body.scrollLeft;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}
	
	function mouseY( e ){
		var y=e.clientY+document.body.scrollTop;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}

	function touchX( touch ){
		var x=touch.pageX;
		var c=canvas;
		while( c ){
			x-=c.offsetLeft;
			c=c.offsetParent;
		}
		return x;
	}			
	
	function touchY( touch ){
		var y=touch.pageY;
		var c=canvas;
		while( c ){
			y-=c.offsetTop;
			c=c.offsetParent;
		}
		return y;
	}
	
	canvas.onkeydown=function( e ){
		game.KeyEvent( BBGameEvent.KeyDown,e.keyCode );
		var chr=keyToChar( e.keyCode );
		if( chr ) game.KeyEvent( BBGameEvent.KeyChar,chr );
		if( e.keyCode<48 || (e.keyCode>111 && e.keyCode<122) ) eatEvent( e );
	}

	canvas.onkeyup=function( e ){
		game.KeyEvent( BBGameEvent.KeyUp,e.keyCode );
	}

	canvas.onkeypress=function( e ){
		if( e.charCode ){
			game.KeyEvent( BBGameEvent.KeyChar,e.charCode );
		}else if( e.which ){
			game.KeyEvent( BBGameEvent.KeyChar,e.which );
		}
	}

	canvas.onmousedown=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseDown,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseDown,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseDown,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmouseup=function( e ){
		switch( e.button ){
		case 0:game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );break;
		case 1:game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );break;
		case 2:game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );break;
		}
		eatEvent( e );
	}
	
	canvas.onmousemove=function( e ){
		game.MouseEvent( BBGameEvent.MouseMove,-1,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.onmouseout=function( e ){
		game.MouseEvent( BBGameEvent.MouseUp,0,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,1,mouseX(e),mouseY(e) );
		game.MouseEvent( BBGameEvent.MouseUp,2,mouseX(e),mouseY(e) );
		eatEvent( e );
	}

	canvas.ontouchstart=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=-1 ) continue;
				touchIds[j]=touch.identifier;
				game.TouchEvent( BBGameEvent.TouchDown,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchmove=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				game.TouchEvent( BBGameEvent.TouchMove,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	canvas.ontouchend=function( e ){
		for( var i=0;i<e.changedTouches.length;++i ){
			var touch=e.changedTouches[i];
			for( var j=0;j<32;++j ){
				if( touchIds[j]!=touch.identifier ) continue;
				touchIds[j]=-1;
				game.TouchEvent( BBGameEvent.TouchUp,j,touchX(touch),touchY(touch) );
				break;
			}
		}
		eatEvent( e );
	}
	
	window.ondevicemotion=function( e ){
		var tx=e.accelerationIncludingGravity.x/9.81;
		var ty=e.accelerationIncludingGravity.y/9.81;
		var tz=e.accelerationIncludingGravity.z/9.81;
		var x,y;
		switch( window.orientation ){
		case   0:x=+tx;y=-ty;break;
		case 180:x=-tx;y=+ty;break;
		case  90:x=-ty;y=-tx;break;
		case -90:x=+ty;y=+tx;break;
		}
		game.MotionEvent( BBGameEvent.MotionAccel,0,x,y,tz );
		eatEvent( e );
	}

	canvas.onfocus=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.ResumeGame();
		}
	}
	
	canvas.onblur=function( e ){
		if( CFG_MOJO_AUTO_SUSPEND_ENABLED=="1" ){
			game.SuspendGame();
		}
	}
	
	canvas.focus();
	
	game.StartGame();

	game.RenderGame();
}

function BBMonkeyGame( canvas ){
	BBHtml5Game.call( this,canvas );
}

BBMonkeyGame.prototype=extend_class( BBHtml5Game );

BBMonkeyGame.Main=function( canvas ){

	var game=new BBMonkeyGame( canvas );

	try{

		bbInit();
		bbMain();

	}catch( ex ){
	
		game.Die( ex );
		return;
	}

	if( !game.Delegate() ) return;
	
	game.Run();
}

// HTML5 mojo runtime.
//
// Copyright 2011 Mark Sibly, all rights reserved.
// No warranty implied; use at your own risk.

//***** gxtkGraphics class *****

function gxtkGraphics(){
	this.game=BBHtml5Game.Html5Game();
	this.canvas=this.game.GetCanvas()
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	this.gl=null;
	this.gc=this.canvas.getContext( '2d' );
	this.tmpCanvas=null;
	this.r=255;
	this.b=255;
	this.g=255;
	this.white=true;
	this.color="rgb(255,255,255)"
	this.alpha=1;
	this.blend="source-over";
	this.ix=1;this.iy=0;
	this.jx=0;this.jy=1;
	this.tx=0;this.ty=0;
	this.tformed=false;
	this.scissorX=0;
	this.scissorY=0;
	this.scissorWidth=0;
	this.scissorHeight=0;
	this.clipped=false;
}

gxtkGraphics.prototype.BeginRender=function(){
	this.width=this.canvas.width;
	this.height=this.canvas.height;
	if( !this.gc ) return 0;
	this.gc.save();
	if( this.game.GetLoading() ) return 2;
	return 1;
}

gxtkGraphics.prototype.EndRender=function(){
	if( this.gc ) this.gc.restore();
}

gxtkGraphics.prototype.Width=function(){
	return this.width;
}

gxtkGraphics.prototype.Height=function(){
	return this.height;
}

gxtkGraphics.prototype.LoadSurface=function( path ){
	var game=this.game;

	var ty=game.GetMetaData( path,"type" );
	if( ty.indexOf( "image/" )!=0 ) return null;
	
	function onloadfun(){
		game.DecLoading();
	}
	
	game.IncLoading();

	var image=new Image();
	image.onload=onloadfun;
	image.meta_width=parseInt( game.GetMetaData( path,"width" ) );
	image.meta_height=parseInt( game.GetMetaData( path,"height" ) );
	image.src=game.PathToUrl( path );

	return new gxtkSurface( image,this );
}

gxtkGraphics.prototype.CreateSurface=function( width,height ){
	var canvas=document.createElement( 'canvas' );
	
	canvas.width=width;
	canvas.height=height;
	canvas.meta_width=width;
	canvas.meta_height=height;
	canvas.complete=true;
	
	var surface=new gxtkSurface( canvas,this );
	
	surface.gc=canvas.getContext( '2d' );
	
	return surface;
}

gxtkGraphics.prototype.SetAlpha=function( alpha ){
	this.alpha=alpha;
	this.gc.globalAlpha=alpha;
}

gxtkGraphics.prototype.SetColor=function( r,g,b ){
	this.r=r;
	this.g=g;
	this.b=b;
	this.white=(r==255 && g==255 && b==255);
	this.color="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
}

gxtkGraphics.prototype.SetBlend=function( blend ){
	switch( blend ){
	case 1:
		this.blend="lighter";
		break;
	default:
		this.blend="source-over";
	}
	this.gc.globalCompositeOperation=this.blend;
}

gxtkGraphics.prototype.SetScissor=function( x,y,w,h ){
	this.scissorX=x;
	this.scissorY=y;
	this.scissorWidth=w;
	this.scissorHeight=h;
	this.clipped=(x!=0 || y!=0 || w!=this.canvas.width || h!=this.canvas.height);
	this.gc.restore();
	this.gc.save();
	if( this.clipped ){
		this.gc.beginPath();
		this.gc.rect( x,y,w,h );
		this.gc.clip();
		this.gc.closePath();
	}
	this.gc.fillStyle=this.color;
	this.gc.strokeStyle=this.color;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.SetMatrix=function( ix,iy,jx,jy,tx,ty ){
	this.ix=ix;this.iy=iy;
	this.jx=jx;this.jy=jy;
	this.tx=tx;this.ty=ty;
	this.gc.setTransform( ix,iy,jx,jy,tx,ty );
	this.tformed=(ix!=1 || iy!=0 || jx!=0 || jy!=1 || tx!=0 || ty!=0);
}

gxtkGraphics.prototype.Cls=function( r,g,b ){
	if( this.tformed ) this.gc.setTransform( 1,0,0,1,0,0 );
	this.gc.fillStyle="rgb("+(r|0)+","+(g|0)+","+(b|0)+")";
	this.gc.globalAlpha=1;
	this.gc.globalCompositeOperation="source-over";
	this.gc.fillRect( 0,0,this.canvas.width,this.canvas.height );
	this.gc.fillStyle=this.color;
	this.gc.globalAlpha=this.alpha;
	this.gc.globalCompositeOperation=this.blend;
	if( this.tformed ) this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
}

gxtkGraphics.prototype.DrawPoint=function( x,y ){
	if( this.tformed ){
		var px=x;
		x=px * this.ix + y * this.jx + this.tx;
		y=px * this.iy + y * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
		this.gc.fillRect( x,y,1,1 );
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
		this.gc.fillRect( x,y,1,1 );
	}
}

gxtkGraphics.prototype.DrawRect=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
	this.gc.fillRect( x,y,w,h );
}

gxtkGraphics.prototype.DrawLine=function( x1,y1,x2,y2 ){
	if( this.tformed ){
		var x1_t=x1 * this.ix + y1 * this.jx + this.tx;
		var y1_t=x1 * this.iy + y1 * this.jy + this.ty;
		var x2_t=x2 * this.ix + y2 * this.jx + this.tx;
		var y2_t=x2 * this.iy + y2 * this.jy + this.ty;
		this.gc.setTransform( 1,0,0,1,0,0 );
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1_t,y1_t );
	  	this.gc.lineTo( x2_t,y2_t );
	  	this.gc.stroke();
	  	this.gc.closePath();
		this.gc.setTransform( this.ix,this.iy,this.jx,this.jy,this.tx,this.ty );
	}else{
	  	this.gc.beginPath();
	  	this.gc.moveTo( x1,y1 );
	  	this.gc.lineTo( x2,y2 );
	  	this.gc.stroke();
	  	this.gc.closePath();
	}
}

gxtkGraphics.prototype.DrawOval=function( x,y,w,h ){
	if( w<0 ){ x+=w;w=-w; }
	if( h<0 ){ y+=h;h=-h; }
	if( w<=0 || h<=0 ) return;
	//
  	var w2=w/2,h2=h/2;
	this.gc.save();
	this.gc.translate( x+w2,y+h2 );
	this.gc.scale( w2,h2 );
  	this.gc.beginPath();
	this.gc.arc( 0,0,1,0,Math.PI*2,false );
	this.gc.fill();
  	this.gc.closePath();
	this.gc.restore();
}

gxtkGraphics.prototype.DrawPoly=function( verts ){
	if( verts.length<6 ) return;
	this.gc.beginPath();
	this.gc.moveTo( verts[0],verts[1] );
	for( var i=2;i<verts.length;i+=2 ){
		this.gc.lineTo( verts[i],verts[i+1] );
	}
	this.gc.fill();
	this.gc.closePath();
}

gxtkGraphics.prototype.DrawSurface=function( surface,x,y ){
	if( !surface.image.complete ) return;
	
	if( this.white ){
		this.gc.drawImage( surface.image,x,y );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,0,0,surface.swidth,surface.sheight );
}

gxtkGraphics.prototype.DrawSurface2=function( surface,x,y,srcx,srcy,srcw,srch ){
	if( !surface.image.complete ) return;

	if( srcw<0 ){ srcx+=srcw;srcw=-srcw; }
	if( srch<0 ){ srcy+=srch;srch=-srch; }
	if( srcw<=0 || srch<=0 ) return;

	if( this.white ){
		this.gc.drawImage( surface.image,srcx,srcy,srcw,srch,x,y,srcw,srch );
		return;
	}
	
	this.DrawImageTinted( surface.image,x,y,srcx,srcy,srcw,srch  );
}

gxtkGraphics.prototype.DrawImageTinted=function( image,dx,dy,sx,sy,sw,sh ){

	if( !this.tmpCanvas ){
		this.tmpCanvas=document.createElement( "canvas" );
	}

	if( sw>this.tmpCanvas.width || sh>this.tmpCanvas.height ){
		this.tmpCanvas.width=Math.max( sw,this.tmpCanvas.width );
		this.tmpCanvas.height=Math.max( sh,this.tmpCanvas.height );
	}
	
	var tmpGC=this.tmpCanvas.getContext( "2d" );
	tmpGC.globalCompositeOperation="copy";
	
	tmpGC.drawImage( image,sx,sy,sw,sh,0,0,sw,sh );
	
	var imgData=tmpGC.getImageData( 0,0,sw,sh );
	
	var p=imgData.data,sz=sw*sh*4,i;
	
	for( i=0;i<sz;i+=4 ){
		p[i]=p[i]*this.r/255;
		p[i+1]=p[i+1]*this.g/255;
		p[i+2]=p[i+2]*this.b/255;
	}
	
	tmpGC.putImageData( imgData,0,0 );
	
	this.gc.drawImage( this.tmpCanvas,0,0,sw,sh,dx,dy,sw,sh );
}

gxtkGraphics.prototype.ReadPixels=function( pixels,x,y,width,height,offset,pitch ){

	var imgData=this.gc.getImageData( x,y,width,height );
	
	var p=imgData.data,i=0,j=offset,px,py;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			pixels[j++]=(p[i+3]<<24)|(p[i]<<16)|(p[i+1]<<8)|p[i+2];
			i+=4;
		}
		j+=pitch-width;
	}
}

gxtkGraphics.prototype.WritePixels2=function( surface,pixels,x,y,width,height,offset,pitch ){

	if( !surface.gc ){
		if( !surface.image.complete ) return;
		var canvas=document.createElement( "canvas" );
		canvas.width=surface.swidth;
		canvas.height=surface.sheight;
		surface.gc=canvas.getContext( "2d" );
		surface.gc.globalCompositeOperation="copy";
		surface.gc.drawImage( surface.image,0,0 );
		surface.image=canvas;
	}

	var imgData=surface.gc.createImageData( width,height );

	var p=imgData.data,i=0,j=offset,px,py,argb;
	
	for( py=0;py<height;++py ){
		for( px=0;px<width;++px ){
			argb=pixels[j++];
			p[i]=(argb>>16) & 0xff;
			p[i+1]=(argb>>8) & 0xff;
			p[i+2]=argb & 0xff;
			p[i+3]=(argb>>24) & 0xff;
			i+=4;
		}
		j+=pitch-width;
	}
	
	surface.gc.putImageData( imgData,x,y );
}

//***** gxtkSurface class *****

function gxtkSurface( image,graphics ){
	this.image=image;
	this.graphics=graphics;
	this.swidth=image.meta_width;
	this.sheight=image.meta_height;
}

//***** GXTK API *****

gxtkSurface.prototype.Discard=function(){
	if( this.image ){
		this.image=null;
	}
}

gxtkSurface.prototype.Width=function(){
	return this.swidth;
}

gxtkSurface.prototype.Height=function(){
	return this.sheight;
}

gxtkSurface.prototype.Loaded=function(){
	return this.image.complete;
}

gxtkSurface.prototype.OnUnsafeLoadComplete=function(){
	return true;
}

//***** gxtkChannel class *****
function gxtkChannel(){
	this.sample=null;
	this.audio=null;
	this.volume=1;
	this.pan=0;
	this.rate=1;
	this.flags=0;
	this.state=0;
}

//***** gxtkAudio class *****
function gxtkAudio(){
	this.game=BBHtml5Game.Html5Game();
	this.okay=typeof(Audio)!="undefined";
	this.nextchan=0;
	this.music=null;
	this.channels=new Array(33);
	for( var i=0;i<33;++i ){
		this.channels[i]=new gxtkChannel();
	}
}

gxtkAudio.prototype.Suspend=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.pause();
	}
}

gxtkAudio.prototype.Resume=function(){
	var i;
	for( i=0;i<33;++i ){
		var chan=this.channels[i];
		if( chan.state==1 ) chan.audio.play();
	}
}

gxtkAudio.prototype.LoadSample=function( path ){

	var audio=new Audio( this.game.PathToUrl( path ) );
	if( !audio ) return null;
	
	return new gxtkSample( audio );
}

gxtkAudio.prototype.PlaySample=function( sample,channel,flags ){
	if( !this.okay ) return;

	var chan=this.channels[channel];

	if( chan.state!=0 ){
		chan.audio.pause();
		chan.state=0;
	}
	
	for( var i=0;i<33;++i ){
		var chan2=this.channels[i];
		if( chan2.state==1 && chan2.audio.ended && !chan2.audio.loop ) chan.state=0;
		if( chan2.state==0 && chan2.sample ){
			chan2.sample.FreeAudio( chan2.audio );
			chan2.sample=null;
			chan2.audio=null;
		}
	}

	var audio=sample.AllocAudio();
	if( !audio ) return;
	
	audio.loop=(flags&1)!=0;
	audio.volume=chan.volume;
	audio.play();

	chan.sample=sample;
	chan.audio=audio;
	chan.flags=flags;
	chan.state=1;
}

gxtkAudio.prototype.StopChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state!=0 ){
		chan.audio.pause();
		chan.state=0;
	}
}

gxtkAudio.prototype.PauseChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==1 ){
		if( chan.audio.ended && !chan.audio.loop ){
			chan.state=0;
		}else{
			chan.audio.pause();
			chan.state=2;
		}
	}
}

gxtkAudio.prototype.ResumeChannel=function( channel ){
	var chan=this.channels[channel];
	
	if( chan.state==2 ){
		chan.audio.play();
		chan.state=1;
	}
}

gxtkAudio.prototype.ChannelState=function( channel ){
	var chan=this.channels[channel];
	if( chan.state==1 && chan.audio.ended && !chan.audio.loop ) chan.state=0;
	return chan.state;
}

gxtkAudio.prototype.SetVolume=function( channel,volume ){
	var chan=this.channels[channel];
	if( chan.state!=0 ) chan.audio.volume=volume;
	chan.volume=volume;
}

gxtkAudio.prototype.SetPan=function( channel,pan ){
	var chan=this.channels[channel];
	chan.pan=pan;
}

gxtkAudio.prototype.SetRate=function( channel,rate ){
	var chan=this.channels[channel];
	chan.rate=rate;
}

gxtkAudio.prototype.PlayMusic=function( path,flags ){
	this.StopMusic();
	
	this.music=this.LoadSample( path );
	if( !this.music ) return;
	
	this.PlaySample( this.music,32,flags );
}

gxtkAudio.prototype.StopMusic=function(){
	this.StopChannel( 32 );

	if( this.music ){
		this.music.Discard();
		this.music=null;
	}
}

gxtkAudio.prototype.PauseMusic=function(){
	this.PauseChannel( 32 );
}

gxtkAudio.prototype.ResumeMusic=function(){
	this.ResumeChannel( 32 );
}

gxtkAudio.prototype.MusicState=function(){
	return this.ChannelState( 32 );
}

gxtkAudio.prototype.SetMusicVolume=function( volume ){
	this.SetVolume( 32,volume );
}

//***** gxtkSample class *****

function gxtkSample( audio ){
	this.audio=audio;
	this.free=new Array();
	this.insts=new Array();
}

gxtkSample.prototype.FreeAudio=function( audio ){
	this.free.push( audio );
}

gxtkSample.prototype.AllocAudio=function(){
	var audio;
	while( this.free.length ){
		audio=this.free.pop();
		try{
			audio.currentTime=0;
			return audio;
		}catch( ex ){
			print( "AUDIO ERROR1!" );
		}
	}
	
	//Max out?
	if( this.insts.length==8 ) return null;
	
	audio=new Audio( this.audio.src );
	
	//yucky loop handler for firefox!
	//
	audio.addEventListener( 'ended',function(){
		if( this.loop ){
			try{
				this.currentTime=0;
				this.play();
			}catch( ex ){
				print( "AUDIO ERROR2!" );
			}
		}
	},false );

	this.insts.push( audio );
	return audio;
}

gxtkSample.prototype.Discard=function(){
}

function BBThread(){
	this.running=false;
}

BBThread.prototype.Start=function(){
	this.running=true;
	this.Run__UNSAFE__();
}

BBThread.prototype.IsRunning=function(){
	return this.running;
}

BBThread.prototype.Run__UNSAFE__=function(){
	this.running=false;
}

function BBAsyncImageLoaderThread(){
	BBThread.call(this);
}

BBAsyncImageLoaderThread.prototype=extend_class( BBThread );

BBAsyncImageLoaderThread.prototype.Start=function(){

	var thread=this;

	var image=new Image();
	
	image.onload=function( e ){
		image.meta_width=image.width;
		image.meta_height=image.height;
		thread._surface=new gxtkSurface( image,thread._device )
		thread.running=false;
	}
	
	image.onerror=function( e ){
		thread._surface=null;
		thread.running=false;
	}
	
	thread.running=true;
	
	image.src=BBGame.Game().PathToUrl( thread._path );
}


function BBAsyncSoundLoaderThread(){
	BBThread.call(this);
}

BBAsyncSoundLoaderThread.prototype=extend_class( BBThread );

BBAsyncSoundLoaderThread.prototype.Start=function(){
	this._sample=this._device.LoadSample( this._path );
}
function c_App(){
	Object.call(this);
}
c_App.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<99>";
	if((bb_app__app)!=null){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<99>";
		error("App has already been created");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<100>";
	bb_app__app=this;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<102>";
	bb_app__delegate=c_GameDelegate.m_new.call(new c_GameDelegate);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<103>";
	bb_app__game.SetDelegate(bb_app__delegate);
	pop_err();
	return this;
}
c_App.prototype.p_OnCreate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnSuspend=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnResume=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnUpdate=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnLoading=function(){
	push_err();
	pop_err();
	return 0;
}
c_App.prototype.p_OnRender=function(){
	push_err();
	pop_err();
	return 0;
}
function c_Game(){
	c_App.call(this);
	this.m_isTouching=false;
	this.m_wasTouching=false;
	this.m_isSliced=false;
	this.m_slicedTimerStart=0;
	this.m_slicedTimer=0;
	this.m_slicedAlphaTimer=0;
	this.m_currentShape=null;
	this.m_shape1=null;
	this.m_shape2=null;
	this.m_currentLevel=0;
	this.m_lineList=c_List3.m_new.call(new c_List3);
	this.m_ballList=c_List4.m_new.call(new c_List4);
	this.m_touchStartX=.0;
	this.m_touchStartY=.0;
	this.m_slicedAlphaTimerStart=0;
	this.m_slicedAlpha=.0;
	this.m_slicedShape=[];
	this.m_slicedShapeComplex=null;
}
c_Game.prototype=extend_class(c_App);
c_Game.m_new=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<28>";
	c_App.m_new.call(this);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<28>";
	pop_err();
	return this;
}
c_Game.prototype.p_OnCreate=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<54>";
	bb_app_SetUpdateRate(60);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<57>";
	bb_autofit_SetVirtualDisplay(480,800,1.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<60>";
	this.m_isTouching=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<61>";
	this.m_wasTouching=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<64>";
	this.m_isSliced=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<65>";
	this.m_slicedTimerStart=bb_app_Millisecs();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<66>";
	this.m_slicedTimer=700;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<67>";
	this.m_slicedAlphaTimer=5;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<70>";
	this.m_currentShape=c_currentShape.m_new.call(new c_currentShape);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<73>";
	this.m_shape1=c_shape1.m_new.call(new c_shape1);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<76>";
	this.m_shape2=c_shape2.m_new.call(new c_shape2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<79>";
	this.m_currentLevel=2;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<80>";
	if(this.m_currentLevel==1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<81>";
		this.m_currentShape.p_setShape(dbg_object(this.m_shape1).m_shapeArray,dbg_object(this.m_shape1).m_complexShapeArray,dbg_object(this.m_shape1).m_solidLines,dbg_object(this.m_shape1).m_area,dbg_object(this.m_shape1).m_r,dbg_object(this.m_shape1).m_g,dbg_object(this.m_shape1).m_b);
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<82>";
		bb_functions_removeLines(this.m_lineList);
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<83>";
		bb_functions_addLines(dbg_object(this.m_shape1).m_shapeArray,this.m_lineList);
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<84>";
		if(this.m_currentLevel==2){
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<85>";
			this.m_currentShape.p_setShape(dbg_object(this.m_shape2).m_shapeArray,dbg_object(this.m_shape2).m_complexShapeArray,dbg_object(this.m_shape2).m_solidLines,dbg_object(this.m_shape2).m_area,dbg_object(this.m_shape2).m_r,dbg_object(this.m_shape2).m_g,dbg_object(this.m_shape2).m_b);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<86>";
			bb_functions_removeLines(this.m_lineList);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<87>";
			bb_functions_addLines(dbg_object(this.m_shape2).m_shapeArray,this.m_lineList);
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<91>";
	var t_angle=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<92>";
	for(var t_i=0;t_i<=0;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<93>";
		var t_b=c_ball.m_new.call(new c_ball,153.0,448.0,10.0,1.5,0.0,255,255,255);
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<94>";
		this.m_ballList.p_AddLast4(t_b);
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<98>";
	pop_err();
	return 0;
}
c_Game.prototype.p_OnUpdate=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<106>";
	if((bb_input_TouchDown(0))!=0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<109>";
		if(this.m_isTouching==false){
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<110>";
			this.m_touchStartX=bb_autofit_VTouchX(0,true);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<111>";
			this.m_touchStartY=bb_autofit_VTouchY(0,true);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<112>";
			this.m_isTouching=true;
		}
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<119>";
		if(this.m_isTouching==true){
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<120>";
			this.m_isTouching=false;
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<121>";
			this.m_wasTouching=true;
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<127>";
	bb_functions_updateBall(this.m_ballList,this.m_lineList);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<130>";
	if(this.m_wasTouching==true){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<131>";
		if(bb_functions_getIntersections(dbg_object(this.m_currentShape).m_shapeArray,this.m_touchStartX,this.m_touchStartY) % 2==0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<132>";
			dbg_object(this.m_currentShape).m_shapeArray=bb_functions_sliceShape(dbg_object(this.m_currentShape).m_shapeArray,dbg_object(this.m_currentShape).m_solidLines,this.m_touchStartX,this.m_touchStartY);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<133>";
			dbg_object(this.m_currentShape).m_complexShapeArray=bb_polyCommands_TriangulatePoly(dbg_object(this.m_currentShape).m_shapeArray);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<134>";
			bb_functions_removeSolidLines(dbg_object(this.m_currentShape).m_shapeArray,dbg_object(this.m_currentShape).m_solidLines);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<135>";
			bb_functions_removeLines(this.m_lineList);
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<136>";
			bb_functions_addLines(dbg_object(this.m_currentShape).m_shapeArray,this.m_lineList);
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<138>";
		this.m_wasTouching=false;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<142>";
	if(bb_functions_getSliced()==true){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<143>";
		this.m_slicedTimerStart=bb_app_Millisecs();
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<144>";
		this.m_slicedAlphaTimerStart=bb_app_Millisecs();
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<145>";
		this.m_isSliced=true;
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<146>";
		this.m_slicedAlpha=0.9;
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<147>";
		this.m_slicedShape=bb_functions_getSlicedShape();
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<148>";
		this.m_slicedShapeComplex=bb_functions_getSlicedShapeComplex();
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<149>";
		bb_functions_setSliced(false);
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<153>";
	if(this.m_isSliced==true){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<154>";
		if(bb_app_Millisecs()>this.m_slicedAlphaTimerStart+this.m_slicedAlphaTimer){
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<155>";
			this.m_slicedAlpha=this.m_slicedAlpha-0.02;
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<156>";
			if(this.m_slicedAlpha<=0.0){
				err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<156>";
				this.m_slicedAlpha=0.0;
			}
			err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<157>";
			this.m_slicedAlphaTimerStart=bb_app_Millisecs();
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<162>";
	pop_err();
	return 0;
}
c_Game.prototype.p_OnRender=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<170>";
	bb_autofit_UpdateVirtualDisplay(true,true);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<173>";
	bb_graphics_Cls(32.0,32.0,32.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<176>";
	bb_graphics_SetColor(164.0,72.0,164.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<180>";
	bb_graphics_DrawPoly(dbg_object(this.m_currentShape).m_shapeArray);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<182>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<185>";
	bb_functions_drawSolidLines(dbg_object(this.m_currentShape).m_solidLines);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<203>";
	if(this.m_isTouching==true){
		err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<206>";
		bb_graphics_DrawLine(this.m_touchStartX,this.m_touchStartY,bb_autofit_VTouchX(0,true),bb_autofit_VTouchY(0,true));
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<211>";
	bb_functions_drawBalls(this.m_ballList);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<214>";
	bb_functions_drawLineClass(this.m_lineList);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<219>";
	bb_graphics_DrawText("FPS: "+String(bb_fps_getFPS()),.0,.0,.0,.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<220>";
	bb_graphics_DrawText("AREA: "+String((bb_polyCommands_shapeArea(dbg_object(this.m_currentShape).m_complexShapeArray))|0)+"/"+String(dbg_object(this.m_currentShape).m_area),.0,15.0,.0,.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<221>";
	bb_graphics_DrawText("PERCENT: "+String((bb_polyCommands_shapeArea(dbg_object(this.m_currentShape).m_complexShapeArray)/(dbg_object(this.m_currentShape).m_area)*100.0)|0)+"%",.0,30.0,.0,.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<222>";
	bb_graphics_DrawText("MOUSE: "+String(bb_autofit_VTouchX(0,true))+", "+String(bb_autofit_VTouchY(0,true)),.0,45.0,.0,.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<225>";
	pop_err();
	return 0;
}
var bb_app__app=null;
function c_GameDelegate(){
	BBGameDelegate.call(this);
	this.m__graphics=null;
	this.m__audio=null;
	this.m__input=null;
}
c_GameDelegate.prototype=extend_class(BBGameDelegate);
c_GameDelegate.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<26>";
	pop_err();
	return this;
}
c_GameDelegate.prototype.StartGame=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<35>";
	this.m__graphics=(new gxtkGraphics);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<36>";
	bb_graphics_SetGraphicsDevice(this.m__graphics);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<37>";
	bb_graphics_SetFont(null,32);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<39>";
	this.m__audio=(new gxtkAudio);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<40>";
	bb_audio_SetAudioDevice(this.m__audio);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<42>";
	this.m__input=c_InputDevice.m_new.call(new c_InputDevice);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<43>";
	bb_input_SetInputDevice(this.m__input);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<45>";
	bb_app__app.p_OnCreate();
	pop_err();
}
c_GameDelegate.prototype.SuspendGame=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<49>";
	bb_app__app.p_OnSuspend();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<50>";
	this.m__audio.Suspend();
	pop_err();
}
c_GameDelegate.prototype.ResumeGame=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<54>";
	this.m__audio.Resume();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<55>";
	bb_app__app.p_OnResume();
	pop_err();
}
c_GameDelegate.prototype.UpdateGame=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<59>";
	this.m__input.p_BeginUpdate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<60>";
	bb_app__app.p_OnUpdate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<61>";
	this.m__input.p_EndUpdate();
	pop_err();
}
c_GameDelegate.prototype.RenderGame=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<65>";
	var t_mode=this.m__graphics.BeginRender();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<66>";
	if((t_mode)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<66>";
		bb_graphics_BeginRender();
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<67>";
	if(t_mode==2){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<67>";
		bb_app__app.p_OnLoading();
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<67>";
		bb_app__app.p_OnRender();
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<68>";
	if((t_mode)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<68>";
		bb_graphics_EndRender();
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<69>";
	this.m__graphics.EndRender();
	pop_err();
}
c_GameDelegate.prototype.KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<73>";
	this.m__input.p_KeyEvent(t_event,t_data);
	pop_err();
}
c_GameDelegate.prototype.MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<77>";
	this.m__input.p_MouseEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<81>";
	this.m__input.p_TouchEvent(t_event,t_data,t_x,t_y);
	pop_err();
}
c_GameDelegate.prototype.MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<85>";
	this.m__input.p_MotionEvent(t_event,t_data,t_x,t_y,t_z);
	pop_err();
}
c_GameDelegate.prototype.DiscardGraphics=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<89>";
	this.m__graphics.DiscardGraphics();
	pop_err();
}
var bb_app__delegate=null;
var bb_app__game=null;
function bbMain(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<20>";
	c_Game.m_new.call(new c_Game);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<23>";
	pop_err();
	return 0;
}
var bb_graphics_device=null;
function bb_graphics_SetGraphicsDevice(t_dev){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<58>";
	bb_graphics_device=t_dev;
	pop_err();
	return 0;
}
function c_Image(){
	Object.call(this);
	this.m_surface=null;
	this.m_width=0;
	this.m_height=0;
	this.m_frames=[];
	this.m_flags=0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_source=null;
}
c_Image.m_DefaultFlags=0;
c_Image.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<65>";
	pop_err();
	return this;
}
c_Image.prototype.p_SetHandle=function(t_tx,t_ty){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<109>";
	dbg_object(this).m_tx=t_tx;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<110>";
	dbg_object(this).m_ty=t_ty;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<111>";
	dbg_object(this).m_flags=dbg_object(this).m_flags&-2;
	pop_err();
	return 0;
}
c_Image.prototype.p_ApplyFlags=function(t_iflags){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<184>";
	this.m_flags=t_iflags;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<186>";
	if((this.m_flags&2)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<187>";
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<187>";
		var t_=this.m_frames;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<187>";
		var t_2=0;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<187>";
		while(t_2<t_.length){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<187>";
			var t_f=dbg_array(t_,t_2)[dbg_index];
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<187>";
			t_2=t_2+1;
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<188>";
			dbg_object(t_f).m_x+=1;
		}
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<190>";
		this.m_width-=2;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<193>";
	if((this.m_flags&4)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<194>";
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<194>";
		var t_3=this.m_frames;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<194>";
		var t_4=0;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<194>";
		while(t_4<t_3.length){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<194>";
			var t_f2=dbg_array(t_3,t_4)[dbg_index];
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<194>";
			t_4=t_4+1;
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<195>";
			dbg_object(t_f2).m_y+=1;
		}
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<197>";
		this.m_height-=2;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<200>";
	if((this.m_flags&1)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<201>";
		this.p_SetHandle((this.m_width)/2.0,(this.m_height)/2.0);
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<204>";
	if(this.m_frames.length==1 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_x==0 && dbg_object(dbg_array(this.m_frames,0)[dbg_index]).m_y==0 && this.m_width==this.m_surface.Width() && this.m_height==this.m_surface.Height()){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<205>";
		this.m_flags|=65536;
	}
	pop_err();
	return 0;
}
c_Image.prototype.p_Init=function(t_surf,t_nframes,t_iflags){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<142>";
	this.m_surface=t_surf;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<144>";
	this.m_width=((this.m_surface.Width()/t_nframes)|0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<145>";
	this.m_height=this.m_surface.Height();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<147>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<148>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<149>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_i*this.m_width,0)
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<152>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<153>";
	pop_err();
	return this;
}
c_Image.prototype.p_Grab=function(t_x,t_y,t_iwidth,t_iheight,t_nframes,t_iflags,t_source){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<157>";
	dbg_object(this).m_source=t_source;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<158>";
	this.m_surface=dbg_object(t_source).m_surface;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<160>";
	this.m_width=t_iwidth;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<161>";
	this.m_height=t_iheight;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<163>";
	this.m_frames=new_object_array(t_nframes);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<165>";
	var t_ix=t_x;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<165>";
	var t_iy=t_y;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<167>";
	for(var t_i=0;t_i<t_nframes;t_i=t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<168>";
		if(t_ix+this.m_width>dbg_object(t_source).m_width){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<169>";
			t_ix=0;
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<170>";
			t_iy+=this.m_height;
		}
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<172>";
		if(t_ix+this.m_width>dbg_object(t_source).m_width || t_iy+this.m_height>dbg_object(t_source).m_height){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<173>";
			error("Image frame outside surface");
		}
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<175>";
		dbg_array(this.m_frames,t_i)[dbg_index]=c_Frame.m_new.call(new c_Frame,t_ix+dbg_object(dbg_array(dbg_object(t_source).m_frames,0)[dbg_index]).m_x,t_iy+dbg_object(dbg_array(dbg_object(t_source).m_frames,0)[dbg_index]).m_y)
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<176>";
		t_ix+=this.m_width;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<179>";
	this.p_ApplyFlags(t_iflags);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<180>";
	pop_err();
	return this;
}
c_Image.prototype.p_GrabImage=function(t_x,t_y,t_width,t_height,t_frames,t_flags){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<104>";
	if(dbg_object(this).m_frames.length!=1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<104>";
		pop_err();
		return null;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<105>";
	var t_=(c_Image.m_new.call(new c_Image)).p_Grab(t_x,t_y,t_width,t_height,t_frames,t_flags,this);
	pop_err();
	return t_;
}
c_Image.prototype.p_Width=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<76>";
	pop_err();
	return this.m_width;
}
c_Image.prototype.p_Height=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<80>";
	pop_err();
	return this.m_height;
}
c_Image.prototype.p_Frames=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<88>";
	var t_=this.m_frames.length;
	pop_err();
	return t_;
}
function c_GraphicsContext(){
	Object.call(this);
	this.m_defaultFont=null;
	this.m_font=null;
	this.m_firstChar=0;
	this.m_matrixSp=0;
	this.m_ix=1.0;
	this.m_iy=.0;
	this.m_jx=.0;
	this.m_jy=1.0;
	this.m_tx=.0;
	this.m_ty=.0;
	this.m_tformed=0;
	this.m_matDirty=0;
	this.m_color_r=.0;
	this.m_color_g=.0;
	this.m_color_b=.0;
	this.m_alpha=.0;
	this.m_blend=0;
	this.m_scissor_x=.0;
	this.m_scissor_y=.0;
	this.m_scissor_width=.0;
	this.m_scissor_height=.0;
	this.m_matrixStack=new_number_array(192);
}
c_GraphicsContext.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<24>";
	pop_err();
	return this;
}
c_GraphicsContext.prototype.p_Validate=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<35>";
	if((this.m_matDirty)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<36>";
		bb_graphics_renderDevice.SetMatrix(dbg_object(bb_graphics_context).m_ix,dbg_object(bb_graphics_context).m_iy,dbg_object(bb_graphics_context).m_jx,dbg_object(bb_graphics_context).m_jy,dbg_object(bb_graphics_context).m_tx,dbg_object(bb_graphics_context).m_ty);
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<37>";
		this.m_matDirty=0;
	}
	pop_err();
	return 0;
}
var bb_graphics_context=null;
function bb_data_FixDataPath(t_path){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/data.monkey<3>";
	var t_i=t_path.indexOf(":/",0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/data.monkey<4>";
	if(t_i!=-1 && t_path.indexOf("/",0)==t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/data.monkey<4>";
		pop_err();
		return t_path;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/data.monkey<5>";
	if(string_startswith(t_path,"./") || string_startswith(t_path,"/")){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/data.monkey<5>";
		pop_err();
		return t_path;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/data.monkey<6>";
	var t_="monkey://data/"+t_path;
	pop_err();
	return t_;
}
function c_Frame(){
	Object.call(this);
	this.m_x=0;
	this.m_y=0;
}
c_Frame.m_new=function(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<18>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<19>";
	dbg_object(this).m_y=t_y;
	pop_err();
	return this;
}
c_Frame.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<13>";
	pop_err();
	return this;
}
function bb_graphics_LoadImage(t_path,t_frameCount,t_flags){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<234>";
	var t_surf=bb_graphics_device.LoadSurface(bb_data_FixDataPath(t_path));
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<235>";
	if((t_surf)!=null){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<235>";
		var t_=(c_Image.m_new.call(new c_Image)).p_Init(t_surf,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_LoadImage2(t_path,t_frameWidth,t_frameHeight,t_frameCount,t_flags){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<239>";
	var t_atlas=bb_graphics_LoadImage(t_path,1,0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<240>";
	if((t_atlas)!=null){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<240>";
		var t_=t_atlas.p_GrabImage(0,0,t_frameWidth,t_frameHeight,t_frameCount,t_flags);
		pop_err();
		return t_;
	}
	pop_err();
	return null;
}
function bb_graphics_SetFont(t_font,t_firstChar){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<532>";
	if(!((t_font)!=null)){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<533>";
		if(!((dbg_object(bb_graphics_context).m_defaultFont)!=null)){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<534>";
			dbg_object(bb_graphics_context).m_defaultFont=bb_graphics_LoadImage("mojo_font.png",96,2);
		}
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<536>";
		t_font=dbg_object(bb_graphics_context).m_defaultFont;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<537>";
		t_firstChar=32;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<539>";
	dbg_object(bb_graphics_context).m_font=t_font;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<540>";
	dbg_object(bb_graphics_context).m_firstChar=t_firstChar;
	pop_err();
	return 0;
}
var bb_audio_device=null;
function bb_audio_SetAudioDevice(t_dev){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/audio.monkey<17>";
	bb_audio_device=t_dev;
	pop_err();
	return 0;
}
function c_InputDevice(){
	Object.call(this);
	this.m__joyStates=new_object_array(4);
	this.m__keyDown=new_bool_array(512);
	this.m__keyHit=new_number_array(512);
	this.m__charGet=0;
	this.m__charPut=0;
	this.m__charQueue=new_number_array(32);
	this.m__mouseX=.0;
	this.m__mouseY=.0;
	this.m__touchX=new_number_array(32);
	this.m__touchY=new_number_array(32);
	this.m__accelX=.0;
	this.m__accelY=.0;
	this.m__accelZ=.0;
}
c_InputDevice.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<20>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<21>";
		dbg_array(this.m__joyStates,t_i)[dbg_index]=c_JoyState.m_new.call(new c_JoyState)
	}
	pop_err();
	return this;
}
c_InputDevice.prototype.p_BeginUpdate=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<173>";
	for(var t_i=0;t_i<4;t_i=t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<174>";
		var t_state=dbg_array(this.m__joyStates,t_i)[dbg_index];
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<175>";
		if(!BBGame.Game().PollJoystick(t_i,dbg_object(t_state).m_joyx,dbg_object(t_state).m_joyy,dbg_object(t_state).m_joyz,dbg_object(t_state).m_buttons)){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<175>";
			break;
		}
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<176>";
		for(var t_j=0;t_j<32;t_j=t_j+1){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<177>";
			var t_key=256+t_i*32+t_j;
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<178>";
			if(dbg_array(dbg_object(t_state).m_buttons,t_j)[dbg_index]){
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<179>";
				if(!dbg_array(this.m__keyDown,t_key)[dbg_index]){
					err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<180>";
					dbg_array(this.m__keyDown,t_key)[dbg_index]=true
					err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<181>";
					dbg_array(this.m__keyHit,t_key)[dbg_index]+=1
				}
			}else{
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<184>";
				dbg_array(this.m__keyDown,t_key)[dbg_index]=false
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_EndUpdate=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<191>";
	for(var t_i=0;t_i<512;t_i=t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<192>";
		dbg_array(this.m__keyHit,t_i)[dbg_index]=0
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<194>";
	this.m__charGet=0;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<195>";
	this.m__charPut=0;
	pop_err();
}
c_InputDevice.prototype.p_KeyEvent=function(t_event,t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<99>";
	var t_=t_event;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<100>";
	if(t_==1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<101>";
		dbg_array(this.m__keyDown,t_data)[dbg_index]=true
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<102>";
		dbg_array(this.m__keyHit,t_data)[dbg_index]+=1
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<103>";
		if(t_data==1){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<104>";
			dbg_array(this.m__keyDown,384)[dbg_index]=true
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<105>";
			dbg_array(this.m__keyHit,384)[dbg_index]+=1
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<106>";
			if(t_data==384){
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<107>";
				dbg_array(this.m__keyDown,1)[dbg_index]=true
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<108>";
				dbg_array(this.m__keyHit,1)[dbg_index]+=1
			}
		}
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<110>";
		if(t_==2){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<111>";
			dbg_array(this.m__keyDown,t_data)[dbg_index]=false
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<112>";
			if(t_data==1){
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<113>";
				dbg_array(this.m__keyDown,384)[dbg_index]=false
			}else{
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<114>";
				if(t_data==384){
					err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<115>";
					dbg_array(this.m__keyDown,1)[dbg_index]=false
				}
			}
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<117>";
			if(t_==3){
				err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<118>";
				if(this.m__charPut<this.m__charQueue.length){
					err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<119>";
					dbg_array(this.m__charQueue,this.m__charPut)[dbg_index]=t_data
					err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<120>";
					this.m__charPut+=1;
				}
			}
		}
	}
	pop_err();
}
c_InputDevice.prototype.p_MouseEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<126>";
	var t_=t_event;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<127>";
	if(t_==4){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<128>";
		this.p_KeyEvent(1,1+t_data);
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<129>";
		if(t_==5){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<130>";
			this.p_KeyEvent(2,1+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<132>";
			if(t_==6){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<136>";
	this.m__mouseX=t_x;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<137>";
	this.m__mouseY=t_y;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<138>";
	dbg_array(this.m__touchX,0)[dbg_index]=t_x
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<139>";
	dbg_array(this.m__touchY,0)[dbg_index]=t_y
	pop_err();
}
c_InputDevice.prototype.p_TouchEvent=function(t_event,t_data,t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<143>";
	var t_=t_event;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<144>";
	if(t_==7){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<145>";
		this.p_KeyEvent(1,384+t_data);
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<146>";
		if(t_==8){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<147>";
			this.p_KeyEvent(2,384+t_data);
			pop_err();
			return;
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<149>";
			if(t_==9){
			}else{
				pop_err();
				return;
			}
		}
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<153>";
	dbg_array(this.m__touchX,t_data)[dbg_index]=t_x
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<154>";
	dbg_array(this.m__touchY,t_data)[dbg_index]=t_y
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<155>";
	if(t_data==0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<156>";
		this.m__mouseX=t_x;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<157>";
		this.m__mouseY=t_y;
	}
	pop_err();
}
c_InputDevice.prototype.p_MotionEvent=function(t_event,t_data,t_x,t_y,t_z){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<162>";
	var t_=t_event;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<163>";
	if(t_==10){
	}else{
		pop_err();
		return;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<167>";
	this.m__accelX=t_x;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<168>";
	this.m__accelY=t_y;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<169>";
	this.m__accelZ=t_z;
	pop_err();
}
c_InputDevice.prototype.p_KeyDown=function(t_key){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<40>";
	if(t_key>0 && t_key<512){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<40>";
		var t_=dbg_array(this.m__keyDown,t_key)[dbg_index];
		pop_err();
		return t_;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<41>";
	pop_err();
	return false;
}
c_InputDevice.prototype.p_TouchX=function(t_index){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<65>";
	if(t_index>=0 && t_index<32){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<65>";
		var t_=dbg_array(this.m__touchX,t_index)[dbg_index];
		pop_err();
		return t_;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<66>";
	pop_err();
	return .0;
}
c_InputDevice.prototype.p_TouchY=function(t_index){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<70>";
	if(t_index>=0 && t_index<32){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<70>";
		var t_=dbg_array(this.m__touchY,t_index)[dbg_index];
		pop_err();
		return t_;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<71>";
	pop_err();
	return .0;
}
function c_JoyState(){
	Object.call(this);
	this.m_joyx=new_number_array(2);
	this.m_joyy=new_number_array(2);
	this.m_joyz=new_number_array(2);
	this.m_buttons=new_bool_array(32);
}
c_JoyState.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/inputdevice.monkey<8>";
	pop_err();
	return this;
}
var bb_input_device=null;
function bb_input_SetInputDevice(t_dev){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/input.monkey<16>";
	bb_input_device=t_dev;
	pop_err();
	return 0;
}
var bb_graphics_renderDevice=null;
function bb_graphics_SetMatrix(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<307>";
	dbg_object(bb_graphics_context).m_ix=t_ix;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<308>";
	dbg_object(bb_graphics_context).m_iy=t_iy;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<309>";
	dbg_object(bb_graphics_context).m_jx=t_jx;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<310>";
	dbg_object(bb_graphics_context).m_jy=t_jy;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<311>";
	dbg_object(bb_graphics_context).m_tx=t_tx;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<312>";
	dbg_object(bb_graphics_context).m_ty=t_ty;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<313>";
	dbg_object(bb_graphics_context).m_tformed=((t_ix!=1.0 || t_iy!=.0 || t_jx!=.0 || t_jy!=1.0 || t_tx!=.0 || t_ty!=.0)?1:0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<314>";
	dbg_object(bb_graphics_context).m_matDirty=1;
	pop_err();
	return 0;
}
function bb_graphics_SetMatrix2(t_m){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<303>";
	bb_graphics_SetMatrix(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_SetColor(t_r,t_g,t_b){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<249>";
	dbg_object(bb_graphics_context).m_color_r=t_r;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<250>";
	dbg_object(bb_graphics_context).m_color_g=t_g;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<251>";
	dbg_object(bb_graphics_context).m_color_b=t_b;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<252>";
	bb_graphics_renderDevice.SetColor(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_SetAlpha(t_alpha){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<266>";
	dbg_object(bb_graphics_context).m_alpha=t_alpha;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<267>";
	bb_graphics_renderDevice.SetAlpha(t_alpha);
	pop_err();
	return 0;
}
function bb_graphics_SetBlend(t_blend){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<275>";
	dbg_object(bb_graphics_context).m_blend=t_blend;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<276>";
	bb_graphics_renderDevice.SetBlend(t_blend);
	pop_err();
	return 0;
}
function bb_graphics_DeviceWidth(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<226>";
	var t_=bb_graphics_device.Width();
	pop_err();
	return t_;
}
function bb_graphics_DeviceHeight(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<230>";
	var t_=bb_graphics_device.Height();
	pop_err();
	return t_;
}
function bb_graphics_SetScissor(t_x,t_y,t_width,t_height){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<284>";
	dbg_object(bb_graphics_context).m_scissor_x=t_x;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<285>";
	dbg_object(bb_graphics_context).m_scissor_y=t_y;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<286>";
	dbg_object(bb_graphics_context).m_scissor_width=t_width;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<287>";
	dbg_object(bb_graphics_context).m_scissor_height=t_height;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<288>";
	bb_graphics_renderDevice.SetScissor(((t_x)|0),((t_y)|0),((t_width)|0),((t_height)|0));
	pop_err();
	return 0;
}
function bb_graphics_BeginRender(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<212>";
	bb_graphics_renderDevice=bb_graphics_device;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<213>";
	dbg_object(bb_graphics_context).m_matrixSp=0;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<214>";
	bb_graphics_SetMatrix(1.0,.0,.0,1.0,.0,.0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<215>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<216>";
	bb_graphics_SetAlpha(1.0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<217>";
	bb_graphics_SetBlend(0);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<218>";
	bb_graphics_SetScissor(.0,.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	pop_err();
	return 0;
}
function bb_graphics_EndRender(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<222>";
	bb_graphics_renderDevice=null;
	pop_err();
	return 0;
}
function c_BBGameEvent(){
	Object.call(this);
}
var bb_app__updateRate=0;
function bb_app_SetUpdateRate(t_hertz){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<139>";
	bb_app__updateRate=t_hertz;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<140>";
	bb_app__game.SetUpdateRate(t_hertz);
	pop_err();
	return 0;
}
function c_VirtualDisplay(){
	Object.call(this);
	this.m_vwidth=.0;
	this.m_vheight=.0;
	this.m_vzoom=.0;
	this.m_lastvzoom=.0;
	this.m_vratio=.0;
	this.m_multi=.0;
	this.m_lastdevicewidth=0;
	this.m_lastdeviceheight=0;
	this.m_device_changed=0;
	this.m_fdw=.0;
	this.m_fdh=.0;
	this.m_dratio=.0;
	this.m_heightborder=.0;
	this.m_widthborder=.0;
	this.m_zoom_changed=0;
	this.m_realx=.0;
	this.m_realy=.0;
	this.m_offx=.0;
	this.m_offy=.0;
	this.m_sx=.0;
	this.m_sw=.0;
	this.m_sy=.0;
	this.m_sh=.0;
	this.m_scaledw=.0;
	this.m_scaledh=.0;
	this.m_vxoff=.0;
	this.m_vyoff=.0;
}
c_VirtualDisplay.m_Display=null;
c_VirtualDisplay.m_new=function(t_width,t_height,t_zoom){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<266>";
	this.m_vwidth=(t_width);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<267>";
	this.m_vheight=(t_height);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<269>";
	this.m_vzoom=t_zoom;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<270>";
	this.m_lastvzoom=this.m_vzoom+1.0;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<274>";
	this.m_vratio=this.m_vheight/this.m_vwidth;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<278>";
	c_VirtualDisplay.m_Display=this;
	pop_err();
	return this;
}
c_VirtualDisplay.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<216>";
	pop_err();
	return this;
}
c_VirtualDisplay.prototype.p_VTouchX=function(t_index,t_limit){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<370>";
	var t_touchoffset=bb_input_TouchX(t_index)-(bb_graphics_DeviceWidth())*0.5;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<374>";
	var t_x=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceWidth()*0.5;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<378>";
	if(t_limit){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<380>";
		var t_widthlimit=this.m_vwidth-1.0;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<382>";
		if(t_x>.0){
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<383>";
			if(t_x<t_widthlimit){
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<384>";
				pop_err();
				return t_x;
			}else{
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<386>";
				pop_err();
				return t_widthlimit;
			}
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<389>";
			pop_err();
			return .0;
		}
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<393>";
		pop_err();
		return t_x;
	}
}
c_VirtualDisplay.prototype.p_VTouchY=function(t_index,t_limit){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<404>";
	var t_touchoffset=bb_input_TouchY(t_index)-(bb_graphics_DeviceHeight())*0.5;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<408>";
	var t_y=t_touchoffset/this.m_multi/this.m_vzoom+bb_autofit_VDeviceHeight()*0.5;
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<412>";
	if(t_limit){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<414>";
		var t_heightlimit=this.m_vheight-1.0;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<416>";
		if(t_y>.0){
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<417>";
			if(t_y<t_heightlimit){
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<418>";
				pop_err();
				return t_y;
			}else{
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<420>";
				pop_err();
				return t_heightlimit;
			}
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<423>";
			pop_err();
			return .0;
		}
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<427>";
		pop_err();
		return t_y;
	}
}
c_VirtualDisplay.prototype.p_UpdateVirtualDisplay=function(t_zoomborders,t_keepborders){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<444>";
	if(bb_graphics_DeviceWidth()!=this.m_lastdevicewidth || bb_graphics_DeviceHeight()!=this.m_lastdeviceheight){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<445>";
		this.m_lastdevicewidth=bb_graphics_DeviceWidth();
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<446>";
		this.m_lastdeviceheight=bb_graphics_DeviceHeight();
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<447>";
		this.m_device_changed=1;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<454>";
	if((this.m_device_changed)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<459>";
		this.m_fdw=(bb_graphics_DeviceWidth());
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<460>";
		this.m_fdh=(bb_graphics_DeviceHeight());
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<465>";
		this.m_dratio=this.m_fdh/this.m_fdw;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<469>";
		if(this.m_dratio>this.m_vratio){
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<478>";
			this.m_multi=this.m_fdw/this.m_vwidth;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<482>";
			this.m_heightborder=(this.m_fdh-this.m_vheight*this.m_multi)*0.5;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<483>";
			this.m_widthborder=.0;
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<494>";
			this.m_multi=this.m_fdh/this.m_vheight;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<498>";
			this.m_widthborder=(this.m_fdw-this.m_vwidth*this.m_multi)*0.5;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<499>";
			this.m_heightborder=.0;
		}
	}
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<509>";
	if(this.m_vzoom!=this.m_lastvzoom){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<510>";
		this.m_lastvzoom=this.m_vzoom;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<511>";
		this.m_zoom_changed=1;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<518>";
	if(((this.m_zoom_changed)!=0) || ((this.m_device_changed)!=0)){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<520>";
		if(t_zoomborders){
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<524>";
			this.m_realx=this.m_vwidth*this.m_vzoom*this.m_multi;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<525>";
			this.m_realy=this.m_vheight*this.m_vzoom*this.m_multi;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<529>";
			this.m_offx=(this.m_fdw-this.m_realx)*0.5;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<530>";
			this.m_offy=(this.m_fdh-this.m_realy)*0.5;
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<532>";
			if(t_keepborders){
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<538>";
				if(this.m_offx<this.m_widthborder){
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<539>";
					this.m_sx=this.m_widthborder;
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<540>";
					this.m_sw=this.m_fdw-this.m_widthborder*2.0;
				}else{
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<542>";
					this.m_sx=this.m_offx;
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<543>";
					this.m_sw=this.m_fdw-this.m_offx*2.0;
				}
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<546>";
				if(this.m_offy<this.m_heightborder){
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<547>";
					this.m_sy=this.m_heightborder;
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<548>";
					this.m_sh=this.m_fdh-this.m_heightborder*2.0;
				}else{
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<550>";
					this.m_sy=this.m_offy;
					err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<551>";
					this.m_sh=this.m_fdh-this.m_offy*2.0;
				}
			}else{
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<556>";
				this.m_sx=this.m_offx;
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<557>";
				this.m_sw=this.m_fdw-this.m_offx*2.0;
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<559>";
				this.m_sy=this.m_offy;
				err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<560>";
				this.m_sh=this.m_fdh-this.m_offy*2.0;
			}
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<566>";
			this.m_sx=bb_math_Max2(0.0,this.m_sx);
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<567>";
			this.m_sy=bb_math_Max2(0.0,this.m_sy);
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<568>";
			this.m_sw=bb_math_Min2(this.m_sw,this.m_fdw);
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<569>";
			this.m_sh=bb_math_Min2(this.m_sh,this.m_fdh);
		}else{
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<575>";
			this.m_sx=bb_math_Max2(0.0,this.m_widthborder);
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<576>";
			this.m_sy=bb_math_Max2(0.0,this.m_heightborder);
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<577>";
			this.m_sw=bb_math_Min2(this.m_fdw-this.m_widthborder*2.0,this.m_fdw);
			err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<578>";
			this.m_sh=bb_math_Min2(this.m_fdh-this.m_heightborder*2.0,this.m_fdh);
		}
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<584>";
		this.m_scaledw=this.m_vwidth*this.m_multi*this.m_vzoom;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<585>";
		this.m_scaledh=this.m_vheight*this.m_multi*this.m_vzoom;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<589>";
		this.m_vxoff=(this.m_fdw-this.m_scaledw)*0.5;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<590>";
		this.m_vyoff=(this.m_fdh-this.m_scaledh)*0.5;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<594>";
		this.m_vxoff=this.m_vxoff/this.m_multi/this.m_vzoom;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<595>";
		this.m_vyoff=this.m_vyoff/this.m_multi/this.m_vzoom;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<599>";
		this.m_device_changed=0;
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<600>";
		this.m_zoom_changed=0;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<608>";
	bb_graphics_SetScissor(.0,.0,(bb_graphics_DeviceWidth()),(bb_graphics_DeviceHeight()));
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<609>";
	bb_graphics_Cls(.0,.0,.0);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<615>";
	bb_graphics_SetScissor(this.m_sx,this.m_sy,this.m_sw,this.m_sh);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<621>";
	bb_graphics_Scale(this.m_multi*this.m_vzoom,this.m_multi*this.m_vzoom);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<627>";
	if((this.m_vzoom)!=0.0){
		err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<627>";
		bb_graphics_Translate(this.m_vxoff,this.m_vyoff);
	}
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<629>";
	pop_err();
	return 0;
}
function bb_autofit_SetVirtualDisplay(t_width,t_height,t_zoom){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<110>";
	c_VirtualDisplay.m_new.call(new c_VirtualDisplay,t_width,t_height,t_zoom);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<111>";
	pop_err();
	return 0;
}
function bb_app_Millisecs(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/app.monkey<148>";
	var t_=bb_app__game.Millisecs();
	pop_err();
	return t_;
}
function c_currentShape(){
	Object.call(this);
	this.m_shapeArray=[];
	this.m_complexShapeArray=null;
	this.m_solidLines=[];
	this.m_area=0;
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
c_currentShape.m_new=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<233>";
	pop_err();
	return this;
}
c_currentShape.prototype.p_setShape=function(t_sArray,t_cArray,t_sLines,t_a,t_red,t_green,t_blue){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<243>";
	dbg_object(this).m_shapeArray=t_sArray;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<244>";
	dbg_object(this).m_complexShapeArray=t_cArray;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<245>";
	dbg_object(this).m_solidLines=t_sLines;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<246>";
	dbg_object(this).m_area=t_a;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<247>";
	dbg_object(this).m_r=t_red;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<248>";
	dbg_object(this).m_g=t_green;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<249>";
	dbg_object(this).m_b=t_blue;
	pop_err();
}
function c_shape1(){
	Object.call(this);
	this.m_shapeArray=new_number_array(12);
	this.m_complexShapeArray=null;
	this.m_solidLines=new_number_array(4);
	this.m_area=0;
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
c_shape1.m_new=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<268>";
	dbg_array(dbg_object(this).m_shapeArray,0)[dbg_index]=268.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<269>";
	dbg_array(dbg_object(this).m_shapeArray,1)[dbg_index]=230.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<270>";
	dbg_array(dbg_object(this).m_shapeArray,2)[dbg_index]=405.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<271>";
	dbg_array(dbg_object(this).m_shapeArray,3)[dbg_index]=336.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<272>";
	dbg_array(dbg_object(this).m_shapeArray,4)[dbg_index]=295.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<273>";
	dbg_array(dbg_object(this).m_shapeArray,5)[dbg_index]=558.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<274>";
	dbg_array(dbg_object(this).m_shapeArray,6)[dbg_index]=88.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<275>";
	dbg_array(dbg_object(this).m_shapeArray,7)[dbg_index]=510.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<276>";
	dbg_array(dbg_object(this).m_shapeArray,8)[dbg_index]=63.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<277>";
	dbg_array(dbg_object(this).m_shapeArray,9)[dbg_index]=320.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<278>";
	dbg_array(dbg_object(this).m_shapeArray,10)[dbg_index]=156.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<279>";
	dbg_array(dbg_object(this).m_shapeArray,11)[dbg_index]=218.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<282>";
	dbg_object(this).m_complexShapeArray=bb_polyCommands_TriangulatePoly(dbg_object(this).m_shapeArray);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<285>";
	dbg_array(dbg_object(this).m_solidLines,0)[dbg_index]=268.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<286>";
	dbg_array(dbg_object(this).m_solidLines,1)[dbg_index]=230.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<287>";
	dbg_array(dbg_object(this).m_solidLines,2)[dbg_index]=405.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<288>";
	dbg_array(dbg_object(this).m_solidLines,3)[dbg_index]=336.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<292>";
	dbg_object(this).m_area=((bb_polyCommands_shapeArea(dbg_object(this).m_complexShapeArray))|0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<295>";
	dbg_object(this).m_r=164;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<296>";
	dbg_object(this).m_g=72;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<297>";
	dbg_object(this).m_b=164;
	pop_err();
	return this;
}
function c_tri(){
	Object.call(this);
	this.m_point1=null;
	this.m_point2=null;
	this.m_point3=null;
}
c_tri.m_new=function(t_p1,t_p2,t_p3){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<445>";
	dbg_object(this).m_point1=t_p1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<446>";
	dbg_object(this).m_point2=t_p2;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<447>";
	dbg_object(this).m_point3=t_p3;
	pop_err();
	return this;
}
c_tri.m_new2=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<441>";
	pop_err();
	return this;
}
function c_List(){
	Object.call(this);
	this.m__head=(c_HeadNode.m_new.call(new c_HeadNode));
}
c_List.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List.prototype.p_AddLast=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<120>";
	var t_=c_Node.m_new.call(new c_Node,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List.m_new2=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<14>";
		this.p_AddLast(t_t);
	}
	pop_err();
	return this;
}
c_List.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<124>";
	var t_=c_Enumerator2.m_new.call(new c_Enumerator2,this);
	pop_err();
	return t_;
}
function c_Node(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<199>";
	this.m__succ=t_succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<200>";
	this.m__pred=t_pred;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<201>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<202>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<203>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<196>";
	pop_err();
	return this;
}
function c_HeadNode(){
	c_Node.call(this);
}
c_HeadNode.prototype=extend_class(c_Node);
c_HeadNode.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<248>";
	c_Node.m_new2.call(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<249>";
	this.m__succ=(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<250>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_point(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
}
c_point.m_new=function(t_px,t_py){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<436>";
	dbg_object(this).m_x=t_px;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<437>";
	dbg_object(this).m_y=t_py;
	pop_err();
	return this;
}
c_point.m_new2=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<432>";
	pop_err();
	return this;
}
function c_List2(){
	Object.call(this);
	this.m__head=(c_HeadNode2.m_new.call(new c_HeadNode2));
}
c_List2.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List2.prototype.p_AddLast2=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<120>";
	var t_=c_Node2.m_new.call(new c_Node2,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List2.m_new2=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<14>";
		this.p_AddLast2(t_t);
	}
	pop_err();
	return this;
}
c_List2.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<124>";
	var t_=c_Enumerator.m_new.call(new c_Enumerator,this);
	pop_err();
	return t_;
}
c_List2.prototype.p_IsEmpty=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<50>";
	var t_=dbg_object(this.m__head).m__succ==this.m__head;
	pop_err();
	return t_;
}
c_List2.prototype.p_First=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<71>";
	if(this.p_IsEmpty()){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<71>";
		error("Illegal operation on empty list");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<73>";
	var t_=dbg_object(this.m__head.p_NextNode()).m__data;
	pop_err();
	return t_;
}
c_List2.prototype.p_Last=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<78>";
	if(this.p_IsEmpty()){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<78>";
		error("Illegal operation on empty list");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<80>";
	var t_=dbg_object(this.m__head.p_PrevNode()).m__data;
	pop_err();
	return t_;
}
c_List2.prototype.p_Equals=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_List2.prototype.p_RemoveEach=function(t_value){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<107>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<108>";
	while(t_node!=this.m__head){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<109>";
		var t_succ=dbg_object(t_node).m__succ;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<110>";
		if(this.p_Equals(dbg_object(t_node).m__data,t_value)){
			err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<110>";
			t_node.p_Remove2();
		}
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<111>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
c_List2.prototype.p_Remove=function(t_value){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<103>";
	this.p_RemoveEach(t_value);
	pop_err();
	return 0;
}
c_List2.prototype.p_Count=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<41>";
	var t_n=0;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<41>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<42>";
	while(t_node!=this.m__head){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<43>";
		t_node=dbg_object(t_node).m__succ;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<44>";
		t_n+=1;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<46>";
	pop_err();
	return t_n;
}
function c_Node2(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node2.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<199>";
	this.m__succ=t_succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<200>";
	this.m__pred=t_pred;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<201>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<202>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<203>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node2.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<196>";
	pop_err();
	return this;
}
c_Node2.prototype.p_GetNode=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<239>";
	pop_err();
	return this;
}
c_Node2.prototype.p_NextNode=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<220>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<220>";
		error("Illegal operation on removed node");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<222>";
	var t_=this.m__succ.p_GetNode();
	pop_err();
	return t_;
}
c_Node2.prototype.p_PrevNode=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<227>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<227>";
		error("Illegal operation on removed node");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<229>";
	var t_=this.m__pred.p_GetNode();
	pop_err();
	return t_;
}
c_Node2.prototype.p_Remove2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<212>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<212>";
		error("Illegal operation on removed node");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<214>";
	dbg_object(this.m__succ).m__pred=this.m__pred;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<215>";
	dbg_object(this.m__pred).m__succ=this.m__succ;
	pop_err();
	return 0;
}
function c_HeadNode2(){
	c_Node2.call(this);
}
c_HeadNode2.prototype=extend_class(c_Node2);
c_HeadNode2.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<248>";
	c_Node2.m_new2.call(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<249>";
	this.m__succ=(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<250>";
	this.m__pred=(this);
	pop_err();
	return this;
}
c_HeadNode2.prototype.p_GetNode=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<254>";
	pop_err();
	return null;
}
function bb_polyCommands_getMidPoint(t_point1,t_point2){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<334>";
	var t_midPointX=(dbg_object(t_point1).m_x+dbg_object(t_point2).m_x)/2.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<335>";
	var t_midPointY=(dbg_object(t_point1).m_y+dbg_object(t_point2).m_y)/2.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<336>";
	var t_midPoint=c_point.m_new.call(new c_point,t_midPointX,t_midPointY);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<337>";
	pop_err();
	return t_midPoint;
}
function bb_polyCommands_getLineAngle(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<342>";
	var t_dx=t_x2-t_x1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<343>";
	var t_dy=t_y2-t_y1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<344>";
	var t_=(Math.atan2(t_dy,t_dx)*R2D);
	pop_err();
	return t_;
}
function bb_polyCommands_getAnglePoint(t_point1,t_point2,t_point3){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<323>";
	var t_midPoint=bb_polyCommands_getMidPoint(t_point2,t_point3);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<325>";
	var t_angle=bb_polyCommands_getLineAngle(dbg_object(t_point1).m_x,dbg_object(t_point1).m_y,dbg_object(t_midPoint).m_x,dbg_object(t_midPoint).m_y);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<327>";
	var t_newPoint=c_point.m_new.call(new c_point,dbg_object(t_point1).m_x+Math.cos((t_angle)*D2R)*0.001,dbg_object(t_point1).m_y+Math.sin((t_angle)*D2R)*0.001);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<329>";
	pop_err();
	return t_newPoint;
}
function bb_polyCommands_linesIntersectPoly(t_x1,t_y1,t_x2,t_y2,t_x3,t_y3,t_x4,t_y4){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<350>";
	var t_numeratorA=(t_x4-t_x3)*(t_y1-t_y3)-(t_y4-t_y3)*(t_x1-t_x3);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<351>";
	var t_numeratorB=(t_x2-t_x1)*(t_y1-t_y3)-(t_y2-t_y1)*(t_x1-t_x3);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<352>";
	var t_denominator=(t_y4-t_y3)*(t_x2-t_x1)-(t_x4-t_x3)*(t_y2-t_y1);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<353>";
	var t_result=new_number_array(2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<355>";
	if(t_denominator==0.0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<356>";
		dbg_array(t_result,0)[dbg_index]=0.0
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<357>";
		dbg_array(t_result,1)[dbg_index]=0.0
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<359>";
		var t_Ua=t_numeratorA/t_denominator;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<360>";
		var t_Ub=t_numeratorB/t_denominator;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<361>";
		var t_range1=((t_Ua>=0.0 && t_Ua<=1.0)?1:0);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<362>";
		var t_range2=((t_Ub>=0.0 && t_Ub<=1.0)?1:0);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<363>";
		if(((t_range1)!=0) && ((t_range2)!=0)){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<364>";
			dbg_array(t_result,0)[dbg_index]=Math.floor(t_x1+t_Ua*(t_x2-t_x1)+.5)
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<365>";
			dbg_array(t_result,1)[dbg_index]=Math.floor(t_y1+t_Ua*(t_y2-t_y1)+.5)
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<367>";
			dbg_array(t_result,0)[dbg_index]=0.0
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<368>";
			dbg_array(t_result,1)[dbg_index]=0.0
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<373>";
	pop_err();
	return t_result;
}
function bb_polyCommands_getIntersectionsPoly(t_shapeArray,t_touchStartX,t_touchStartY,t_endX,t_endY){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<380>";
	var t_startPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<381>";
	var t_startPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<382>";
	var t_lastPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<383>";
	var t_lastPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<384>";
	var t_intersectNum=0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<385>";
	for(var t_i=0;t_i<=((t_shapeArray.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<386>";
		var t_pX=dbg_array(t_shapeArray,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<387>";
		var t_pY=dbg_array(t_shapeArray,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<388>";
		if(t_lastPointX!=0.0 && t_lastPointY!=0.0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<389>";
			var t_intersect=bb_polyCommands_linesIntersectPoly(t_touchStartX,t_touchStartY,t_endX,t_endY,t_lastPointX,t_lastPointY,t_pX,t_pY);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<390>";
			if(dbg_array(t_intersect,0)[dbg_index]!=0.0 && dbg_array(t_intersect,1)[dbg_index]!=0.0){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<391>";
				t_intersectNum=t_intersectNum+1;
			}
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<394>";
			t_startPointX=t_pX;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<395>";
			t_startPointY=t_pY;
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<397>";
		t_lastPointX=t_pX;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<398>";
		t_lastPointY=t_pY;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<402>";
	var t_intersect2=bb_polyCommands_linesIntersectPoly(t_touchStartX,t_touchStartY,t_endX,t_endY,t_startPointX,t_startPointY,t_lastPointX,t_lastPointY);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<403>";
	if(dbg_array(t_intersect2,0)[dbg_index]!=0.0 && dbg_array(t_intersect2,1)[dbg_index]!=0.0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<404>";
		t_intersectNum=t_intersectNum+1;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<407>";
	pop_err();
	return t_intersectNum;
}
function bb_polyCommands_pointInPoly(t_shapeArray,t_x,t_y){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<313>";
	var t_intersections=bb_polyCommands_getIntersectionsPoly(t_shapeArray,t_x,t_y,t_x,t_y-500.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<314>";
	if(t_intersections % 2==0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<315>";
		pop_err();
		return false;
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<317>";
		pop_err();
		return true;
	}
}
function bb_polyCommands_sign(t_point1,t_point2,t_point3){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<420>";
	var t_=(dbg_object(t_point1).m_x-dbg_object(t_point3).m_x)*(dbg_object(t_point2).m_y-dbg_object(t_point3).m_y)-(dbg_object(t_point2).m_x-dbg_object(t_point3).m_x)*(dbg_object(t_point1).m_y-dbg_object(t_point3).m_y);
	pop_err();
	return t_;
}
function bb_polyCommands_pointInsideTriangle(t_point,t_point1,t_point2,t_point3){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<412>";
	var t_b1=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<412>";
	var t_b2=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<412>";
	var t_b3=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<413>";
	t_b1=bb_polyCommands_sign(t_point,t_point1,t_point2)<0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<414>";
	t_b2=bb_polyCommands_sign(t_point,t_point2,t_point3)<0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<415>";
	t_b3=bb_polyCommands_sign(t_point,t_point3,t_point1)<0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<416>";
	var t_=t_b1==t_b2 && t_b2==t_b3;
	pop_err();
	return t_;
}
function bb_polyCommands_getEarPoints(t_polyArray){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<255>";
	var t_earList=c_List2.m_new.call(new c_List2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<258>";
	for(var t_i=0;t_i<=((t_polyArray.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<259>";
		var t_pX_1=.0;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<260>";
		var t_pY_1=.0;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<261>";
		var t_pX=dbg_array(t_polyArray,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<262>";
		var t_pY=dbg_array(t_polyArray,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<263>";
		var t_pX1=.0;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<264>";
		var t_pY1=.0;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<265>";
		if(t_i==0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<266>";
			t_pX_1=dbg_array(t_polyArray,(((t_polyArray.length/2)|0)-1)*2)[dbg_index];
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<267>";
			t_pY_1=dbg_array(t_polyArray,(((t_polyArray.length/2)|0)-1)*2+1)[dbg_index];
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<268>";
			t_pX1=dbg_array(t_polyArray,(t_i+1)*2)[dbg_index];
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<269>";
			t_pY1=dbg_array(t_polyArray,(t_i+1)*2+1)[dbg_index];
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<270>";
			if(t_i==((t_polyArray.length/2)|0)-1){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<271>";
				t_pX_1=dbg_array(t_polyArray,(t_i-1)*2)[dbg_index];
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<272>";
				t_pY_1=dbg_array(t_polyArray,(t_i-1)*2+1)[dbg_index];
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<273>";
				t_pX1=dbg_array(t_polyArray,0)[dbg_index];
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<274>";
				t_pY1=dbg_array(t_polyArray,1)[dbg_index];
			}else{
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<276>";
				t_pX_1=dbg_array(t_polyArray,(t_i-1)*2)[dbg_index];
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<277>";
				t_pY_1=dbg_array(t_polyArray,(t_i-1)*2+1)[dbg_index];
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<278>";
				t_pX1=dbg_array(t_polyArray,(t_i+1)*2)[dbg_index];
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<279>";
				t_pY1=dbg_array(t_polyArray,(t_i+1)*2+1)[dbg_index];
			}
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<282>";
		var t_isEar=true;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<283>";
		var t_point1=c_point.m_new.call(new c_point,t_pX,t_pY);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<284>";
		var t_point2=c_point.m_new.call(new c_point,t_pX_1,t_pY_1);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<285>";
		var t_point3=c_point.m_new.call(new c_point,t_pX1,t_pY1);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<287>";
		var t_testPoint=bb_polyCommands_getAnglePoint(t_point1,t_point2,t_point3);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<288>";
		if(!bb_polyCommands_pointInPoly(t_polyArray,dbg_object(t_testPoint).m_x,dbg_object(t_testPoint).m_y)){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<289>";
			t_isEar=false;
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<291>";
			for(var t_i2=0;t_i2<=((t_polyArray.length/2)|0)-1;t_i2=t_i2+1){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<292>";
				var t_tPoint=c_point.m_new.call(new c_point,dbg_array(t_polyArray,t_i2*2)[dbg_index],dbg_array(t_polyArray,t_i2*2+1)[dbg_index]);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<293>";
				if(dbg_object(t_tPoint).m_x!=dbg_object(t_point1).m_x && dbg_object(t_tPoint).m_y!=dbg_object(t_point1).m_y && (dbg_object(t_tPoint).m_x!=dbg_object(t_point2).m_x && dbg_object(t_tPoint).m_y!=dbg_object(t_point2).m_y) && (dbg_object(t_tPoint).m_x!=dbg_object(t_point3).m_x && dbg_object(t_tPoint).m_y!=dbg_object(t_point3).m_y)){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<294>";
					if(bb_polyCommands_pointInsideTriangle(t_tPoint,t_point1,t_point2,t_point3)){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<295>";
						t_isEar=false;
					}
				}
			}
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<301>";
		if(t_isEar==true){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<302>";
			t_earList.p_AddLast2(t_point1);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<303>";
			break;
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<308>";
	pop_err();
	return t_earList;
}
function c_Enumerator(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator.m_new=function(t_list){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<264>";
	this.m__list=t_list;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<265>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<261>";
	pop_err();
	return this;
}
c_Enumerator.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<269>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<270>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<272>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<276>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<277>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<278>";
	pop_err();
	return t_data;
}
var bb_polyCommands_trigPoly=[];
function bb_polyCommands_trigTri(t_polyArray){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<42>";
	var t_triangle=null;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<43>";
	var t_polyArrayList=c_List2.m_new.call(new c_List2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<44>";
	for(var t_i=0;t_i<=((t_polyArray.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<45>";
		var t_p=c_point.m_new.call(new c_point,dbg_array(t_polyArray,t_i*2)[dbg_index],dbg_array(t_polyArray,t_i*2+1)[dbg_index]);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<46>";
		t_polyArrayList.p_AddLast2(t_p);
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<49>";
	var t_earList=bb_polyCommands_getEarPoints(t_polyArray);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<51>";
	var t_escape=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<52>";
	var t_previousPoint=null;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<53>";
	var t_nextPoint=null;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<54>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<54>";
	var t_=t_polyArrayList.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<54>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<54>";
		var t_p2=t_.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<56>";
		if(dbg_object(t_p2).m_x==dbg_object(t_polyArrayList.p_First()).m_x && dbg_object(t_p2).m_y==dbg_object(t_polyArrayList.p_First()).m_y){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<57>";
			t_previousPoint=t_polyArrayList.p_Last();
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<58>";
			var t_nx=false;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<59>";
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<59>";
			var t_2=t_polyArrayList.p_ObjectEnumerator();
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<59>";
			while(t_2.p_HasNext()){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<59>";
				var t_p22=t_2.p_NextObject();
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<61>";
				if(t_nx==true){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<62>";
					t_nextPoint=t_p22;
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<63>";
					t_nx=false;
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<64>";
					break;
				}
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<67>";
				if(dbg_object(t_p2).m_x==dbg_object(t_p22).m_x && dbg_object(t_p2).m_y==dbg_object(t_p22).m_y){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<68>";
					t_nx=true;
				}
			}
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<72>";
			if(dbg_object(t_p2).m_x==dbg_object(t_polyArrayList.p_Last()).m_x && dbg_object(t_p2).m_y==dbg_object(t_polyArrayList.p_Last()).m_y){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<73>";
				t_nextPoint=t_polyArrayList.p_First();
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<74>";
				var t_lp=null;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<75>";
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<75>";
				var t_3=t_polyArrayList.p_ObjectEnumerator();
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<75>";
				while(t_3.p_HasNext()){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<75>";
					var t_p23=t_3.p_NextObject();
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<77>";
					if(dbg_object(t_p2).m_x==dbg_object(t_p23).m_x && dbg_object(t_p2).m_y==dbg_object(t_p23).m_y){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<78>";
						t_previousPoint=t_lp;
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<79>";
						break;
					}
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<82>";
					t_lp=t_p23;
				}
			}else{
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<86>";
				var t_nx2=false;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<87>";
				var t_lp2=null;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<88>";
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<88>";
				var t_4=t_polyArrayList.p_ObjectEnumerator();
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<88>";
				while(t_4.p_HasNext()){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<88>";
					var t_p24=t_4.p_NextObject();
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<90>";
					if(t_nx2==true){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<91>";
						t_nextPoint=t_p24;
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<92>";
						t_nx2=false;
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<93>";
						break;
					}
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<96>";
					if(dbg_object(t_p2).m_x==dbg_object(t_p24).m_x && dbg_object(t_p2).m_y==dbg_object(t_p24).m_y){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<97>";
						t_nx2=true;
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<98>";
						t_previousPoint=t_lp2;
					}
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<101>";
					t_lp2=t_p24;
				}
			}
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<107>";
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<107>";
		var t_5=t_earList.p_ObjectEnumerator();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<107>";
		while(t_5.p_HasNext()){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<107>";
			var t_ep=t_5.p_NextObject();
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<108>";
			if(dbg_object(t_p2).m_x==dbg_object(t_ep).m_x && dbg_object(t_p2).m_y==dbg_object(t_ep).m_y){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<109>";
				var t_point1=c_point.m_new.call(new c_point,dbg_object(t_p2).m_x,dbg_object(t_p2).m_y);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<110>";
				var t_point2=c_point.m_new.call(new c_point,dbg_object(t_nextPoint).m_x,dbg_object(t_nextPoint).m_y);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<111>";
				var t_point3=c_point.m_new.call(new c_point,dbg_object(t_previousPoint).m_x,dbg_object(t_previousPoint).m_y);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<112>";
				var t_t=c_tri.m_new.call(new c_tri,t_point1,t_point2,t_point3);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<113>";
				t_triangle=t_t;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<115>";
				t_polyArrayList.p_Remove(t_p2);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<116>";
				t_p2=null;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<118>";
				t_escape=true;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<119>";
				break;
			}
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<123>";
			if(t_escape==true){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<124>";
				break;
			}
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<128>";
		if(t_escape==true){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<129>";
			break;
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<134>";
	var t_tempArray=new_number_array(t_polyArrayList.p_Count()*2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<135>";
	var t_k=0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<136>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<136>";
	var t_6=t_polyArrayList.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<136>";
	while(t_6.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<136>";
		var t_ppp=t_6.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<137>";
		dbg_array(t_tempArray,t_k*2)[dbg_index]=dbg_object(t_ppp).m_x
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<138>";
		dbg_array(t_tempArray,t_k*2+1)[dbg_index]=dbg_object(t_ppp).m_y
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<139>";
		t_k=t_k+1;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<141>";
	bb_polyCommands_trigPoly=t_tempArray;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<143>";
	pop_err();
	return t_triangle;
}
function bb_polyCommands_TriangulatePoly(t_polyArray){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<28>";
	var t_triList=c_List.m_new.call(new c_List);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<30>";
	while(t_polyArray.length>=6){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<31>";
		t_triList.p_AddLast(bb_polyCommands_trigTri(t_polyArray));
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<33>";
		t_polyArray=bb_polyCommands_trigPoly;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<36>";
	pop_err();
	return t_triList;
}
function c_Enumerator2(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator2.m_new=function(t_list){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<264>";
	this.m__list=t_list;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<265>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator2.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<261>";
	pop_err();
	return this;
}
c_Enumerator2.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<269>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<270>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<272>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator2.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<276>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<277>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<278>";
	pop_err();
	return t_data;
}
function bb_polyCommands_getTriangleArea(t_point1,t_point2,t_point3){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<424>";
	var t_dist1=Math.sqrt((dbg_object(t_point1).m_x-dbg_object(t_point2).m_x)*(dbg_object(t_point1).m_x-dbg_object(t_point2).m_x)+(dbg_object(t_point1).m_y-dbg_object(t_point2).m_y)*(dbg_object(t_point1).m_y-dbg_object(t_point2).m_y));
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<425>";
	var t_dist2=Math.sqrt((dbg_object(t_point1).m_x-dbg_object(t_point3).m_x)*(dbg_object(t_point1).m_x-dbg_object(t_point3).m_x)+(dbg_object(t_point1).m_y-dbg_object(t_point3).m_y)*(dbg_object(t_point1).m_y-dbg_object(t_point3).m_y));
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<426>";
	var t_dist3=Math.sqrt((dbg_object(t_point3).m_x-dbg_object(t_point2).m_x)*(dbg_object(t_point3).m_x-dbg_object(t_point2).m_x)+(dbg_object(t_point3).m_y-dbg_object(t_point2).m_y)*(dbg_object(t_point3).m_y-dbg_object(t_point2).m_y));
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<427>";
	var t_s=(t_dist1+t_dist2+t_dist3)/2.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<428>";
	var t_=Math.sqrt(t_s*(t_s-t_dist1)*(t_s-t_dist2)*(t_s-t_dist3));
	pop_err();
	return t_;
}
function bb_polyCommands_shapeArea(t_complexPoly){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<19>";
	var t_area=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<20>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<20>";
	var t_=t_complexPoly.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<20>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<20>";
		var t_t=t_.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<21>";
		t_area=t_area+bb_polyCommands_getTriangleArea(dbg_object(t_t).m_point1,dbg_object(t_t).m_point2,dbg_object(t_t).m_point3);
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/polyCommands.monkey<23>";
	pop_err();
	return t_area;
}
function c_shape2(){
	Object.call(this);
	this.m_shapeArray=new_number_array(20);
	this.m_complexShapeArray=null;
	this.m_solidLines=new_number_array(2);
	this.m_area=0;
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
c_shape2.m_new=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<318>";
	dbg_array(dbg_object(this).m_shapeArray,0)[dbg_index]=70.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<319>";
	dbg_array(dbg_object(this).m_shapeArray,1)[dbg_index]=233.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<320>";
	dbg_array(dbg_object(this).m_shapeArray,2)[dbg_index]=55.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<321>";
	dbg_array(dbg_object(this).m_shapeArray,3)[dbg_index]=521.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<322>";
	dbg_array(dbg_object(this).m_shapeArray,4)[dbg_index]=158.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<323>";
	dbg_array(dbg_object(this).m_shapeArray,5)[dbg_index]=608.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<324>";
	dbg_array(dbg_object(this).m_shapeArray,6)[dbg_index]=361.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<325>";
	dbg_array(dbg_object(this).m_shapeArray,7)[dbg_index]=593.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<326>";
	dbg_array(dbg_object(this).m_shapeArray,8)[dbg_index]=430.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<327>";
	dbg_array(dbg_object(this).m_shapeArray,9)[dbg_index]=500.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<328>";
	dbg_array(dbg_object(this).m_shapeArray,10)[dbg_index]=418.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<329>";
	dbg_array(dbg_object(this).m_shapeArray,11)[dbg_index]=223.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<330>";
	dbg_array(dbg_object(this).m_shapeArray,12)[dbg_index]=293.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<331>";
	dbg_array(dbg_object(this).m_shapeArray,13)[dbg_index]=231.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<332>";
	dbg_array(dbg_object(this).m_shapeArray,14)[dbg_index]=301.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<333>";
	dbg_array(dbg_object(this).m_shapeArray,15)[dbg_index]=473.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<334>";
	dbg_array(dbg_object(this).m_shapeArray,16)[dbg_index]=166.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<335>";
	dbg_array(dbg_object(this).m_shapeArray,17)[dbg_index]=481.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<336>";
	dbg_array(dbg_object(this).m_shapeArray,18)[dbg_index]=153.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<337>";
	dbg_array(dbg_object(this).m_shapeArray,19)[dbg_index]=238.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<341>";
	dbg_object(this).m_complexShapeArray=bb_polyCommands_TriangulatePoly(dbg_object(this).m_shapeArray);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<344>";
	dbg_array(dbg_object(this).m_solidLines,0)[dbg_index]=0.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<345>";
	dbg_array(dbg_object(this).m_solidLines,1)[dbg_index]=0.0
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<348>";
	dbg_object(this).m_area=((bb_polyCommands_shapeArea(dbg_object(this).m_complexShapeArray))|0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<351>";
	dbg_object(this).m_r=164;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<352>";
	dbg_object(this).m_g=72;
	err_info="C:/Users/Matt/Desktop/Super Slicer/Super_Slicer.monkey<353>";
	dbg_object(this).m_b=164;
	pop_err();
	return this;
}
function c_line(){
	Object.call(this);
	this.m_x1=.0;
	this.m_y1=.0;
	this.m_x2=.0;
	this.m_y2=.0;
}
c_line.m_new=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<508>";
	pop_err();
	return this;
}
function c_List3(){
	Object.call(this);
	this.m__head=(c_HeadNode3.m_new.call(new c_HeadNode3));
}
c_List3.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List3.prototype.p_AddLast3=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<120>";
	var t_=c_Node3.m_new.call(new c_Node3,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List3.m_new2=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<14>";
		this.p_AddLast3(t_t);
	}
	pop_err();
	return this;
}
c_List3.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<124>";
	var t_=c_Enumerator3.m_new.call(new c_Enumerator3,this);
	pop_err();
	return t_;
}
c_List3.prototype.p_Equals2=function(t_lhs,t_rhs){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<28>";
	var t_=t_lhs==t_rhs;
	pop_err();
	return t_;
}
c_List3.prototype.p_RemoveEach2=function(t_value){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<107>";
	var t_node=dbg_object(this.m__head).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<108>";
	while(t_node!=this.m__head){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<109>";
		var t_succ=dbg_object(t_node).m__succ;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<110>";
		if(this.p_Equals2(dbg_object(t_node).m__data,t_value)){
			err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<110>";
			t_node.p_Remove2();
		}
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<111>";
		t_node=t_succ;
	}
	pop_err();
	return 0;
}
c_List3.prototype.p_Remove3=function(t_value){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<103>";
	this.p_RemoveEach2(t_value);
	pop_err();
	return 0;
}
function c_Node3(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node3.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<199>";
	this.m__succ=t_succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<200>";
	this.m__pred=t_pred;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<201>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<202>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<203>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node3.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<196>";
	pop_err();
	return this;
}
c_Node3.prototype.p_Remove2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<212>";
	if(dbg_object(this.m__succ).m__pred!=this){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<212>";
		error("Illegal operation on removed node");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<214>";
	dbg_object(this.m__succ).m__pred=this.m__pred;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<215>";
	dbg_object(this.m__pred).m__succ=this.m__succ;
	pop_err();
	return 0;
}
function c_HeadNode3(){
	c_Node3.call(this);
}
c_HeadNode3.prototype=extend_class(c_Node3);
c_HeadNode3.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<248>";
	c_Node3.m_new2.call(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<249>";
	this.m__succ=(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<250>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function c_Enumerator3(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator3.m_new=function(t_list){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<264>";
	this.m__list=t_list;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<265>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator3.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<261>";
	pop_err();
	return this;
}
c_Enumerator3.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<269>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<270>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<272>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator3.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<276>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<277>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<278>";
	pop_err();
	return t_data;
}
function bb_functions_removeLines(t_lineList){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<415>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<415>";
	var t_=t_lineList.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<415>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<415>";
		var t_l=t_.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<416>";
		t_lineList.p_Remove3(t_l);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<417>";
		t_l=null;
	}
	pop_err();
}
function bb_functions_addLines(t_shapeArray,t_lineList){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<384>";
	var t_startPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<385>";
	var t_startPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<386>";
	var t_lastPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<387>";
	var t_lastPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<388>";
	for(var t_i=0;t_i<=((t_shapeArray.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<389>";
		var t_pX=dbg_array(t_shapeArray,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<390>";
		var t_pY=dbg_array(t_shapeArray,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<391>";
		if(t_lastPointX!=0.0 && t_lastPointY!=0.0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<392>";
			var t_l=c_line.m_new.call(new c_line);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<393>";
			dbg_object(t_l).m_x1=t_lastPointX;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<394>";
			dbg_object(t_l).m_y1=t_lastPointY;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<395>";
			dbg_object(t_l).m_x2=t_pX;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<396>";
			dbg_object(t_l).m_y2=t_pY;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<397>";
			t_lineList.p_AddLast3(t_l);
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<399>";
			t_startPointX=t_pX;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<400>";
			t_startPointY=t_pY;
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<402>";
		t_lastPointX=t_pX;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<403>";
		t_lastPointY=t_pY;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<405>";
	var t_l2=c_line.m_new.call(new c_line);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<406>";
	dbg_object(t_l2).m_x1=t_lastPointX;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<407>";
	dbg_object(t_l2).m_y1=t_lastPointY;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<408>";
	dbg_object(t_l2).m_x2=t_startPointX;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<409>";
	dbg_object(t_l2).m_y2=t_startPointY;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<410>";
	t_lineList.p_AddLast3(t_l2);
	pop_err();
}
function c_ball(){
	Object.call(this);
	this.m_x=.0;
	this.m_y=.0;
	this.m_radius=.0;
	this.m_speed=.0;
	this.m_angle=.0;
	this.m_r=0;
	this.m_g=0;
	this.m_b=0;
}
c_ball.m_new=function(t_x,t_y,t_radius,t_speed,t_angle,t_r,t_g,t_b){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<531>";
	dbg_object(this).m_x=t_x;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<532>";
	dbg_object(this).m_y=t_y;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<533>";
	dbg_object(this).m_radius=t_radius;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<534>";
	dbg_object(this).m_speed=t_speed;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<535>";
	dbg_object(this).m_angle=t_angle;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<536>";
	dbg_object(this).m_r=t_r;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<537>";
	dbg_object(this).m_g=t_g;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<538>";
	dbg_object(this).m_b=t_b;
	pop_err();
	return this;
}
c_ball.m_new2=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<519>";
	pop_err();
	return this;
}
c_ball.prototype.p_Move=function(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<544>";
	dbg_object(this).m_x=dbg_object(this).m_x+Math.cos((dbg_object(this).m_angle)*D2R)*dbg_object(this).m_speed;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<545>";
	dbg_object(this).m_y=dbg_object(this).m_y+Math.sin((dbg_object(this).m_angle)*D2R)*dbg_object(this).m_speed;
	pop_err();
	return 0;
}
function c_List4(){
	Object.call(this);
	this.m__head=(c_HeadNode4.m_new.call(new c_HeadNode4));
}
c_List4.m_new=function(){
	push_err();
	pop_err();
	return this;
}
c_List4.prototype.p_AddLast4=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<120>";
	var t_=c_Node4.m_new.call(new c_Node4,this.m__head,dbg_object(this.m__head).m__pred,t_data);
	pop_err();
	return t_;
}
c_List4.m_new2=function(t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_=t_data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	var t_2=0;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
	while(t_2<t_.length){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		var t_t=dbg_array(t_,t_2)[dbg_index];
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<13>";
		t_2=t_2+1;
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<14>";
		this.p_AddLast4(t_t);
	}
	pop_err();
	return this;
}
c_List4.prototype.p_ObjectEnumerator=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<124>";
	var t_=c_Enumerator4.m_new.call(new c_Enumerator4,this);
	pop_err();
	return t_;
}
function c_Node4(){
	Object.call(this);
	this.m__succ=null;
	this.m__pred=null;
	this.m__data=null;
}
c_Node4.m_new=function(t_succ,t_pred,t_data){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<199>";
	this.m__succ=t_succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<200>";
	this.m__pred=t_pred;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<201>";
	dbg_object(this.m__succ).m__pred=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<202>";
	dbg_object(this.m__pred).m__succ=this;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<203>";
	this.m__data=t_data;
	pop_err();
	return this;
}
c_Node4.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<196>";
	pop_err();
	return this;
}
function c_HeadNode4(){
	c_Node4.call(this);
}
c_HeadNode4.prototype=extend_class(c_Node4);
c_HeadNode4.m_new=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<248>";
	c_Node4.m_new2.call(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<249>";
	this.m__succ=(this);
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<250>";
	this.m__pred=(this);
	pop_err();
	return this;
}
function bb_input_TouchDown(t_index){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/input.monkey<97>";
	var t_=((bb_input_device.p_KeyDown(384+t_index))?1:0);
	pop_err();
	return t_;
}
function bb_input_TouchX(t_index){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/input.monkey<89>";
	var t_=bb_input_device.p_TouchX(t_index);
	pop_err();
	return t_;
}
function bb_autofit_VDeviceWidth(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<206>";
	pop_err();
	return dbg_object(c_VirtualDisplay.m_Display).m_vwidth;
}
function bb_autofit_VTouchX(t_index,t_limit){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<196>";
	var t_=c_VirtualDisplay.m_Display.p_VTouchX(t_index,t_limit);
	pop_err();
	return t_;
}
function bb_input_TouchY(t_index){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/input.monkey<93>";
	var t_=bb_input_device.p_TouchY(t_index);
	pop_err();
	return t_;
}
function bb_autofit_VDeviceHeight(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<210>";
	pop_err();
	return dbg_object(c_VirtualDisplay.m_Display).m_vheight;
}
function bb_autofit_VTouchY(t_index,t_limit){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<200>";
	var t_=c_VirtualDisplay.m_Display.p_VTouchY(t_index,t_limit);
	pop_err();
	return t_;
}
function c_Enumerator4(){
	Object.call(this);
	this.m__list=null;
	this.m__curr=null;
}
c_Enumerator4.m_new=function(t_list){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<264>";
	this.m__list=t_list;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<265>";
	this.m__curr=dbg_object(dbg_object(t_list).m__head).m__succ;
	pop_err();
	return this;
}
c_Enumerator4.m_new2=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<261>";
	pop_err();
	return this;
}
c_Enumerator4.prototype.p_HasNext=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<269>";
	while(dbg_object(dbg_object(this.m__curr).m__succ).m__pred!=this.m__curr){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<270>";
		this.m__curr=dbg_object(this.m__curr).m__succ;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<272>";
	var t_=this.m__curr!=dbg_object(this.m__list).m__head;
	pop_err();
	return t_;
}
c_Enumerator4.prototype.p_NextObject=function(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<276>";
	var t_data=dbg_object(this.m__curr).m__data;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<277>";
	this.m__curr=dbg_object(this.m__curr).m__succ;
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/list.monkey<278>";
	pop_err();
	return t_data;
}
function bb_functions_getClosestLinePoint(t_x,t_y,t_lx1,t_ly1,t_lx2,t_ly2){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<324>";
	var t_a1=t_ly2-t_ly1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<325>";
	var t_b1=t_lx1-t_lx2;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<326>";
	var t_c1=(t_ly2-t_ly1)*t_lx1+(t_lx1-t_lx2)*t_ly1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<327>";
	var t_c2=t_b1*-1.0*t_x+t_a1*t_y;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<328>";
	var t_det=t_a1*t_a1-t_b1*-1.0*t_b1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<329>";
	var t_cx=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<330>";
	var t_cy=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<331>";
	if(t_det!=.0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<332>";
		t_cx=(t_a1*t_c1-t_b1*t_c2)/t_det;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<333>";
		t_cy=(t_a1*t_c2-t_b1*-1.0*t_c1)/t_det;
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<335>";
		t_cx=t_x;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<336>";
		t_cy=t_y;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<340>";
	if(t_lx1>=t_lx2){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<341>";
		if(t_cx>=t_lx1){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<342>";
			t_cx=t_lx1;
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<343>";
			if(t_cx<=t_lx2){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<344>";
				t_cx=t_lx2;
			}
		}
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<346>";
		if(t_lx1<t_lx2){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<347>";
			if(t_cx>=t_lx2){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<348>";
				t_cx=t_lx2;
			}else{
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<349>";
				if(t_cx<=t_lx1){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<350>";
					t_cx=t_lx1;
				}
			}
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<354>";
	if(t_ly1>=t_ly2){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<355>";
		if(t_cy>=t_ly1){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<356>";
			t_cy=t_ly1;
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<357>";
			if(t_cy<=t_ly2){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<358>";
				t_cy=t_ly2;
			}
		}
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<360>";
		if(t_ly1<t_ly2){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<361>";
			if(t_cy>=t_ly2){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<362>";
				t_cy=t_ly2;
			}else{
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<363>";
				if(t_cy<=t_ly1){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<364>";
					t_cy=t_ly1;
				}
			}
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<369>";
	var t_pointArray=new_number_array(2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<370>";
	dbg_array(t_pointArray,0)[dbg_index]=t_cx
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<371>";
	dbg_array(t_pointArray,1)[dbg_index]=t_cy
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<372>";
	pop_err();
	return t_pointArray;
}
function bb_functions_getDistance(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<316>";
	var t_xD=(t_x2-t_x1)*(t_x2-t_x1);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<317>";
	var t_yD=(t_y2-t_y1)*(t_y2-t_y1);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<318>";
	var t_dist=Math.sqrt(t_xD+t_yD);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<319>";
	pop_err();
	return t_dist;
}
function bb_functions_getLineAngle(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<377>";
	var t_dx=t_x2-t_x1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<378>";
	var t_dy=t_y2-t_y1;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<379>";
	var t_=(Math.atan2(t_dy,t_dx)*R2D);
	pop_err();
	return t_;
}
function bb_functions_getNewAngle(t_ball,t_line){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<468>";
	var t_a1=bb_functions_getLineAngle(dbg_object(t_line).m_x1,dbg_object(t_line).m_y1,dbg_object(t_line).m_x2,dbg_object(t_line).m_y2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<469>";
	var t_a2=bb_functions_getLineAngle(dbg_object(t_ball).m_x,dbg_object(t_ball).m_y,dbg_object(t_ball).m_x+Math.cos((dbg_object(t_ball).m_angle)*D2R)*dbg_object(t_ball).m_speed,dbg_object(t_ball).m_y+Math.sin((dbg_object(t_ball).m_angle)*D2R)*dbg_object(t_ball).m_speed);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<470>";
	var t_angle=2.0*t_a1-t_a2;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<471>";
	pop_err();
	return t_angle;
}
function bb_functions_updateBall(t_ballList,t_lineList){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<425>";
	var t_p=[];
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<426>";
	var t_dist=.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<427>";
	var t_collided=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<428>";
	var t_prevAngle=.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<431>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<431>";
	var t_=t_ballList.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<431>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<431>";
		var t_ball=t_.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<434>";
		t_ball.p_Move();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<435>";
		t_prevAngle=dbg_object(t_ball).m_angle;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<438>";
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<438>";
		var t_2=t_lineList.p_ObjectEnumerator();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<438>";
		while(t_2.p_HasNext()){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<438>";
			var t_l=t_2.p_NextObject();
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<439>";
			t_p=bb_functions_getClosestLinePoint(dbg_object(t_ball).m_x,dbg_object(t_ball).m_y,dbg_object(t_l).m_x1,dbg_object(t_l).m_y1,dbg_object(t_l).m_x2,dbg_object(t_l).m_y2);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<440>";
			t_dist=bb_functions_getDistance(dbg_object(t_ball).m_x,dbg_object(t_ball).m_y,dbg_array(t_p,0)[dbg_index],dbg_array(t_p,1)[dbg_index]);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<441>";
			if(t_dist<=dbg_object(t_ball).m_radius){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<442>";
				if(t_collided==true){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<443>";
					dbg_object(t_ball).m_angle=t_prevAngle+180.0;
				}else{
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<444>";
					if(t_collided==false){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<445>";
						dbg_object(t_ball).m_angle=bb_functions_getNewAngle(t_ball,t_l);
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<446>";
						t_collided=true;
					}
				}
			}
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<451>";
		t_collided=false;
	}
	pop_err();
	return 0;
}
function bb_functions_linesIntersect(t_x1,t_y1,t_x2,t_y2,t_x3,t_y3,t_x4,t_y4){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<287>";
	var t_numeratorA=(t_x4-t_x3)*(t_y1-t_y3)-(t_y4-t_y3)*(t_x1-t_x3);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<288>";
	var t_numeratorB=(t_x2-t_x1)*(t_y1-t_y3)-(t_y2-t_y1)*(t_x1-t_x3);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<289>";
	var t_denominator=(t_y4-t_y3)*(t_x2-t_x1)-(t_x4-t_x3)*(t_y2-t_y1);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<290>";
	var t_result=new_number_array(2);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<292>";
	if(t_denominator==0.0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<293>";
		dbg_array(t_result,0)[dbg_index]=0.0
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<294>";
		dbg_array(t_result,1)[dbg_index]=0.0
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<296>";
		var t_Ua=t_numeratorA/t_denominator;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<297>";
		var t_Ub=t_numeratorB/t_denominator;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<298>";
		var t_range1=((t_Ua>=0.0 && t_Ua<=1.0)?1:0);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<299>";
		var t_range2=((t_Ub>=0.0 && t_Ub<=1.0)?1:0);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<300>";
		if(((t_range1)!=0) && ((t_range2)!=0)){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<301>";
			dbg_array(t_result,0)[dbg_index]=Math.floor(t_x1+t_Ua*(t_x2-t_x1)+.5)
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<302>";
			dbg_array(t_result,1)[dbg_index]=Math.floor(t_y1+t_Ua*(t_y2-t_y1)+.5)
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<304>";
			dbg_array(t_result,0)[dbg_index]=0.0
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<305>";
			dbg_array(t_result,1)[dbg_index]=0.0
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<310>";
	pop_err();
	return t_result;
}
function bb_functions_getIntersections(t_shapeArray,t_touchStartX,t_touchStartY){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<251>";
	var t_startPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<252>";
	var t_startPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<253>";
	var t_lastPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<254>";
	var t_lastPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<255>";
	var t_intersectNum=0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<256>";
	for(var t_i=0;t_i<=((t_shapeArray.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<257>";
		var t_pX=dbg_array(t_shapeArray,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<258>";
		var t_pY=dbg_array(t_shapeArray,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<259>";
		if(t_lastPointX!=0.0 && t_lastPointY!=0.0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<260>";
			var t_intersect=bb_functions_linesIntersect(t_touchStartX,t_touchStartY,bb_autofit_VTouchX(0,true),bb_autofit_VTouchY(0,true),t_lastPointX,t_lastPointY,t_pX,t_pY);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<261>";
			if(dbg_array(t_intersect,0)[dbg_index]!=0.0 && dbg_array(t_intersect,1)[dbg_index]!=0.0){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<262>";
				t_intersectNum=t_intersectNum+1;
			}
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<265>";
			t_startPointX=t_pX;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<266>";
			t_startPointY=t_pY;
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<268>";
		t_lastPointX=t_pX;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<269>";
		t_lastPointY=t_pY;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<273>";
	var t_intersect2=bb_functions_linesIntersect(t_touchStartX,t_touchStartY,bb_autofit_VTouchX(0,true),bb_autofit_VTouchY(0,true),t_startPointX,t_startPointY,t_lastPointX,t_lastPointY);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<274>";
	if(dbg_array(t_intersect2,0)[dbg_index]!=0.0 && dbg_array(t_intersect2,1)[dbg_index]!=0.0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<275>";
		t_intersectNum=t_intersectNum+1;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<278>";
	pop_err();
	return t_intersectNum;
}
var bb_functions_sliced=false;
function bb_functions_setSliced(t_state){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<164>";
	bb_functions_sliced=t_state;
	pop_err();
}
var bb_functions_cutShape=[];
var bb_functions_cutShapeComplex=null;
function bb_functions_sliceShape(t_shapeArray,t_solidLines,t_touchStartX,t_touchStartY){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<12>";
	var t_startPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<13>";
	var t_startPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<14>";
	var t_lastPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<15>";
	var t_lastPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<16>";
	var t_shape1Array=[];
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<17>";
	var t_shape2Array=[];
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<18>";
	var t_currentShape=false;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<20>";
	for(var t_i=0;t_i<=((t_shapeArray.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<22>";
		var t_pX=dbg_array(t_shapeArray,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<23>";
		var t_pY=dbg_array(t_shapeArray,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<25>";
		if(t_lastPointX!=0.0 && t_lastPointY!=0.0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<28>";
			if(t_solidLines.length>=4){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<29>";
				for(var t_i5=0;t_i5<=((t_solidLines.length/2)|0)-1;t_i5=t_i5+1){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<30>";
					if(t_lastPointX==dbg_array(t_solidLines,t_i5*2)[dbg_index] && t_lastPointY==dbg_array(t_solidLines,t_i5*2+1)[dbg_index]){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<31>";
						if((t_i5+1)*2<=t_solidLines.length-1 && (t_i5+1)*2+1<=t_solidLines.length-1){
							err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<32>";
							if(t_pX==dbg_array(t_solidLines,(t_i5+1)*2)[dbg_index] && t_pY==dbg_array(t_solidLines,(t_i5+1)*2+1)[dbg_index]){
								err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<33>";
								var t_intersect=bb_functions_linesIntersect(t_touchStartX,t_touchStartY,bb_autofit_VTouchX(0,true),bb_autofit_VTouchY(0,true),t_lastPointX,t_lastPointY,t_pX,t_pY);
								err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<34>";
								if(dbg_array(t_intersect,0)[dbg_index]!=0.0 && dbg_array(t_intersect,1)[dbg_index]!=0.0){
									err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<35>";
									pop_err();
									return t_shapeArray;
								}
							}
						}
					}
				}
			}
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<43>";
			var t_intersect2=bb_functions_linesIntersect(t_touchStartX,t_touchStartY,bb_autofit_VTouchX(0,true),bb_autofit_VTouchY(0,true),t_lastPointX,t_lastPointY,t_pX,t_pY);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<45>";
			if(dbg_array(t_intersect2,0)[dbg_index]!=0.0 && dbg_array(t_intersect2,1)[dbg_index]!=0.0){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<47>";
				if(t_currentShape==false){
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<48>";
					t_shape1Array=resize_number_array(t_shape1Array,t_shape1Array.length+2);
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<49>";
					dbg_array(t_shape1Array,t_shape1Array.length-2)[dbg_index]=dbg_array(t_intersect2,0)[dbg_index]
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<50>";
					dbg_array(t_shape1Array,t_shape1Array.length-1)[dbg_index]=dbg_array(t_intersect2,1)[dbg_index]
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<52>";
					t_shape2Array=resize_number_array(t_shape2Array,t_shape2Array.length+2);
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<53>";
					dbg_array(t_shape2Array,t_shape2Array.length-2)[dbg_index]=dbg_array(t_intersect2,0)[dbg_index]
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<54>";
					dbg_array(t_shape2Array,t_shape2Array.length-1)[dbg_index]=dbg_array(t_intersect2,1)[dbg_index]
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<55>";
					t_currentShape=true;
				}else{
					err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<56>";
					if(t_currentShape==true){
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<57>";
						t_shape2Array=resize_number_array(t_shape2Array,t_shape2Array.length+2);
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<58>";
						dbg_array(t_shape2Array,t_shape2Array.length-2)[dbg_index]=dbg_array(t_intersect2,0)[dbg_index]
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<59>";
						dbg_array(t_shape2Array,t_shape2Array.length-1)[dbg_index]=dbg_array(t_intersect2,1)[dbg_index]
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<61>";
						t_shape1Array=resize_number_array(t_shape1Array,t_shape1Array.length+2);
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<62>";
						dbg_array(t_shape1Array,t_shape1Array.length-2)[dbg_index]=dbg_array(t_intersect2,0)[dbg_index]
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<63>";
						dbg_array(t_shape1Array,t_shape1Array.length-1)[dbg_index]=dbg_array(t_intersect2,1)[dbg_index]
						err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<64>";
						t_currentShape=false;
					}
				}
			}
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<71>";
			t_startPointX=t_pX;
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<72>";
			t_startPointY=t_pY;
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<76>";
		t_lastPointX=t_pX;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<77>";
		t_lastPointY=t_pY;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<80>";
		if(t_currentShape==false){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<81>";
			t_shape1Array=resize_number_array(t_shape1Array,t_shape1Array.length+2);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<82>";
			dbg_array(t_shape1Array,t_shape1Array.length-2)[dbg_index]=t_pX
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<83>";
			dbg_array(t_shape1Array,t_shape1Array.length-1)[dbg_index]=t_pY
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<84>";
			if(t_currentShape==true){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<85>";
				t_shape2Array=resize_number_array(t_shape2Array,t_shape2Array.length+2);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<86>";
				dbg_array(t_shape2Array,t_shape2Array.length-2)[dbg_index]=t_pX
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<87>";
				dbg_array(t_shape2Array,t_shape2Array.length-1)[dbg_index]=t_pY
			}
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<93>";
	var t_intersect3=bb_functions_linesIntersect(t_touchStartX,t_touchStartY,bb_autofit_VTouchX(0,true),bb_autofit_VTouchY(0,true),t_startPointX,t_startPointY,t_lastPointX,t_lastPointY);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<94>";
	if(dbg_array(t_intersect3,0)[dbg_index]!=0.0 && dbg_array(t_intersect3,1)[dbg_index]!=0.0){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<95>";
		if(t_currentShape==false){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<96>";
			t_shape1Array=resize_number_array(t_shape1Array,t_shape1Array.length+2);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<97>";
			dbg_array(t_shape1Array,t_shape1Array.length-2)[dbg_index]=dbg_array(t_intersect3,0)[dbg_index]
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<98>";
			dbg_array(t_shape1Array,t_shape1Array.length-1)[dbg_index]=dbg_array(t_intersect3,1)[dbg_index]
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<100>";
			t_shape2Array=resize_number_array(t_shape2Array,t_shape2Array.length+2);
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<101>";
			dbg_array(t_shape2Array,t_shape2Array.length-2)[dbg_index]=dbg_array(t_intersect3,0)[dbg_index]
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<102>";
			dbg_array(t_shape2Array,t_shape2Array.length-1)[dbg_index]=dbg_array(t_intersect3,1)[dbg_index]
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<103>";
			t_currentShape=true;
		}else{
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<104>";
			if(t_currentShape==true){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<105>";
				t_shape2Array=resize_number_array(t_shape2Array,t_shape2Array.length+2);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<106>";
				dbg_array(t_shape2Array,t_shape2Array.length-2)[dbg_index]=dbg_array(t_intersect3,0)[dbg_index]
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<107>";
				dbg_array(t_shape2Array,t_shape2Array.length-1)[dbg_index]=dbg_array(t_intersect3,1)[dbg_index]
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<109>";
				t_shape1Array=resize_number_array(t_shape1Array,t_shape1Array.length+2);
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<110>";
				dbg_array(t_shape1Array,t_shape1Array.length-2)[dbg_index]=dbg_array(t_intersect3,0)[dbg_index]
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<111>";
				dbg_array(t_shape1Array,t_shape1Array.length-1)[dbg_index]=dbg_array(t_intersect3,1)[dbg_index]
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<112>";
				t_currentShape=false;
			}
		}
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<118>";
	if(bb_polyCommands_shapeArea(bb_polyCommands_TriangulatePoly(t_shape1Array))>=bb_polyCommands_shapeArea(bb_polyCommands_TriangulatePoly(t_shape2Array))){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<119>";
		bb_functions_setSliced(true);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<120>";
		bb_functions_cutShape=t_shape2Array;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<121>";
		bb_functions_cutShapeComplex=bb_polyCommands_TriangulatePoly(bb_functions_cutShape);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<122>";
		pop_err();
		return t_shape1Array;
	}else{
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<124>";
		bb_functions_setSliced(true);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<125>";
		bb_functions_cutShape=t_shape1Array;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<126>";
		bb_functions_cutShapeComplex=bb_polyCommands_TriangulatePoly(bb_functions_cutShape);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<127>";
		pop_err();
		return t_shape2Array;
	}
}
function bb_functions_removeSolidLines(t_shapeArray,t_solidLines){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<135>";
	for(var t_i=0;t_i<=((t_solidLines.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<136>";
		var t_sX=dbg_array(t_solidLines,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<137>";
		var t_sY=dbg_array(t_solidLines,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<138>";
		var t_exists=false;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<139>";
		for(var t_i2=0;t_i2<=((t_shapeArray.length/2)|0)-1;t_i2=t_i2+1){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<140>";
			if(t_sX==dbg_array(t_shapeArray,t_i2*2)[dbg_index] && t_sY==dbg_array(t_shapeArray,t_i2*2+1)[dbg_index]){
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<141>";
				t_exists=true;
				err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<142>";
				break;
			}
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<145>";
		if(t_exists==false){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<146>";
			dbg_array(t_solidLines,t_i*2)[dbg_index]=0.0
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<147>";
			dbg_array(t_solidLines,t_i*2+1)[dbg_index]=0.0
		}
	}
	pop_err();
	return [];
}
function bb_functions_getSliced(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<169>";
	pop_err();
	return bb_functions_sliced;
}
function bb_functions_getSlicedShape(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<154>";
	pop_err();
	return bb_functions_cutShape;
}
function bb_functions_getSlicedShapeComplex(){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<159>";
	pop_err();
	return bb_functions_cutShapeComplex;
}
function bb_math_Max(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<56>";
	if(t_x>t_y){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<56>";
		pop_err();
		return t_x;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<57>";
	pop_err();
	return t_y;
}
function bb_math_Max2(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<83>";
	if(t_x>t_y){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<83>";
		pop_err();
		return t_x;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<84>";
	pop_err();
	return t_y;
}
function bb_math_Min(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<51>";
	if(t_x<t_y){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<51>";
		pop_err();
		return t_x;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<52>";
	pop_err();
	return t_y;
}
function bb_math_Min2(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<78>";
	if(t_x<t_y){
		err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<78>";
		pop_err();
		return t_x;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/monkey/math.monkey<79>";
	pop_err();
	return t_y;
}
function bb_graphics_DebugRenderDevice(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<48>";
	if(!((bb_graphics_renderDevice)!=null)){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<48>";
		error("Rendering operations can only be performed inside OnRender");
	}
	pop_err();
	return 0;
}
function bb_graphics_Cls(t_r,t_g,t_b){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<372>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<374>";
	bb_graphics_renderDevice.Cls(t_r,t_g,t_b);
	pop_err();
	return 0;
}
function bb_graphics_Transform(t_ix,t_iy,t_jx,t_jy,t_tx,t_ty){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<349>";
	var t_ix2=t_ix*dbg_object(bb_graphics_context).m_ix+t_iy*dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<350>";
	var t_iy2=t_ix*dbg_object(bb_graphics_context).m_iy+t_iy*dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<351>";
	var t_jx2=t_jx*dbg_object(bb_graphics_context).m_ix+t_jy*dbg_object(bb_graphics_context).m_jx;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<352>";
	var t_jy2=t_jx*dbg_object(bb_graphics_context).m_iy+t_jy*dbg_object(bb_graphics_context).m_jy;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<353>";
	var t_tx2=t_tx*dbg_object(bb_graphics_context).m_ix+t_ty*dbg_object(bb_graphics_context).m_jx+dbg_object(bb_graphics_context).m_tx;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<354>";
	var t_ty2=t_tx*dbg_object(bb_graphics_context).m_iy+t_ty*dbg_object(bb_graphics_context).m_jy+dbg_object(bb_graphics_context).m_ty;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<355>";
	bb_graphics_SetMatrix(t_ix2,t_iy2,t_jx2,t_jy2,t_tx2,t_ty2);
	pop_err();
	return 0;
}
function bb_graphics_Transform2(t_m){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<345>";
	bb_graphics_Transform(dbg_array(t_m,0)[dbg_index],dbg_array(t_m,1)[dbg_index],dbg_array(t_m,2)[dbg_index],dbg_array(t_m,3)[dbg_index],dbg_array(t_m,4)[dbg_index],dbg_array(t_m,5)[dbg_index]);
	pop_err();
	return 0;
}
function bb_graphics_Scale(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<363>";
	bb_graphics_Transform(t_x,.0,.0,t_y,.0,.0);
	pop_err();
	return 0;
}
function bb_graphics_Translate(t_x,t_y){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<359>";
	bb_graphics_Transform(1.0,.0,.0,1.0,t_x,t_y);
	pop_err();
	return 0;
}
function bb_autofit_UpdateVirtualDisplay(t_zoomborders,t_keepborders){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<171>";
	c_VirtualDisplay.m_Display.p_UpdateVirtualDisplay(t_zoomborders,t_keepborders);
	err_info="C:/Monkey/MonkeyPro69/modules/autofit/autofit.monkey<172>";
	pop_err();
	return 0;
}
function bb_graphics_DrawPoly(t_verts){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<427>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<429>";
	bb_graphics_context.p_Validate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<430>";
	bb_graphics_renderDevice.DrawPoly(t_verts);
	pop_err();
	return 0;
}
function bb_graphics_DrawLine(t_x1,t_y1,t_x2,t_y2){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<395>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<397>";
	bb_graphics_context.p_Validate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<398>";
	bb_graphics_renderDevice.DrawLine(t_x1,t_y1,t_x2,t_y2);
	pop_err();
	return 0;
}
function bb_functions_drawSolidLines(t_solidLines){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<175>";
	bb_graphics_SetColor(255.0,.0,.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<176>";
	var t_lastPointX=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<177>";
	var t_lastPointY=0.0;
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<178>";
	for(var t_i=0;t_i<=((t_solidLines.length/2)|0)-1;t_i=t_i+1){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<179>";
		var t_pX=dbg_array(t_solidLines,t_i*2)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<180>";
		var t_pY=dbg_array(t_solidLines,t_i*2+1)[dbg_index];
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<181>";
		if(t_lastPointX!=0.0 && t_lastPointY!=0.0){
			err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<182>";
			bb_graphics_DrawLine(t_pX,t_pY,t_lastPointX,t_lastPointY);
		}
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<184>";
		t_lastPointX=t_pX;
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<185>";
		t_lastPointY=t_pY;
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<187>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	pop_err();
}
function bb_graphics_DrawCircle(t_x,t_y,t_r){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<411>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<413>";
	bb_graphics_context.p_Validate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<414>";
	bb_graphics_renderDevice.DrawOval(t_x-t_r,t_y-t_r,t_r*2.0,t_r*2.0);
	pop_err();
	return 0;
}
function bb_functions_drawBalls(t_ballList){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<459>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<459>";
	var t_=t_ballList.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<459>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<459>";
		var t_ball=t_.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<460>";
		bb_graphics_SetColor((dbg_object(t_ball).m_r),(dbg_object(t_ball).m_g),(dbg_object(t_ball).m_b));
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<461>";
		bb_graphics_DrawCircle(dbg_object(t_ball).m_x,dbg_object(t_ball).m_y,dbg_object(t_ball).m_radius);
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<462>";
		bb_graphics_SetColor(255.0,255.0,255.0);
	}
	pop_err();
	return 0;
}
function bb_functions_drawLineClass(t_lineList){
	push_err();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<478>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<479>";
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<479>";
	var t_=t_lineList.p_ObjectEnumerator();
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<479>";
	while(t_.p_HasNext()){
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<479>";
		var t_l=t_.p_NextObject();
		err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<480>";
		bb_graphics_DrawLine(dbg_object(t_l).m_x1,dbg_object(t_l).m_y1,dbg_object(t_l).m_x2,dbg_object(t_l).m_y2);
	}
	err_info="C:/Users/Matt/Desktop/Super Slicer/inc/functions.monkey<482>";
	bb_graphics_SetColor(255.0,255.0,255.0);
	pop_err();
	return 0;
}
var bb_fps__frameCount=0;
var bb_fps__frameCountStartTime=0;
var bb_fps__frameRate=0;
function bb_fps_getFPS(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/fps/fps.monkey<6>";
	bb_fps__frameCount+=1;
	err_info="C:/Monkey/MonkeyPro69/modules/fps/fps.monkey<7>";
	if(bb_fps__frameCount>=30){
		err_info="C:/Monkey/MonkeyPro69/modules/fps/fps.monkey<8>";
		bb_fps__frameRate=((1000.0/((bb_app_Millisecs()-bb_fps__frameCountStartTime)/30.0))|0);
		err_info="C:/Monkey/MonkeyPro69/modules/fps/fps.monkey<9>";
		bb_fps__frameCount=0;
		err_info="C:/Monkey/MonkeyPro69/modules/fps/fps.monkey<10>";
		bb_fps__frameCountStartTime=bb_app_Millisecs();
	}
	err_info="C:/Monkey/MonkeyPro69/modules/fps/fps.monkey<12>";
	pop_err();
	return bb_fps__frameRate;
}
function bb_graphics_DrawImage(t_image,t_x,t_y,t_frame){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<436>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<437>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<437>";
		error("Invalid image frame");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<440>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<442>";
	bb_graphics_context.p_Validate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<444>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<445>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty);
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<447>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,t_x-dbg_object(t_image).m_tx,t_y-dbg_object(t_image).m_ty,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	pop_err();
	return 0;
}
function bb_graphics_PushMatrix(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<328>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<329>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index]=dbg_object(bb_graphics_context).m_ix
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<330>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index]=dbg_object(bb_graphics_context).m_iy
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<331>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index]=dbg_object(bb_graphics_context).m_jx
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<332>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index]=dbg_object(bb_graphics_context).m_jy
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<333>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index]=dbg_object(bb_graphics_context).m_tx
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<334>";
	dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]=dbg_object(bb_graphics_context).m_ty
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<335>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp+6;
	pop_err();
	return 0;
}
function bb_graphics_Rotate(t_angle){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<367>";
	bb_graphics_Transform(Math.cos((t_angle)*D2R),-Math.sin((t_angle)*D2R),Math.sin((t_angle)*D2R),Math.cos((t_angle)*D2R),.0,.0);
	pop_err();
	return 0;
}
function bb_graphics_PopMatrix(){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<339>";
	var t_sp=dbg_object(bb_graphics_context).m_matrixSp-6;
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<340>";
	bb_graphics_SetMatrix(dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+0)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+1)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+2)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+3)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+4)[dbg_index],dbg_array(dbg_object(bb_graphics_context).m_matrixStack,t_sp+5)[dbg_index]);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<341>";
	dbg_object(bb_graphics_context).m_matrixSp=t_sp;
	pop_err();
	return 0;
}
function bb_graphics_DrawImage2(t_image,t_x,t_y,t_rotation,t_scaleX,t_scaleY,t_frame){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<454>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<455>";
	if(t_frame<0 || t_frame>=dbg_object(t_image).m_frames.length){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<455>";
		error("Invalid image frame");
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<458>";
	var t_f=dbg_array(dbg_object(t_image).m_frames,t_frame)[dbg_index];
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<460>";
	bb_graphics_PushMatrix();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<462>";
	bb_graphics_Translate(t_x,t_y);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<463>";
	bb_graphics_Rotate(t_rotation);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<464>";
	bb_graphics_Scale(t_scaleX,t_scaleY);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<466>";
	bb_graphics_Translate(-dbg_object(t_image).m_tx,-dbg_object(t_image).m_ty);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<468>";
	bb_graphics_context.p_Validate();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<470>";
	if((dbg_object(t_image).m_flags&65536)!=0){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<471>";
		bb_graphics_renderDevice.DrawSurface(dbg_object(t_image).m_surface,.0,.0);
	}else{
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<473>";
		bb_graphics_renderDevice.DrawSurface2(dbg_object(t_image).m_surface,.0,.0,dbg_object(t_f).m_x,dbg_object(t_f).m_y,dbg_object(t_image).m_width,dbg_object(t_image).m_height);
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<476>";
	bb_graphics_PopMatrix();
	pop_err();
	return 0;
}
function bb_graphics_DrawText(t_text,t_x,t_y,t_xalign,t_yalign){
	push_err();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<561>";
	bb_graphics_DebugRenderDevice();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<563>";
	if(!((dbg_object(bb_graphics_context).m_font)!=null)){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<563>";
		pop_err();
		return 0;
	}
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<565>";
	var t_w=dbg_object(bb_graphics_context).m_font.p_Width();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<566>";
	var t_h=dbg_object(bb_graphics_context).m_font.p_Height();
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<568>";
	t_x-=Math.floor((t_w*t_text.length)*t_xalign);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<569>";
	t_y-=Math.floor((t_h)*t_yalign);
	err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<571>";
	for(var t_i=0;t_i<t_text.length;t_i=t_i+1){
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<572>";
		var t_ch=t_text.charCodeAt(t_i)-dbg_object(bb_graphics_context).m_firstChar;
		err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<573>";
		if(t_ch>=0 && t_ch<dbg_object(bb_graphics_context).m_font.p_Frames()){
			err_info="C:/Monkey/MonkeyPro69/modules/mojo/graphics.monkey<574>";
			bb_graphics_DrawImage(dbg_object(bb_graphics_context).m_font,t_x+(t_i*t_w),t_y,t_ch);
		}
	}
	pop_err();
	return 0;
}
function bbInit(){
	bb_app__app=null;
	bb_app__delegate=null;
	bb_app__game=BBGame.Game();
	bb_graphics_device=null;
	bb_graphics_context=c_GraphicsContext.m_new.call(new c_GraphicsContext);
	c_Image.m_DefaultFlags=0;
	bb_audio_device=null;
	bb_input_device=null;
	bb_graphics_renderDevice=null;
	bb_app__updateRate=0;
	c_VirtualDisplay.m_Display=null;
	bb_polyCommands_trigPoly=[];
	bb_functions_sliced=false;
	bb_functions_cutShape=[];
	bb_functions_cutShapeComplex=c_List.m_new.call(new c_List);
	bb_fps__frameCount=0;
	bb_fps__frameCountStartTime=0;
	bb_fps__frameRate=0;
}
//${TRANSCODE_END}
