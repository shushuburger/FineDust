import requests
import pandas as pd
import urllib.parse
import os

# 현재 파일 위치 기준 상위 폴더의 data 디렉토리 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
os.makedirs(DATA_DIR, exist_ok=True)

# 저장 경로 설정
CSV_PATH = os.path.join(DATA_DIR, "서울_측정소_목록.csv")
XLSX_PATH = os.path.join(DATA_DIR, "서울_측정소_목록.xlsx")

# API 키와 URL 구성
API_KEY = "MNUICj9LF0yMX9b9cMQiBVz62JWYaqaGxBOIATmwvQgzkfdHQjzCouGaBLIzyg6MYGQOHqefVCRf3E23XoqVGA=="
ENCODED_KEY = urllib.parse.quote(API_KEY, safe='')

url = (
    f"http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getMsrstnList"
    f"?serviceKey={ENCODED_KEY}&returnType=json&numOfRows=1000&pageNo=1"
)

response = requests.get(url)

print("상태코드:", response.status_code)
print("본문 미리보기:", response.text[:200])  # 전체 다 출력하면 너무 기니까 앞부분만

if response.status_code == 200:
    try:
        items = response.json()["response"]["body"]["items"]
        df = pd.DataFrame(items)
        daejeon_df = df[df["addr"].str.contains("서울")]

        # 수정된 경로로 저장
        daejeon_df.to_csv(CSV_PATH, index=False, encoding="utf-8-sig")
        daejeon_df.to_excel(XLSX_PATH, index=False)

        print(f"✅ 저장 완료 → {CSV_PATH}, {XLSX_PATH}")
    except Exception as e:
        print("⚠️ 파싱 실패:", e)
        print("본문:", response.text)
else:
    print("❌ 요청 실패:", response.status_code)
