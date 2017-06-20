import {Injectable} from '@angular/core';
import _ from "lodash";
@Injectable()
export class UnionDateService {
    constructor() {};
    // 传入时间参数 把时间转换为字符串，这里只转换 年 月 日
    toString(date : UnionDate = new UnionDate(), separator : string = "-") : string {
        let me = this;
        return `${date
            .year}${separator}${me
            .getTimeString(date.month)}${separator}${me
            .getTimeString(date.day)}`
    };
    // 传入时间参数，把时间转为字符串 这里年月日以及时间都将进行转换
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
    // 将某个字符转为字符串，如果小于10 前面加个0
    getTimeString(time : number | string) : string {
        let _time = +time;
        return (isNaN(_time) || _time < 0)
            ? `00`
            : (_time < 10
                ? `0${_time}`
                : `${_time}`);
    };
    // 获取日历
    getCalendarByUnionDate(date : UnionDate = new UnionDate(),onlyInfo: boolean = false) : UnionCalendarInfo {
        let endDate = new UnionDate(date.year, date.month + 1, 0);
        let beginDate = new UnionDate(date.year, date.month, 1);
        let obj:any = {
            days: endDate.day,
            endWeek: endDate.week,
            beginWeek: beginDate.week,
            month: date.month,
            year: date.year
        };
        if(!onlyInfo) {
            obj.data = [beginDate];
            for(let i = 2; i < obj.days;i++) {
                obj.data.push(new UnionDate(date.year,date.month,i));
            }
            obj.data.push(endDate);
        }
        return obj;
    };
    seperateCalendarLists(calendar: UnionCalendarInfo,ifseprate:boolean = true){
        for(let i = 0; i < calendar.beginWeek;i++) {
            calendar.data.unshift(new UnionDate(calendar.year,calendar.month,(-1) * i));
        };
        for(let i = 1; i <= (6 - calendar.endWeek);i++) {
            calendar.data.push(new UnionDate(calendar.year,calendar.month + 1,i));
        }
        if(ifseprate) {
            calendar.data = _.chunk(calendar.data,7);
        }
        return calendar.data
    };
    getCalendarLists(year:number,month:number){
        let me = this;
        let date: UnionDate = new UnionDate(year,month,1);
        return me.seperateCalendarLists(me.getCalendarByUnionDate(date));
    };
};
export class UnionDate {
    constructor(date : Date | any = new Date(), ...others) {
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
                        date = new Date(arguments[0], arguments[1] - 1);
                        break;
                    case 3:
                        date = new Date(arguments[0], arguments[1] - 1, arguments[2]);
                        break;
                    case 4:
                        date = new Date(arguments[0], arguments[1] - 1, arguments[2], arguments[3]);
                        break;
                    case 5:
                        date = new Date(arguments[0], arguments[1] - 1, arguments[2], arguments[3], arguments[4]);
                        break;
                    case 6:
                        date = new Date(arguments[0], arguments[1] - 1, arguments[2], arguments[3], arguments[4], arguments[5]);
                        break;
                    case 7:
                        date = new Date(arguments[0], arguments[1] - 1, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
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
export interface UnionCalendarInfo {
    days : number; // 总共多少天
    beginWeek : number;
    endWeek : number;
    month: number;
    year: number;
    data?: any;
}