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

define([],function(){function r(t,r){e[r]!=null&&console.warn("O id: "+r+" já está em uso. O level anterior com esse mesmo id vai ser reescrito."),e[r]=t,n+=t.getMaxPoints(),console.log("\nAdding new Level:",t.getName())}function i(){return e[t]}function s(){return t}function o(){return n}function u(e){t=e}var e={},t=0,n=0;return{registerLevel:r,getCurrentLevel:i,getCurrentLevelId:s,getMaxGamePoints:o,setCurrentLevel:u}});