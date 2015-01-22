define(function () {
	
	var masterVolume = 1;
	var baseDir = "./assets/sounds/";
	var paths = {
		sfx: {
			abrir_gaveta: [
				"gaveta_abrindo_1.mp3",
				"gaveta_abrindo_2.mp3"
			],
			abrir_porta: [
				"porta_abrindo_1.mp3",
				"porta_abrindo_2.mp3"
			],			
			bip: [
				"bip_termometro_oximetro.mp3"
			],
			bombinha: [
				"bombinha_esfigmnanometro.mp3"
			],
			campainha: [
				"campainha_1.mp3",
				"campainha_2.mp3"
			],
			clique: [
				"clique_de_luz_botao_campainha_etc.mp3"
			],
			escrever: [
				"escrevendo_papel.mp3"
			],
			fechar_gaveta: [
				"gaveta_fechando.mp3"
			],
			lavar_maos: [
				"lavando_as_maos.mp3"
			],
			mesa_com_rodinha: [
				"mesa_com_rodinha.mp3"
			],
			monitor_coracao: [
				"monitor_coracao_beeps.mp3"
			],
			objeto:[
				"efeito_para_quando_um_objeto_e_manuseado_1.mp3",
				"efeito_para_quando_um_objeto_e_manuseado_2.mp3",
				"efeito_para_quando_um_objeto_e_manuseado_3.mp3"
			],
			pegar_objeto:[
				"som_para_coletar_itens.mp3"
			],
			selecionar_menu: [
				"menu_select.mp3"
			],
			tic_tac: [
				"tictac_relogio_de_puslo.mp3"

			]
		},
		musics:[
		
		],
		loops:{
			recepcao: ["sons_ambiente_hospital_recepcao.mp3"],
            test: ["teste.mp3"]
		}		
		
	};

	return {
        baseDir: baseDir,
        paths: paths,
        masterVolume: masterVolume
    };
});