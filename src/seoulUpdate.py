import requests
import pandas as pd
import time
import os
from datetime import datetime

# 인코딩된 API 키
API_KEY = "MNUICj9LF0yMX9b9cMQiBVz62JWYaqaGxBOIATmwvQgzkfdHQjzCouGaBLIzyg6MYGQOHqefVCRf3E23XoqVGA%3D%3D"

# 현재 파일 위치를 기준으로 상위 폴더의 data 디렉토리 지정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "..", "data")
os.makedirs(DATA_DIR, exist_ok=True)

# 저장 경로
CSV_FILE = os.path.join(DATA_DIR, "미세먼지_서울데이터.csv")
XLSX_FILE = os.path.join(DATA_DIR, "미세먼지_서울데이터.xlsx")

# 서울 측정소 리스트
seoul_stations = [
    '중구', '한강대로', '종로구', '청계천로', '종로', '용산구', '광진구', '성동구',
    '강변북로', '중랑구', '동대문구', '홍릉로', '성북구', '정릉로', '도봉구', '은평구',
    '서대문구', '마포구', '신촌로', '강서구', '공항대로', '구로구', '영등포구', '영등포로',
    '동작구', '동작대로 중앙차로', '관악구', '강남구', '서초구', '도산대로', '강남대로',
    '송파구', '강동구', '천호대로', '금천구', '시흥대로', '강북구', '양천구', '노원구', '화랑로'
]

def fetch_dust_data():
    results = []
    for station in seoul_stations:
        url = (
            f"http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/"
            f"getMsrstnAcctoRltmMesureDnsty"
            f"?serviceKey={API_KEY}"
            f"&returnType=json"
            f"&numOfRows=1"
            f"&pageNo=1"
            f"&stationName={station}"
            f"&dataTerm=DAILY"
            f"&ver=1.0"
        )
        try:
            res = requests.get(url)
            if res.status_code == 200:
                item = res.json()["response"]["body"]["items"][0]
                results.append({
                    "수집시각": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    "측정시각": item.get("dataTime", ""),
                    "측정소": station,
                    "PM10": item.get("pm10Value", ""),
                    "PM2.5": item.get("pm25Value", ""),
                    "통합지수": item.get("khaiValue", ""),
                    "오존": item.get("o3Value", ""),
                    "이산화질소": item.get("no2Value", ""),
                    "일산화탄소": item.get("coValue", ""),
                    "아황산가스": item.get("so2Value", "")
                })
        except Exception as e:
            print(f"⚠️ {station} 오류: {e}")
        time.sleep(0.2)
    return pd.DataFrame(results)

def append_and_save(new_df):
    # 기존 데이터 불러오기
    if os.path.exists(CSV_FILE):
        existing_df = pd.read_csv(CSV_FILE)
        combined_df = pd.concat([existing_df, new_df], ignore_index=True)
    else:
        combined_df = new_df

    # 저장
    combined_df.to_csv(CSV_FILE, index=False, encoding="utf-8-sig")
    combined_df.to_excel(XLSX_FILE, index=False)
    print(f"✅ 저장 완료 ({len(new_df)}개 추가됨) - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

# 매시간 반복 (테스트용으로는 range로 반복 횟수 조절 가능)
while True:
    print("📡 미세먼지 데이터 수집 중...")
    new_data = fetch_dust_data()
    append_and_save(new_data)
    
    print("🕒 다음 수집까지 1시간 대기...\n")
    time.sleep(60 * 60)  # 실제 사용 시 1시간(3600초), 테스트 시 더 짧게 조정 가능
