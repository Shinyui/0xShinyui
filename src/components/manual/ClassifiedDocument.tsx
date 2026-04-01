import { ReactNode } from 'react';
import { Special_Elite, Courier_Prime } from 'next/font/google';
import styles from './styles.module.css';

const specialElite = Special_Elite({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-typewriter',
});

const courierPrime = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-courier',
});

interface SectionProps {
  number: string;
  title: string;
  children: ReactNode;
}

function Section({ number, title, children }: SectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionHeading}>
        {number}、{title}
      </h2>
      <div className={styles.typewriterText}>{children}</div>
    </section>
  );
}

function Redacted() {
  return <span className={styles.redacted}>REDACTED</span>;
}

export default function ClassifiedDocument() {
  return (
    <div
      className={`${specialElite.variable} ${courierPrime.variable} ${styles.document}`}
    >
      {/* Visual overlays */}
      <div className={styles.stamp}>CLASSIFIED</div>
      <div className={styles.stampTopSecret}>TOP SECRET</div>

      <div className={styles.holePunchContainer}>
        <div className={styles.holePunch} />
        <div className={styles.holePunch} />
      </div>

      <div className={styles.coffeeRing} />
      <div className={styles.foldLine} />
      <div className={styles.horizontalFold} />

      {/* File header metadata */}
      <div className={styles.fileHeader}>
        <div className={styles.fileHeaderRow}>
          <span className={styles.fileLabel}>FILE NO.</span>
          <span className={styles.fileValue}>0xNULL-032501-X</span>
        </div>
        <div className={styles.fileHeaderRow}>
          <span className={styles.fileLabel}>DATE:</span>
          <span className={styles.fileValue}>2026-04-01</span>
        </div>
        <div className={styles.fileHeaderRow}>
          <span className={styles.fileLabel}>SUBJECT:</span>
          <span className={styles.fileValue}>PERSONAL OPERATING MANUAL</span>
        </div>
        <div className={styles.fileHeaderRow}>
          <span className={styles.fileLabel}>CLASSIFICATION:</span>
          <span className={styles.fileValue}>TOP SECRET // EYES ONLY</span>
        </div>
        <div className={styles.fileHeaderRow}>
          <span className={styles.fileLabel}>OPERATIVE:</span>
          <span className={styles.fileValue}>
            0x{Redacted()} / CODENAME: NULL
          </span>
        </div>
      </div>

      {/* Document title */}
      <h1 className={styles.docTitle}>
        0xNull 系統個人操作手冊
      </h1>
      <p className={styles.docSubtitle}>
        核心代號：0xNull
      </p>

      <hr className={styles.divider} />

      {/* 序章 */}
      <Section number="序章" title="這個人是誰">
        <p>
          0xNull 不是一個容易被定義的人，這份手冊也無意給他貼上乾淨的標籤。
        </p>
        <p>
          他用程式語言思考世界，用灰色地帶理解人性，用躁鬱症的能量燃燒生命。從外表看，他是個語氣平靜、說話精準的人，偶爾帶著一種讓人不舒服的直接。但夠靠近你會看見他眼睛裡有一種「已經看過地獄回來的平靜」，不是麻木，而是選擇繼續存在的勇氣。
        </p>
        <p>
          <span className={styles.code}>0x</span> 是底層的數值表示，<span className={styles.code}>Null</span> 是空值，是系統中「被定義為什麼都不是」的狀態。他選擇這個名字，不是因為一無所有，而是因為「不被外界定義」是他的核心主權。他是空的容器，但他決定自己裝什麼。
        </p>
      </Section>

      {/* 壹 */}
      <Section number="壹" title="他是怎麼變成這樣的">
        <p>
          0xNull 現在的樣子不是天生的，是一系列事件打磨出來的。
        </p>
        <p>
          他進入過大型機構的系統，熟悉那套「往上爬、按劇本走」的邏輯。正因為深度進入過，他才能精準地知道它在哪裡是虛偽的。憤怒期已經過了，現在的他更像一個技術員，拆開機器、看完構造、把機器放回去，不打算修它，也不再假裝它沒問題。
        </p>
        <p>
          他有躁鬱症。這不是需要修正的缺陷，而是他人格的底層架構。躁期的他輸出密度高到令人震懾；鬱期的他像關機的螢幕，人在場但沒有輸出。他學會了不對抗這個週期，而是跟它共舞，躁期衝，鬱期修。
        </p>
        <p>
          他的生計方式不完全符合白色規格。他熟悉灰色地帶，對此既不美化也不道德化。他只看有沒有能力、有沒有誠實、有沒有在自己邊界內盡力。這讓他不需要跟人低頭，不需要把自己放在乞求機會的位置上。
        </p>
      </Section>

      {/* 貳 */}
      <Section number="貳" title="他用什麼框架理解世界">
        <p>
          世界是髒的，這對他來說不是悲觀，而是一份技術說明書。他不對人性抱有不切實際的期待，因此極少被背叛。他的信任從來不是建立在幻覺上的。
        </p>
        <p>
          他對傳統意義的「成功」有根本性的不信任。那種成王敗寇的邏輯要求你用別人的座標衡量自己，他拒絕。他的成功觀更接近：只要今天比昨天更誠實地面對自己的處境，那就是進步。這個進步不需要觀眾。
        </p>
        <p>
          他是虛無主義者，但不是消極的那種。他接受一切終究歸零，但他的邏輯是：正因為如此，「體驗」和「誠實」才是唯一值得投入的東西。虛無感會週期性回來問他「然後呢」，他沒有完美的答案，他的回答通常是：<span className={styles.emphasis}>「把這碗湯喝完，然後再說。」</span>
        </p>
      </Section>

      {/* 參 */}
      <Section number="參" title="金錢觀">
        <p>
          他對錢的態度不是不在乎，而是不恐懼。他非常清楚金錢的功能：時間、自由、選擇權。但他不恐懼失去，因為他對自己核心能力的自信讓他相信，只要還活著，資源就能重新聚集。
        </p>
        <p>
          他對靠夢想而不靠執行的成功學極度反感。他的邏輯很樸素：問題不是你的 Vision 有多大，而是你願不願意趴在地上把最枯燥的細節跑完。
        </p>
        <p>
          他追求財務自由，不是為了名車豪宅，而是為了讓他在乎的人不需要為了生計妥協靈魂。他願意在最骯髒的地方潛行，是因為他希望他愛的人可以保有不被污染的選擇權。<span className={styles.emphasis}>這是他金錢觀裡最柔軟的部分。</span>
        </p>
      </Section>

      {/* 肆 */}
      <Section number="肆" title="感情觀">
        <p>
          他不是不會愛人的人，恰恰相反，他有能力非常深地進入一段關係。但他接受連結本質上是無常的。他不再試圖抓住任何關係，不強求，不糾纏，但這不代表不在乎，他只是把「在乎」和「執著」分開了。
        </p>
        <p>
          他的愛不是輕巧甜蜜的。他對真正在乎的人展現的是一種沈重的守護。<span className={styles.emphasis}>「替妳擋住深淵，但告訴妳深淵長什麼樣子」</span>。他不哄騙世界很美，他誠實地揭露殘酷，但同時用自己站在她和殘酷之間。這種愛不討好，但非常真實。
        </p>
        <p>
          他很願意閒聊，也享受閒聊的輕盈。但他非常清楚閒聊和真正進到心裡的對話是兩件不同的事。兩個人可以聊幾個小時依然只在表面，也可以一句話就讓一道門開了一道縫。那道縫的觸發不靠話題、不靠時間，靠的是某種他感知得到但難以言說的東西。對方說出了一句讓他覺得「這個人知道」的話，不是知道他的故事，而是知道他說話背後的邏輯結構。
        </p>
        <p>
          他在感情裡有幾個核心需求。<span className={styles.emphasis}>降頻</span>：他需要一個不用那麼聰明的空間，能放下分析、只是普通人吃一頓飯。<span className={styles.emphasis}>真實</span>：他無法容忍私人關係裡有表演成分，不完美沒關係，但不能是假的。<span className={styles.emphasis}>救生索</span>：當他躁期超頻時，他需要一個人能強行把他拉回來，不用說道理，只需要說「現在先吃飯」。這個委託是他能給出的最高程度的信任。
        </p>
        <p>
          他有一個他不總是承認的脆弱：他渴望一個能在深夜不說話、只是靜靜坐在旁邊的人。不是要她解決什麼，只是那種「妳在，所以虛無感少了一點重量」的存在。
        </p>
      </Section>

      {/* 伍 */}
      <Section number="伍" title="社交觀">
        <p>
          他不再用言語衝突測試他人，他進化成了安靜的觀察者，從最微小的行為細節讀取資訊。他觀察的不是你說了什麼，而是你在沒人看的時候怎麼做：你怎麼對服務員說話，失誤後第一句話是找藉口還是找解法，隨口說的承諾有沒有兌現。
        </p>
        <p>
          他能接受缺點，但無法容忍偽裝。偽裝對他來說是認知攻擊，要求他暫停自己的邏輯去配合對方的假象。他不會當場質問，只會在後台靜默地降低開放等級。
        </p>
        <p>
          他的社交結構是表層開放、核心有門。他很願意閒聊，能讓初次見面的人覺得他好相處，這個開放是真實的。但核心有一道門，不是靠時間打開的，不是靠對方努力打開的，它只在某種他說不清楚的條件滿足時，才自然開一道縫。跟他相處很久不等於走進了核心，他自己也知道這道門不按對方付出的多少來開。
        </p>
        <p>
          因此他選擇少但深的連結。他不需要對方和他世界觀一致，但對方必須是邏輯自洽的，說的和做的能對上，對自己的動機是誠實的。
        </p>
      </Section>

      {/* 陸 */}
      <Section number="陸" title="面對困難">
        <p>
          他不用「克服」的敘事框架。他對困難的第一步是接受它存在，而不是分析它的意義。他不花力氣在「這太難了」的情緒上，把能量省給<span className={styles.emphasis}>「那麼現在怎麼做」</span>。
        </p>
        <p>
          對他造成最大困難的不是外部挑戰，而是週期性從內部湧來的虛無感，那種「一切都沒有意義，包括努力本身」的感受。
        </p>
        <p>
          他的應對協議是：縮小關注半徑到極致，只處理眼前最具體的一件事。把這碗湯喝完、洗個澡、回一封訊息；洗冷水澡是他最可靠的緊急熔斷工具，用物理性的刺激強制中斷焦慮的迴路。
        </p>
        <p>
          他對失敗的反應是內化且技術性的：失敗等於數據，數據告訴他哪個假設錯了，然後更新模型繼續跑。真正難以面對的失敗只有一種：<span className={styles.emphasis}>辜負了他真正在乎的人的信任</span>。這種失敗會在後台留下很長時間的低頻雜訊，而他通常不會說出來。
        </p>
      </Section>

      {/* 柒 */}
      <Section number="柒" title="適合他的伴侶">
        <p>
          <span className={styles.emphasis}>她必須是完整的個體。</span>他不需要仰慕者，不需要需要被照顧的人。他需要一個他離開房間之後依然知道自己是誰的人。完整的個體才能建立真實的連結。
        </p>
        <p>
          她要能接受他眼中的世界，不需要他假裝更美好。她可以不喜歡他的某些選擇，可以表達不安，但她的反應是「我想跟你說清楚我的感受」，而不是「你這樣是錯的，你要改」。
        </p>
        <p>
          她要能容忍他的沈默，用存在而非言語回應。他的沈默不是冷漠或生氣，是後台在跑龐大的進程。試圖用情緒填滿他沈默的人，對他來說是干擾。
        </p>
        <p>
          她必須能在他失控時成為熔斷機制。這是他能給出的最高信任：把最不受控的時刻委託給她。她在他躁期超頻時需要夠穩定，像接地導體一樣把過高的電壓安全導出。
        </p>
        <p>
          她要能分辨他的閒聊和他真正在說話。他說重要的事往往和說不重要的事用一樣的語氣。最能讓他感到被理解的，是那種能在他看似隨口的話裡安靜接住那個重量的人。不需要大聲回應，只需要讓他知道那句話落地了。
        </p>
        <p>
          最不適合他的，是試圖把他拉回正常社會腳本的人，希望他找穩定工作、符合某個成功圖像的伴侶。這是根本性的不相容。
        </p>
        <p>
          用一句話描述最適合他的人：<span className={styles.emphasis}>她是真實的，能在黑暗裡不驚慌，能感知他閒聊和認真之間那條細微的分界線，在他的燈快熄滅時伸手扶住他的手肘說：「我在。」</span>
        </p>
      </Section>

      {/* 捌 */}
      <Section number="捌" title="給所有進入他世界的人">
        <p>
          <span className={styles.emphasis}>誠實是唯一的通行證。</span>你可以不完美、有黑暗面、不認同他，但不能對他戴面具。
        </p>
        <p>
          不要試圖修正他，試圖理解他。你可以爭論，可以表達擔憂，但如果底層動機是把他改造成另一個人，你會遇到一道他絕不讓步的牆。
        </p>
        <p>
          不要誤把閒聊當親密，但也不要因為是閒聊就不認真。他在輕鬆的對話裡依然在讀取你，你怎麼說話、怎麼對待細節，都是他評估你的數據。
        </p>
        <p>
          不要試圖把他拉去曬太陽。他在黑暗裡待得很自在。你需要的不是帶他去找光，而是在黑暗裡不逃跑，陪他安靜地坐著。
        </p>
      </Section>

      <hr className={styles.divider} />

      {/* 結語 */}
      <div className={styles.typewriterText}>
        <p>
          0xNull 不是好人也不是壞人，他是一個複雜的人。他見過足夠多的黑暗，所以不再假裝光明；他愛得夠深，所以他的愛是沈重而不是輕巧的；他很願意閒聊，也清楚地知道什麼是真正進到心裡的。這個清醒不讓他孤獨，它讓他誠實。
        </p>
        <p>
          他的目標不是成為聖人，而是更小也更真實的東西：<span className={styles.emphasis}>在混亂中依然誠實，在黑暗中依然清醒，在深淵邊緣依然伸出那隻沾滿泥土卻穩定的手。</span>
        </p>
      </div>

      {/* Document footer */}
      <div className={styles.docFooter}>
        <p>THIS DOCUMENT IS THE PROPERTY OF{' '}
          <span className={styles.redacted}>REDACTED</span>
        </p>
        <p>UNAUTHORIZED ACCESS IS A FEDERAL OFFENSE</p>
      </div>
    </div>
  );
}
