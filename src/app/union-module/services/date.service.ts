import {Injectable} from '@angular/core';
@Injectable()
export class UnionDateService {
    constructor() {};
    // 传入时间参数
    toString(date : UnionDate = new UnionDate(), separator : string = "-") : string {
        let me = this;
        return `${date
            .year}${separator}${me
            .getTimeString(date.month)}${separator}${me
            .getTimeString(date.day)}`
    };
    toFullString(date : UnionDate = new UnionDate(), separator : string = "-", timeseparator : string = ":") : string {
        let me = this;
        return `${date
            .year}${separator}${me
            .getTimeString(date.month)}${separator}${me
            .getTimeString(date.day)} ${me
            .getTimeString(date.hour)}${timeseparator}${me
            .getTimeString(date.minute)}${timeseparator}${me
            .getTimeString(date.second)}${timeseparator}${date
            .mills}`;
    };
    getTimeString(time : number | string) : string {
        let _time = +time;
        return (isNaN(_time) || _time < 0)
            ? `00`
            : (_time < 10
                ? `0${_time}`
                : `${_time}`);
    };
    getCalendarInfo(date: UnionDate = new UnionDate()): UnionCalendarInfo{
        let endDate = new UnionDate(date.year,date.month + 1,0);
        let beginDate = new UnionDate(date.year,date.month,1);
        return {
            days: endDate.day,
            endWeek: endDate.week,
            beginWeek: beginDate.week
        }
    };
};
export class UnionDate {
    constructor(date : Date | any = new Date(),...others) {
        let me = this;
        let dateType = typeof date;
        if (!(date instanceof Date) && (dateType == "string" || dateType == "number")) {
            let _date = +date;
            if (isNaN(_date) || arguments.length == 0) {
                date = new Date(date);
            } else {
                let length = arguments.length;
                switch (length) {
                    case 2:
                        date = new Date(arguments[0],arguments[1] - 1);
                        break;
                    case 3:
                        date = new Date(arguments[0],arguments[1] - 1,arguments[2]);
                        break;
                    case 4:
                        date = new Date(arguments[0],arguments[1] - 1,arguments[2],arguments[3]);
                        break;
                    case 5:
                        date = new Date(arguments[0],arguments[1] - 1,arguments[2],arguments[3],arguments[4]);
                        break;
                    case 6:
                        date = new Date(arguments[0],arguments[1] - 1,arguments[2],arguments[3],arguments[4],arguments[5]);
                        break;
                    case 7:
                        date = new Date(arguments[0],arguments[1] - 1,arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);
                        break;
                    default: 
                        date = new Date();
                };
            }
        } else {
            date = new Date();
        }
        me.time = date.getTime(),
        me.month = date.getMonth() + 1,
        me.year = date.getFullYear(),
        me.day = date.getDate(),
        me.week = date.getDay(),
        me.hour = date.getHours(),
        me.minute = date.getMinutes(),
        me.second = date.getSeconds(),
        me.mills = date.getMilliseconds()
    };
    time : number; // 毫秒数
    month : number; // 月份
    year : number; // 年份
    day : number; // 日期
    week : number; // 周几
    hour : number; // 小时
    minute : number; // 分
    second : number; // 秒
    mills : number; // 毫秒
};
export interface UnionCalendarInfo{
    days: number; // 总共多少天
    beginWeek: number;
    endWeek: number;
}