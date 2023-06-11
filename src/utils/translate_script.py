from langdetect import detect
import translators as ts
import sys

def detect_language(text):
    return detect(text)

def translate_text(text, from_lang, to_lang):
    return ts.translate_text(text, translator='bing', from_language=from_lang, to_language=to_lang)

def detect_and_translate(text):
    # find the language
    detected_language = detect_language(text)

    # translate according to language
    if detected_language == 'en':
        translated_text = translate_text(text, 'en', 'ja')
    if detected_language == 'ja':
        translated_text = translate_text(text, 'ja', 'en')
    elif detected_language != 'en' and detected_language != 'ja':
        translated_text = text
    
    return translated_text

if __name__ == "__main__":
    text = sys.argv[1]
    result = detect_and_translate(text)
    print(result)

