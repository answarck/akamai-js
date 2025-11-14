function encrypt_sensor_data(fingerprint, argument_2) {
  var UD5 = "";
  var lookup_table = [];
  var known_array = [4095, 4, 8, 0, 127, 65793, 4294967295, 8388607, 32, 65535, 4282663, 8888888, 3, 5478428, 2048, 3600, 4096, 16384, 32768, 10, 12, 17, 18, 1, 6, 7, 21, 26, 27, 2, 75, 100, 25, 20, 112, 3000, 1001, 4999, 2999, 10000, 1024, 99, 999, 16, 2000, 290, 5, 2016, 999999, 11, 13, 2222, 219, 76, 250, 14, 19, 23, 3600000, 1.81, 1.73, 2.11, 87];

  for (var i = 0; i < known_array[4]; ++i) {
    if (i < 32 || i === 39 || i === 34 || i === 92) {
      lookup_table[i] = -1;
    } else {
      lookup_table[i] = UD5.length;
      UD5 += String.fromCharCode(i);
    }
  }
  var encrypted_last_part = "";
  for (var i = 0; i < fingerprint.length; i++) {
    var fingerprint_char = fingerprint.charAt(i);
    var bL5 = argument_2 >> 8 & 65535;
    argument_2 *= known_array[5];
    argument_2 &= known_array[6];
    argument_2 += 4282663;
    argument_2 &= known_array[7];
    var char_from_lookup_table = lookup_table[fingerprint.charCodeAt(i)];
    var code_point_of_fingerprint_char = fingerprint_char.codePointAt(0);
    if (code_point_of_fingerprint_char >= known_array[8] && code_point_of_fingerprint_char < known_array[4]) {
      char_from_lookup_table = lookup_table[code_point_of_fingerprint_char];
    }
    if (char_from_lookup_table >= 0) {
      var D35 = bL5 % UD5.length;
      char_from_lookup_table += D35;
      char_from_lookup_table %= UD5.length;
      fingerprint_char = UD5[char_from_lookup_table];
    }
    encrypted_last_part += fingerprint_char;
  }
  console.log(encrypted_last_part);
  return encrypted_last_part;
}

function decrypt_sensor_data(encrypted, argument_2) {
  const known_array = [4095, 4, 8, 0, 127, 65793, 4294967295, 8388607, 32, 65535, 4282663, 8888888, 3, 5478428, 2048, 3600, 4096, 16384, 32768, 10, 12, 17, 18, 1, 6, 7, 21, 26, 27, 2, 75, 100, 25, 20, 112, 3000, 1001, 4999, 2999, 10000, 1024, 99, 999, 16, 2000, 290, 5, 2016, 999999, 11, 13, 2222, 219, 76, 250, 14, 19, 23, 3600000, 1.81, 1.73, 2.11, 87];

  let UD5 = "";
  const lookup_table = new Array(known_array[4]).fill(-1);
  for (let i = 0; i < known_array[4]; ++i) {
    if (i < 32 || i === 39 || i === 34 || i === 92) {
      lookup_table[i] = -1;
    } else {
      lookup_table[i] = UD5.length;
      UD5 += String.fromCharCode(i);
    }
  }

  const UD5_len = UD5.length;
  const indexToCharCode = new Array(UD5_len);
  for (let idx = 0; idx < UD5_len; ++idx) indexToCharCode[idx] = UD5.charCodeAt(idx);

  let decrypted = "";

  for (let i = 0; i < encrypted.length; ++i) {
    const bL5 = (argument_2 >>> 8) & 0xffff;
    argument_2 = ((argument_2 * known_array[5]) >>> 0);
    argument_2 = (argument_2 + 4282663) >>> 0;
    argument_2 = argument_2 & known_array[7];

    const encChar = encrypted.charAt(i);
    let udIndex = UD5.indexOf(encChar);
    if (udIndex >= 0) {
      const D35 = bL5 % UD5_len;
      let origIndex = udIndex - D35;
      origIndex %= UD5_len;
      if (origIndex < 0) origIndex += UD5_len;
      const origCharCode = indexToCharCode[origIndex];
      decrypted += String.fromCharCode(origCharCode);
    } else {
      decrypted += encChar;
    }
  }

  console.log(decrypted);
  return decrypted;
}

var fingerprint = '0},{"dmvl":1920},{"nps":"-1"},{"nfas":"7391"},{"wiw":0,fc:0},{"mc":"en-US"},{"swi":0,non:12099},{"ucs":0,"fwd":"do_dis,dm_dis,t_en","ffs":5},{"hz1":881245254843.5},{"ash":0},{"ibr":1},{"mevl":""},{"fmz":1080},{"hal":"0"},{"tid":0,wrc:0},{"pc":0,"sws":"cpen:0,i1:98490},{"jsrf2":0,cwen:"","oev":{"ver":1080},{"adp":0},{"sts":0},{"pevl":0,vib:1,isc:"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"}],"eem":1920},{"ran":"Error extracting obfuscation keys."}:"","mev":"i75Ob05ph71fpw","sww":"4536","ajr":"","pus":"PiZtE"},{"jsrf1":0},{"rval":[{"kevl":"0,0","kev":"","ajt":0,"ffl":"","inf":18854},{"kc":0,sc:"0"},{"hea":"","dme":"","sde":339},{"wdr":"http:[{"fmh":"","doe":1"},{"dau":""},{"dvc":32},{"tevl":"20030107"},{"asw":"Zn94Iz9/RSNXgdvnnnBmu+hOSichzY8g7E+zzPsXeYY=","fpt":""},{"ssh":"Gecko"},{"she":0},{"delt":3},{"it":0},{"tovl":"MA==|103146","din":0,"tev":1762490509687},{"fct":"0,0,0,0,1,0,0","per":"8","pde":0},{"tsd":"-1"},{"rcfp":433656},{"nap":4},{"tst":0},{"ww8":1535},{"pha":";-1;dis;,7;true;true;true;-330;true;24;24;true;false;-1","fpc":29638832},{"jsrf":0},{"tc":0,x11:"","mst":0,dm:{"s024":-1},"tab":"ackjdf7aia7j7aakev2k,12,b+e+k+l+d+c+h+a+j+g+"},{"srd":"","vev":""}],"o9":1},{"dd2":1535},{"ua":1,bat:"0"},{"mwd":"0.13917127769"},{"wih":1,opc:0},{"xag":0},{"npl":"","if":0},{"ssts":0},{"wow":80},{"signals":0,x12:"","pur"://delta.com/","pev":[{"nal":"0"}],"jse":32},{"devl"';
// var encrypted = encrypt_sensor_data(fingerprint, 8888888);
var encrypted = 'Vx!8"m%{R"Bm7jC{T&"ks:"-"P,"<9&"mA<$"<"9!FN">0N"lF}"2A1Yqb4`nH"51"O":a4]D"J-E"lZ2"~R^d]J=U6q+ydko"N!v".!s"(}?"?"FJkNnEW1]xaTYilQfd"s"_.:"*Ap^L"nn%"Bg55j.&kvv&.DH37t"Rtg"+uBC$"fWS"-M@]y"3w=="&""<?,"y2I"dR+@,&vz"5]<" "4"p-0"Yqi"NJ}FPW].se["SH"k`)"i|N"S"8Nl4|*BvP*p :nI.-,"29I$N"rx6NH>F9""&"E[t"/T"}L="Wed*,5-{"4Kw"y|k<G".f{"~~_Re"]9QA"2CESF>gBfeX=$"wL?I ?nC`A?P~Bdk{w]8Opw0t L7b]fnlV2Y4L*>JXd>g_Rah3f:Xm(nBj)u|1ZYL*^O7a=!%&T{6-WR(:d#KYk5?yGVJ=R6eO!m"dkU":jO"k-?f+Vy@"gWY"A"LLlJ (IB|Ul7RSk&p.H0V$E$?eb!KuCJ*")}""<"EeK"2")^[@vrF`):LTXu"M"O/_"M"%%bX"W"MI3"n""B"8hR"f"CCuO."vxV"(#m`"hvICN"(V c"V]O"$41w"("20v"i"A8#"H""4"9-^"E+j"W:_"""d"koS"3,,-bGS3u"(0"$iD{Lv"*"YZO"&mK"$""4"qU?"c""{"e71"F2y]&Yy"q/k"c"Ghg}@jt" b`"Y""="^xW"dM"7?4"~ v"R""w&5"`?i"MxF}sn"bHV5"$"Z[6wl`}#"9hc"SlD"]"`FjKb5aHq^]4x,Q/fb9~.rax}YNUDj[?A7uXc-oRlPC_"F"(pu"e"">u#"?M&"V"_WPVl"5KR"AzO"eH~1&"W#J,"15,$d"3!"1~*BT"qdnE"%"F+?BS.b)Ww"K"1*R"3jq"%tX"D7P= J!v`w,^}dn[o"M]k"L"jN^l,<p{@KcHM"9"p(H"v".")"dwm"r9%{,"el?"V"qZ" bR"g{S6"z^1n/ZXA#P"8Ga"#QO<7"EE*"/%>nA"Z>R"b-RTF9b"Wk{"Y"Ow:i2@ .$:kzU1$+g9#?H18 T0*[nHx6cFVPRUH%:B`#~Nz*!i[y18H"j"`HY"?wK1R.5I(Y& "-,aa" Y:$Q"xM")/VpsB?""q"=UJ" )n|x6w"hovF"Kc^6a">QG"D"98Ecwsm%P[msTpXvbo(kc3/xvXqjI>rqMES6GS4~#6Ht"s$$"sP5"^""v"_/5"5""7ZP"`~"{m?Q<"E`!"*rBpdn("2X"|vZ4mw`"."P1|"gr "!"*ts@ny&Q)ufdOY"8#k"rlr"XO15?V1J?dD"(JW"w8tvf"dWe"k""y"U&"Tef=B"g%%&"q q^/"yv{"OPK-qO"oF~0+]m"t7HXn}f""r"$)q"V`jR?MkL5uC"{"F_9"@a="^x@"5"4"=At"n~Q"-M6n-6"h@u@"';
decrypt_sensor_data(encrypted, 8888888);