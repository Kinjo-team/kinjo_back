from langdetect import detect
import sys

def detect_language(text):
    language = detect(text)
    if language != 'en' and language != 'ja':
        language = 'en'
    return language


if __name__ == "__main__":
    text = sys.argv[1]
    result = detect_language(text)
    print(result)