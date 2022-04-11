
import json
import requests


parsedData = [x.strip() for x in open("foundData/data.txt")]


url = "http://localhost:8080/api/ingredients"

headers = {"Content-Type": "application/json; charset=utf-8",
           "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjI1MzI2ZTdiNWI0Y2E2Y2I0OGQyZjMxIiwiaWF0IjoxNjQ5NjE2NjUwLCJleHAiOjE2NTAyMjE0NTB9.VCvWYsCp-pBYHSG_ysOSuNVMNrZENWl3VkRMde-xQ9U"}


for ingredient in parsedData:
    data = {
        "name": ingredient,
    }
    response = requests.post(url, headers=headers, json=data)
    print("Status Code", response.status_code)
    print("JSON Response ", response.json())
