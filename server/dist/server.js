"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const public_1 = __importDefault(require("./app/routers/public"));
const user_1 = __importDefault(require("./app/routers/user"));
const constants_1 = __importDefault(require("./constants"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: '999999999mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '9999999mb', extended: true }));
app.use((0, cookie_parser_1.default)());
app.use('/api', public_1.default);
app.use('/api', user_1.default);
if (process.env.NODE_ENV !== 'development') {
    app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
        try {
            res.sendFile(path_1.default.join(__dirname, '../client/dist/index.html'));
        }
        catch (e) {
            console.log(e);
        }
    });
}
app.listen(PORT, () => {
    console.log('-------> Servidor rodando na porta ' + PORT);
});
const urlMongoConnection = process.env.NODE_ENV === constants_1.default.development
    ? process.env.MONGO_CONNECTION_URL_DEVELOPMENT
    : process.env.MONGO_CONNECTION_URL_PRODUCTION;
mongoose_1.default
    .connect(urlMongoConnection || '')
    .then(() => console.log('-------> Banco de dados rodando!'))
    .catch((error) => console.log(error));
