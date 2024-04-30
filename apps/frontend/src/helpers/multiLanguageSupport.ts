import en from "../assets/Languages/EN.json";
import sp from "../assets/Languages/SP.json";
import cn from "../assets/Languages/CN.json";


export default function TranslateTo(key: string){

    const lang = localStorage.getItem("language") || 'en';

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
        case("cn"):
        {
            langDictionary = JSON.parse(JSON.stringify(cn));
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
        return `Translation for ${key} was not found.`;
    }

    return getKey(langDictionary, key);

}
