import plugin from "../../lib/plugins/plugin.js"
import fetch  from "node-fetch"
import common   from "../../lib/common/common.js";
import path     from "path"

const _path  = path.join(process.cwd(), 'plugins/timelyimage')
const groups = ['789748490']

/**
const groups = [
	'209908494',//一群
	'580213401',//重生二群
	'427566282',//三群
	'789748490' //四群
]*/

export class timer extends plugin {
  constructor () {
    super({
      name: '定时发图',
      dsc:  '定时发送原神图片',
      event: 'message',
      priority: 3000,
      rule: [
        {
          reg: '^#发图',
          fnc: 'sendimg'
        },
		{
		  reg: '^#图$',
		  fnc: 'sendone'
		},
		{
		  reg: '^#多图',
		  fnc: 'freqsend'
		},
		{
		reg: '^图片可以丰富点|给我一个老婆',
		  fnc: 'learnt'
		}
      ]
    })
	 
    this.task = {
      cron: "0 0 */4 * * *",
      name: "自动发图",
      fnc: () => this.sendimg(),
      log: true
    };
  }
  
  //call to gallery2, for backup use
  async sendimg2() {
	let urls = [`https://api.lolicon.app/setu/v2?r18=0`]
	let random_int = Math.floor(Math.random() * urls.length)
	let url = urls[random_int]
	let res = await fetch(url).catch((err) => logger.error(err))
	let obj = await response.json()
		
    for (let i = 0; i < groups.length; i++) {
	  let group = Bot.pickGroup(groups[i]);
	  await group.sendMsg(segment.image(obj.data[0].urls.original))
	  await common.sleep(2000)
    }
  }
  
  async sendimg() {
	let urls = [`https://api.dujin.org/pic/yuanshen`, `https://app.zichen.zone/api/acg.php`, `https://image.anosu.top/pixiv/direct?r18=0&keyword=genshinimpact`]
	let random_int = Math.floor(Math.random() * urls.length)
	
	let url = urls[random_int]
	let res = await fetch(url).catch((err) => logger.error(err));

    for (let i = 0; i < groups.length; i++) {
	  let group = Bot.pickGroup(groups[i]);

	  await group.sendMsg(segment.image(res.url))
	  await common.sleep(2000)
	  logger.mark('[image sending]', res.url)
    }
  }
  
  async sendone(e) {
	let url = `https://api.dujin.org/pic/yuanshen`;
	e.reply(segment.image(url))
  }
  
  async freqsend(e) {
	  e.reply('了解')
	  let url = `https://api.dujin.org/pic/yuanshen`;
	  for (let i = 0; i < 10; i++) {
		  await common.sleep(5000)
		  await e.reply(segment.image(url))
	  }
  }
  
  async learnt(e) {
	  e.reply('可以考虑')
  }
  
}  