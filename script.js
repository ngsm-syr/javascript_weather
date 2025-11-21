'use strict';

// --- 1. 準備：設定と要素の取得 ---

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

// --- 2. 天気コードを日本語に変換するためのオブジェクト ---
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


// --- 3. 関数：天気情報を取得して表示する ---
async function fetchWeather() {
    // 読み込み中...という表示にする
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

        // オブジェクトを使って、コード(数字)を日本語とアイコンに変換
        // 登録がないコードなら「不明」とする
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


// --- 4. イベント設定 ---
btn.addEventListener('click', fetchWeather);

// ページを開いた瞬間に一度取得したい場合は、ここでも呼び出す
fetchWeather();