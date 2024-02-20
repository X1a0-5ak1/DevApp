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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma/prisma.service");
let Gateway = class Gateway {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    onModuleInit() {
        this.server.on('connection', (socket) => {
            console.log(socket.id);
            console.log('connected!');
        });
    }
    async onLoadMessage() {
        const messageHistories = await this.prismaService.message.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            take: 50,
        });
        console.log(messageHistories);
        this.server.emit('onMessage', {
            messageHistories,
            msg: 'Load latest 50',
        });
    }
    async onNewMessage(body, user_Id) {
        console.log(body);
        try {
            this.prismaService.message.create({
                data: {
                    user_Id: user_Id,
                    content: body,
                },
            });
        }
        catch (error) {
            console.log(error);
        }
        const loadMessage = await this.prismaService.message.findMany({
            where: {
                user_Id: user_Id,
                content: body,
            },
        });
        console.log(loadMessage);
        this.server.emit('onMessage', {
            loadMessage,
            msg: 'New Message',
        });
    }
};
exports.Gateway = Gateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], Gateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('loadMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "onLoadMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('newMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], Gateway.prototype, "onNewMessage", null);
exports.Gateway = Gateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], Gateway);
//# sourceMappingURL=gateway.js.map