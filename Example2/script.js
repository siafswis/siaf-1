// מבצע בקשת API ומביא ערכת צבעים לפי מצב שנבחר (mode)
async function fetchColorScheme(mode) {
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=FF5733&mode=${mode}&count=5`;
    const resultDiv = document.getElementById('api-result');

    try {
        resultDiv.innerHTML = 'טוען...';
        const response = await fetch(apiUrl);

        // בדיקה אם התגובה לא תקינה (שגיאת HTTP)
        if (!response.ok) {
            throw new Error(`שגיאת HTTP: ${response.status}`);
        }

        const data = await response.json();
        displayColors(data.colors);
    } catch (error) {
        resultDiv.innerHTML = `שגיאה: ${error.message}`;
    }
}

// מבצע בקשת API שגויה לצורך הדגמה של טיפול בשגיאות
async function fetchError(mode) {
    const apiUrl = `https://www.thecolorapi.com/scheme?hex=FF5733&mode=${mode}&count=5`; // כתובת שגויה בכוונה
    const resultDiv = document.getElementById('api-result');

    try {
        resultDiv.innerHTML = 'טוען...';
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`שגיאת HTTP: ${response.status}`);
        }

        const data = await response.json();
        displayColors(data.colors);
    } catch (error) {
        resultDiv.innerHTML = `שגיאת API: ${error.message} (בקשה זו נועדה להיכשל לצורך הדגמה)`;
    }
}

// מציג את הצבעים שהגיעו מה-API על המסך
function displayColors(colors) {
    const resultDiv = document.getElementById('api-result');
    resultDiv.innerHTML = '<h3>ערכת צבעים:</h3>';

    if (colors && colors.length > 0) {
        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.style.backgroundColor = color.hex.value;
            colorBox.style.width = '100px';
            colorBox.style.height = '100px';
            colorBox.style.display = 'inline-block';
            colorBox.style.margin = '5px';

            // הצגת קוד הצבע בתוך הריבוע
            colorBox.innerHTML = `<p style="color: black ; text-align: center;">${color.hex.value}</p>`;

            resultDiv.appendChild(colorBox);
        });
    }
}
