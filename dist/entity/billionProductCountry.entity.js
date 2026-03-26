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
exports.BillionProductCountry = void 0;
const typeorm_1 = require("typeorm");
const billionProduct_entity_1 = require("./billionProduct.entity");
const billionCountry_entity_1 = require("./billionCountry.entity");
let BillionProductCountry = class BillionProductCountry {
};
exports.BillionProductCountry = BillionProductCountry;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BillionProductCountry.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BillionProductCountry.prototype, "product_sku", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], BillionProductCountry.prototype, "country_mcc", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => billionProduct_entity_1.BillionProduct),
    (0, typeorm_1.JoinColumn)({ name: "product_sku", referencedColumnName: "sku_id" }),
    __metadata("design:type", billionProduct_entity_1.BillionProduct)
], BillionProductCountry.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => billionCountry_entity_1.BillionCountry),
    (0, typeorm_1.JoinColumn)({ name: "country_mcc", referencedColumnName: "mcc" }),
    __metadata("design:type", billionCountry_entity_1.BillionCountry)
], BillionProductCountry.prototype, "country_details", void 0);
exports.BillionProductCountry = BillionProductCountry = __decorate([
    (0, typeorm_1.Entity)("billion_product_countries")
], BillionProductCountry);
//# sourceMappingURL=billionProductCountry.entity.js.map