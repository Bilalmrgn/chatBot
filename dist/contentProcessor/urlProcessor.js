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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import * as cheerio from 'cheerio';
import https from 'https';
import fetch from 'node-fetch';
export function processUrl(url_1) {
    return __awaiter(this, arguments, void 0, function (url, depth) {
        var response, html, $_1, content_1, links, _i, links_1, link, nestedContent, error_1, error_2;
        if (depth === void 0) { depth = 1; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    if (depth === 0) {
                        return [2 /*return*/, []];
                    }
                    console.log("Başlıyor, URL:", url);
                    return [4 /*yield*/, fetch(url, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'text/html',
                            },
                            agent: new https.Agent({ rejectUnauthorized: false }) // SSL sertifikasını devre dışı bırakır
                        })];
                case 1:
                    response = _a.sent();
                    console.log("İstek tamamlandı.");
                    if (!response.ok) {
                        throw new Error("URL'den i\u00E7erik al\u0131namad\u0131. Durum Kodu: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.text()];
                case 2:
                    html = _a.sent();
                    console.log("HTML alındı:");
                    if (!html) {
                        throw new Error("URL içeriği alınamadı veya boş.");
                    }
                    $_1 = cheerio.load(html);
                    content_1 = [];
                    $_1('p, h1, h2, h3').each(function (i, elem) {
                        content_1.push($_1(elem).text());
                    });
                    links = $_1('a[href^="http"]').map(function (i, elem) { return $_1(elem).attr('href'); }).get();
                    _i = 0, links_1 = links;
                    _a.label = 3;
                case 3:
                    if (!(_i < links_1.length)) return [3 /*break*/, 8];
                    link = links_1[_i];
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, processUrl(link, depth - 1)];
                case 5:
                    nestedContent = _a.sent();
                    content_1.push.apply(content_1, (nestedContent || []));
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error("Failed to process nested URL: ".concat(link), error_1);
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [2 /*return*/, content_1];
                case 9:
                    error_2 = _a.sent();
                    console.error("Failed to process URL: ".concat(url), error_2.message);
                    return [2 /*return*/, []];
                case 10: return [2 /*return*/];
            }
        });
    });
}
