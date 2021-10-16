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
exports.user = void 0;
const post_1 = require("./post");
const core_1 = require("@mikro-orm/core");
const type_graphql_1 = require("type-graphql");
let user = class user {
    constructor() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.posts = [];
    }
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], user.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: "date" }),
    __metadata("design:type", Object)
], user.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'date', onUpdate: () => new Date() }),
    __metadata("design:type", Object)
], user.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)(),
    __metadata("design:type", String)
], user.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ type: 'text' }),
    __metadata("design:type", String)
], user.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ unique: true }),
    __metadata("design:type", String)
], user.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ unique: true }),
    __metadata("design:type", String)
], user.prototype, "email", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], user.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ unique: true }),
    __metadata("design:type", String)
], user.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], user.prototype, "imgUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [post_1.Post]),
    (0, core_1.OneToMany)(() => post_1.Post, post => post.user),
    __metadata("design:type", Array)
], user.prototype, "posts", void 0);
user = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, core_1.Entity)()
], user);
exports.user = user;
//# sourceMappingURL=user.js.map