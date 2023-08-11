import {HateService} from "./services/hate.service";
const hateService = new HateService();
hateService.getTotalHaters().then(response => {
    console.log(response);
})