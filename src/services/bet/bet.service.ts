import BasicService from "../basic.service";
import Config from "../../config/config.json";
import { Bet } from "../../models/Model";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class BetService extends BasicService {

    static async getUserBet (id: any) {
        return BasicService.fetchData(Config.Bet.FindAll, {
            betId: id
        });
    } 

    static async postBet(bet: Bet) {
        try {
            const userId = await AsyncStorage.getItem("userId");

            if (userId != null) {
                bet.userId = userId;
                return BasicService.postData(Config.Bet.Add, bet);
            }

        } catch (error) {
            throw error;
        }
    }

    static async addBetToLS(bet: Bet) {
        try {
            const betsStored = await AsyncStorage.getItem("userBets");

            if (betsStored != null) 
            {
                let bets : Bet[] = JSON.parse(betsStored);
                bets.push(bet);
                const jsonValue = JSON.stringify(bets)
                AsyncStorage.setItem("userBets", jsonValue)
                    .then(() => {
                        console.log("bets in local storage updated");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            else{
                console.log("No bets found"); 
            }
  
        } catch (error) {
            throw error;
        }
    }

    static async getUserBets() {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (userId != null) {
                return BasicService.fetchData(Config.Bet.FindByUser, {
                    userid: userId
                });
            }else{
                console.log("No bets found"); 
            }
        } catch (error) {
            console.log(error);
            throw error;  
        }
    }

    static async getUserBetsByCategory(categoryId: any) {
        try {
            const userId = await AsyncStorage.getItem("userId");
            if (userId != null) {
                return this.fetchData(Config.Bet.FindByUserAndCategory, {
                    userid: userId,
                    categoryId: categoryId
                })
            }else{
                console.log("No bets found");
            }

        } catch (error) {
            console.log(error);
            throw error;  
        }
    }

    static async getUserBetsFromLS() {
        try {
            const betsStored = await AsyncStorage.getItem("userBets");

            if (betsStored != null) {
                let bets : Bet[] = JSON.parse(betsStored);
                return bets;
            }else{
                console.log("No bets found in LS");
            }

        } catch (error) {
            console.log(error);
            throw error;  
        }        
    }

}