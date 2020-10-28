function scheduleHtmlParser(html) {
    /**
        Author: 逝雨、落无声
        Edit： 2020.10.10
        Des：小爱课程表--兰州大学研究生教务系统适配
    */
    const $ = cheerio.load(html);

    const secTimes = [
      {
        "section": 1,
        "startTime": "08:30",
        "endTime": "09:15"
      },
      {
        "section": 2,
        "startTime": "09:25",
        "endTime": "10:10"
      },
      {
        "section": 3,
        "startTime": "10:30",
        "endTime": "11:15"
      },
      {
        "section": 4,
        "startTime": "11:25",
        "endTime": "12:10"
      },
      {
        "section": 5,
        "startTime": "14:30",
        "endTime": "15:15"
      },
      {
        "section": 6,
        "startTime": "15:25",
        "endTime": "16:10"
      },
      {
        "section": 7,
        "startTime": "16:30",
        "endTime": "17:15"
      },
      {
        "section": 8,
        "startTime": "17:25",
        "endTime": "18:10"
      },
      {
        "section": 9,
        "startTime": "19:00",
        "endTime": "19:45"
      },
      {
        "section": 10,
        "startTime": "19:55",
        "endTime": "20:40"
      },
      {
        "section": 11,
        "startTime": "20:50",
        "endTime": "21:35"
      }
    ];
    const hashTable = {
        "一": 1,
        "二": 2,
        "三": 3,
        "四": 4,
        "五": 5,
        "六": 6,
        "七": 7,
        "天": 7,
        "八": 8,
        "九": 9,
        "十": 10,
        "十一": 11,
        "十二": 12,
        "十三": 13,
        "十四": 14,
        "十五": 15,
        "十六": 16,
        "十七": 17,
        "十八": 18,
        "十九": 19,
        "二十": 20,
        "二十一": 21,
        "二十二": 22,
        "二十三": 23,
        "二十四": 24,
        "二十五": 25,
        "二十六": 26,
        "二十七": 27,
        "二十八": 28,
        "二十九": 29,
        "三十": 30
    };
    var infos = [];
    var regexp = /[\s\r\n]/g;
//     console.log($("tbody").eq(0).find("tr"));
    var courseTable = $("table[class=el-table__body]").eq(0);
    var rows = courseTable.find("tr");
    for (var r =0; r < rows.length; r++){
        var cols = rows.eq(r).find("td");

        var name = cols.eq(0).text().replace(regexp, '');
        name = name.split(')')[1];
//         console.log(cols.eq(0).text());

        var weeksAndTimedesStr = cols.eq(4).text().replace(regexp, '');
        var weeksAndTimedes = weeksAndTimedesStr.split("--");

        /*  update at 2020.10.10
            the system has updated, weeks info has changed
            fix the weeks info
        */
        
        // weeks
        var weeks = [];
        if (weeksAndTimedesStr.search(/连续周/g) != -1){
            // 连续周模式
           //星期二晚上9,10,11节--3--13--连续周,
            var weekStart = Number(weeksAndTimedes[1]);
            var weekEnd = Number(weeksAndTimedes[2]);
            var weekMode = weeksAndTimedes[3].replace(/\,/g, '');
            console.log(weekMode);
            if (weekMode === "连续周"){
                for (let i = weekStart; i < weekEnd+1; i++){
                    weeks.push(i);
                }
            }
            // TODO
            // wait to add more mode, i have no info to test
        }
        else{
            // 初版上线系统
            weeks = weeksAndTimedes[1].split(",");
            for (var i = 0; i < weeks.length; i++){
                weeks[i] = weeks[i].replace("第", '').replace("周", "");
                weeks[i] = hashTable[weeks[i]];
            }    
        }
        
        console.log(weeks);
        // day
        var timedes = weeksAndTimedes[0];
        var day = hashTable[timedes[2]];
        var sec = timedes.slice(5, timedes.length-1).split(',');
        for (var i = 0; i < sec.length; i++){
            sec[i] = {
                "section": Number(sec[i])
                }
        }
        var position = cols.eq(3).text().replace(regexp, '').replace(/\-\-/g, '-');
        var teacher = cols.eq(2).text().replace(regexp, '');
        var tmp = {
            "name": name,
            "position": position,
            "teacher": teacher,
            "weeks": weeks,
            "day": day,
            "sections": sec,
          }
        infos.push(tmp);
    }

//     console.log(infos);

    var res = {
        "courseInfos": infos,
        "sectionTimes": secTimes
    }
//     console.log(res);
    return res;
}