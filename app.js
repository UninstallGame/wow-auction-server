"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var settings_1 = require("./settings");
var http = require('http');
var axios_1 = require("axios");
var BASE_URL = 'https://eu.api.blizzard.com';
var AUCTION = '/data/wow/connected-realm/1602/auctions';
var PROFESSIONS = '/data/wow/profession/index';
var PROFESSION_BY_INDEX = '/data/wow/profession/';
var ITEM = '/data/wow/item/';
// https://develop.battle.net/documentation/world-of-warcraft/community-api-migration-status
https: //us.api.blizzard.com/data/wow/connected-realm/1146/auctions?namespace=dynamic-us&locale=en_US&access_token=US63qljebf8E5YKxdf16wg1LGlNB5Vyd2g
 var accessToken = '';
var tmp = {};
var hostname = '127.0.0.1';
var port = 3000;
var server = http.createServer(function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(tmp);
});
server.listen(port, hostname, function () {
    console.log("Server running at http://" + hostname + ":" + port + "/");
});
run();
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var x, xx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, auth()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getProfessions()];
                case 2:
                    x = _a.sent();
                    console.log(x);
                    return [4 /*yield*/, getItemInfo(171415)];
                case 3:
                    xx = _a.sent();
                    console.log(xx);
                    return [2 /*return*/];
            }
        });
    });
}
function auth() {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get("https://eu.battle.net/oauth/token", {
                        auth: {
                            username: settings_1.clientId,
                            password: settings_1.clientSecret
                        },
                        params: {
                            grant_type: 'client_credentials'
                        }
                    })];
                case 1:
                    response = _a.sent();
                    accessToken = response.data.access_token;
                    console.log(accessToken);
                    return [2 /*return*/];
            }
        });
    });
}
function getAuctionData() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1["default"].get("" + BASE_URL + AUCTION + "?namespace=dynamic-eu&locale=ru_RU&access_token=" + accessToken)];
        });
    });
}
function getProfessions() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1["default"].get("" + BASE_URL + PROFESSIONS + "'?namespace=static-eu&locale=ru_RU&access_token=" + accessToken)];
        });
    });
}
function getProfessionById(professionId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1["default"].get("" + BASE_URL + PROFESSION_BY_INDEX + professionId + "?namespace=static-eu&locale=ru_RU&access_token=" + accessToken)];
        });
    });
}
function getItemInfo(itemId) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, axios_1["default"].get("" + BASE_URL + ITEM + itemId + "?namespace=static-eu&locale=ru_RU&access_token=" + accessToken)];
        });
    });
}
