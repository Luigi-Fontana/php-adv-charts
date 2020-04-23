/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

$(document).ready(function () {
  ajaxCallGet('server-fatturato.php'); // Richiamo funzione di chiamata Ajax al server-fatturato

  ajaxCallGet('server-agente.php'); // Richiamo funzione di chiamata Ajax al server-agente

  function ajaxCallGet(server) {
    // Funzione di chiamata GET con url in entrata
    $.ajax({
      url: server,
      method: 'GET',
      success: function success(data) {
        if (data.type == 'line') {
          // Se il tipo è line
          var months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
          createLineChart(months, data.data); // Richiamo funzione di creazione grafico a linee con labels e data in entrata
        } else if (data.type == 'pie') {
          // Se il tipo è pie
          var objectChart = createObjectChart(data.data); // Creo un oggetto contenente i due array labels e data

          createPieChart(objectChart.labels, objectChart.data); // Richiamo funzione di creazione grafico a torta con labels e data in entrata
        }
      },
      error: function error(err) {
        alert('Errore API');
      }
    });
  }

  function createObjectChart(object) {
    // Funzione che dato un oggetto in entrata crea un oggetto con due array labels e data
    var arrayLabels = []; // Inizializzo i due Array

    var arrayData = [];

    for (var key in object) {
      // Ciclo all'interno dell'oggetto per trasformare la coppia chiave-valore in due array da dare a Chart.js
      arrayLabels.push(key); // Inserisco il nome del venditore nell'arrayLabels

      arrayData.push(object[key]); // Inserisco nell'arrayData la somma di tutte le vendite relative a quel venditore
    }

    return {
      labels: arrayLabels,
      data: arrayData
    };
  }

  function createLineChart(labels, data) {
    // Funzione di creazione grafico a linea con labels e data in entrata
    var ctx = $('#line-chart');
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Vendite',
          backgroundColor: '#C0C0C0',
          borderColor: '#003366',
          data: data
        }]
      }
    });
  }

  function createPieChart(labels, data) {
    // Funzione di creazione grafico a torta con labels e data in entrata
    var ctx = $('#pie-chart');
    var chart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: data,
          backgroundColor: ['pink', 'orange', 'lightblue', 'lightgreen']
        }],
        labels: labels
      }
    });
  }
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*************************************************!*\
  !*** multi ./src/js/app.js ./src/scss/app.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Applications/MAMP/htdocs/Classe10/Esercizi/70/php-adv-charts/src/js/app.js */"./src/js/app.js");
module.exports = __webpack_require__(/*! /Applications/MAMP/htdocs/Classe10/Esercizi/70/php-adv-charts/src/scss/app.scss */"./src/scss/app.scss");


/***/ })

/******/ });