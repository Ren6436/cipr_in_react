from flask import Flask, request, Response
import unicodedata
import re
from substitution_cipher import prolom_substitute, get_bigrams, transition_matrix

app = Flask(__name__)

def clean_text(text):
    text = unicodedata.normalize('NFKD', text)
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.replace(' ', '_')
    return text.upper()

@app.route('/api/break', methods=['POST'])
def process():
    text = request.form.get('text', '')
    uploaded_file = request.files.get('file')

    if uploaded_file:
        ciphered_text = uploaded_file.read().decode('utf-8')
    else:
        ciphered_text = text

    cleaned_text = clean_text(ciphered_text)

    try:
        _, cracked_text, _ = prolom_substitute(cleaned_text, TM_ref, iter=50000)
        return Response(cracked_text, mimetype='text/plain')
    except Exception as e:
        return Response(f"Error: {str(e)}", mimetype='text/plain', status=500)

with open("krakatit_cleaned.txt", "r", encoding="utf-8") as f:
    krakatit_text = f.read()
TM_ref = transition_matrix(get_bigrams(krakatit_text))

if __name__ == '__main__':
    app.run(port=5000, debug=True)
