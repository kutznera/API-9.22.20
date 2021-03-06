const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config/config.env" });

app.use(express.static(path.join(_dirname, "views")));
app.use(express.static(path.join(_dirname, "public")));

const port = process.env.PORT || 3000;

app.listen(
    PORT,
    console.log(
        `server is running on ${process.env.NODE_ENV} mode at port {PORT}`.yellow
        .bold
    )
);

const dialogflow = require("@google-cloud/dialogflow");

const io = socketio(server);
io.on("connection", function(socket) {
    console.log("a user connected");

    socket.on("chat message", (message) => {
        console.log(message);

        const callapibot = async(projectId = process.env.newagent - euug) => {
            try {
                const sessionId = uuid.v4();
                const sessionClient = new dialogflow.SessionsClient({
                    keyfilename: "./WebSpeechAIbot-41194528781e.json",
                });
                const sessionPath, = sessionClient.projectAgentSessionPath(
                    projectId,
                    sessionId
                );
                const request = {
                    session: sessionPath,
                    queryInput: {
                        text: {
                            text: message,
                            languageCode: "en-US",
                        },
                    },
                };
                const responses = await sessionClient.detectIntent(request);

                const result = responses[0].queryResult.fulfillmentText;

                socket.emit("bot reply", result);

                if (result.intent) {
                    console.log('Intent: (result.intent.displayName}');
                } else {
                    console.log("No intent matched.");
                }
            } catch (error) {
                console.log(error);
            }
        };

        callapibot();
    });
});

callapibot();
});