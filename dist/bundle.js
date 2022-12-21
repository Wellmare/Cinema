/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/index.css":
/*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/ts/Hall.ts":
/*!************************!*\
  !*** ./src/ts/Hall.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hall)
/* harmony export */ });
/* harmony import */ var _Place__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Place */ "./src/ts/Place.ts");

class Hall {
    constructor(rows, cols, prices, placesContainer, totalInfoNodes) {
        this.rows = rows;
        this.cols = cols;
        this.prices = prices;
        this.placesContainer = placesContainer;
        this.totalInfoNodes = totalInfoNodes;
        this.totalPrice = 0;
        this.totalCount = 0;
        this.selectedPlaces = [];
        this.renderHall = () => {
            for (let i = 1; i <= this.rows; i++) {
                const rowElement = document.createElement('div');
                rowElement.className = 'cinema-row';
                for (let j = 0; j < this.cols; j++) {
                    let price = 100;
                    this.prices.forEach((IPrice) => {
                        if (IPrice.row === i)
                            price = IPrice.price;
                    });
                    new _Place__WEBPACK_IMPORTED_MODULE_0__["default"](price, "not-filled" /* State.NOT_FILLED */, rowElement, this.addSelectedPlace, this.removeSelectedPlace).init();
                }
                this.placesContainer.insertAdjacentElement('beforebegin', rowElement);
            }
        };
        this.renderTotalInfo = () => {
            this.totalInfoNodes.totalCount.textContent = this.totalCount.toString();
            this.totalInfoNodes.totalPrice.textContent = this.totalPrice.toString();
        };
        this.reduceTotalValue = () => {
            if (this.selectedPlaces.length > 0) {
                let price = 0;
                this.selectedPlaces.forEach((place) => {
                    price += place.price;
                });
                this.totalPrice = price;
                // this.totalPrice = this.selectedPlaces.reduce((prevVal, currVal) => {
                // 	prevVal.price += currVal.price;
                // 	return prevVal;
                // }).price;
            }
            else {
                this.totalPrice = 0;
            }
            this.totalCount = this.selectedPlaces.length;
        };
        this.addSelectedPlace = (place) => {
            this.selectedPlaces.push(place);
            this.reduceTotalValue();
            this.renderTotalInfo();
        };
        this.removeSelectedPlace = (id) => {
            this.selectedPlaces = this.selectedPlaces.filter((place) => place.id !== id);
            this.reduceTotalValue();
            this.renderTotalInfo();
        };
    }
}


/***/ }),

/***/ "./src/ts/Place.ts":
/*!*************************!*\
  !*** ./src/ts/Place.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Place)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/ts/types.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/ts/utils.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class Place {
    constructor(price, state, parent, addSelectedPlace, removeSelectedPlace) {
        this.price = price;
        this.state = state;
        this.parent = parent;
        this.addSelectedPlace = addSelectedPlace;
        this.removeSelectedPlace = removeSelectedPlace;
        this.id = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getRandomId)();
        this.placeElement = document.createElement('div');
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            this.placeElement.className = `place ${this.state ? _types__WEBPACK_IMPORTED_MODULE_0__.classByState[this.state] || '' : ''}`;
            this.placeElement.setAttribute('data-id', this.id);
            yield this.parent.insertAdjacentElement('afterbegin', this.placeElement);
            this.placeElement.addEventListener(`click`, this.onClick);
        });
        this.onClick = () => {
            switch (this.state) {
                case "filled" /* State.FILLED */:
                    alert('This place is occupied!');
                    break;
                case "not-filled" /* State.NOT_FILLED */:
                    this.state = "selected" /* State.SELECTED */;
                    this.addSelectedPlace({ price: this.price, id: this.id });
                    this.render();
                    // reservedPlaces.push({ price: this.price, id: this.id });
                    // renderTotalTicketsInfo();
                    break;
                case "selected" /* State.SELECTED */:
                    this.state = "not-filled" /* State.NOT_FILLED */;
                    // reservedPlaces = reservedPlaces.filter(
                    // 	({ price, id }) => id !== this.id
                    // );
                    // renderTotalTicketsInfo();
                    this.removeSelectedPlace(this.id);
                    this.render();
                    break;
            }
        };
        this.render = () => {
            this.placeElement.className = `place ${this.state ? this.state : ''}`;
        };
    }
}


/***/ }),

/***/ "./src/ts/types.ts":
/*!*************************!*\
  !*** ./src/ts/types.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "classByState": () => (/* binding */ classByState)
/* harmony export */ });
const classByState = {
    ["filled" /* State.FILLED */]: 'filled',
    ["not-filled" /* State.NOT_FILLED */]: 'not-filled',
    ["selected" /* State.SELECTED */]: 'selected'
};


/***/ }),

/***/ "./src/ts/utils.ts":
/*!*************************!*\
  !*** ./src/ts/utils.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomId": () => (/* binding */ getRandomId)
/* harmony export */ });
const getRandomId = () => {
    return Math.random().toString(16).slice(2);
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.css */ "./src/css/index.css");
/* harmony import */ var _Hall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Hall */ "./src/ts/Hall.ts");


const prices = [
    {
        row: 1,
        price: 500
    },
    {
        row: 2,
        price: 400
    },
    {
        row: 3,
        price: 300
    }
];
const placesContainer = document.querySelector("#places-container" /* Selectors.PLACES_CONTAINER */);
const totalCountNode = document.querySelector("#amount-tickets" /* Selectors.TOTAL_COUNT_NODE */);
const totalPriceNode = document.querySelector("#price" /* Selectors.TOTAL_PRICE_NODE */);
if (placesContainer && totalCountNode && totalPriceNode) {
    new _Hall__WEBPACK_IMPORTED_MODULE_1__["default"](3, 5, prices, placesContainer, { totalCount: totalCountNode, totalPrice: totalPriceNode }).renderHall();
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBNEI7QUFDYjtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGdCQUFnQjtBQUM1QztBQUNBO0FBQ0EsZ0NBQWdDLGVBQWU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsd0JBQXdCLDhDQUFLO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxREEsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCLDRCQUE0QiwrREFBK0QsaUJBQWlCO0FBQzVHO0FBQ0Esb0NBQW9DLE1BQU0sK0JBQStCLFlBQVk7QUFDckYsbUNBQW1DLE1BQU0sbUNBQW1DLFlBQVk7QUFDeEYsZ0NBQWdDO0FBQ2hDO0FBQ0EsS0FBSztBQUNMO0FBQ3VDO0FBQ0Q7QUFDdkI7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbURBQVc7QUFDN0I7QUFDQTtBQUNBLG1EQUFtRCxhQUFhLGdEQUFZLHdCQUF3QjtBQUNwRztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsZ0NBQWdDO0FBQzVFO0FBQ0EsNkNBQTZDLGdDQUFnQztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCw2QkFBNkI7QUFDaEY7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNyRE87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDSk87QUFDUDtBQUNBOzs7Ozs7O1VDRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMEI7QUFDQTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw2Q0FBSSxrQ0FBa0Msd0RBQXdEO0FBQ3RHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2luZW1hLy4vc3JjL2Nzcy9pbmRleC5jc3MiLCJ3ZWJwYWNrOi8vY2luZW1hLy4vc3JjL3RzL0hhbGwudHMiLCJ3ZWJwYWNrOi8vY2luZW1hLy4vc3JjL3RzL1BsYWNlLnRzIiwid2VicGFjazovL2NpbmVtYS8uL3NyYy90cy90eXBlcy50cyIsIndlYnBhY2s6Ly9jaW5lbWEvLi9zcmMvdHMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vY2luZW1hL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2NpbmVtYS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vY2luZW1hL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vY2luZW1hL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vY2luZW1hLy4vc3JjL3RzL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCBQbGFjZSBmcm9tICcuL1BsYWNlJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFsbCB7XHJcbiAgICBjb25zdHJ1Y3Rvcihyb3dzLCBjb2xzLCBwcmljZXMsIHBsYWNlc0NvbnRhaW5lciwgdG90YWxJbmZvTm9kZXMpIHtcclxuICAgICAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgICAgIHRoaXMuY29scyA9IGNvbHM7XHJcbiAgICAgICAgdGhpcy5wcmljZXMgPSBwcmljZXM7XHJcbiAgICAgICAgdGhpcy5wbGFjZXNDb250YWluZXIgPSBwbGFjZXNDb250YWluZXI7XHJcbiAgICAgICAgdGhpcy50b3RhbEluZm9Ob2RlcyA9IHRvdGFsSW5mb05vZGVzO1xyXG4gICAgICAgIHRoaXMudG90YWxQcmljZSA9IDA7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkUGxhY2VzID0gW107XHJcbiAgICAgICAgdGhpcy5yZW5kZXJIYWxsID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSB0aGlzLnJvd3M7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm93RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgcm93RWxlbWVudC5jbGFzc05hbWUgPSAnY2luZW1hLXJvdyc7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuY29sczsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByaWNlID0gMTAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJpY2VzLmZvckVhY2goKElQcmljZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSVByaWNlLnJvdyA9PT0gaSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaWNlID0gSVByaWNlLnByaWNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBQbGFjZShwcmljZSwgXCJub3QtZmlsbGVkXCIgLyogU3RhdGUuTk9UX0ZJTExFRCAqLywgcm93RWxlbWVudCwgdGhpcy5hZGRTZWxlY3RlZFBsYWNlLCB0aGlzLnJlbW92ZVNlbGVjdGVkUGxhY2UpLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2VzQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCByb3dFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW5kZXJUb3RhbEluZm8gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxJbmZvTm9kZXMudG90YWxDb3VudC50ZXh0Q29udGVudCA9IHRoaXMudG90YWxDb3VudC50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB0aGlzLnRvdGFsSW5mb05vZGVzLnRvdGFsUHJpY2UudGV4dENvbnRlbnQgPSB0aGlzLnRvdGFsUHJpY2UudG9TdHJpbmcoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmVkdWNlVG90YWxWYWx1ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRQbGFjZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHByaWNlID0gMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQbGFjZXMuZm9yRWFjaCgocGxhY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBwcmljZSArPSBwbGFjZS5wcmljZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFByaWNlID0gcHJpY2U7XHJcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRvdGFsUHJpY2UgPSB0aGlzLnNlbGVjdGVkUGxhY2VzLnJlZHVjZSgocHJldlZhbCwgY3VyclZhbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gXHRwcmV2VmFsLnByaWNlICs9IGN1cnJWYWwucHJpY2U7XHJcbiAgICAgICAgICAgICAgICAvLyBcdHJldHVybiBwcmV2VmFsO1xyXG4gICAgICAgICAgICAgICAgLy8gfSkucHJpY2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUHJpY2UgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRoaXMuc2VsZWN0ZWRQbGFjZXMubGVuZ3RoO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5hZGRTZWxlY3RlZFBsYWNlID0gKHBsYWNlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQbGFjZXMucHVzaChwbGFjZSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVkdWNlVG90YWxWYWx1ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRvdGFsSW5mbygpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZFBsYWNlID0gKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRQbGFjZXMgPSB0aGlzLnNlbGVjdGVkUGxhY2VzLmZpbHRlcigocGxhY2UpID0+IHBsYWNlLmlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVkdWNlVG90YWxWYWx1ZSgpO1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclRvdGFsSW5mbygpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59O1xyXG5pbXBvcnQgeyBjbGFzc0J5U3RhdGUgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgZ2V0UmFuZG9tSWQgfSBmcm9tICcuL3V0aWxzJztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhY2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJpY2UsIHN0YXRlLCBwYXJlbnQsIGFkZFNlbGVjdGVkUGxhY2UsIHJlbW92ZVNlbGVjdGVkUGxhY2UpIHtcclxuICAgICAgICB0aGlzLnByaWNlID0gcHJpY2U7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG4gICAgICAgIHRoaXMuYWRkU2VsZWN0ZWRQbGFjZSA9IGFkZFNlbGVjdGVkUGxhY2U7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxlY3RlZFBsYWNlID0gcmVtb3ZlU2VsZWN0ZWRQbGFjZTtcclxuICAgICAgICB0aGlzLmlkID0gZ2V0UmFuZG9tSWQoKTtcclxuICAgICAgICB0aGlzLnBsYWNlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgIHRoaXMuaW5pdCA9ICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGFjZUVsZW1lbnQuY2xhc3NOYW1lID0gYHBsYWNlICR7dGhpcy5zdGF0ZSA/IGNsYXNzQnlTdGF0ZVt0aGlzLnN0YXRlXSB8fCAnJyA6ICcnfWA7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2VFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1pZCcsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICB5aWVsZCB0aGlzLnBhcmVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyYmVnaW4nLCB0aGlzLnBsYWNlRWxlbWVudCk7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgdGhpcy5vbkNsaWNrKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLm9uQ2xpY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImZpbGxlZFwiIC8qIFN0YXRlLkZJTExFRCAqLzpcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVGhpcyBwbGFjZSBpcyBvY2N1cGllZCEnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJub3QtZmlsbGVkXCIgLyogU3RhdGUuTk9UX0ZJTExFRCAqLzpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlID0gXCJzZWxlY3RlZFwiIC8qIFN0YXRlLlNFTEVDVEVEICovO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VsZWN0ZWRQbGFjZSh7IHByaWNlOiB0aGlzLnByaWNlLCBpZDogdGhpcy5pZCB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc2VydmVkUGxhY2VzLnB1c2goeyBwcmljZTogdGhpcy5wcmljZSwgaWQ6IHRoaXMuaWQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVuZGVyVG90YWxUaWNrZXRzSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInNlbGVjdGVkXCIgLyogU3RhdGUuU0VMRUNURUQgKi86XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFwibm90LWZpbGxlZFwiIC8qIFN0YXRlLk5PVF9GSUxMRUQgKi87XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzZXJ2ZWRQbGFjZXMgPSByZXNlcnZlZFBsYWNlcy5maWx0ZXIoXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gXHQoeyBwcmljZSwgaWQgfSkgPT4gaWQgIT09IHRoaXMuaWRcclxuICAgICAgICAgICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlbmRlclRvdGFsVGlja2V0c0luZm8oKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNlbGVjdGVkUGxhY2UodGhpcy5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZW5kZXIgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGxhY2VFbGVtZW50LmNsYXNzTmFtZSA9IGBwbGFjZSAke3RoaXMuc3RhdGUgPyB0aGlzLnN0YXRlIDogJyd9YDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjb25zdCBjbGFzc0J5U3RhdGUgPSB7XHJcbiAgICBbXCJmaWxsZWRcIiAvKiBTdGF0ZS5GSUxMRUQgKi9dOiAnZmlsbGVkJyxcclxuICAgIFtcIm5vdC1maWxsZWRcIiAvKiBTdGF0ZS5OT1RfRklMTEVEICovXTogJ25vdC1maWxsZWQnLFxyXG4gICAgW1wic2VsZWN0ZWRcIiAvKiBTdGF0ZS5TRUxFQ1RFRCAqL106ICdzZWxlY3RlZCdcclxufTtcclxuIiwiZXhwb3J0IGNvbnN0IGdldFJhbmRvbUlkID0gKCkgPT4ge1xyXG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMTYpLnNsaWNlKDIpO1xyXG59O1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi4vY3NzL2luZGV4LmNzcyc7XHJcbmltcG9ydCBIYWxsIGZyb20gJy4vSGFsbCc7XHJcbmNvbnN0IHByaWNlcyA9IFtcclxuICAgIHtcclxuICAgICAgICByb3c6IDEsXHJcbiAgICAgICAgcHJpY2U6IDUwMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICByb3c6IDIsXHJcbiAgICAgICAgcHJpY2U6IDQwMFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICByb3c6IDMsXHJcbiAgICAgICAgcHJpY2U6IDMwMFxyXG4gICAgfVxyXG5dO1xyXG5jb25zdCBwbGFjZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3BsYWNlcy1jb250YWluZXJcIiAvKiBTZWxlY3RvcnMuUExBQ0VTX0NPTlRBSU5FUiAqLyk7XHJcbmNvbnN0IHRvdGFsQ291bnROb2RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhbW91bnQtdGlja2V0c1wiIC8qIFNlbGVjdG9ycy5UT1RBTF9DT1VOVF9OT0RFICovKTtcclxuY29uc3QgdG90YWxQcmljZU5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3ByaWNlXCIgLyogU2VsZWN0b3JzLlRPVEFMX1BSSUNFX05PREUgKi8pO1xyXG5pZiAocGxhY2VzQ29udGFpbmVyICYmIHRvdGFsQ291bnROb2RlICYmIHRvdGFsUHJpY2VOb2RlKSB7XHJcbiAgICBuZXcgSGFsbCgzLCA1LCBwcmljZXMsIHBsYWNlc0NvbnRhaW5lciwgeyB0b3RhbENvdW50OiB0b3RhbENvdW50Tm9kZSwgdG90YWxQcmljZTogdG90YWxQcmljZU5vZGUgfSkucmVuZGVySGFsbCgpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==