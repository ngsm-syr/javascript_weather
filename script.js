// --- 設定 ---

// 緯度・経度
const latitude = 33.58978191350858;
const longitude = 130.4179163144292;

// Open-MeteoのAPI URL
// current_weather=true をつけると現在の天気
const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

// 要素の取得
const btn = document.getElementById('get-weather-btn');
const iconElem = document.getElementById('weather-icon');
const textElem = document.getElementById('weather-text');
const tempElem = document.getElementById('temperature');

// --- 天気コードを変換 ---
const weatherCodes = {
    0: { text: '快晴', icon: '☀️' },
    1: { text: '晴れ', icon: '🌤️' },
    2: { text: '一部曇り', icon: '⛅' },
    3: { text: '曇り', icon: '☁️' },
    45: { text: '霧', icon: '🌫️' },
    48: { text: '霧氷', icon: '🌫️' },
    51: { text: '霧雨', icon: '💧' },
    61: { text: '雨', icon: '☔' },
    63: { text: '雨', icon: '☔' },
    80: { text: 'にわか雨', icon: '🌦️' },
    95: { text: '雷雨', icon: '⚡' },
};


// --- 気情報を取得 ---
async function fetchWeather() {

    textElem.textContent = '読み込み中...';

    try {
        // APIからデータを取得 (fetch)
        const response = await fetch(apiUrl);
        const data = await response.json();

        // データの確認
        console.log(data);

        // データの取り出し
        const current = data.current_weather;
        const temp = current.temperature; // 気温
        const code = current.weathercode; // 天気コード

        // コード(数字)を変換
        // 登録がない場合は「不明」とする
        const weatherInfo = weatherCodes[code] || { text: '不明', icon: '❓' };

        // 画面に表示
        iconElem.textContent = weatherInfo.icon;
        textElem.textContent = weatherInfo.text;
        tempElem.textContent = `${temp}℃`;

    } catch (error) {
        console.error('エラー:', error);
        textElem.textContent = '取得に失敗しました';
    }
}


// --- イベント ---
btn.addEventListener('click', fetchWeather);
