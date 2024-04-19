import EN from "../assets/Languages/EN.json";


function translateText(lang, key) {
    return "translated";
}

function parseString(translatedText: string){
    return "parsedSTR";
}

export default function translateTo(key: string){

    var langDictionary = EN;

    if(langDictionary.hasOwnProperty(key)){
        return langDictionary.
    }
}
