import type { Cat, CatId, L10n, Vector } from './types';

const l = (zh: string, en: string): L10n => ({ 'zh-TW': zh, en });
const v = (S: number, A: number, E: number, R: number, B: number, T: number): Vector =>
  ({ S, A, E, R, B, T });

type Seed = Omit<Cat, 'image'> & { alt: L10n };

const make = (s: Seed): Cat => {
  const { alt, ...rest } = s;
  return { ...rest, image: { src: `cats/${s.id}`, alt } };
};

export const CATS: Cat[] = [
  make({
    id: 'british', kind: 'breed', color: '#C3CCD4',
    vector: v(35, 10, 10, 85, 50, 40),
    name: l('英國短毛貓', 'British Shorthair'),
    title: l('佛系生活家', 'The Zen Homebody'),
    quote: l('不是我不想社交，是我的沙發需要我。', "It's not that I avoid people. My sofa needs me."),
    description: l(
      '你的日常有固定的杯子、固定的座位，連發呆都有固定時段。朋友臨時約你，你會先看一眼沙發，再看一眼手機，然後回「下次吧」。你不是冷淡，只是熟起來要花三年，而且熟了就不會走。別人急著決定時，你還在慢慢喝茶，最後往往也是你最沒事。和你相處不用找話題，坐在旁邊一起安靜就算很親近了。',
      'You own a regular mug, a regular seat, and a scheduled time for staring at nothing. When a friend invites you out last minute, you glance at the sofa, then your phone, then type "next time." You are not cold. It simply takes you three years to warm up, and after that you never leave. To get along with you, skip the small talk and sit nearby in comfortable silence.',
    ),
    strengths: [
      l('情緒穩定，別人慌的時候你還在喝茶', 'Steady. Others panic while you finish your tea'),
      l('對人對事都長情，用了十年的東西照樣用', 'Loyal to people and to the mug you have owned for a decade'),
      l('一個人也能把日子過得很舒服', 'Perfectly content with your own company'),
    ],
    quirks: [
      l('訊息已讀後，回覆要排進下週行程', 'Replies to messages get scheduled for next week'),
      l('計畫一變動，靈魂會先離開現場', 'Any change of plans makes your soul leave the room'),
    ],
    relationship: l(
      '戀愛裡你不說甜言蜜語，但會記得對方的咖啡只加一顆糖。友情上朋友不用多，三個能一起不講話的就夠。請給你足夠的預告，別搞驚喜派對。',
      'In love, you skip the sweet talk but remember they take one sugar. In friendship, three people you can sit in silence with are plenty. Give you notice in advance, and never throw you a surprise party.',
    ),
    traits: [l('穩定', 'Steady'), l('慢熱', 'Slow to warm'), l('享受獨處', 'Loves solitude')],
    alt: l('一隻圓臉灰藍色短毛貓趴在格紋坐墊上，旁邊疊著幾本書', 'A round-faced grey-blue shorthair lying on a plaid cushion beside a stack of books'),
  }),
  make({
    id: 'orange', kind: 'coat', color: '#F0C48F',
    vector: v(95, 45, 60, 5, 50, 15),
    name: l('橘貓', 'Orange Cat'),
    title: l('快樂混亂王', 'Monarch of Happy Chaos'),
    quote: l('人生苦短，先吃再說。', 'Life is short. Snacks first.'),
    description: l(
      '你的行事曆是空的，但你的週末永遠滿檔。出門前十分鐘才決定去哪，到了現場已經認識隔壁桌。你的房間像剛被小型颱風經過，你卻總能在第三堆衣服下找到要用的東西。朋友低落時，你不太會分析，但會帶一袋鹽酥雞出現在門口。和你相處只要記得：叫你準時很難，叫你開心很簡單。',
      'Your calendar is empty and your weekends are somehow full. You pick a destination ten minutes before leaving and befriend the next table on arrival. Your room looks freshly hit by a small typhoon, yet you can always find what you need under pile three. You are bad at analysis, but you turn up with fried chicken when a friend is down. Getting you to be on time is hard. Getting you to smile is easy.',
    ),
    strengths: [
      l('出現的地方氣氛自動升溫兩度', 'Rooms warm up two degrees when you walk in'),
      l('跌倒了先看看地上有沒有好吃的', 'When you fall, you check the floor for snacks'),
      l('對人沒有防備，新朋友很快變熟', 'No walls up. Strangers become friends fast'),
    ],
    quirks: [
      l('「快到了」的意思是你剛起床', '"Almost there" means you just woke up'),
      l('存款和冰箱一樣，常常突然空掉', 'Your savings and your fridge empty without warning'),
    ],
    relationship: l(
      '戀愛時你熱情、黏人又常忘記紀念日，但會用一百件小事補回來。友情上你是揪團發起人，只是地點常到最後才決定。跟你在一起要能接受行程隨時改版。',
      'In love, you are warm, clingy and forgetful about anniversaries, then make up for it in a hundred small ways. Among friends, you start the group plan and decide the venue last. Anyone with you must accept that plans get revised live.',
    ),
    traits: [l('樂觀', 'Optimistic'), l('隨性', 'Easygoing'), l('愛熱鬧', 'Loves a crowd')],
    alt: l('一隻橘色條紋貓伸懶腰、張嘴大笑，腳邊有一顆毛線球', 'An orange striped cat stretching with a wide open-mouthed laugh beside a ball of yarn'),
  }),
  make({
    id: 'siamese', kind: 'breed', color: '#E6D3B8',
    vector: v(60, 75, 95, 65, 80, 30),
    name: l('暹羅貓', 'Siamese'),
    title: l('戲劇系主角', 'The Leading Drama Major'),
    quote: l('我不是在抱怨，我是在做現場直播。', "I'm not complaining. I'm broadcasting live."),
    description: l(
      '你今天遇到的事，到了晚上會變成一齣有起承轉合的三幕劇。開心、生氣、委屈都寫在臉上，也會直接說出來，所以跟你相處不用猜。你討厭被冷處理，寧可吵一架也不要沉默。你也很講究自己的節奏，答應的事會做到，只是過程要有人看見。想跟你當朋友，只要認真聽完你的故事，並在該倒抽一口氣時倒抽一口氣。',
      'Whatever happens to you today becomes a three-act play by dinner. Joy, anger and hurt all show on your face and come out of your mouth, so nobody has to guess. You hate the silent treatment and would rather argue. You keep your promises too, as long as someone witnesses it. To befriend you, listen to the whole story and gasp at the right moment.',
    ),
    strengths: [
      l('有話直說，關係裡很少有未爆彈', 'You say it out loud, so nothing festers'),
      l('說故事能力強，買個便當也能講十分鐘', 'You can make buying lunch a ten-minute saga'),
      l('在乎的人受委屈，你第一個站出來', 'First to stand up for the people you love'),
    ],
    quirks: [
      l('沒人回應時，音量會自動加大', 'Volume rises automatically when nobody responds'),
      l('已讀不回會被你記入劇本大綱', 'Being left on read goes straight into the script'),
    ],
    relationship: l(
      '戀愛裡你要回應、要互動，也要被公開承認。友情上你是群組最活躍的那位，朋友的事你比當事人還激動。跟你相處，有情緒就講，你最怕對方什麼都不說。',
      'In love, you want replies, interaction and public acknowledgment. In friendship, you run the group chat and get angrier on friends\' behalf than they do. Say what you feel around you, because silence is what scares you.',
    ),
    traits: [l('外向', 'Outgoing'), l('直率', 'Direct'), l('表達欲強', 'Expressive')],
    alt: l('一隻奶油色身體、深色臉與耳朵的暹羅貓坐著回望，旁邊有插花玻璃瓶和一疊書', 'A cream Siamese with a dark face and ears sitting beside a vase of flowers and a stack of books'),
  }),
  make({
    id: 'black', kind: 'coat', color: '#B9B5B0',
    vector: v(15, 35, 5, 40, 30, 95),
    name: l('黑貓', 'Black Cat'),
    title: l('神秘觀察家', 'The Silent Observer'),
    quote: l('我不是冷漠，我只是在觀察你值不值得我喵。', "I'm not cold. I'm deciding whether you deserve a meow."),
    description: l(
      '聚會裡你坐在角落，話不多，散場時卻能說出誰跟誰今天不對勁。你習慣先看、再想、最後才開口，開口通常只有一句，而且很準。別人以為你難親近，其實你只是不想浪費力氣寒暄。你有自己的判斷，不太跟著大家走。想靠近你，別一直追問，把事情做好、說話算話，你會默默把對方放進名單裡。',
      'At a party you sit in the corner, say little, and leave knowing exactly who is not speaking to whom. You watch, then think, then deliver one accurate sentence. People assume you are hard to approach, but you just refuse to waste energy on small talk. You form your own opinions and rarely follow the crowd. To get close, stop asking questions and keep your word. You will quietly add them to the list.',
    ),
    strengths: [
      l('看人很準，細微的變化都逃不過', 'You catch the smallest shift in anyone'),
      l('不隨波逐流，大家都說好時你還會多想一步', 'When everyone agrees, you think one step further'),
      l('講話精簡，一句話就能點破問題', 'One sentence from you can end a debate'),
    ],
    quirks: [
      l('訊息常只回一個「嗯」，對方要解讀半天', 'Your one-word replies need decoding'),
      l('心裡已經分析完，別人還不知道你在想什麼', 'You finished the analysis; nobody knows you started'),
    ],
    relationship: l(
      '戀愛時你慢熱又謹慎，一旦認定，會用行動而不是言語表達。友情上你朋友不多但都經過篩選。請尊重你的沉默，那不代表生氣，多半只是在想事情。',
      'In love, you are slow and careful, and once decided, you show it in actions rather than words. Your friends are few and carefully vetted. Please respect your silence. It rarely means anger; you are usually just thinking.',
    ),
    traits: [l('敏銳', 'Perceptive'), l('獨立', 'Independent'), l('有主見', 'Opinionated')],
    alt: l('一隻戴橘色項圈與鈴鐺的黑貓抬頭望向月亮和星星', 'A black cat with an orange collar and bell looking up toward the moon and stars'),
  }),
  make({
    id: 'ragdoll', kind: 'breed', color: '#DCD5E4',
    vector: v(70, 15, 35, 40, 95, 10),
    name: l('布偶貓', 'Ragdoll'),
    title: l('溫柔陪伴者', 'The Gentle Companion'),
    quote: l('你不用說，我已經在你旁邊躺好了。', "You don't have to say it. I'm already lying next to you."),
    description: l(
      '朋友的語氣只要低一點，你就會傳訊息問「還好嗎」。你記得大家不吃什麼、誰最近失眠，出遊時包包裡有多的一包面紙。你不愛衝突，不開心時常先替對方想好理由。你最舒服的狀態是待在喜歡的人旁邊，什麼都不做也好。和你相處要記得回頭問問你：你一直在照顧別人，也需要有人接住你。',
      'A slight dip in a friend\'s voice and you are already texting "are you okay?" You remember who avoids what, who has been sleeping badly, and you always carry spare tissues. You dislike conflict and tend to invent excuses for whoever hurt you. You are happiest beside someone you love, doing nothing at all. People around you should remember to ask how you are, because you are busy caring for everyone else.',
    ),
    strengths: [
      l('情緒雷達靈敏，別人沒說你也接得住', 'You pick up what nobody has said yet'),
      l('好相處，有你在的場合很少尷尬', 'Awkward silences do not survive around you'),
      l('付出不計較，出遊的面紙永遠是你帶的', 'Your bag always holds the spare tissues'),
    ],
    quirks: [
      l('「都可以」說太多次，後來自己也不知道想吃什麼', 'After years of "anything is fine," you forgot what you like'),
      l('對方一句無心的話，你能難過三天', 'One careless sentence lasts you three days'),
    ],
    relationship: l(
      '戀愛裡你全心投入，需要常常確認彼此的連結。友情上你是大家的樹洞，手機裡收著很多人的祕密。對你好的方式很簡單：記得回應，也記得問你一句「那你呢」。',
      'In love, you go all in and need regular reassurance. In friendship, you hold many secrets in your phone. Treating you well is simple: reply, and remember to ask, "and how about you?"',
    ),
    traits: [l('體貼', 'Caring'), l('親密', 'Close'), l('重感情', 'Devoted')],
    alt: l('一隻藍眼長毛布偶貓窩在紫色靠枕和流蘇毯上', 'A blue-eyed long-haired Ragdoll resting on a lilac pillow and tasselled blanket'),
  }),
  make({
    id: 'bengal', kind: 'breed', color: '#E5C9A2',
    vector: v(45, 95, 45, 35, 50, 35),
    name: l('孟加拉貓', 'Bengal'),
    title: l('冒險行動派', 'The Action Hero'),
    quote: l('說明書是給還沒開始的人看的。', 'Instruction manuals are for people who have not started yet.'),
    description: l(
      '別人還在討論可不可行，你已經報名了。你的相簿裡有潛水、攀岩，以及一次差點趕不上的末班船。你對安全範圍的定義比一般人寬，受點小傷會拿來當紀念。你喜歡有人一起衝，但對方跟不上時，你也不介意先走。你不太會被困難嚇到，比較怕無聊。和你相處，別叫你再想想，直接告訴你哪裡可能會出事，你會聽的。',
      'While others debate feasibility, you have already signed up. Your photos include diving, climbing and one nearly missed last ferry. Your idea of a safe range is wider than most, and small injuries count as souvenirs. You love a partner in crime, but will go ahead if they lag. Boredom scares you more than difficulty. Do not tell you to think it over. Tell you what might go wrong, and you will listen.',
    ),
    strengths: [
      l('行動力強，想到的事當週就開始', 'An idea on Monday is underway by Friday'),
      l('遇到突發狀況反而更清醒', 'Emergencies make you sharper'),
      l('敢第一個試，大家因此少走彎路', 'You test the path so others can follow'),
    ],
    quirks: [
      l('買器材的速度比學會用的速度快', 'You buy gear faster than you learn to use it'),
      l('坐著超過一小時會開始找事做', 'One hour of sitting and you start looking for trouble'),
    ],
    relationship: l(
      '戀愛時你想要一起闖的隊友，週末常常從「我們去看看」開始。友情上你是負責把大家拖出門的人。你在乎對方，只是表現方式通常是「走，帶你去一個地方」。',
      'In love, you want a teammate, and weekends begin with "let\'s go see." Among friends, you drag everyone outdoors. You care deeply; it usually sounds like "come on, I want to show you a place."',
    ),
    traits: [l('好奇', 'Curious'), l('勇敢', 'Brave'), l('行動快', 'Quick to act')],
    alt: l('一隻豹紋孟加拉貓壓低身子準備出擊，身後有一枝綠葉', 'A spotted Bengal crouching low, ready to pounce, with a sprig of green leaves behind it'),
  }),
  make({
    id: 'maine', kind: 'breed', color: '#D2BFA5',
    vector: v(70, 40, 50, 85, 90, 70),
    name: l('緬因貓', 'Maine Coon'),
    title: l('溫柔大哥大', 'The Gentle Big Sibling'),
    quote: l('沒事，有我在。先吃飯，其他的我來排。', "It's fine, I've got this. Eat first. I'll sort out the rest."),
    description: l(
      '團體裡總有人問「這個誰負責」，最後大家都看向你。你記得訂位時間，也記得誰要提早離開，順手就把事情排好了。你體型未必大，存在感卻很穩，新人一到先來找你。你對自己人很護短，但講道理，該說的話會私下說。和你相處，請直接開口請你幫忙，也偶爾把工作接過去，你會嘴上說不用，心裡其實很感動。',
      'Whenever a group asks "who is handling this?", everyone turns to you. You remember the booking time and who must leave early, and you sort it without fuss. New people gravitate to you first. You defend your own fiercely, yet stay fair, saying the hard thing in private. To get along with you, ask for help directly, and sometimes take the load off. You will say there is no need and feel secretly moved.',
    ),
    strengths: [
      l('可靠，交給你的事不用追', 'Nobody has to chase you on anything'),
      l('帶人有耐心，也知道何時該放手', 'Patient with people, and you know when to let go'),
      l('大事來時穩得住場面', 'Calm when things get big'),
    ],
    quirks: [
      l('習慣一肩扛起，累了也不講', 'You carry everything and never admit you are tired'),
      l('常常幫朋友操心到比他爸媽還細', 'You worry about friends more thoroughly than their parents'),
    ],
    relationship: l(
      '戀愛裡你是會把對方下週行程記住的人，付出穩定但偶爾太像家長。友情上你是大家的備用聯絡人。對你最好的回報，是讓你也能放下責任休息一天。',
      'In love, you memorize their schedule and give steadily, though you can sound like a parent. Among friends, you are everyone\'s emergency contact. The best thank-you is letting you drop your duties for a day.',
    ),
    traits: [l('可靠', 'Reliable'), l('有領導力', 'A natural lead'), l('保護欲強', 'Protective')],
    alt: l('一隻蓬毛虎斑緬因貓趴著抬起頭，周圍有幾棵松樹', 'A fluffy tabby Maine Coon lying with its head raised among small pine trees'),
  }),
  make({
    id: 'russian', kind: 'breed', color: '#BFCBD6',
    vector: v(40, 25, 5, 95, 15, 95),
    name: l('俄羅斯藍貓', 'Russian Blue'),
    title: l('冷靜策略家', 'The Cool Strategist'),
    quote: l('我沒有生氣，我只是更新了風險評估。', "I'm not angry. I've simply updated my risk assessment."),
    description: l(
      '你的旅行有試算表，分頁包含交通、預算和下雨備案。你對事情的第一反應是拆解，不是抱怨，別人崩潰時你已經列好三個方案。你不喜歡突然被改規則，也不太表露情緒，有人以為你沒感覺，其實你只是把感覺歸檔了。和你相處，請把事情講清楚、守時，別用「隨便啦」敷衍你。給你時間想，你的答案通常值得等。',
      'Your holidays have a spreadsheet with tabs for transport, budget and rain plans. Your first response is to break things down, so while others spiral you already have three options. You dislike sudden rule changes and rarely show emotion. People think you feel nothing; you have just filed it. Be clear, be punctual, and never fob you off with "whatever." Give you time, and your answer is worth the wait.',
    ),
    strengths: [
      l('思路清楚，複雜的事到你手上會變成步驟', 'Complex things turn into steps in your hands'),
      l('凡事有備案，意外常常沒那麼意外', 'With a backup for everything, surprises shrink'),
      l('不被情緒帶著走，判斷穩定', 'Your judgment does not bend to the mood of the room'),
    ],
    quirks: [
      l('朋友只想討拍，你已經開始寫解決方案', 'Friends want a hug; you are drafting a solution'),
      l('行程表被改動時，眼角會微微抽動', 'Your eye twitches when the itinerary changes'),
    ],
    relationship: l(
      '戀愛裡你用規劃表達在乎，會把對方的需求排進計畫，但很少說出口。友情上你是做決定時會被找來的人。和你在一起，直接說需要什麼，比暗示有效十倍。',
      'In love, you show care by planning around their needs, though you rarely say it. Friends call you when a decision is due. Around you, saying what they need works ten times better than hinting.',
    ),
    traits: [l('理性', 'Rational'), l('謹慎', 'Careful'), l('重秩序', 'Orderly')],
    alt: l('一隻銀灰藍色的俄羅斯藍貓端坐著，旁邊玻璃瓶插著綠枝', 'A silver-blue Russian Blue sitting upright beside a glass jar of green sprigs'),
  }),
  make({
    id: 'calico', kind: 'coat', color: '#EFD3B5',
    vector: v(30, 45, 75, 5, 60, 5),
    name: l('三花貓', 'Calico'),
    title: l('傲嬌藝術家', 'The Tsundere Artist'),
    quote: l('我才沒有在等你回訊息，我只是剛好拿著手機。', "I wasn't waiting for your text. I just happened to be holding my phone."),
    description: l(
      '你的靈感常在半夜兩點出現，隔天早上可能又全部不喜歡。這週迷陶藝，下週改畫水彩，抽屜裡躺著好幾個做到一半的作品。你的情緒像天氣一樣豐富，嘴上說「隨便你」，心裡已經寫好一篇長文。你在意的事很多，只是不一定承認。和你相處，別急著講道理，先說你的作品很有意思，再慢慢等你自己走過來。',
      'Your inspiration arrives at 2 a.m. and may be hated by breakfast. Pottery this week, watercolor next, with half-finished projects in every drawer. Your moods change like the weather. You say "do what you want" while drafting a long essay in your head. You care about many things and admit to few. Do not reason with you first. Tell you the work is interesting, then wait for you to walk over on your own.',
    ),
    strengths: [
      l('想像力豐富，舊東西到你手上會變新', 'Old things come out new in your hands'),
      l('對美和情緒都很敏銳', 'A sharp eye for beauty and for feelings'),
      l('真心喜歡一件事時，投入得很徹底', 'When you truly love something, you disappear into it'),
    ],
    quirks: [
      l('「我沒生氣」的句號有千斤重', 'The full stop in "I\'m not mad." weighs a ton'),
      l('興趣換得比手機桌布還快', 'Hobbies change faster than your wallpaper'),
    ],
    relationship: l(
      '戀愛裡你嘴硬心軟，想被猜中又怕太明顯。友情上你會突然消失一陣子，再帶著新作品回來。和你相處要讀得懂反話，也要給你忽冷忽熱的空間。',
      'In love, you are sharp-tongued and soft-hearted, wanting to be understood without asking. Among friends, you vanish for a while and return with new work. People around you must read between the lines and allow for your weather.',
    ),
    traits: [l('創意', 'Creative'), l('感性', 'Sentimental'), l('變化多', 'Ever-changing')],
    alt: l('一隻白、橘、黑三色的三花貓坐著仰頭微笑，兩側開著小花', 'A white, orange and black Calico sitting with its chin up, smiling between small flowers'),
  }),
  make({
    id: 'tabby', kind: 'coat', color: '#CFC3A8',
    vector: v(70, 80, 55, 50, 15, 90),
    name: l('虎斑米克斯', 'Tabby Mix'),
    title: l('街頭生存王', 'The Street Survivor'),
    quote: l('沒有路就走巷子，巷子也沒有就翻牆。', 'No road? Take the alley. No alley? Over the wall.'),
    description: l(
      '不管被丟到哪個環境，你三天內就知道哪家便當划算、哪個同事能幫忙、哪條路不會塞。你不講究條件，看的是這件事划不划算、做不做得到。你和誰都聊得起來，卻很少依賴別人，出事時已經想好怎麼自己解決。你看過不少場面，所以不太容易被唬。和你相處要講實際的，空話對你沒用，能一起把事做成的人，你會記得。',
      'Drop you anywhere and within three days you know the best-value lunch, the helpful colleague and the road without traffic. You care less about conditions than whether something is worth it and doable. You can talk to anyone but rarely rely on anyone, and when trouble hits you already have your own way out. You have seen enough not to be fooled easily. Skip the empty talk. You remember people who actually get things done with you.',
    ),
    strengths: [
      l('適應力強，換環境三天就上手', 'Three days in a new place and you run it'),
      l('務實，資源不多也能把事做成', 'You get it done with whatever is at hand'),
      l('腦筋轉得快，總有第二條路', 'There is always a second route in your head'),
    ],
    quirks: [
      l('習慣自己來，連需要幫忙都不講', 'So used to going solo you forget to ask for help'),
      l('任何東西都會先算 CP 值，包含約會', 'You check the value-for-money of everything, dates included'),
    ],
    relationship: l(
      '戀愛裡你不走浪漫路線，車壞了你修、要搬家你到。需要時間才會放下防備。友情上你各圈都有朋友，真正交心的不多。請用行動取得信任，別只靠承諾。',
      'In love, romance is not your style: you fix the car and turn up on moving day, and your guard takes time to drop. You have friends in every circle and few confidants. Earn your trust through action, not promises.',
    ),
    traits: [l('適應力強', 'Adaptable'), l('務實', 'Practical'), l('聰明', 'Street-smart')],
    alt: l('一隻棕灰條紋虎斑貓伸懶腰、瞇眼微笑，前方有一杯冒熱氣的貓咪馬克杯', 'A brown-grey striped Tabby stretching with a contented smile beside a steaming cat mug'),
  }),
  make({
    id: 'white', kind: 'coat', color: '#E9E6E0',
    vector: v(10, 5, 65, 60, 5, 15),
    name: l('白貓', 'White Cat'),
    title: l('高冷小公主', 'The Aloof Princess'),
    quote: l('可以靠近，但請先預約。', 'You may approach. By appointment.'),
    description: l(
      '你對生活有明確的標準：床單要平、燈要暖、吃飯不坐吵的位子。別人說你難搞，你覺得這只是清楚自己要什麼。你對氣氛很敏感，一個眼神不對就想離開，也討厭別人沒問過就碰你的東西。你的情緒寫在臉上，卻不輕易讓人走近。和你相處要先敲門：尊重你的界線，別逼你參加團體活動，被你接納的人會發現你其實很細膩。',
      'You have clear standards: flat sheets, warm lighting, no noisy tables. People call you difficult; you call it knowing what you want. You are sensitive to atmosphere, ready to leave at one wrong look, and you hate people touching your things without asking. Your feelings show on your face, yet few get close. Knock first. Respect your boundaries and stop forcing you into group activities, and those let in will find how delicate you really are.',
    ),
    strengths: [
      l('品味清楚，挑過的東西都不會太差', 'Whatever you pick tends to be good'),
      l('界線明確，不勉強自己討好誰', 'Clear boundaries, with no need to please anyone'),
      l('細節敏感，別人漏掉的你都看得見', 'You notice what everyone else missed'),
    ],
    quirks: [
      l('去餐廳要換兩次位子才坐得下去', 'It takes two table changes before you can sit down'),
      l('別人碰過的杯子，你會默默換掉', 'You quietly swap any cup someone else has touched'),
    ],
    relationship: l(
      '戀愛裡你需要被珍惜，也需要完整的個人空間，太黏會讓你退後一步。友情上你只和少數人走得近。想討你歡心，記得你的小規矩，比送大禮有用得多。',
      'In love, you want to be cherished and also need full personal space, so clinginess makes you step back. Only a few friends get close. Remembering your small rules works far better than big gifts.',
    ),
    traits: [l('敏感', 'Sensitive'), l('講究', 'Particular'), l('界線清楚', 'Clear boundaries')],
    alt: l('一隻白貓閉眼仰頭坐在窗邊，身旁飄著花瓣', 'A white cat sitting by a window with eyes closed and chin up, petals drifting nearby'),
  }),
  make({
    id: 'norwegian', kind: 'breed', color: '#C9CDB6',
    vector: v(10, 95, 20, 45, 10, 40),
    name: l('挪威森林貓', 'Norwegian Forest Cat'),
    title: l('自由探險家', 'The Free Explorer'),
    quote: l('別等我，我走山路回去。', "Don't wait up. I'm taking the mountain route home."),
    description: l(
      '你適合一個人走很遠的路。假期你常背上包就出發，沒告訴太多人，回來也不太發文。你的冒險不吵鬧，不需要觀眾，只是想看看山的另一邊長什麼樣。你很能照顧自己，迷路時也不慌，會坐下來吃完三明治再看地圖。和你相處要給足自由，別問「你到底去哪了」，等你回來時，自然會把路上撿到的故事分給對方。',
      'You are built for walking a long way alone. You leave with a backpack, tell few people, and rarely post afterwards. Your adventures are quiet and need no audience; you just want to see the other side of the mountain. You look after yourself well, and when lost you finish your sandwich before opening the map. Give you freedom and do not demand where you have been. You will share the stories you picked up once you return.',
    ),
    strengths: [
      l('獨立自主，什麼事都能自己處理', 'You can handle nearly anything on your own'),
      l('越到陌生環境越沉得住氣', 'The stranger the place, the calmer you get'),
      l('不靠別人認可，自己知道要去哪', 'You know where you are going without applause'),
    ],
    quirks: [
      l('失聯三天，回來只說「去走走」', 'You vanish for three days and report "went for a walk"'),
      l('朋友約吃飯，你人已經在另一個縣市', 'Dinner invitations reach you in another county'),
    ],
    relationship: l(
      '戀愛裡你最怕被定位追蹤，適合能各自精彩、再回來分享的人。友情上你們可以半年沒聯絡，見面一樣自在。你表達感情的方式，是帶一顆路上撿的石頭回來。',
      'In love, you dread being tracked and suit someone who thrives separately and meets back to share. Friends can go six months without contact and pick up easily. Your love language is bringing back a pebble from the trail.',
    ),
    traits: [l('自主', 'Self-reliant'), l('沉穩', 'Composed'), l('愛探索', 'Exploring')],
    alt: l('一隻蓬毛的挪威森林貓端坐著，身後有雪山和松樹', 'A fluffy Norwegian Forest Cat sitting in front of snowy mountains and pine trees'),
  }),
  make({
    id: 'sphynx', kind: 'breed', color: '#EBC9BE',
    vector: v(40, 65, 95, 35, 10, 60),
    name: l('斯芬克斯貓', 'Sphynx'),
    title: l('反骨怪咖', 'The Lovable Oddball'),
    quote: l('大家都穿毛，我偏不要。', 'Everyone wears fur. Hard pass.'),
    description: l(
      '大家說這樣不行，你就會想試試看為什麼不行。你講話直接，笑點奇怪，會在正經的會議上突然問一個所有人都不敢問的問題。你不在意自己看起來合不合群，穿搭、興趣和人生選擇都偏離主流一點點。你不靠嘲諷別人取樂，比較常拿自己開玩笑。和你相處，請別用「一般人都怎樣」說服你，說得出真正的理由，你才聽得進去。',
      'Tell you something cannot be done and you will try it to find out why. You speak bluntly, laugh at odd things, and ask the question nobody dares in serious meetings. You do not care whether you fit in; your clothes, hobbies and life choices all sit slightly off the path. Your jokes target yourself more than others. Never argue "that\'s what normal people do." Give a real reason, and you might listen.',
    ),
    strengths: [
      l('敢講真話，幫大家戳破房間裡的大象', 'You point out the elephant in the room'),
      l('幽默感獨特，能把尷尬變成笑點', 'You can turn embarrassment into a punchline'),
      l('不怕和別人不一樣', 'Being different does not bother you'),
    ],
    quirks: [
      l('聽到「規定就是這樣」會立刻想問為什麼', '"That\'s the rule" immediately makes you ask why'),
      l('笑點太怪，常常只有你一個人在笑', 'Your jokes often have an audience of one'),
    ],
    relationship: l(
      '戀愛裡你要的是能跟你一起發神經、但各自有空間的人。友情上朋友都說「你很怪，但少了你很無聊」。別想改造你，能接住你的怪，你就很好相處。',
      'In love, you want someone who will be weird with you and still leave room. Friends say you are strange and that life without you is dull. Do not try to fix you. Catch the weirdness and you are easy company.',
    ),
    traits: [l('率真', 'Candid'), l('非典型', 'Atypical'), l('幽默', 'Funny')],
    alt: l('一隻大耳無毛的斯芬克斯貓穿著針織毛衣坐在枕頭旁，身邊有一盆植物', 'A big-eared hairless Sphynx in a knit sweater sitting by a pillow and a potted plant'),
  }),
  make({
    id: 'abyssinian', kind: 'breed', color: '#E3C6A0',
    vector: v(65, 95, 65, 35, 65, 65),
    name: l('阿比西尼亞貓', 'Abyssinian'),
    title: l('永動好奇寶寶', 'The Perpetual Curious Kid'),
    quote: l('等一下，那是什麼？還有那個呢？', 'Wait, what is that? And what about that?'),
    description: l(
      '你的瀏覽器分頁永遠有四十個，從量子力學開到怎麼做味噌。你看到新東西就想拆開來，學得快，也問得多，常讓老師先喝口水。你喜歡找人分享剛學到的冷知識，吃飯時會突然說「你知道嗎」。你很難靜下來，但腦子和手都停不住這件事，讓你到哪都學得會。和你相處要跟得上話題轉彎，也提醒你先把上一件事做完。',
      'You always have forty browser tabs open, from quantum physics to making miso. New things must be taken apart. You learn fast and ask so much that teachers need a sip of water first. You love sharing trivia, and every meal includes a "did you know." Sitting still is hard, but that restlessness means you pick up anything anywhere. Keep up with your sharp turns in topic, and remind you to finish the last thing.',
    ),
    strengths: [
      l('學習速度快，新工具摸一下就會', 'New tools click after one try'),
      l('會問好問題，常問出大家沒想到的點', 'Your questions find what nobody considered'),
      l('對世界保持興趣，很少覺得無聊', 'Boredom rarely finds you'),
    ],
    quirks: [
      l('線上課程買了十二門，看完半門', 'You bought twelve courses and finished half of one'),
      l('講話時話題會自己開岔路', 'Your sentences grow side roads'),
    ],
    relationship: l(
      '戀愛裡你會熱情分享每一個新發現，對方最好也喜歡聊天。友情上你是什麼都知道一點的人。陪你一起試新東西，比任何情話都有用，只是別期待你坐得住。',
      'In love, you share every discovery and need someone who enjoys talking. Among friends, you know a little about everything. Trying new things with you beats any sweet talk, as long as nobody expects you to sit still.',
    ),
    traits: [l('活潑', 'Lively'), l('好學', 'Eager to learn'), l('機靈', 'Quick-witted')],
    alt: l('一隻暖棕色的阿比西尼亞貓坐著抬頭張望，身旁有一疊書', 'A warm-brown Abyssinian sitting and looking upward beside a stack of books'),
  }),
  make({
    id: 'persian', kind: 'breed', color: '#EBDAD8',
    vector: v(20, 25, 30, 70, 80, 15),
    name: l('波斯貓', 'Persian'),
    title: l('精緻享樂派', 'The Refined Hedonist'),
    quote: l('生活已經很累了，杯子至少要好看。', "Life is tiring enough. The cup should at least be pretty."),
    description: l(
      '你相信日子是一個一個細節組成的：香氛要對味，毛巾要軟，早餐要擺盤才算開始。你不趕時間，週末的固定儀式是睡到自然醒、泡澡、看一部舊電影。你不愛出遠門，更愛把熟悉的小圈子照顧得舒舒服服。別人覺得你慢，你覺得他們沒在享受。和你相處，約在好吃的店、留足時間，別催，你會把最喜歡的甜點分一半給對方。',
      'You believe life is made of details: the right scent, soft towels, a breakfast that counts only once plated. You never rush. Weekends mean sleeping in, a long bath and an old film. You prefer caring for a small, familiar circle to travelling far. Others think you are slow; you think they are not enjoying themselves. Choose a good restaurant, leave plenty of time, and do not hurry you. You will share half of your favorite dessert.',
    ),
    strengths: [
      l('把普通的日子過得有質感', 'You make an ordinary day feel considered'),
      l('對親近的人很捨得，也很溫柔', 'Generous and tender with your inner circle'),
      l('懂得休息，不把自己逼到極限', 'You know how to stop before the edge'),
    ],
    quirks: [
      l('出門準備的時間，夠別人來回一趟', 'Your getting-ready takes one full round trip'),
      l('為了一個杯子可以比價三個月', 'You can compare prices on one cup for three months'),
    ],
    relationship: l(
      '戀愛裡你要穩定的陪伴和一點儀式感，紀念日不能隨便過。友情上你是大家想放鬆時會想到的人。和你相處別趕行程，慢慢來才看得到你最溫柔的一面。',
      'In love, you want steady company and a sense of occasion, so anniversaries are never casual. Friends think of you when they need to unwind. Do not rush you; your gentlest side only appears at a slow pace.',
    ),
    traits: [l('審美', 'Aesthetic'), l('慢節奏', 'Unhurried'), l('愛舒適', 'Comfort-loving')],
    alt: l('一隻奶油色長毛波斯貓閉著眼，窩在粉色荷葉邊坐墊上', 'A cream long-haired Persian with closed eyes curled on a frilled pink cushion'),
  }),
  make({
    id: 'tuxedo', kind: 'coat', color: '#CFCDCB',
    vector: v(95, 55, 85, 40, 55, 65),
    name: l('賓士貓', 'Tuxedo Cat'),
    title: l('社交搞事王', 'The Social Troublemaker'),
    quote: l('場子太冷的話，我可以負責把它弄亂。', 'If the room is too quiet, I can arrange a small incident.'),
    description: l(
      '只要你在場，聚會就不會冷掉，通常是因為你開了一個不該開的玩笑。你反應快，三句話就能接上任何人的頻率，也知道大家的笑點在哪。你愛熱鬧，更愛看事情稍微失控一點的瞬間，但都有分寸，不會讓人真的難堪。你其實算得很清楚，誰該配誰一組、誰今天需要被逗笑。和你相處，要接得住玩笑，也記得你偶爾也想認真講話。',
      'Parties never go cold with you around, usually because of a joke you should not have made. You are fast, tuning in to anyone within three sentences and knowing what makes each person laugh. You love a crowd and enjoy things going slightly off the rails, though you never leave anyone actually embarrassed. Underneath, you are calculating who should sit with whom and who needs a laugh tonight. Take the jokes well, and remember you sometimes want to talk seriously.',
    ),
    strengths: [
      l('反應快，再尷尬的場面都接得起來', 'Quick enough to rescue any awkward moment'),
      l('會看人，知道每個人的笑點和底線', 'You know everyone\'s funny bone and limits'),
      l('能把不同圈子的人湊在一起', 'You bring separate circles together'),
    ],
    quirks: [
      l('認真時別人以為你在開玩笑', 'When you are serious, people wait for the punchline'),
      l('忍不住把群組對話帶歪', 'You cannot resist derailing a group chat'),
    ],
    relationship: l(
      '戀愛裡你用玩笑示好，心動時反而嘴更壞。友情上你是活動的靈魂，也是記得幫大家圓場的人。如果你突然安靜，那多半是真的有事，請主動問一句。',
      'In love, you flirt through teasing and get sillier when you mean it. Among friends, you are the life of the event and the one who smooths things over. If you go quiet, something is really up, so please ask.',
    ),
    traits: [l('機智', 'Witty'), l('搞笑', 'Funny'), l('愛熱鬧', 'Loves a crowd')],
    alt: l('一隻打紅色領結的黑白賓士貓端坐著，身旁書堆上有一杯冒熱氣的杯子', 'A black-and-white Tuxedo Cat in a red bow tie sitting beside books topped with a steaming cup'),
  }),
];

export const CAT_BY_ID = Object.fromEntries(CATS.map((c) => [c.id, c])) as Record<CatId, Cat>;
