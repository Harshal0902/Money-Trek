from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/extract_bill', methods=['POST'])
def extract_bill():
    bill_url = request.json["url"]

    response = jsonify(util.extract_bill(bill_url))

    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    app.run()