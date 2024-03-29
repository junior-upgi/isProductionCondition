"use strict";

var config = require("../config.js");
var telegramChat = require("../model/telegramChat.js");
var telegramUser = require("../model/telegramUser.js");

var broadcastUrl = config.broadcastServerHost + ":" + config.broadcastServerPort + "/broadcast";

var list = [{
    id: 0,
    reference: "wasteReduction",
    cReference: "七大浪費",
    setting: {},
    jobList: []
}, {
    id: 1,
    reference: "overdueMonitor",
    cReference: "逾期款查詢系統",
    setting: {},
    jobList: [{
        id: "newOverdueMonitorTask",
        reference: "新增逾期項目款監控作業",
        type: "periodicFunction",
        online: true,
        broadcast: false,
        schedule: "0 0 9 * * *", // everyday at 09:00
        //schedule: "*/5 * * * * *", // testing
        targetGroupIDList: [
            telegramChat.getChatID("業務群組"),
            telegramChat.getChatID("測試群組")
        ],
        targetUserIDList: [
            telegramUser.getUserID("蔡佳佑"),
            telegramUser.getUserID("翁宏達")
        ]
    }, {
        id: "recentOverdueMonitorTask",
        reference: "近期逾期項目監控作業",
        type: "periodicFunction",
        online: true,
        broadcast: false,
        schedule: "30 0 9 * * 1", // every Monday at 09:00:30
        //schedule: "*/10 * * * * *", // testing
        targetGroupIDList: [
            telegramChat.getChatID("業務群組"),
            telegramChat.getChatID("測試群組")
        ],
        targetUserIDList: [
            telegramUser.getUserID("趙婉伶"),
            telegramUser.getUserID("蔡佳佑"),
            telegramUser.getUserID("翁宏達")
        ]
    }, {
        id: "oneWeekWarningMonitorTask",
        reference: "本週即將逾期項目監控作業",
        type: "periodicFunction",
        online: true,
        broadcast: false,
        schedule: "0 1 9 * * 1", // every Monday at 09:01
        //schedule: "*/10 * * * * *", // testing
        targetGroupIDList: [
            telegramChat.getChatID("業務群組"),
            telegramChat.getChatID("測試群組")
        ],
        targetUserIDList: [
            telegramUser.getUserID("趙婉伶"),
            telegramUser.getUserID("蔡佳佑"),
            telegramUser.getUserID("翁宏達")
        ]
    }, {
        id: "twoWeekWarningMonitorTask",
        reference: "兩週內即將逾期項目監控作業",
        type: "periodicFunction",
        online: true,
        broadcast: false,
        schedule: "30 1 9 * * 1", // every Monday at 09:01:30
        //schedule: "*/10 * * * * *", // testing
        targetGroupIDList: [
            telegramChat.getChatID("業務群組"),
            telegramChat.getChatID("測試群組")
        ],
        targetUserIDList: [
            telegramUser.getUserID("趙婉伶"),
            telegramUser.getUserID("蔡佳佑"),
            telegramUser.getUserID("翁宏達")
        ]
    }]
}, {
    id: 2,
    reference: "seedCount",
    cReference: "氣泡數監控系統",
    setting: {
        hideProdReferenceColumn: true,
        hideTimePointColumn: true,
        preventDisplay: true
    },
    jobList: [{
        id: "scheduledUpdate",
        reference: "例行氣泡數據通報",
        type: "periodicFunction",
        online: true,
        broadcast: true,
        schedule: "10 30 7,15,23 * * *", // everyday at 07:30:10, 15:30:10, and 23:30:10
        //schedule: "*/30 * * * * *", // testing
        targetGroupIDList: [telegramChat.list[1].id], // 製造
        targetUserIDList: [telegramUser.list[0].id], // 蔡佳佑
        observePeriod: 8,
        alertLevel: 10
    }, {
        id: "irregularityBroadcast",
        reference: "氣泡數異常通報",
        type: "singleExecution",
        online: false,
        broadcast: false,
        schedule: "",
        targetGroupIDList: [
            telegramChat.list[0].id, // 業務
            telegramChat.list[1].id // 製造
        ],
        targetUserIDList: [telegramUser.list[0].id], // 蔡佳佑
        observePeriod: 8,
        alertLevel: 10
    }]
}, {
    id: 3,
    reference: "ldapValidation",
    cReference: "LDAP驗證服務系統",
    setting: {},
    jobList: []
}, {
    id: 4,
    reference: "isProdCond",
    cReference: "製造課生產條件記錄表",
    setting: {},
    jobList: []
}];

module.exports = {
    broadcastUrl,
    list
};