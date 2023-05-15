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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../../db/models/User"));
const user_1 = __importDefault(require("../../settings/user"));
const checkForRecentMatches = ({ currentMatch, historyMatch }) => {
    const checkLimitPassed = (departureDate) => {
        const currentDate = new Date();
        const diffEmMs = Math.abs(currentDate.getTime() - departureDate.getTime());
        const diffEmHrs = Math.floor(diffEmMs / 3600000);
        return diffEmHrs <= user_1.default.hoursToGetAchievement;
    };
    const recentMatches = historyMatch.filter(histy => (histy.idPlayer === currentMatch.idPlayer && checkLimitPassed(histy.departureDate)));
    return recentMatches.length > 0;
};
const selectAchievements = ({ percentageOfHits, difficulty, technology, startingPercentGlobal }) => {
    const difficulties = ["assembly-level", "avanced", "beginner", "intermediary"];
    const technologies = ["css", "html", "javascript"];
    const achievementsModels = technologies.map(tech => {
        const techName = (tech === "css" ? "CSS" :
            tech === "html" ? "HTML" :
                tech === "javascript" ? "JavaScript" :
                    "");
        return difficulties.map(diff => {
            const difficultyName = (diff === "assembly-level" ? "assembly" :
                diff === "avanced" ? "avançado" :
                    diff === "beginner" ? "iniciante" :
                        diff === "intermediary" ? "intermediário" :
                            "");
            if (startingPercentGlobal <= 30 && startingPercentGlobal > 0)
                return {
                    name: `${tech}-${diff}-100-rank-30`,
                    type: "trofeu",
                    condition: percentageOfHits === 100 && difficulty === diff && technology === tech,
                    message: `Uau! Você não apenas obteve 100% de acertos no quiz de ${techName} nível ${difficultyName}, mas também possui uma das melhores média de tempo entre os participantes. \n Com certeza, você merece um troféu por essa conquista incrível, não é mesmo?`
                };
            if (startingPercentGlobal === 0)
                return {
                    name: `${tech}-${diff}-100-the-better`,
                    type: "trofeu",
                    condition: percentageOfHits === 100 && difficulty === diff && technology === tech,
                    message: `Uau! Você não apenas obteve 100% de acertos no quiz de ${techName} nível ${difficultyName}, mas também teve a menor média de tempo entre os participantes. \n Com certeza, você merece um troféu por essa conquista incrível, não é mesmo?`
                };
            return {
                name: `${tech}-${diff}-100`,
                type: "medal",
                condition: percentageOfHits === 100 && difficulty === diff && technology === tech,
                message: `Parabéns pela sua conquista em obter 100% de acertos no quiz de ${techName} nível ${difficultyName}! \n Com certeza, esse feito merece uma medalha, não é mesmo?`
            };
        });
    });
    const achievements = [
        ...achievementsModels.flat()
    ];
    const achievementSelected = achievements.filter(achiev => achiev.condition);
    return achievementSelected;
};
const calculatePercentHits = (answersServerQuestion) => {
    return Math.floor((answersServerQuestion.filter(answer => answer.alternative.correct).length * 100) / answersServerQuestion.length);
};
const calculatePercentageGlobalMatches = ({ currentMatch, historyMatch }) => {
    // console.log(currentMatch)
    const matches100percentAccuracy = historyMatch.filter(match => calculatePercentHits(match.answers) === 100);
    const totalMatches100percent = [...matches100percentAccuracy, currentMatch];
    if (totalMatches100percent.length < 10)
        return 100;
    const matchesOrganizedAveregeTime = totalMatches100percent.sort((a, b) => a.timeAverage - b.timeAverage);
    const recentMatchPosition = matchesOrganizedAveregeTime.map(match => match.timeAverage).indexOf(currentMatch.timeAverage);
    const percentCurrentMatch = Math.round((recentMatchPosition * 100) / matchesOrganizedAveregeTime.length);
    return percentCurrentMatch;
};
function checkAndSaveUserGame({ currentMatch, quiz }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!currentMatch ||
            !currentMatch.idPlayer ||
            calculatePercentHits(currentMatch.answers) !== 100)
            return null;
        if (checkForRecentMatches({
            currentMatch,
            historyMatch: quiz.matchHistory
        }))
            return null;
        const achievementsSelected = selectAchievements({
            difficulty: quiz.difficulty,
            technology: quiz.technology,
            percentageOfHits: calculatePercentHits(currentMatch.answers),
            startingPercentGlobal: calculatePercentageGlobalMatches({
                currentMatch,
                historyMatch: quiz.matchHistory
            })
        });
        if (achievementsSelected.length === 0)
            return null;
        try {
            const player = yield User_1.default.findById(currentMatch.idPlayer);
            if (!player)
                throw new Error("Usuário não foi encontrado!");
            const achievementSelected = achievementsSelected.find(archivSelected => (!player.achievements.includes(archivSelected.name))) || null;
            if (!achievementSelected)
                return null;
            yield User_1.default.updateOne({ _id: currentMatch.idPlayer }, {
                $push: { achievements: achievementSelected.name }
            });
            return achievementSelected;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.default = checkAndSaveUserGame;
