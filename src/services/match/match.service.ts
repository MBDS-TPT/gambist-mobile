import BasicService from "../basic.service";
import Config from "../../config/config.json";
import { Match } from "../../models/Model";

export class MatchService extends BasicService {

    static async getAllMatch() {
        return await BasicService.fetchData(Config.Match.FindAll);
    }
    
    static async getUpcomingMatchByCategory(categoryId: any) {
        return BasicService.fetchData(Config.Match.UpcomingMatch, {
            categoryId: categoryId
        });
    }
    
    static async getUpcomingMatchGroupedByCategory() {
        return BasicService.fetchData(Config.Match.UpcomingMatchGroupedByCategory);
    }
    
    static async getMatch(id: any) {
        return BasicService.fetchData(Config.Match.FindById, {
            id
        })
    }

    static async getAllMatchId() {
        return BasicService.fetchData(Config.Match.GetAllMatchId);
    }

    static getUpcomingMatchByCategoryName(matches: any, categoryName: string) {
        if(matches) {
            return matches[categoryName];
        }
        return [];
    }

    /**
     * retourne le match le plus proche
     * @param matches 
     */
    static getUpcomingMatch(matches: any, categories: any[]) {
        let time = 0;
        let match: any;
        categories.forEach((category) => {
            if(category.id != -1) {
                if(matches[category.label] && matches[category.label][0]) {
                    if(!match)
                        match = matches[category.label][0];
                    const currentTime = new Date(match.matchDate).getTime();
                    if(currentTime > time) {
                        time = currentTime;
                        match = matches[category.label][0];
                    }
                }
            } 
        });
        return match;
    }

    static getLatestGameResult() {
        return this.fetchData(Config.Match.GetLatestMatchResult, {
            count: 3
        });
    }

    static getMatchTime(match: Match) {
        if(!match) return null;
        const date: Date = match.matchDate;
        return `${date.getHours}:${date.getMinutes()}`;
    }
}