import { io } from "socket.io-client";
import config from "@/config/index";
import {
    USER_UPLINE,
    NEW_MUSIC,
    NEW_DANMAKU,
    USER_OFFLINE,
    NOTICE_UPLINE
} from "@/constants/event";
import { USERNAME } from "@/constants/keys";
import useLocalStorage from '@/hooks/useLocalStorage';

const { socketUrl } = config;
const username = useLocalStorage(USERNAME);

class Socket {
    constructor() {
        this.socket = io(socketUrl);
        this.cbList = {};
        this.events = [
            USER_UPLINE,
            NEW_MUSIC,
            NEW_DANMAKU,
            USER_OFFLINE
        ];

        this.init();
    }

    init() {
        this.socket.on("connect", () => {
            console.log("Websocket connect success!");
            this.emit(NOTICE_UPLINE, {
                user: username
            });
        });

        this.events.forEach(event => {
            this.socket.on(event, (args) => {
                if (this.cbList[event]) {
                    this.cbList[event].forEach(callback => {
                        callback(args);
                    });
                }
            });
        });
    }

    on(event, callback) {
        if (!this.cbList[event]) {
            this.cbList[event] = [];
        }
        this.cbList[event].push(callback);
    }

    emit(event, data) {
        this.socket.emit(event, data);
    }
}

export default new Socket();