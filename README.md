# vogelhuisje-backend
De backend voor het TLE 2 Deel 2 digitale vogelhuisje

## Opstarten

Assuming you have already connected your infrared camera module to your raspberry pi:

1. Install dependencies
    ```bash
    npm install
    ```
   
2. Install FFmpeg
    ```bash
   sudo apt install ffmpeg
    ```
3. Duplicate the .env.example file and rename it to .env
   ```bash
    MONGODB_URI=mongodb://127.0.0.1:27017/vogelhuisje
    PORT=80
    PASSWORD_SALT_ROUNDS=10
    JWT_SECRET=your_secret
   ```
   
4. Run server
    ```bash
   npm run start
    ```
   
5. Run Streaming server
    ```bash
   node streaming.js
    ```