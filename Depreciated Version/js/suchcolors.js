function fi(t) {
	if (t > 6/29) {
		return Math.pow(t, 3);
	} else {
		return 3*Math.pow((6/29), 2)*(t - 4/29);
	}
}

function Lab2XYZ(L, a, b) {
	var k = 1/116;
	var X, Y, Z;
	var Xn=0.9642, Yn=1.0, Zn=0.8249; 	// ICC wp
	X = Xn * fi(k*(L+16)+a/500);
	Y = Yn * fi(k*(L+16));
	Z = Zn * fi(k*(L+16)-b/200);
	var XYZ = [X, Y, Z]
	return XYZ;
}
function XYZ2RGB(X, Y, Z) {
	var R, G, B;
	R = 0.41847*X - 0.15866*Y -0.082835*Z;
	G = -0.091169*X + 0.25243*Y + 0.015708*Z;
	B = 0.00092090*X - 0.0025498*Y + 0.17860*Z;
	var RGB = [R, G, B]
	return RGB;
}

function arr2hex(r, g, b) {
	r_hex = Math.round((255*r)).toString(16);
	g_hex = Math.round((255*g)).toString(16);
	b_hex = Math.round((255*b)).toString(16);
	
	var pad = function(x) {
		return (x.length==1) ? "0"+x : x;
	};
	r_hex = pad(r_hex);
	g_hex = pad(g_hex);
	b_hex = pad(b_hex);
	
	hex = "#" + r_hex + g_hex + b_hex;
	return hex
}

function main() {
	document.onmousemove = handleMouseMove;
	function handleMouseMove(event) {
		var dot, eventDoc, doc, body, pageX, pageY;
		// Color based on Mouse Position
		var L, a, b;
		var X, Y, Z;
		var R, G, B;
		L = 100.0;
		a = Math.round(
			(255*event.pageX/window.innerWidth))-128;
		b = Math.round(
			(-255*event.pageY/window.innerHeight))+128;
		var XYZ = Lab2XYZ(L, a, b);
		var RGB = XYZ2RGB(XYZ[0], XYZ[1], XYZ[2]);
		color = arr2hex(RGB[0], RGB[1], RGB[2]);
		document.body.style.backgroundColor = color;
		// Add a dot to follow the cursor
		dot = document.createElement('div');
		dot.className = "dot";
		dot.style.left = event.pageX + "px";
		dot.style.top = event.pageY + "px";
		//document.body.appendChild(dot);
		document.show.L.value = L;
		document.show.a.value = a;
		document.show.b.value = b;
	}
}
main();