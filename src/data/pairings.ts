import type { CatId, L10n, PairingNote, PairingSet } from './types';

const p = (id: CatId, zh: string, en: string): PairingNote => ({
  id, reason: { 'zh-TW': zh, en } as L10n,
});

/**
 * 配對對象由 compat.ts 的規則算出（好友、歡喜冤家各 2，每隻被列入上限 4 次），
 * 文字為視角化的個別原因。compat.test.ts 會檢查此表與規則一致。
 */
export const PAIRINGS: Record<CatId, PairingSet> = {
  british: {
    best: [
      p('maine', '你們的生活都按表操課。他負責開口和張羅，你負責穩穩坐著，誰也不用改變作息。', 'You both live by routine. They do the talking and arranging, you hold steady, and neither of you has to change.'),
      p('russian', '你們都喜歡安靜和規律。他比你更愛分析，但一起待整天不說話，對你們都算放假。', 'You share a love of quiet and order. They analyze more, but a silent day together counts as a holiday for you both.'),
    ],
    rival: [
      p('orange', '你的週末寫好了，他的週末還沒開始想。你想留在沙發，他想把你拖去夜市，需要先談好次數。', 'Your weekend is scheduled; theirs is unimagined. You want the sofa, they want the night market, so agree on a quota.'),
      p('tuxedo', '他覺得場子要熱，你覺得場子可以不要有。他的玩笑很好笑，只是你需要回家充電三天。', 'They want the room lively; you would rather not have a room. The jokes land, then you need three days to recharge.'),
    ],
  },
  orange: {
    best: [
      p('tuxedo', '你們一樣愛熱鬧、一樣閒不住。你負責把人揪來，他負責把場子帶起來，只是散場要有人記得結帳。', 'Equally social and restless. You gather everyone, they fire up the room. Someone just has to remember the bill.'),
      p('ragdoll', '你把快樂帶進門，他把你顧好。他的細心接得住你的混亂，你也讓他少想一點、多笑一點。', 'You bring joy through the door and they look after you. Their care catches your chaos, and you help them worry less.'),
    ],
    rival: [
      p('russian', '你的「等下再說」對上他的試算表。節奏和思考方式都相反，磨合時請先約好最後期限。', 'Your "later" meets their spreadsheet. Pace and thinking are opposite, so set a deadline before you begin.'),
      p('white', '你的熱情太快靠近，他的界線就升起來了。多問一句「可以嗎」，會比一百個擁抱有用。', 'Your warmth arrives too fast and their boundaries go up. Asking "is this okay?" beats a hundred hugs.'),
    ],
  },
  siamese: {
    best: [
      p('maine', '你有滿滿的感受，他有穩定的結構。你講完整齣戲，他會接一句「那我們下一步怎麼做」。', 'You bring the feelings, they bring the structure. After your whole drama, they ask, "So what do we do next?"'),
      p('abyssinian', '你們話都多，也都對新鮮事有反應。你演得精彩，他問得更多，聊天永遠不會斷線。', 'You both talk a lot and love novelty. You perform, they ask follow-ups, and the conversation never drops.'),
    ],
    rival: [
      p('norwegian', '你要回應，他要失聯。你傳五則訊息時，他正在山上沒收訊，先講好多久聯絡一次。', 'You need replies and they need to disappear. Your five texts reach them with no signal, so agree on check-ins.'),
      p('black', '你的情緒是開著的，他的是關著的。你把沉默當冷戰，他其實只是還在想，別急著解讀。', 'Your feelings run open, theirs closed. You read silence as a cold war; they are simply still thinking.'),
    ],
  },
  black: {
    best: [
      p('norwegian', '你們都獨立、都不多話，也都尊重距離。你想事情，他走遠路，兩邊都不用交代太多。', 'Both independent, both quiet, both respectful of distance. You think, they wander, and nobody owes an explanation.'),
      p('sphynx', '他替你把想講的話直接說出來，你替他看清現場。一個冷面一個大聲，互補得很有戲。', 'They say aloud what you were thinking, and you read the room for them. One deadpan, one loud, and it works.'),
    ],
    rival: [
      p('orange', '他靠感覺往前衝，你靠判斷慢慢來。他的熱情會打斷你的思緒，你的冷靜也會讓他以為被討厭。', 'They charge on feeling while you move on judgment. Their warmth breaks your focus; your calm reads as dislike.'),
      p('russian', '你們同樣理性、同樣話少，差在他要一切排好，你只照自己的判斷走。吵起來可能是兩份文件互寄。', 'Equally rational and quiet, but they need everything ordered and you follow your own read. Fights become two documents exchanged.'),
    ],
  },
  ragdoll: {
    best: [
      p('tuxedo', '他把你逗笑，你讓他有地方放下玩笑。他社交一整晚後，會想回到你身邊安靜一下。', 'They make you laugh and you give them a place to drop the act. After a night out, they come back to you.'),
      p('abyssinian', '他對世界好奇，你對他好奇。你耐心聽他的新發現，他帶你去不敢一個人嘗試的地方。', 'They are curious about the world, and you about them. You listen to discoveries; they take you places you would not go alone.'),
    ],
    rival: [
      p('russian', '你需要親近，他需要計畫和距離。他給解決方案時，你其實只想被抱一下，請先把需求講白。', 'You need closeness; they need plans and distance. They offer solutions when you want a hug, so say it plainly.'),
      p('white', '你想靠近，他想保留空間。你的關心對他來說可能太滿，他的界線對你來說可能太冷。', 'You lean in, they guard their space. Your care can feel like too much, and their boundaries can feel too cold.'),
    ],
  },
  bengal: {
    best: [
      p('sphynx', '你們都敢闖，節奏也合。他比你更會把想法講出口，所以你們的冒險常有最好笑的現場轉播。', 'You both dare and move at the same speed. They voice everything, so your adventures come with the best commentary.'),
      p('calico', '你負責出發，他負責把旅程變有趣。你比較敢，他比較有靈感，一起能做出沒人想過的事。', 'You set off, they make the journey interesting. You bring nerve, they bring ideas, and things nobody imagined happen.'),
    ],
    rival: [
      p('british', '你想現在就走，他想下週再說。你眼中的冒險是他眼中的風險，先從離家近的小行程開始。', 'You want to leave now, they want next week. Your adventure is their hazard, so start with short trips near home.'),
      p('maine', '他會先確認大家都安全，你會先跳再說。他的保護在你聽來像管太多，其實只是擔心。', 'They check that everyone is safe, you jump first. Their protection sounds controlling, though it is only worry.'),
    ],
  },
  maine: {
    best: [
      p('british', '你們都重視穩定和熟悉的安排。你照顧得週到，他安靜地接受，彼此都不用演。', 'You both value stability and routine. You look after things, they quietly accept, and nobody has to perform.'),
      p('siamese', '他把情緒講出來，你把事情排起來。你給他安全感，他讓你的日子多了一點戲。', 'They say the feelings, you arrange the logistics. You give them safety, they add a little theatre to your days.'),
    ],
    rival: [
      p('calico', '你的行事曆碰上他的心情天氣。你想講道理時，他只想被理解，別急著幫他排計畫。', 'Your calendar meets their weather. You reason while they want to be understood, so hold off on the action plan.'),
      p('black', '你想照顧他，他想保持距離。你的關心問得越多，他退得越遠，給他空間就是一種照顧。', 'You want to look after them; they keep a distance. The more you ask, the further they retreat. Space is care too.'),
    ],
  },
  russian: {
    best: [
      p('british', '你們都喜歡可預測的生活。你規劃，他照做而且很滿意，這在你看來是最高級的相處。', 'You both like a predictable life. You plan, they follow contentedly, and that is the ideal relationship to you.'),
      p('maine', '你提供策略，他負責帶人執行。他比你溫暖，也幫你把方案翻譯成大家聽得懂的話。', 'You provide the strategy, they lead the people. They are warmer and translate your plans into human language.'),
    ],
    rival: [
      p('orange', '你列好的流程，他第一步就跳過。你們的生活節奏差最多，要先決定哪些規則不能動。', 'They skip step one of your process. Your rhythms are as far apart as they get, so pick the few rules that must hold.'),
      p('calico', '你要依據，他要感覺。你問「為什麼」，他聽成「你不對」，換個語氣會差很多。', 'You want evidence, they want feeling. You ask "why" and they hear "you are wrong," so soften the delivery.'),
    ],
  },
  calico: {
    best: [
      p('bengal', '他帶你出門找素材，你把他的冒險變成作品。他不會被你的陰晴不定嚇到，反而覺得有趣。', 'They drag you out to find material, and you turn their adventures into work. Your moods only make you more interesting to them.'),
      p('sphynx', '你們都不走一般路線。他懂你的怪，也敢對你直說，你嘴硬時他不會真的當真。', 'Neither of you takes the normal path. They get your strangeness, speak frankly, and do not take your sharp tongue seriously.'),
    ],
    rival: [
      p('russian', '你靠靈感，他靠流程。他修正的是錯字，你感覺被修正的是靈魂，請先確認對方在講哪一件事。', 'You run on inspiration, they run on process. They correct typos and you feel your soul being edited. Check what is being discussed.'),
      p('maine', '他想幫你把生活排好，你只想把這幅畫畫完。他的好意要先問過你，才不會變壓力。', 'They want to organize your life; you want to finish this painting. Their kindness needs to ask first.'),
    ],
  },
  tabby: {
    best: [
      p('tuxedo', '你們都腦筋快、人脈廣。他負責開場，你負責收尾，一起出門很少有談不成的事。', 'Both quick and well connected. They open, you close, and few deals fail when you go together.'),
      p('abyssinian', '你們都敢試也都聰明。他提供一百個新點子，你挑出最可行的那個，效率高得嚇人。', 'Both bold and clever. They produce a hundred ideas, you pick the one that works, and it is alarmingly efficient.'),
    ],
    rival: [
      p('white', '你講能不能用，他講好不好看。你覺得湊合就好的地方，正好是他最在意的細節。', 'You ask if it works, they ask if it is beautiful. What you call good enough is exactly the detail they care about.'),
      p('persian', '你追求划算，他追求舒服。他為了杯子比價三個月，你已經用便利商店的紙杯喝完了。', 'You chase value, they chase comfort. While they spend months on a cup, you finished your drink from a paper one.'),
    ],
  },
  white: {
    best: [
      p('persian', '你們對細節一樣講究，他還更溫柔。他懂你為什麼要換位子，還會幫你留好最舒服的那張。', 'Equally particular about detail, and they are gentler. They understand the table change and save you the comfortable seat.'),
      p('black', '他不會硬闖你的界線，你也不會追問他的沉默。兩個都怕吵的人，相處起來很省力。', 'They never push your boundaries and you never question their silence. Two noise-averse creatures make easy company.'),
    ],
    rival: [
      p('orange', '他的熱情會直接跨過你的界線。他不是沒禮貌，只是真的沒看見那條線，請你直接告訴他。', 'Their warmth marches straight over your line. They are not rude, they just cannot see it, so tell them directly.'),
      p('abyssinian', '他什麼都想摸、什麼都想問，你只想東西被放回原位。給他一個可以碰的範圍，彼此都輕鬆。', 'They want to touch and question everything; you want things put back. Give them a permitted area and both relax.'),
    ],
  },
  norwegian: {
    best: [
      p('black', '他是少數不會問「你去哪了」的人。你們不常見面，但見面時都覺得對方沒有變。', 'They are one of the few who never ask where you went. You seldom meet, and nothing has changed when you do.'),
      p('white', '你們都需要大量個人空間。你從不越界，他也不會黏人，這段距離對雙方都剛好。', 'You both need plenty of personal space. You never overstep and they never cling, so the distance suits you both.'),
    ],
    rival: [
      p('maine', '他想知道你安全到家，你覺得這句話有定位追蹤的味道。報個平安，他就不會再問了。', 'They want to know you got home safe, which sounds like tracking to you. One check-in and they stop asking.'),
      p('siamese', '他需要即時回應，你需要離線很久。他的訊息很多，你的回覆很短，出發前先約定聯絡方式。', 'They need instant replies; you need long offline stretches. Agree on how you will stay in touch before leaving.'),
    ],
  },
  sphynx: {
    best: [
      p('bengal', '你們都不怕試，也都不愛被管。你出主意，他立刻行動，幾乎不需要開會。', 'Neither of you fears trying or likes being managed. You pitch, they act, and meetings are almost unnecessary.'),
      p('abyssinian', '他對你每個怪想法都會追問，你也樂意回答。你們可以為了一個荒謬問題認真研究整晚。', 'They follow up on all your odd ideas and you enjoy answering. You could research one absurd question all night.'),
    ],
    rival: [
      p('maine', '他要大家照規矩好好相處，你第一個想問規矩哪來的。互相看得順眼要點時間。', 'They want everyone to follow the rules, and you ask where the rules came from. Respect takes a while here.'),
      p('tuxedo', '你們都想當全場最好笑的人，他要全場一起嗨，你只想講自己覺得好笑的。麥克風要輪流拿。', 'You both want to be the funniest. They want the whole crowd laughing; you only care if you are amused. Share the microphone.'),
    ],
  },
  abyssinian: {
    best: [
      p('ragdoll', '他願意聽你講完所有新發現，還會記得問後續。你帶他看世界，他讓你有地方回來。', 'They listen to all your discoveries and ask for updates. You show them the world, and they give you a place to return.'),
      p('siamese', '你們一起講話時，旁邊的人插不上話。他提供情緒，你提供知識，聊到打烊是基本。', 'Nobody else gets a word in when you talk. They supply emotion, you supply facts, and closing time is routine.'),
    ],
    rival: [
      p('white', '你很想靠近看，他很想你先別碰。你的好奇在他眼裡是越界，先問再摸是基本禮貌。', 'You want a closer look, they want you not to touch. Your curiosity reads as trespassing, so ask first.'),
      p('british', '你一天換五個話題，他一杯茶喝一下午。你們的速度差很多，要練習一起安靜十分鐘。', 'You change topics five times a day; they make one cup of tea last all afternoon. Practice ten quiet minutes together.'),
    ],
  },
  persian: {
    best: [
      p('british', '你們都愛待在家，也都不趕時間。你負責佈置得舒服，他負責安心地待在裡面。', 'You both love home and never rush. You make it comfortable, and they settle into it contentedly.'),
      p('white', '他懂你的講究，你懂他的界線。你們能為了燈光一起挑半小時，然後都很滿意。', 'They understand your standards and you respect their boundaries. You can spend thirty happy minutes choosing a lamp.'),
    ],
    rival: [
      p('ragdoll', '你們都重感情，但他想常常出門見人，你想窩在家。一個要陪伴，一個要陪伴但不要出門。', 'You both value closeness, but they want to go out and you want to stay in. Same need, different address.'),
      p('tuxedo', '他覺得今晚太安靜，你覺得今晚剛剛好。他的搞笑很有趣，只要不要打翻你的茶杯。', 'They think tonight is too quiet; you think it is perfect. The jokes are fine as long as your teacup survives.'),
    ],
  },
  tuxedo: {
    best: [
      p('ragdoll', '他是你最好的觀眾，也是唯一看得出你今天不對勁的人。你逗他笑，他讓你卸下表演。', 'They are your best audience and the only one who spots when you are off. You make them laugh, they let you stop performing.'),
      p('tabby', '你們一樣機靈，也都知道怎麼跟人打交道。你負責把場子熱開，他把機會接住。', 'You are equally sharp and good with people. You warm up the room, and they catch the opportunity.'),
    ],
    rival: [
      p('calico', '你一句玩笑，他可能記一個月。你以為在逗他，他以為被取笑，開玩笑前先看天氣。', 'One joke from you can stay with them for a month. You meant fun, they heard mockery, so check the weather first.'),
      p('british', '你想把他拉進熱鬧，他只想回到沙發。別把他的安靜當成場子冷掉，他其實待得很舒服。', 'You pull them into the action; they want the sofa. Their quiet is not a cold room. They are comfortable as is.'),
    ],
  },
};
