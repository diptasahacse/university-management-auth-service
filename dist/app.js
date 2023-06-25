"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
// Cors
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Application routes
app.use('/api/v1', routes_1.default);
// // Default Route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('This Testing Error')
//   // throw new ApiError(400, 'This is API Error')
//   // next('This is Next Error')
// })
// Global Error Handler
app.use(globalErrorHandler_1.default);
// Handle Not Found Error
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'API Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
