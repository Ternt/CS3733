import en from "../assets/Languages/EN.json";
import sp from "../assets/Languages/SP.json";
import {useContext} from "react";
import {LanguageContext} from "../App.tsx";


export default function TranslateTo(key: string){

    const lang = useContext(LanguageContext);

    let langDictionary: JSON = JSON.parse("{}");

    switch(lang) {

        case("en"):
        {
            langDictionary = JSON.parse(JSON.stringify(en));
            break;
        }
        case("sp"):
        {
            langDictionary = JSON.parse(JSON.stringify(sp));
            break;
        }

    }


    function getKey(json: object, key:string){
        for(const k in json){
            if(k === key)
            { //@ts-expect-error JSON lang does not have a translation for that key.
                return json[k];
            }
        }
        return Error("Error: No translation Found");
    }

    return getKey(langDictionary, key);

}
