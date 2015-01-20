define(function () {
	
	var masterVolume = 0.5;
	var baseDir = "./assets/sounds/";
	var paths = {
		abrir_gaveta: [
			"abrir_gaveta1.wav",
			"abrir_gaveta2.wav"
		],
		abrir_porta: [
			"abrir_porta1.wav",
			"abrir_porta2.wav"
		],
		recepcao: [
			"ambiente_recepcao.wav"
		],
		bip: [
			"bip.wav"
		],
		bombinha: [
			"bombinha.wav"
		],
		campainha: [
			"campainha1.wav",
			"campainha2.wav"
		],
		clique: [
			"clique.wav"
		],
		escrever: [
			"escrever1.mp3",
			"escrever2.wav"
		],
		fechar_gaveta: [
			"fechar_gaveta.wav"
		],
		lavar_maos: [
			"lavar_maos.wav"
		],
		mesa_com_rodinha: [
			"mesa_com_rodinha.wav"
		],
		monitor_coracao: [
			"monitor_coracao.mp3"
		],
		objeto:[
			"objeto1.wav",
			"objeto2.wav",
			"objeto3.wav",
			"objeto4.wav"
		],
		selecionar_menu: [
			"selecionar_menu.wav"
		],
		tic_tac: [
			"tic_tac.wav"
		],
        fundo: [
            "fundo.mp3"
        ]
	};

	return {
        baseDir: baseDir,
        paths: paths,
        masterVolume: masterVolume
    };
});