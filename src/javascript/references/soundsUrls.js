/*
 This file is part of Cuidando Bem.

 Cuidando Bem is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 Cuidando Bem is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with Cuidando Bem.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @author Otho - Marcelo Lopes Lotufo
 */
define(function() {

  var masterVolume = 1;
  var baseDir = "./sounds/";
  var paths = {
    sfx: {
      deslizarPapel: [
        "papel_deslizando.mp3"
      ],
      batendoNaPorta: [
        "batendo_abrindo_porta.mp3"
      ],
      abrirGaveta: [
        "gavetaAbrindo1.mp3",
        "gavetaAbrindo2.mp3"
      ],
      abrirPorta: [
        "portaAbrindo1.mp3",
        "portaAbrindo2.mp3"
      ],
      avancarMensagens: [
        "avancandoMensagens.mp3"
      ],
      // Para os outros objetos usa-se este bip
      bip: [
        "beep.mp3"
      ],
      bipOximetro: [
        "beepOximetro.mp3"
      ],
      bipTermometro: [
        "beepTermometro.mp3"
      ],
      bombinha: [
        "bombinhaEsfigmnanometro.mp3"
      ],
      campainha: [
        "campainha1.mp3",
        "campainha2.mp3"
      ],
      clique: [
        "cliqueDeLuzBotaoCampainhaEtc.mp3"
      ],
      colocarLuvas: [
        "colocandoLuvas.mp3"
      ],
      escrever: [
        "escrevendoPapel.mp3"
      ],
      expirando: [
        "expirando.mp3"
      ],
      fecharGaveta: [
        "gavetaFechando.mp3"
      ],
      inspirando: [
        "inspirando.mp3"
      ],
      jogandoLixo: [
        "jogandoLixo.mp3"
      ],
      lavarMaos: [
        "lavandoMaos.mp3"
      ],
      mesaComRodinha: [
        "mesaComRodinha.mp3"
      ],
      missaoCumprida: [
        "missaoCumprida.mp3"
      ],
      monitorCoracao: [
        "beepsMonitorCoracao.mp3"
      ],
      objeto: [
        "efeitoObjeto1.mp3",
        "efeitoObjeto2.mp3",
        "efeitoObjeto3.mp3"
      ],
      objetoRocando: [
        "objetoRocando.mp3"
      ],
      passarMouse: [
        "passarMouseBotao.mp3"
      ],
      pegarObjeto: [
        "somParaColetarItens.mp3"
      ],
      roupaRocando: [
        "roupaRocando.mp3"
      ],
      selecionarMenu: [
        "menuSelect.mp3"
      ],
      ticTac: [
        "tictacRelogioDePulso.mp3"
      ],
      toquePele: [
        "toquePele1.mp3",
        "toquePele2.mp3"
      ],
      recepcao: [ "sonsAmbienteHospitalRecepcao.mp3" ]
    },
    musics: {
      menu: [ "cuidandoBemDoMenu.mp3" ],
      inGame: [
        "cuidandoBemDosPacientes1.mp3",
        "cuidandoBemDosPacientes2.mp3",
        "cuidandoBemDosPacientes3.mp3",
        "cuidandoBemDosPacientes4.mp3"
      ]
    },
    endgame: {
      victory: [ "cuidandoBemDoContrato.mp3" ]
    }
  };

  return {
    baseDir: baseDir,
    paths: paths,
    masterVolume: masterVolume
  };
});
