function swap(decrypted, filehash) {
    var i1;
    var i2;
    var bM;
    var i;
    var splitted = decrypted["split"](":");
    for (i = 0; i < splitted.length; i++) {
        i1 = (filehash >> 8 & 65535) % splitted.length;
        filehash *= 65793;
        filehash &= 4294967295;
        filehash += 4282663;
        filehash &= 8388607;
        i2 = (filehash >> 8 & 65535) % splitted.length;
        filehash *= 65793;
        filehash &= 4294967295;
        filehash += 4282663;
        filehash &= 8388607;
        bM = splitted[i1];
        splitted[i1] = splitted[i2];
        splitted[i2] = bM;
    }
    return splitted["join"](":");
}

function unswap(decrypted, filehash) {
	var i1;
    var i2;
    var bM;
    var i;
    var splitted = decrypted["split"](":");
	var index = [];

	for (i = 0; i < splitted.length; i++) {
        i1 = (filehash >> 8 & 65535) % splitted.length;
        filehash *= 65793;
        filehash &= 4294967295;
        filehash += 4282663;
        filehash &= 8388607;
        i2 = (filehash >> 8 & 65535) % splitted.length;
        filehash *= 65793;
        filehash &= 4294967295;
        filehash += 4282663;
        filehash &= 8388607;
        index.push([i1, i2]);
    }

    for (var k = index.length - 1; k >= 0; k--) {
    	const [i1_, i2_] = index[k];
    	const v = splitted[i2_];
    	splitted[i2_] = splitted[i1_];
    	splitted[i1_] = v;
    }
    return splitted.join(":");
}

const swapped = '864},{"adp":"cpen:"c1uO2pXifEOXrtOOJ9","sww":0},{"tovl":18863},{"kc":0},{"mc":1536},{"npl":1536},{"pha":1,isc:0,x12:0},{"ran":""},{"ssh":"5609","ajr":0},{"pevl":"","vev":"0"},{"hea":{"s024":"47a96a1e-3c80-42d4-9fcd-114f18ae2a31"}],"o9":1},{"dd2":0,"tev":433849},{"asw":"en-US"}],"eem":"","doe":85.5999984741211,vib:0,cwen:0,dm:0,"ffl":0,fc:441},{"nps":32},{"tevl":"0,0","kev":1534},{"xag":"0"}]}:[{"kevl":0,non:"8","pde":0},{"ua":"Mozilla/5.0 (X11; Linux x86_64; rv:"","mev":"meUZXw52fDsecvVXs8s9goeTSfFs6aILNTzyOTk1ROU=","fpt":"","if":"1","din":864},{"nal":"","pur":"4937"},{"wih"://www.delta.com/","pev":[{"hz1":"PiZtE"},{"jsrf1":0,wrc:5},{"hal":""},{"dvc":0,i1:50},{"signals":"-1"},{"rcfp":881637770705.5},{"ucs":"do_en,dm_en,t_dis","ffs":0},{"tc":"0"},{"tid":";-1;dis;,7;true;true;true;-330;true;24;24;true;false;unspecified","fpc":32},{"devl":0},{"dmvl":"","dme":1},{"it":1,sc:82026},{"jsrf2":"","sde":1763275541411},{"fct":"","mst":26067385},{"jsrf":"0,0,0,0,1,0,0","per":0},{"rval":"0"},{"mwd":1"},{"wdr":"-1"},{"nfas":1},{"mevl":0},{"delt":[{"fmh":{"ver":0},{"ww8":2},{"tst":0},{"nap":0},{"pc":"","inf":"Gecko"},{"tsd":"https:"adYie9Yggfdfd9gyx9wa,7,b+f+i+a+h+c+g+j+l+e+"},{"srd":0},{"she":0},{"sts":0},{"wow":"","pus":"0.920335312460"},{"swi":1534},{"ibr":144.0) Gecko/20100101 Firefox/144.0"},{"dau":1,opc:0},{"ssts":15155},{"ash":0,"fwd":0,x11:-1},"tab":""},{"fmz":0,bat:"20100101"},{"wiw":0,"sws":"","ajt":"","oev"';
console.log(unswap(swapped, 1088126));