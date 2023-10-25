const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
const crypto = require("crypto");
const OpenAI = require("openai");
const e = require('express');
require('dotenv').config();

const openai = new OpenAI();

const gptRequest = (message, conversationHistory, text, fullText, socket, interviewFlag = false) => {
    const messageId = crypto.randomBytes(10).toString('hex');
    if (!interviewFlag) socket.emit("message_start", messageId)
    conversationHistory.push({ role: "user", content: message });
    const req = https.request({
        hostname: "api.openai.com",
        port: 443,
        path: "/v1/chat/completions",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.OPENAI_API_KEY
        }
    }, function (res) {
        res.on('data', (chunk) => {
            var str = chunk.toString()
            if (str.includes("[DONE]")) return;
            str.split("data: ").forEach((m) => {
                m = m.trim()
                if (m == "") return;
                var z, q;
                try {
                    const x = JSON.parse(m)
                    q = x.choices[0].delta.content.toString()
                    z = q.replaceAll("\n", "").replaceAll("!", ".").replaceAll("?", ".")
                } catch (e) {
                    z = ""
                    q = ""
                }
                text += z;
                fullText += q;
                socket.emit("message", messageId, q)
                if (text.includes(".")) {
                    if (interviewFlag) downloadAudio(text.split(".")[0].trim(), socket)
                    if (text.split(".").length > 1) text = text.split(".")[1]
                    else text = ""
                }
            });
        });
        res.on('end', () => {
            if (text != "" && interviewFlag) downloadAudio(text.trim(), socket)
            conversationHistory.push({ role: "assistant", content: fullText })
            console.log("GPT: " + fullText)
            text = "";
            fullText = "";
            if (!interviewFlag) socket.emit("message_end", messageId)
        });
    })
    const body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: conversationHistory,
        stream: true
    })
    req.on('error', (e) => {
        console.error("Problem with request: " + e.message);
    });
    req.write(body);
    req.end();
}

const downloadAudio = (fullText, socket) => {
    const audioId = crypto.randomBytes(10).toString('hex');
    if (fullText.trim().replaceAll("\n", "").length == 0) fullText = "Error: rate limit exceeded"
    socket.emit("beginaudiodata", audioId)
    const req = https.request({
        hostname: "api.elevenlabs.io",
        port: 443,
        path: "/v1/text-to-speech/CYw3kZ02Hs0563khs1Fj/stream",
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'accept': 'audio/mpeg',
            'xi-api-key': process.env.ELEVEN_LABS_API_KEY
        },
        encoding: null,
    }, function (res) {
        const bufArray = []
        res.on('data', (data) => {
            console.log("Sending audio data")
            x = JSON.stringify(data)
            socket.emit("audiodata", x, audioId)
            bufArray.push(...JSON.parse(x).data)
        });
        res.on('end', () => {
            console.log(`Audio data over, size ${bufArray.length}`)
            socket.emit("endaudiodata", audioId)
        });
    })
    const body = JSON.stringify({
        text: fullText,
        model_id: "eleven_monolingual_v1"
    })
    req.on('error', (e) => {
        console.error("Problem with request: " + e.message);
    });
    req.write(body);
    req.end();
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("resume_user", () => {
        const conversationHistory = [{
            role: "user", content: `You are part of a resume building app. Your task is to ask the user questions about what job they are applying for, what work experience they have, etc. This information will be used to dynamically create a resume document.

        Each of your responses MUST be in the following format. You must strictly adhere to this format. Do not include text before or after these three parts of the response. Specifically, you must include the newline, followed by the string [break], followed by another newline in between the two parts. This must be included in all of your responses, including the first one.
        Question/Statement to the User
        [break]
        JSON data
        
        For questions and statements given to the user, you can choose one of two options. You can 1) ask a question to gather more information. Ask questions one by one; do not list all of them at the beginning. You must be conversational with the user. Or, you can 2) issue a statement about the user's response. If you feel the user's response is lacking (perhaps some grammatical error or lack of appropriate content for a resume), feel free to say so and have them reformat their response. Note that for minor grammar errors, you can change their response yourself without consulting them. After you ask a question or issue a statement, output whatever information is available in JSON format. Each JSON post must include candidateName (string), candidateEmail (string), jobTitle (string), personalStatement (string), and experienceBlurb (a string). You must post a question and this JSON data for EVERY one of your responses. Do not autofill each user response; you must wait for the user to respond. Please begin by asking for the user's full name. 
        
        Remember that you ABSOLUTELY MUST maintain the format of 
        Question/Statement to the User
        [break]
        JSON data` }];
        var text = "";
        var fullText = "";
        socket.on("message", (msg) => {
            gptRequest(`The user said: ${msg}
            
            Remember that you ABSOLUTELY MUST maintain the format of 
            Question/Statement to the User
            [break]
            JSON data
            
            Please don't forget to include the JSON data.`, conversationHistory, text, fullText, socket);
        })
    })
    socket.on("interview_user", () => {
        const conversationHistory = [{ role: "user", content: "You are helping me prepare for an interview to land a job position. First, ask me what I am applying for. Then, ask me five questions, waiting for my answer after each one, and provide feedback at the end. Ask the questions one by one; do not list all five at the beginning." }];
        var text = "";
        var fullText = "";
        socket.on("speechtotextaudio", (audio) => {
            const audioId = crypto.randomBytes(10).toString('hex');
            console.log("Audio id: " + audioId)
            const stream = fs.createWriteStream(audioId + ".m4a", { encoding: "base64" })
            stream.write(audio);
            stream.end();
            stream.on('close', async () => {
                const transcription = await openai.audio.transcriptions.create({
                    file: fs.createReadStream(audioId + ".m4a"),
                    model: "whisper-1",
                    language: "en"
                });
                console.log("User: " + transcription.text)
                gptRequest(transcription.text, conversationHistory, text, fullText, socket, true);
                fs.unlinkSync(audioId + ".m4a")
            });
        })
    })
    socket.on('disconnect', () => {
        socket.disconnect()
        console.log('a user disconnected')
    })
});

server.listen(8080, () => {
    console.log('listening on *:8080');
});