const translateText = require("../utils/translateFunc.js")
const detectLanguage = require("../utils/detectLangFunc.js");

export async function translate (text: string) {
    // const text = req.body.text;
    const detected = await detectLanguage(text);
    console.log(detected);
    return await translateText(text);
    
};