import BasicService from "../basic.service";
import Config from "../../config/config.json";

export class CategoryService extends BasicService {

    static async getCategories () {
        return BasicService.fetchData(Config.Category.FindAll);
    } 
}