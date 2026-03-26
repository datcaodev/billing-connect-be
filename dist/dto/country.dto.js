"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryDto = void 0;
const class_transformer_1 = require("class-transformer");
let CountryDto = class CountryDto {
};
exports.CountryDto = CountryDto;
__decorate([
    (0, class_transformer_1.Expose)({ name: "url" }),
    __metadata("design:type", String)
], CountryDto.prototype, "url", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "mcc" }),
    __metadata("design:type", String)
], CountryDto.prototype, "mcc", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "continent" }),
    __metadata("design:type", String)
], CountryDto.prototype, "area", void 0);
__decorate([
    (0, class_transformer_1.Expose)({ name: "name" }),
    __metadata("design:type", String)
], CountryDto.prototype, "name", void 0);
exports.CountryDto = CountryDto = __decorate([
    (0, class_transformer_1.Exclude)()
], CountryDto);
//# sourceMappingURL=country.dto.js.map