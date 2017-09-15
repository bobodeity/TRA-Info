var period = [
	{
		"dateDefine": "大前天",
		"dateValue": -3
	},
	{
		"dateDefine": "前天",
		"dateValue": -2
	},
	{
		"dateDefine": "昨天",
		"dateValue": -1
	},
	{
		"dateDefine": "今天",
		"dateValue": 0
	},
	{
		"dateDefine": "明天",
		"dateValue": 1
	},
	{
		"dateDefine": "後天",
		"dateValue": 2
	},
	{
		"dateDefine": "大後天",
		"dateValue": 3
	},
];


var trainClassMap = [
	{
		"classDef": ["傾斜式", "傾斜式列車"],
		"classDetail": {
			"list": [1102, 1107],
			"desc": "傾斜式列車",
		}
	},
	{
		"classDef": ["普悠瑪", "普悠瑪號", "番鴨", "紅番鴨", "puyuma"],
		"classDetail": {
			"list": [1107],
			"desc": "普悠瑪號",
		}
	},
	{
		"classDef": ["太魯閣", "太魯閣號", "滷蛋", "太魯蛋", "taroko"],
		"classDetail": {
			"list": [1102],
			"desc": "太魯閣號",
		}
	},
	{
		"classDef": ["自強", "自強號", "快快", "快車", "tc"],
		"classDetail": {
			"list": [1100, 1101, 1102, 1103, 1107, 1108],
			"desc": "自強號",
		}
	},
	{
		"classDef": ["莒光", "莒光號", "中中", "ck"],
		"classDetail": {
			"list": [1110, 1114, 1115],
			"desc": "莒光號",
		}
	},
	{
		"classDef": ["區間", "區間車", "復興", "復興號", "普通車", "普通", "電車", "阿福", "阿福號", "每站停", "慢慢", "慢車", "lt", "local"],
		"classDetail": {
			"list": [1120, 1131, 1132, 1140],
			"desc": "區間車",
		}
	},
	{
		"classDef": ["區間快", "區間快車", "區快"],
		"classDetail": {
			"list": [1132],
			"desc": "區間快車",
		}
	},
	{
		"classDef": ["普快車", "普快"],
		"classDetail": {
			"list": [1140],
			"desc": "普快車",
		}
	},
	{
		"classDef": ["對號", "對號車", "對號列車", "椅子", "座位", "坐票", "seat"],
		"classDetail": {
			"list": [1102, 1107, 1100, 1101, 1102, 1103, 1107, 1108, 1110, 1111, 1114, 1115],
			"desc": "對號列車",
		}
	},
	{
		"classDef": ["非對號", "非對號車", "非對號列車", "站票"],
		"classDetail": {
			"list": [1120, 1131, 1140],
			"desc": "非對號列車",
		}
	},
]
