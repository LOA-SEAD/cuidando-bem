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

define(["Stage"],function(e){e.setHtmlPath("../html/screens/"),e.setControllersPath("./menu/"),e.setStartingScreenId(2),e.registerScreen("mainMenu","mainMenu.html","screenMainMenuController"),e.registerScreen("game","gameContainer.html","screenGameController"),e.registerScreen("preloader","preloader.html","screenPreloaderController"),e.registerScreen("credits","credits.html","screenCreditsController"),e.registerScreen("configuration","configuration.html","screenConfigurationController"),e.registerScreen("newGameSlotSelect","newGameSlotSelect.html","screenNewGameSlotSelectController"),e.registerScreen("levelSelect","levelSelect.html","screenLevelSelectController"),e.registerScreen("conteudo","conteudo.html","screenConteudoController"),e.registerScreen("vitoria","vitoria.html","screenVitoriaController"),e.registerScreen("derrota","derrota.html","screenDerrotaController")});