from azure.ai.formrecognizer import FormRecognizerClient, FormTrainingClient
from azure.core.credentials import AzureKeyCredential
import json

config = json.load(open("config.json"))
client = FormRecognizerClient(config["endpoint"], AzureKeyCredential(config["key"]))

def extract_bill(bill_url):
    receipt_recognizer = client.begin_recognize_receipts_from_url(bill_url)
    receipt_recognizer = receipt_recognizer.result()
    receipt = receipt_recognizer[0].to_dict()
    try:
        Date = str(receipt['fields']['TransactionDate']['value'])
    except:
        Date = "NA"
    try:
        Time = str(receipt['fields']['TransactionTime']['value'])
    except:
        Time = "NA"
    try:
        MerchantName = str(receipt['fields']['MerchantName']['value'])
    except:
        MerchantName = "NA"
    try:
        Total = float(receipt['fields']['Total']['value'])
    except:
        Total = 0.0
    result = [{
        'date' : Date,
        'time' : Time,
        'merchant' : MerchantName,
        'total' : Total
    }]
    return result
 